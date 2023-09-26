﻿import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMsal } from "@azure/msal-react";
import {  CssTextField, BoxCss } from "./style";
import { Container, Col, Row } from "reactstrap";
import Typography from '@mui/material/Typography';
import { LoginContext } from "../Loggin/login/LoginContext";
import Modal from '@mui/material/Modal';
import { Button } from '../GeneralInformation/UpdateInformation/style';
import { useNavigate } from 'react-router-dom';






const ProductOnly = ({ open, setOpen }) => {
    const navigate = useNavigate();
    const { upLogoutRedirect } = useContext(LoginContext);
    const handleLogOut = () => {
        upLogoutRedirect();
    };
    const { accounts } = useMsal();
    const [obj, setObj] = useState(
        {            
            id: "",
            lIActiveDirectoryGuid: accounts[0].localAccountId,
            custAccount: "",
            name: accounts[0].idTokenClaims.given_name,
            lastName: accounts[0].idTokenClaims.family_name,
            email: accounts[0].username,
            phoneNumber: ""
        }
    );
    const createCustomerB2C = async (objCust) => {
        try {
            goToPurchSummary();
            const baseUrl = "";
            let localUrl = baseUrl + "/customerenrollment/createCustomerB2C";
            const response = await fetch(localUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(objCust),

            });

        }
        catch (e) {
            console.log(e)
        }

    }
    const goToPurchSummary = async () => {
        setOpen(false);
        navigate('/shopCar');
    }
    const setInfo = (event) => {
        setObj((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }    
    return (

        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflow: 'scroll', marginBlock: "50px" }}
        >
            <BoxCss>
                <Button type="submit" onClick={() => handleLogOut()}
                    style={{ width: '140px', marginLeft: "75%", marginTop: '5px', backgroundColor: "white", color: "gray", fontSize: "1.8vh" }}>
                    <b>Cerrar Sesión</b>
                </Button>
                <Container style={{ textAlign: 'center' }}>
                    <img
                        className="logoLifeFooter"
                        alt="logoLife"
                        src="/logo-life.png"
                    />
                    <br /><br />
                    <Typography id="modal-modal-title" variant="h6" component="h1" style={{ marginBottom: '40px' }}>
                        Para continuar debes registrar los datos para tu factura
                    </Typography>
                </Container>
                <Col>
                    <CssTextField
                        required={true}
                        style={{ width: "100%" }}
                        type={"text"}
                        fullWidth
                        label="Nombres"
                        value={obj.name}
                        id="name"
                        name="name"
                        onChange={(e) => setInfo(e)}
                    />
                    <br /><br />
                    <CssTextField
                        required={true}
                        style={{ width: "100%" }}
                        type={"text"}
                        fullWidth
                        label="Apellidos"
                        id="lastName"
                        name="lastName"
                        value={obj.lastName}
                        onChange={(e) => setInfo(e)}
                    />
                    <br /><br />
                    <CssTextField
                        required={true}
                        style={{ width: "100%" }}
                        type={"text"}
                        fullWidth
                        label="Email"
                        id="email"
                        name="email"
                        value={obj.email}
                        onChange={(e) => setInfo(e)}
                    />
                    <br /><br />
                    <CssTextField
                        required={true}
                        style={{ width: "100%" }}
                        type={"text"}
                        fullWidth
                        label="Número de Teléfono"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={obj.phoneNumber}
                        onChange={(e) => setInfo(e)}
                    />
                    <br /><br />
                    <CssTextField
                        required={true}
                        style={{ width: "100%" }}
                        type={"text"}
                        fullWidth
                        label="Número de Identificación "
                        id="custAccount"
                        name="custAccount"
                        value={obj.custAccount}
                        onChange={(e) => setInfo(e)}
                    />

                </Col>
                <Row>
                    <Col>
                        {
                            obj.custAccount === "" || obj.email === "" || obj.name === "" || obj.lastName === "" || obj.phoneNumber === ""
                                ?
                                <Button type="submit" disabled={true} style={{ backgroundColor: 'gray', color: "white" }}>
                                    Guardar
                                </Button>
                                :
                                <Button type="submit" onClick={() => createCustomerB2C(obj)}>
                                    Guardar
                                </Button>
                        }

                    </Col>
                    <Col>
                        <Button type="submit" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                    </Col>
                </Row>




            </BoxCss>
        </Modal>

    );
};

export default ProductOnly;
