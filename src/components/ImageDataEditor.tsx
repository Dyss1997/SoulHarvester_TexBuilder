import * as React from "react";
import {useState} from "react";
import CategoryAccordion from "./CategoryAcordion.tsx";
import {Button, Stack} from "@mui/material";

const CATEGORY_IDS = {
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
    const [images, setImages] = useState({
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
    const handleFileUpload = (event, delay, category) => {
        const files: File[] = Array.from(event.target.files);
        const newImages = [];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (e) => {
                const img = new Image();
                if (typeof e.target.result === "string") {
                    img.src = e.target.result;
                }

                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);

                    const imageData = ctx.getImageData(0, 0, img.width, img.height).data; // RGBA pixel data

                    const newImage = {
                        file,
                        delay,
                        category,
                        width: img.width,
                        height: img.height,
                        rgbaData: Array.from(imageData), // Store as an array
                    };

                    newImages.push(newImage);

                    if (newImages.length === files.length) {
                        setImages(prevImages => ({
                            ...prevImages,
                            [category]: [...prevImages[category], ...newImages]
                        }));
                    }
                };
            };
        });
    };

    const handleDelete = (category, index) => {
        setImages(prevImages => ({
            ...prevImages,
            [category]: prevImages[category].filter((_, i) => i !== index) // Remove item at index
        }));
    }

    const handleDelayChange = (category, index, newDelay) => {
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
        Object.entries(images).forEach(([categoryName, imageArray]) => {
            const categoryId = CATEGORY_IDS[categoryName];
            if (categoryId === undefined) {
                console.warn(`Unknown category: ${categoryName}, skipping.`);
                return;
            }
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
                    {Object.keys(images).map((category) => (
                        <div key={category}>
                            <CategoryAccordion
                                imageData={images[category]}
                                category={category}
                                handleFileUpload={handleFileUpload}
                                handleDelete={handleDelete}
                                handleDelayChange={handleDelayChange}
                            /></div>
                    ))}

                    <Button
                        variant="outlined"
                        color="success"
                        onClick={exportData}>Export .dat File
                    </Button>
                </Stack>
            </div>
        </div>
    );
}
