import Cookies from "js-cookie";

export const cookieManager = {
    setToken: (token: string, expires: number = 1) => {
        Cookies.set("accessToken", token, {
            expires,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
    },

    getToken: () => {
        return Cookies.get("accessToken");
    },

    removeToken: () => {
        Cookies.remove("accessToken");
    },
};
