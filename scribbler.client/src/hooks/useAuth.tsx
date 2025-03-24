import { useEffect, useState } from "react";

import { AppUser } from "../models/AppUser";

const useAuth = () => {
    const [user, setUser] = useState<null | AppUser>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/auth/pingauth", {
                    method: "GET"
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }

                const data = (await response.json()) as AppUser;
                setUser(data);
            } catch (error: unknown) {
                console.error(error)
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, setUser };
};

export default useAuth;
