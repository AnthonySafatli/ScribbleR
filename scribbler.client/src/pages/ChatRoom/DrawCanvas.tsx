import { ReactSketchCanvas } from "react-sketch-canvas";

function DrawCanvas() {
    return (
        <ReactSketchCanvas
            width="600"
            height="400"
            strokeWidth={4}
            strokeColor="black"
        />
    );
}

export default DrawCanvas;