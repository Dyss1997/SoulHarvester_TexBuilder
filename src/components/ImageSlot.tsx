import {Box, Button, InputAdornment, Stack, TextField} from "@mui/material";
import "./ImageSlot.css";
import * as React from "react";
import CancelIcon from '@mui/icons-material/Cancel';

const ImageSlot = ({image, index, handleDelete, handleDelayChange}) => {
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
                    onChange={event => handleDelayChange(index, event.target.value)}/>
            </Box>
            <Box maxWidth={"200px"} minWidth={"100px"}>
                <img src={URL.createObjectURL(image.file)} alt="sprite" className="h-auto preview-image"/>
            </Box>
        </Stack>
    </div>
}

export default ImageSlot;