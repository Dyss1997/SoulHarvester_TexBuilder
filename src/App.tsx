import './App.css'
import * as React from "react";
import ImageDataEditor from "./components/ImageDataEditor.tsx";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline, Stack, Typography} from "@mui/material";

const theme = createTheme({
    colorSchemes: {light: false, dark: true}
});

function App() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Stack spacing={6}>
                <Typography variant="h4">Textured Animation Builder</Typography>
                <ImageDataEditor/>
            </Stack>
        </ThemeProvider>
    )
}

export default App
