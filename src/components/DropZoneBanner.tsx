import "./DropZoneBanner.css"
import * as React from "react";

const DropZoneBanner = ({onClick, onDrop}: {
    onClick: () => void,
    onDrop: (files: FileList) => void
}) => {
    const handleDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
        ev.stopPropagation();
        ev.dataTransfer.dropEffect = "copy";
    };

    const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
        ev.stopPropagation();
        onDrop(ev.dataTransfer.files);
    };

    return (
        <div
            className={"banner"}
            onClick={onClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <span className={"banner_text"}>Click to Add files Or</span>
            <span className={"banner_text"}>Drag and Drop files here</span>
        </div>
    )

}

export default DropZoneBanner;