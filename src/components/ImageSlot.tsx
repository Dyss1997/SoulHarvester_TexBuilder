import {Box, Button, InputAdornment, Stack, TextField} from "@mui/material";
import "./ImageSlot.css";
import CancelIcon from '@mui/icons-material/Cancel';
import {UploadedImage} from "./ImageDataEditorTypes.ts";

const ImageSlot = ({image, index, handleDelete, handleDelayChange}: {
    image: UploadedImage,
    index: number,
    handleDelete: (index: number) => void,
    handleDelayChange: (index: number, newDelay: number) => void
}) => {
    return <div>
        <Stack direction="row" spacing={10}>
            <Box alignSelf="center">
                <Button className="delete-button"
                        disableRipple
                        variant="text"
                        onClick={() => handleDelete(index)}
                >
                    <CancelIcon fontSize="large" color="error"/>
                </Button>
            </Box>
            <Box alignSelf={"center"}>
                <TextField
                    value={image.delay}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">ms</InputAdornment>,
                        },
                    }}
                    label="Animation Delay (ms)"
                    onChange={event => handleDelayChange(index, Number(event.target.value))}/>
            </Box>
            <Box maxWidth={"200px"} minWidth={"100px"}>
                <img src={URL.createObjectURL(image.file)} alt="sprite" className="h-auto preview-image"/>
            </Box>
        </Stack>
    </div>
}

export default ImageSlot;