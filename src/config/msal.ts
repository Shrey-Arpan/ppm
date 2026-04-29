const CLIENT_ID = import.meta.env.VITE_MSAL_CLIENT_ID;
const TENANT_ID = import.meta.env.VITE_MSAL_TENANT_ID;
const REDIRECT_URI = import.meta.env.VITE_MSAL_REDIRECT_URI;

export const msalConfig = {
    auth: {
        clientId: CLIENT_ID,
        authority: `https://login.microsoftonline.com/${TENANT_ID}`,
        redirectUri: REDIRECT_URI,
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    }
};

export const loginRequest = {
    scopes: ["openid", "profile", "email", "offline_access", "User.Read"],
};