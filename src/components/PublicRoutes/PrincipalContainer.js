import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../../App';
import InitialPage from '../PublicRoutes/PrincipalContainer';
import { Button } from "../GeneralInformation/UpdateInformation/style";
import { InitialLoginContext } from "./StateInitialLoggin/InitialLoginContext";



// MSAL imports
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../Loggin/authConfig";
import { MsalProvider } from "@azure/msal-react";
const msalInstance = new PublicClientApplication(msalConfig);



const PrincipalContainer = () => {

    const { loginState, SetloginState } = useContext(InitialLoginContext);
    
    return (
        <div>
            

            
            {/*{*/}
            {/*    loginState*/}
            {/*        ?*/}
            {/*        <MsalProvider instance={msalInstance}>*/}
            {/*            <App />*/}
            {/*        </MsalProvider>*/}
            {/*        :*/}
            {/*        <>*/}
            {/*            HOLAAA*/}
            {/*            <Button onClick={() => SetloginState()}>*/}
            {/*                Ingresar*/}
            {/*            </Button>*/}
            {/*        </>*/}
            {/*}*/}
        </div>
    );
};

export default PrincipalContainer;
