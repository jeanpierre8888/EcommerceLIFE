import 'bootstrap/dist/css/bootstrap.css';
import React, { useContext, useEffect, useState } from "react";
import { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
//Translations
import "./components/Translation/i18nextConf";

//
import InitialPage from '../src/components/PublicRoutes/InitialPage';



// MSAL imports
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./components/Loggin/authConfig";
import { MsalProvider } from "@azure/msal-react";

const msalInstance = new PublicClientApplication(msalConfig);

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);





root.render(


    <MsalProvider instance={msalInstance}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </MsalProvider>



);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
