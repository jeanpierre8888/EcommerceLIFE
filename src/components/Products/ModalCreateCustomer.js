import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMsal } from "@azure/msal-react";
import { CssTextField, BoxCss, RowModal } from "./style";
import { Container, Col, Row } from "reactstrap";
import Typography from '@mui/material/Typography';
import { LoginContext } from "../Loggin/login/LoginContext";
import Modal from '@mui/material/Modal';
import { Button, CssNativeSelect, OptionSelect } from '../GeneralInformation/UpdateInformation/style';
import { useNavigate } from 'react-router-dom';
import { CustomerContext } from "../Customer/CustomerContext/CustomerContext"
import {
    FormControl,
    InputLabel
} from "@mui/material";
import Box from '@mui/material/Box';









const ModalCreateCustomer = ({ open, setOpen }) => {
    const navigate = useNavigate();
    const { upLogoutRedirect } = useContext(LoginContext);
    const { getStatusEnrrolment } = useContext(CustomerContext);
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
    const [waitSaveInfoCustomer, setWaitSaveInfoCustomer] = useState(false);
    const [typeId, setTypeId] = useState(0);
    const createCustomerB2C = async (objCust) => {
        try {
            setWaitSaveInfoCustomer(true);
            const baseUrl = "";
            let localUrl = baseUrl + "/customerenrollment/createCustomerB2C";
            const response = await fetch(localUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(objCust),

            });            
            await getStatusEnrrolment();
            setWaitSaveInfoCustomer(true);
            goToPurchSummary();
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
        console.log(typeId);
        if (event.target.name === 'custAccount') {
            if (typeId === 0) {
                console.log(typeId);
                if (event.target.value.length <= 10) {
                    setObj((prevState) => ({
                        ...prevState,
                        [event.target.name]: event.target.value,
                    }));
                }
            } else if (typeId === 1) {
                if (event.target.value.length <= 13) {
                    setObj((prevState) => ({
                        ...prevState,
                        [event.target.name]: event.target.value,
                    }));
                }
            }
            else if (typeId === 2) {
                setObj((prevState) => ({
                    ...prevState,
                    [event.target.name]: event.target.value,
                }));
            }

        }
        else {
            setObj((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value,
            }));
        }


    }
    const changeType = (event) => {
        setTypeId(parseInt(event.target.value));
    }

    return (

        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflow: 'scroll', marginBlock: "10px" }}
        >
            <BoxCss>
                {/*<Button type="submit" onClick={() => handleLogOut()}*/}
                {/*    style={{ width: '140px', marginLeft: "75%", marginTop: '5px', backgroundColor: "white", color: "gray", fontSize: "1.8vh" }}>*/}
                {/*    <b>Cerrar Sesión</b>*/}
                {/*</Button>*/}
                <Container style={{ textAlign: 'center' }}>
                    <img
                        className="logoLifeFooter"
                        alt="logoLife"
                        src="/logo-life.png"
                    />
                </Container>
                {
                    !waitSaveInfoCustomer
                        ?
                        <>
                            <Typography id="modal-modal-title" variant="h6" component="h1" style={{ marginBottom: '40px', textAlign: 'center' }}>
                                Para continuar debes registrar los datos para tu factura
                            </Typography>

                            <RowModal>
                                <Col>
                                    <FormControl style={{ width: '100%' }}>
                                        <InputLabel variant="standard" style={{ textDecoration: 'none' }}>
                                            Tipo de Identificación
                                        </InputLabel>
                                        <CssNativeSelect
                                            id="workPublicSector"
                                            name="workPublicSector"
                                            onChange={(e) => changeType(e)}

                                        >
                                            <OptionSelect key={0} value={0} >
                                                CI
                                            </OptionSelect>
                                            <OptionSelect key={1} value={1} >
                                                RUC
                                            </OptionSelect>
                                            <OptionSelect key={2} value={2}>
                                                PASAPORTE
                                            </OptionSelect>
                                        </CssNativeSelect>
                                    </FormControl>
                                </Col>
                                <Col>
                                    <CssTextField
                                        required={true}
                                        style={{ width: "100%" }}
                                        type={"text"}
                                        fullWidth
                                        label="Identificación"
                                        id="custAccount"
                                        name="custAccount"
                                        value={obj.custAccount}
                                        onChange={(e) => setInfo(e)}
                                    />
                                </Col>
                            </RowModal>
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
                            </Col>
                            <RowModal>
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
                            </RowModal>

                        </>
                        :
                        <>
                            <Box style={{ textAlign:'center' }}>
                                <img visible={waitSaveInfoCustomer} style={{ width: '320px', height: 'auto' }} src="/waiting.svg" />
                                <br />
                            </Box>
                        </>
                }
            </BoxCss>
        </Modal>

    );
};

export default ModalCreateCustomer;
