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

const CategoryAccordion = ({imageData, category, handleDelete, handleFileUpload, handleDelayChange}) => {
    const inputRef = React.useRef(null);
    const [delay, setDelay] = useState(200);
    const handleAddDelayChange = (event) => {
        const newValue = Math.min(Math.max(parseInt(event.target.value, 10), 1), 9999)
        setDelay(newValue);
    };
    const handleCategoryDelete = (index) => {
        handleDelete(category, index);
    };
    const handleCategoryDelayChange = (index, newDelay) => {
        const newValue = Math.min(Math.max(parseInt(newDelay, 10), 1), 9999)
        handleDelayChange(category, index, newValue);
    };
    const handleClick = () => {
        inputRef.current.click();
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
                                        onDrop={files => handleFileUpload({target: {files: files}}, delay, category)}/>
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
                           onChange={event => handleFileUpload(event, delay, category)}/>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

export default CategoryAccordion;