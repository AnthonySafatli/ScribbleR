import { CanvasPath } from "react-sketch-canvas";

export interface Message {
    displayName: string | null,
    userId: string,
    paths: CanvasPath[] | null,
    message: string | null,
    isSystem: boolean,
    isJoin: boolean,
    datetime: Date
}