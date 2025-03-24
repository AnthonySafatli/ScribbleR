
export interface AppUser {
    id: string,
    email: string,
    displayName: string | null,
    aboutMe: string | null,
    createdAt: Date,
    updatedAt: Date,
    isSetup: boolean,
}

export interface AuthContextData {
    user: AppUser | null,
    loading: boolean,
    setUser: (user: AppUser | null) => void
}