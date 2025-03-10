
export interface AppUser {
    id: string,
    email: string,
    displayName: string | null,
    aboutMe: string | null,
    createdAt: Date,
    updatedAt: Date,
    isSetup: boolean,
}

export async function PingAuth(): Promise<AppUser | null>{

    try {

        const res = await fetch("/api/auth/pingauth", {
            method: "GET",
        });

        if (res.status == 200) {
            const data = await res.json()
            return data as AppUser;
        } 

        throw new Error("An unexpected error occured!");

    } catch (error: unknown) {
        console.log(error)
        return null;
    }
}