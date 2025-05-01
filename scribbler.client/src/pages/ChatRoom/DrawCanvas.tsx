import { forwardRef, useEffect } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef, CanvasPath } from "react-sketch-canvas";

interface Props {
    paths?: CanvasPath[] | null;
}

const DrawCanvas = forwardRef<ReactSketchCanvasRef, Props>(({ paths = null }, ref) => {

    useEffect(() => {
        if (ref && paths) {
            (ref as React.RefObject<ReactSketchCanvasRef>)?.current?.loadPaths(paths);
        }
    }, [paths, ref]);

    return (
        <ReactSketchCanvas
            ref={ref}
            height="200px"
            strokeWidth={4}
            strokeColor="black"
            withTimestamp={true}
            allowOnlyPointerType={paths ? "none" : "all"}
        />
    );
});

export default DrawCanvas;
