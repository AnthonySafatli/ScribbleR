import { forwardRef, useEffect } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef, CanvasPath } from "react-sketch-canvas";

interface Props {
    colour?: string,
    size?: number,
    paths?: CanvasPath[] | null,
    height?: number,
    width?: number,
    onChange?: () => void,
    isDrawable?: boolean,
}

const DrawCanvas = forwardRef<ReactSketchCanvasRef, Props>(({ colour = "black", size = 4, paths = null, height = 200, width, onChange, isDrawable = true }: Props, ref) => {

    useEffect(() => {
        if (ref && paths) {
            (ref as React.RefObject<ReactSketchCanvasRef>)?.current?.loadPaths(paths);
        }
    }, [paths, ref]);

    return (
        <ReactSketchCanvas
            ref={ref}
            strokeColor={colour}
            height={height + "px"}
            width={width ? width + "px" : (height * 2) + "px"}
            strokeWidth={size}
            eraserWidth={size}
            withTimestamp={true}
            allowOnlyPointerType={isDrawable ? "all" : "none"}
            onChange={onChange}
        />
    );
});

export default DrawCanvas;
