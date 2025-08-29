import {useState} from "react";
import CategoryAccordion from "./CategoryAcordion.tsx";
import {Button, Stack} from "@mui/material";
import {Category, Images, UploadedImage} from "./ImageDataEditorTypes.ts";

const CATEGORY_IDS: Record<Category, number> = {
    walkUp: 0,
    walkDown: 1,
    walkLeft: 2,
    walkRight: 3,
    stand: 4,
    dying: 5,
    attack: 6,
    health: 7,
    avatar: 8,
};
export default function ImageDataEditor() {
    const [images, setImages] = useState<Images>({
        walkUp: [],
        walkDown: [],
        walkLeft: [],
        walkRight: [],
        stand: [],
        dying: [],
        attack: [],
        health: [],
        avatar: [],
    });
    const handleFileUpload = (files: FileList, delay: number, category: Category) => {
        const filesArray: File[] = Array.from(files);
        const newImages: UploadedImage[] = [];

        filesArray.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (e) => {
                const target = e.target;
                if (!target) return; // exit if null
                const img = new Image();
                if (typeof e?.target.result === "string") {
                    img.src = e.target.result;
                }

                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
                    if (ctx === null) {
                        console.log("Could not retreive canvas 2D context.")
                        return;
                    }
                    ctx.drawImage(img, 0, 0);

                    const imageData = ctx.getImageData(0, 0, img.width, img.height).data; // RGBA pixel data

                    const newImage: UploadedImage = {
                        file,
                        delay,
                        category,
                        width: img.width,
                        height: img.height,
                        rgbaData: Array.from(imageData), // Store as an array
                    };

                    newImages.push(newImage);

                    if (newImages.length === filesArray.length) {
                        setImages(prevImages => ({
                            ...prevImages,
                            [category]: [...prevImages[category], ...newImages]
                        }));
                    }
                };
            };
        });
    };

    const handleDelete = (category: Category, index: number) => {
        setImages(prevImages => ({
            ...prevImages,
            [category]: prevImages[category].filter((_, i) => i !== index) // Remove item at index
        }));
    }

    const handleDelayChange = (category: Category, index: number, newDelay: number) => {
        setImages(prevImages => ({
            ...prevImages,
            [category]: prevImages[category].map((image, i) =>
                i === index ? {...image, delay: newDelay} : image // Update only the matching image
            )
        }));
    };

    const exportData = () => {
        const buffer = [];

        // File header (4 bytes: "SPRT")
        buffer.push(new TextEncoder().encode("SPRT"));

        // Version number (1 byte)
        buffer.push(new Uint8Array([1]));

        // Number of images (2 bytes)
        const imageCount = Object.values(images).reduce((sum, category) => sum + category.length, 0);
        buffer.push(new Uint16Array([imageCount]));

        // Process each image in all categories
        (Object.entries(images) as [Category, UploadedImage[]][]).forEach(([categoryName, imageArray]) => {
            const categoryId = CATEGORY_IDS[categoryName];
            imageArray.forEach((image) => {
                // Category identifier (1 byte)
                buffer.push(new Uint8Array([categoryId]));

                // Width & Height (2 bytes each)
                buffer.push(new Uint16Array([image.width, image.height]));

                // Delay (2 bytes)
                buffer.push(new Uint16Array([image.delay]));

                // RGBA Data
                buffer.push(new Uint8Array(image.rgbaData));
            });
        });

        // Create and download the binary file
        const blob = new Blob(buffer, {type: "application/octet-stream"});
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "sprite_data.dat";
        link.click();
    };

    return (
        <div>
            <div>
                <Stack spacing={2}>
                    <>
                        {(Object.keys(images) as Category[]).map((category) => (
                            <div key={category}>
                                <CategoryAccordion
                                    imageData={images[category]}
                                    category={category}
                                    handleFileUpload={handleFileUpload}
                                    handleDelete={handleDelete}
                                    handleDelayChange={handleDelayChange}
                                />
                            </div>
                        ))}

                        <Button
                            variant="outlined"
                            color="success"
                            onClick={exportData}
                        >
                            Export .dat File
                        </Button>
                    </>
                </Stack>
            </div>
        </div>
    );
}
