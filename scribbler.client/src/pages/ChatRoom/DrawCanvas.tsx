import { forwardRef } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

const DrawCanvas = forwardRef<ReactSketchCanvasRef>((_, ref) => (
    <ReactSketchCanvas
        ref={ref}
        height="200px"
        strokeWidth={4}
        strokeColor="black"
    />
));


export default DrawCanvas;