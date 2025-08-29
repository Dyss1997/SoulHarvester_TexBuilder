import "./DropZoneBanner.css"
const DropZoneBanner = ({onClick, onDrop}) => {
    const handleDragOver = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        ev.dataTransfer.dropEffect = "copy";
    };

    const handleDrop = (ev) => {
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