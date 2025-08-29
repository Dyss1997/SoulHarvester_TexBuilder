import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {UploadedImage} from "./ImageDataEditorTypes.ts";

const AnimationPreview = ({imageData}: {
    imageData: UploadedImage[]
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        if (imageData.length === 0) {
            setCurrentIndex(0); // Reset to avoid referencing deleted items
            return;
        }

        // Ensure currentIndex is always within bounds
        if (currentIndex >= imageData.length) {
            setCurrentIndex(0);
            return;
        }

        const incrementIndex = () => {
            setCurrentIndex((currentIndex + 1) % imageData.length)
        }
        const {delay} = imageData[currentIndex]; // Get delay for current image
        const timer = setTimeout(incrementIndex, delay);

        return () => clearTimeout(timer);
    }, [currentIndex, imageData]);

    return (
        <div style={{textAlign: "center"}}>
            {imageData.length > 0 && currentIndex < imageData.length && (
                <Box maxWidth={"200px"} minWidth={"100px"}>
                    <img
                        src={URL.createObjectURL(imageData[currentIndex].file)}
                        alt="animation frame"
                        style={{maxWidth: "100%", height: "auto", minWidth: "50px"}}
                    />
                </Box>
            )}
        </div>
    );
};

export default AnimationPreview;
