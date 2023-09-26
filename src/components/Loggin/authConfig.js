export const msalConfig = {
    auth: {
        clientId: "626a0f85-416a-467a-906a-e12303818919",
        authority:
            "https://lifejuntoati.b2clogin.com/lifejuntoati.onmicrosoft.com/B2C_1_signInsignUpECM",
        knownAuthorities: ["lifejuntoati.b2clogin.com"],
        //redirecturi: "https://b2bstore.life.com.ec/",
        //postlogoutredirecturi: "https://b2bstore.life.com.ec/",
        redirecturi: "https://localhost:44458/",
        postlogoutredirecturi: "https://localhost:44458/",
        //redirectUri: "https://lisvdsewe.life.com.ec:4460/",
        //postLogoutRedirectUri: "https://lisvdsewe.life.com.ec:4460/",
    },
};

export const loginRequest = {
    scopes: [
        "https://lifejuntoati.onmicrosoft.com/api/user/ecommerce.read",
    ],
};
