import React from 'react';


import './custom.css';
import LoginState from "./components/Loggin/login/LoginState";
import { AuthenticatedTemplate } from "@azure/msal-react";
import TranslationState from "./components/Translation/translation/TranslationState";
import AppContent from "./AppContent";
import RolesState from "./components/Roles/RolesContext/RolesState";
import PersonalInformationState from "./components/PersonalInformationContext/PersonalInformationState";
import ProductState from "./components/Products/ProductContext/ProductState";
import CustomerState from "../src/components/Customer/CustomerContext/CustomerState";
import SalesState from "./components/Sales/SalesContext/SalesState";








const App = () => {
    return (
        <>
            <LoginState>
                <AuthenticatedTemplate>
                    <TranslationState>
                        <RolesState>
                            <PersonalInformationState>
                                <CustomerState>
                                    <SalesState>
                                        <ProductState>
                                            <br />
                                            <br />
                                            <br />
                                            <AppContent />
                                        </ProductState>
                                    </SalesState>
                                </CustomerState>
                            </PersonalInformationState>
                        </RolesState>
                    </TranslationState>
                </AuthenticatedTemplate>
            </LoginState>
        </>

    );
};

export default App;


