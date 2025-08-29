import * as React from "react";
import DropZoneBanner from "./DropZoneBanner.tsx";

const DropZone = ({ onChange, accept = ["*"] }) => {
    const inputRef = React.useRef(null);

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleChange = (ev) => {
        onChange(ev.target.files);
    };

    const handleDrop = (files) => {
        onChange(files);
    };

    return (
        <div className={"wrapper"}>
            <DropZoneBanner onClick={handleClick} onDrop={handleDrop} />
            <input
                hidden
                type="file"
                aria-label="add files"
                className={"input"}
                ref={inputRef}
                multiple="multiple"
                onChange={handleChange}
                accept={accept.join(",")}
            />
        </div>
    );
};

export { DropZone };