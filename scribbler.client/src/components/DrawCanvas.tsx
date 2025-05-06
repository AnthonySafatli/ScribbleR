import { forwardRef, useEffect } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef, CanvasPath } from "react-sketch-canvas";

interface Props {
    colour?: string,
    paths?: CanvasPath[] | null,
    height?: string,
    width?: string,
    onChange?: () => void,
    isDrawable?: boolean,
}

const DrawCanvas = forwardRef<ReactSketchCanvasRef, Props>(({ colour = "black", paths = null, height = '200px', width, onChange, isDrawable = true }: Props, ref) => {

    useEffect(() => {
        if (ref && paths) {
            (ref as React.RefObject<ReactSketchCanvasRef>)?.current?.loadPaths(paths);
        }
    }, [paths, ref]);

    return (
        <ReactSketchCanvas
            ref={ref}
            strokeColor={colour}
            height={height}
            width={width}
            strokeWidth={4}
            withTimestamp={true}
            allowOnlyPointerType={isDrawable ? "all" : "none"}
            onChange={onChange}
        />
    );
});

export default DrawCanvas;
