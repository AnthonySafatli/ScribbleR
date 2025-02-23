
export interface AppUser {
    email: string,
    displayName: string | null,
    aboutMe: string | null,
    createdAt: Date,
    updatedAt: Date,
    isSetup: boolean,
}

export async function PingAuth(): Promise<AppUser | null>{
    return fetch("/pingauth", {
        method: "GET",
    }).then((res) => {
        if (res.status == 200)
            return res.json();
    }).then((data) => {
        if (data) {
            return data as AppUser;
        }

        return null
    }).catch(e => {
        console.error(e);
        return null;
    })
}