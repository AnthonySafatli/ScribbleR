import { forwardRef, useEffect, useId, useRef } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef, CanvasPath } from "react-sketch-canvas";
import { UnnormalizePaths } from "../utils/ScalePaths";

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

    const id = useId();

    const actualWidth = useRef<number>(width ?? height * 2)

    useEffect(() => {
        if (ref && paths) {
            (ref as React.RefObject<ReactSketchCanvasRef>)?.current?.clearCanvas();
            (ref as React.RefObject<ReactSketchCanvasRef>)?.current?.loadPaths(UnnormalizePaths(paths, height, actualWidth?.current));
        }
    }, [paths, ref, width, height]);

    return (
        <div style={{ position: "relative", minWidth: actualWidth.current + 'px', minHeight: height + 'px' }}>
            <ReactSketchCanvas
                ref={ref}
                strokeColor={colour}
                height={height + "px"}
                width={actualWidth.current + "px"}
                strokeWidth={size}
                eraserWidth={size}
                withTimestamp={true}
                id={id}
                allowOnlyPointerType={isDrawable ? "all" : "none"}
                onChange={onChange}
                style={{ touchAction: isDrawable ? "none" : "auto" }}
                className="border border-dark"
            />
            {!isDrawable && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 10,
                        backgroundColor: "transparent",
                        touchAction: "auto", 
                        pointerEvents: "auto",
                    }}
                />
            )}
        </div>
    );

});

export default DrawCanvas;
