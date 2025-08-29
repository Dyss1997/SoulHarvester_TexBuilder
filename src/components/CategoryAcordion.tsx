import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    InputAdornment,
    ListItem,
    MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImageSlot from "./ImageSlot.tsx";
import DropZoneBanner from "./DropZoneBanner.tsx";
import * as React from "react";
import {useState} from "react";
import AnimationPreview from "./AnimationPreview.tsx";
import {Category, UploadedImage} from "./ImageDataEditorTypes.ts";

const CategoryAccordion = ({imageData, category, handleDelete, handleFileUpload, handleDelayChange}: {
    imageData: UploadedImage[]; // adjust type as needed
    category: Category; // adjust if it's an object instead
    handleDelete: (category: Category, index: number) => void; // adjust params/return types
    handleFileUpload: (files: FileList, delay: number, category: Category) => void; // adjust
    handleDelayChange: (category: Category, index: number, newDelay: number) => void; // adjust
}) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const [delay, setDelay] = useState(200);
    const handleAddDelayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.min(Math.max(parseInt(event.target.value, 10), 1), 9999)
        setDelay(newValue);
    };
    const handleCategoryDelete = (index: number) => {
        handleDelete(category, index);
    };
    const handleCategoryDelayChange = (index: number, newDelay: number) => {
        const newValue = Math.min(Math.max(newDelay, 1), 9999)
        handleDelayChange(category, index, newValue);
    };
    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current!.click();
        }
    };
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography component="span">{category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack direction="row" spacing={3} justifyContent={"space-between"}>
                    <Box>{imageData.map((data, index) => (
                        <div key={index}>
                            <ImageSlot image={data}
                                       index={index}
                                       handleDelete={handleCategoryDelete}
                                       handleDelayChange={handleCategoryDelayChange}/>
                        </div>
                    ))}
                    </Box>
                    <Box alignSelf={"flex-end"}>
                        {imageData.length > 1 && <AnimationPreview imageData={imageData}/>}
                    </Box>
                </Stack>
                <Stack direction="row" spacing={3}>
                    <MenuItem>
                        <DropZoneBanner onClick={handleClick}
                                        onDrop={files => handleFileUpload(files, delay, category)}/>
                    </MenuItem>
                    <ListItem>
                        <TextField
                            type={"number"}
                            value={delay}
                            slotProps={{
                                input: {
                                    endAdornment: <InputAdornment position="end">ms</InputAdornment>,
                                },
                            }}
                            label="Animation Delay (ms)"
                            onChange={handleAddDelayChange}/>
                    </ListItem>
                    <input hidden type="file" accept="image/*" ref={inputRef} multiple
                           onChange={event => {
                               const files: FileList | null = event.target.files;
                               if (files) {
                                   handleFileUpload(files, delay, category);
                               }
                           }}/>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

export default CategoryAccordion;