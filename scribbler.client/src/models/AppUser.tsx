
import { CanvasPath } from "react-sketch-canvas";

export interface AppUser {
    id: string,
    email: string,
    userHandle: string,
    displayName: string | null,
    aboutMe: string | null,
    profilePicture: CanvasPath[] | null,
}

export interface AuthContextData {
    user: AppUser | null,
    loading: boolean,
    setUser: (user: AppUser | null) => void
}