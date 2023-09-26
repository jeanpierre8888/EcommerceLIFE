import React, { useContext, useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Container, Col, Row } from "reactstrap";
import { RolesContext } from "../../components/Roles/RolesContext/RolesContext";
import { Root, Tittle, Content, Column, Field, FieldInfo, BoxCss, TxtTitle } from "./style";
import { useTranslation } from "react-i18next";
import { useMsal } from "@azure/msal-react";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Button } from '../GeneralInformation/UpdateInformation/style';
import { PersonalInformationContext } from './../PersonalInformationContext/PersonalInformationContext';
import { Page, Document } from 'react-pdf';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from "@mui/material/Stack";
import { LoginContext } from "../Loggin/login/LoginContext";




const GeneralInformation = () => {
    const { allRoles } = useContext(RolesContext);
    const { accounts } = useMsal();
    const { t } = useTranslation();
    const { personalInfo, document, specialities, updatePolicyApprovalStatus, getPersonalInformation } = useContext(PersonalInformationContext);
    const [nameSpeciality, setnameSpeciality] = useState();
    const [nameSpeciality2, setnameSpeciality2] = useState();
    const { upLogoutRedirect } = useContext(LoginContext);
    const handleLogOut = () => {
        upLogoutRedirect();
    };

    const [personalInfoLocal, setPersonalInfoLocal] = useState(personalInfo);
    const [nameComplete, setNameComplete] = useState(personalInfo.name);

    const pdf = document.textDocument;
    const nameRespPersonalData = document.nameRespPersonalData;
    const positionInCompany = document.positionInCompany;



    const [checkedTermCond, setCheckedTermCond] = useState(personalInfoLocal.acceptedAgreements == 0 || personalInfoLocal.acceptedAgreements == 2 ? false : true);
    const [checkedPolitics, setCheckedPolitics] = useState(personalInfoLocal.acceptedAgreements == 0 || personalInfoLocal.acceptedAgreements == 2 ? false : true);

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleChangeCheckedTermCond = () => setCheckedTermCond(personalInfoLocal.acceptedAgreements == 0 || personalInfoLocal.acceptedAgreements == 2 ? false : true);
    const handleChangeCheckedPolitics = () => setCheckedPolitics(personalInfoLocal.acceptedAgreements == 0 || personalInfoLocal.acceptedAgreements == 2 ? false : true);

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            setCheckedPolitics(true);
            setCheckedTermCond(true);
        }
        else {
            setCheckedPolitics(false);
            setCheckedTermCond(false);
        }
    }
    const setInfo = (event) => {
        console.log(event);
        if (event.target.value == true) {
            console.log("entra");
            setPersonalInfoLocal((prevState) => ({
                ...prevState,
                [event.target.name]: 2,
            }));
        }
        else {
            setPersonalInfoLocal((prevState) => ({
                ...prevState,
                [event.target.name]: 0,
            }));
        }       
    }

    const changeStatusPolitics = async () => {
        await setCheckedPolitics(!checkedPolitics);     
    }

    const aprobarAcuerdos = () => {
        var val = personalInfoLocal.acceptedAgreements;
        if (checkedPolitics == true) {
            val = 1
            //console.log("POLITICAS " + 1);
        }
        setPersonalInfoLocal((prevState) => ({
            ...prevState,
            acceptedAgreements: 1,
        }));
        
        updatePolicyApprovalStatus(personalInfoLocal);
        setOpen(false);
    }


    useEffect(() => {
        setCheckedPolitics(personalInfoLocal.acceptedAgreements == 0 || personalInfoLocal.acceptedAgreements == 2 ? false : true);
        setOpen(personalInfoLocal.acceptedAgreements == 0 || personalInfoLocal.acceptedAgreements == 2 ? true : false);       

        //if (personalInfo.primarySpeciality != null && specialities.length>0) {
        //    setnameSpeciality(specialities.find(element => element.li_medicalspecialitiesid == personalInfo.primarySpeciality).li_name);
        //}
        //else {
        //    setnameSpeciality(specialities.find(element => element.li_medicalspecialitiesid == "0ffc1074-ec05-ec11-b815-00155d10b71a").li_name);

        //}
        
        //if (personalInfo.secondarySpeciality != "") {
        //    setnameSpeciality2(specialities.find(element => element.li_medicalspecialitiesid == personalInfo.secondarySpeciality).li_name);
        //} else {
        //    setnameSpeciality2(specialities.find(element => element.li_medicalspecialitiesid == "0ffc1074-ec05-ec11-b815-00155d10b71a").li_name);
        //}
        

        if (personalInfo.lastName === null) {
            setNameComplete(personalInfo.name);
            
        }
        else {
            setNameComplete(personalInfo.name + " " + personalInfo.lastName);
            
        }

        

       

    }, []);



    return (
        <>
            {
                personalInfo != null
                    ?
                    <Root>
                        {/* <Tittle>Mi Informaci&oacute;n </Tittle> */}
                        <Tittle>{t("myInformation")}</Tittle>
                        <br />

                        <br />
                        <Content>
                            <Column>
                                <Field>{t("name")}</Field>
                                <FieldInfo>
                                    {personalInfo.name}
                                </FieldInfo>
                                <Field>{t("email")}</Field>
                                <FieldInfo>{personalInfo.email}</FieldInfo>
                                <Field>TELÉFONO</Field>
                                <FieldInfo>{personalInfo.telephone}</FieldInfo>
                                <Field>GÉNERO</Field>
                                <FieldInfo>{personalInfo.gender == 0
                                    ?
                                    "N/A"
                                    :
                                    personalInfo.gender == 1
                                        ?
                                        "MASCULINO"
                                        :
                                        "FEMENINO"
                                } </FieldInfo>
                                {/*<Field>ESPECIALIDAD 1</Field>*/}
                                {/*<FieldInfo>{nameSpeciality}</FieldInfo>*/}
                            </Column>
                            <Column>
                                <Field>APELLIDO</Field>
                                <FieldInfo>{personalInfo.lastName}</FieldInfo>
                                <Field>{t("identification")}</Field>
                                <FieldInfo>{personalInfo.accountNum.substring(0, 10)}</FieldInfo>
                                <Field>FECHA DE CUMPLEAÑOS</Field>
                                <FieldInfo>{new Date(personalInfo.birthDate).toISOString().slice(0, 10).toString()}</FieldInfo>
                                <Field>TRABAJA EN EL SECTOR PÚBLICO</Field>
                                <FieldInfo>{personalInfo.workPublicSector == 0 ? 'SI' : personalInfo.workPublicSector==2?'N/A': 'NO'}</FieldInfo>
                                {/*<Field>ESPECIALIDAD 2</Field>*/}
                                {/*<FieldInfo>{nameSpeciality2}</FieldInfo>*/}
                            </Column>
                        </Content>


                        
                        <br />
                        <br />
                        <br />
                        {/*<FormControlLabel control={<Checkbox />} label={<div>{t("accept")} <a href="https://www.life.com.ec/wp-content/uploads/2022/06/Privacy-Policy.pdfr" target="_blank">{t("termsCond")}</a></div>} />*/}

                        <br />
                        <br />

                        <br />
                        <Modal
                            open={open}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <BoxCss>
                                <Button type="submit" onClick={() => handleLogOut()}
                                    style={{ width: '140px', marginLeft: "75%", marginTop: '5px', backgroundColor: "white", color: "gray",fontSize:"1.8vh" }}>
                                    <b>Cerrar Sesión</b>
                                </Button>
                                <Container style={{ textAlign: 'center' }}>
                                    <img
                                        className="logoLifeFooter"
                                        alt="logoLife"
                                        src="/logo-life.png"
                                    />
                                    <Typography id="modal-modal-title" variant="h6" component="h1" style={{ marginBottom: '40px' }}>
                                        Privacidad de Datos Personales
                                    </Typography>                                  
                                </Container>
                                <Row>
                                    <Col xs={1} style={{ paddingBlock: '20px' }}>
                                        <FormGroup >
                                            <FormControlLabel control={
                                                <Switch
                                                    checked={checkedPolitics}
                                                    name="acceptedAgreements"
                                                    onChange={() => changeStatusPolitics()}
                                                />}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'span'}>
                                            <TxtTitle>He leído y acepto <a href={document.urldocument} target="_blank">La política de privacidad de datos personales</a>.</TxtTitle>
                                        </Typography>
                                    </Col>

                                </Row>
                                <Row>
                                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography sx={{ width: '100%', flexShrink: 0 }}>
                                                LEER POLÍTICA DE PRIVACIDAD
                                            </Typography>

                                        </AccordionSummary>
                                        <AccordionDetails >
                                            <Stack direction="column" sx={{ height: "300px", overflowY: "scroll" }} spacing={0.2} alignItems="left" onScroll={handleScroll}>
                                                <Typography style={{ textAlign: 'center', paddingInline: '30px', fontWeight: 'bold', marginBlock: '10px' }}>
                                                    {document.documentTit}
                                                </Typography>
                                                <Typography style={{ textAlign: 'justify', paddingInline: '30px' }}>
                                                    <div dangerouslySetInnerHTML={{ __html: pdf.replaceAll('\n', '<br/>').replaceAll('{0}', new Date().toISOString().slice(0, 10).toString()).replaceAll('{1}', nameComplete).replaceAll('{2}', personalInfo.accountNum).replaceAll('{3}', nameRespPersonalData).replaceAll('{4}', positionInCompany) }} ></div>
                                                </Typography>
                                            </Stack>
                                        </AccordionDetails>
                                    </Accordion>



                                </Row>


                                <Row>





                                    {
                                        checkedPolitics
                                            ?
                                            <Button type="submit" onClick={() => aprobarAcuerdos()}>
                                                <b>ACEPTAR</b>
                                            </Button>
                                            :
                                            <Button type="submit" onClick={() => handleClose()} disabled={true} style={{ backgroundColor: 'gray' }}>
                                                <b style={{ color: "white" }}>ACEPTAR</b>
                                            </Button>
                                    }


                                </Row>



                            </BoxCss>
                        </Modal>
                        <br />
                        <br />
                        <br />
                        <br />
                    </Root >
                    :
                    <Root>
                        No se pudo cargar la información
                    </Root>

            }




        </>
    );
};

export default GeneralInformation;
