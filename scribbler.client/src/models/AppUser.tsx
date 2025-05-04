
import { CanvasPath } from "react-sketch-canvas";

export interface AppUser {
    id: string,
    email: string,
    username: string,
    displayName: string | null,
    aboutMe: string | null,
    isSetup: boolean,
    profilePicture: CanvasPath[] | null,
}

export interface AuthContextData {
    user: AppUser | null,
    loading: boolean,
    setUser: (user: AppUser | null) => void
}