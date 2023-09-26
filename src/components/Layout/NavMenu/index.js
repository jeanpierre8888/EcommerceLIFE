import React, { useContext, useEffect, useState } from "react";
import { Collapse, Navbar, NavbarToggler, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./NavMenu.css";
import { LoginContext } from "../../Loggin/login/LoginContext";
//import { ContactContext } from "../../context/contact/ContactContext";
import LanguageSelect from "../../Translation/languageSelect";
import { useTranslation } from "react-i18next";
import stylesCss, { CSSMenuItem, CssNativeSelect1, OptionNav } from "./style";
//import NavMenuLife from "../NavMenuLife";

const NavMenu = () => {
    const Classes = stylesCss;
    const { upLogoutRedirect } = useContext(LoginContext);
    let navigate = useNavigate();
    const { t } = useTranslation();

    const isActivePrimary = true;
    const isActiveSecondary = false;
    const vendorInformation = []

    const [collapsedNav2, setCollapsedNav2] = useState(true);
    const updateCollapsedNav2 = () => setCollapsedNav2(!collapsedNav2);
    const handleLogOut = () => {
        upLogoutRedirect();
    };

    useEffect(() => {

    }, []);

    return (
        <div
            style={{
                zIndex: 2,
                position: "fixed",
                backgroundColor: "white",
                width: "100%",
                top: 0,
            }}
        >
            <img style={{ float: 'left', width: '7%', height: 'auto', margin: '5px' }}
                className="logoLifeFooter"
                alt="logoLife"
                src="/logo-life-solo.png"
            />
            {/*<NavMenuLife />*/}
            <Navbar
                id="navPortal"
                className="navbar-expand-lg navbar-toggleable-lg ng-white border-bottom"
                light
            >
                <NavbarToggler onClick={updateCollapsedNav2} className="mr-4" />
                <Collapse
                    className="d-lg-inline-flex flex-lg-row-reverse cssNav"
                    isOpen={!collapsedNav2}
                    navbar
                >




                    <ul className="navbar-nav flex-grow">
                        <OptionNav>
                            <a onClick={() => navigate("/Products")} style={{ textDecoration: "none", color: "#212121", cursor:"pointer" }}>
                                Comprar
                            </a>
                        </OptionNav>
                        <CssNativeSelect1 value={1} sx={Classes.CssSelect}>
                            <CSSMenuItem value={1} style={{ display: "none" }}>
                                {t("informationManagement")}
                            </CSSMenuItem>
                            <CSSMenuItem
                                onClick={() => navigate("/updateInfo")}
                            >
                                {t("updtInfo")}
                            </CSSMenuItem>
                            <CSSMenuItem
                                onClick={() => navigate("/repPersonalInfo")}
                            >
                                {t("repInfo")}
                            </CSSMenuItem>
                            <CSSMenuItem
                                onClick={() => navigate("/deleteInfo")}
                            >
                                Eliminar Informaci&oacute;n de la Cuenta
                            </CSSMenuItem>
                        </CssNativeSelect1>
                        <CssNativeSelect1 value={1} sx={Classes.CssSelect}>
                            <CSSMenuItem value={1} style={{ display: "none" }}>
                                {t("account")}
                            </CSSMenuItem>
                            {(isActivePrimary || isActiveSecondary) && (
                                <CSSMenuItem onClick={() => navigate("/generalInfo")}>
                                    {t("myProfile")}
                                </CSSMenuItem>
                            )}
                            <CSSMenuItem onClick={() => handleLogOut()}>
                                {t("logout")}
                            </CSSMenuItem>
                        </CssNativeSelect1>
                        <LanguageSelect />
                    </ul>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default NavMenu;
