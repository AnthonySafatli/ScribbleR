import { forwardRef, useEffect } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef, CanvasPath } from "react-sketch-canvas";

interface Props {
    paths?: CanvasPath[] | null,
    height?: string,
    width?: string,
    onChange?: () => void,
    isDrawable?: boolean,
}

const DrawCanvas = forwardRef<ReactSketchCanvasRef, Props>(({ paths = null, height = '200px', width, onChange, isDrawable = true }: Props, ref) => {

    useEffect(() => {
        if (ref && paths) {
            (ref as React.RefObject<ReactSketchCanvasRef>)?.current?.loadPaths(paths);
        }
    }, [paths, ref]);

    return (
        <ReactSketchCanvas
            ref={ref}
            height={height}
            width={width}
            strokeWidth={4}
            strokeColor="black"
            withTimestamp={true}
            allowOnlyPointerType={isDrawable ? "all" : "none"}
            onChange={onChange}
        />
    );
});

export default DrawCanvas;
