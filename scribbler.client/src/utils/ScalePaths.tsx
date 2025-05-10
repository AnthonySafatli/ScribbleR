import { CanvasPath } from "react-sketch-canvas";

function NormalizePaths(paths: CanvasPath[] | undefined, height: number, width: number): CanvasPath[] | undefined {
    if (!paths) 
        return paths

    return paths.map((path) => {
        const normalizedPath = {
            ...path,
            paths: path.paths.map((point) => ({
                x: point.x / width,
                y: point.y / height
            }))
        };

        return normalizedPath;
    });
}

function UnnormalizePaths(paths: CanvasPath[], height: number, width: number): CanvasPath[] {
    if (!paths)
        return paths

    return paths.map((path) => {
        const normalizedPath = {
            ...path,
            paths: path.paths.map((point) => ({
                x: point.x * width,
                y: point.y * height
            }))
        };

        return normalizedPath;
    });
}

export { NormalizePaths, UnnormalizePaths };