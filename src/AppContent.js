import React, { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/LayoutFooter";
import NavMenu from "./components/Layout/NavMenu";
import Wait from "./components/Wait";

import { RolesContext } from "./components/Roles/RolesContext/RolesContext";
import { PersonalInformationContext } from "./components/PersonalInformationContext/PersonalInformationContext";
import { CustomerContext } from "./components/Customer/CustomerContext/CustomerContext"

import GeneralInformation from "./components/GeneralInformation/GeneralInformation";


import ValidateRolesRoutes from "./components/Roles/ValidateRolesRoutes";
import { useMsal } from "@azure/msal-react";
import { ComponentsImports } from "./components/GlobalConfig/ComponentsImports";




const AppContent = () => {
    const [isLoading, setLoading] = useState(true);
    const { listObjetsInterface, getComponentsRoles, getUserRoles } = useContext(RolesContext);
    const { getPersonalInformation, getSpecielites, getDoc } = useContext(PersonalInformationContext);
    const { getStatusEnrrolment } = useContext(CustomerContext);

    const { accounts } = useMsal();

    useEffect(() => {
        const fetchData2 = async () => {
            await Promise.all([getPersonalInformation(), getSpecielites(), getDoc(), getUserRoles(accounts[0].localAccountId)], getComponentsRoles(), getStatusEnrrolment());
            setLoading(false);
        };

        fetchData2();
    }, []);
    return (
        <>
            {isLoading ? (
                <Wait />
            ) : (
                <>
                    <NavMenu />
                    <Routes>
                        <Route path="/generalInfo" element={<GeneralInformation />} />
                        {
                            listObjetsInterface?.map(
                                (obj, index) =>
                                (
                                    <Route key={index} element={<ValidateRolesRoutes allowedRoles={obj.allowedRoles} />}>
                                        <Route path={obj.path} element={ComponentsImports(obj.component)} />
                                    </Route>
                                )
                            )
                        }
                    </Routes>
                    <br />
                    <br />
                    <br />
                    <Footer />
                    <br />
                </>
            )}
        </>
    );
};

export default AppContent;
