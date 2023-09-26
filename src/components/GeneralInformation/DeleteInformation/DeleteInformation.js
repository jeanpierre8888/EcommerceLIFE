import React, { useContext, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Container, Col, Row } from "reactstrap";
import { RolesContext } from "../../Roles/RolesContext/RolesContext";
import { Root, Tittle, Content, Column, Field, FieldInfo } from "../DeleteInformation/style";
import { useTranslation } from "react-i18next";
import { useMsal } from "@azure/msal-react";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Button } from "../../GeneralInformation/UpdateInformation/style";
import { PersonalInformationContext } from "../../PersonalInformationContext/PersonalInformationContext";




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    paddingInline: '80px'
};

const DeleteInformation = () => {
    const { allRoles } = useContext(RolesContext);
    const { accounts } = useMsal();
    const { t } = useTranslation();
    const { personalInfo, getPersonalInformation, specialities, deletePersonalData } = useContext(PersonalInformationContext);
    const [nameSpeciality, setnameSpeciality] = useState();
    const [nameSpeciality2, setnameSpeciality2] = useState();




    const [checkedTermCond, setCheckedTermCond] = useState(false);
    const [checkedPolitics, setCheckedPolitics] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(false);
    const handleClose = () => setOpen(false);


    const deleteInfo = () => {
        deletePersonalData(personalInfo);
        handleClose();
    }

    useEffect(() => {
        //if (personalInfo.primarySpeciality != null) {
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

    }, []);



    return (
        <>

            <Root>
                {/* <Tittle>Mi Informaci&oacute;n </Tittle> */}
                <Tittle>Eliminar Información</Tittle>
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
                        <FieldInfo>
                            {
                                personalInfo.gender == 0
                                    ?
                                    "N/A"
                                    :
                                    personalInfo.gender == 1
                                        ?
                                        "MASCULINO"
                                        :
                                        "FEMENINO"
                            }
                        </FieldInfo>
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
                        <FieldInfo>{personalInfo.workPublicSector == 0 ? 'SI' : 'NO'}</FieldInfo>
                        {/*<Field>ESPECIALIDAD 2</Field>*/}
                        {/*<FieldInfo>{nameSpeciality2}</FieldInfo>*/}
                    </Column>
                </Content>


                
                <br />
               
                


                <Button onClick={()=>setOpen(true)}>
                    Eliminar Información 
                </Button>

                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Container style={{ textAlign: 'center' }}>
                            <img
                                className="logoLifeFooter"
                                alt="logoLife"
                                src="/logo-life.png"
                            />
                            <Typography id="modal-modal-title" variant="h6" component="h1" style={{ marginBottom: '40px' }}>
                                Está seguro de eliminar toda su información?
                            </Typography>
                        </Container>  
                        <Row>
                            <Button onClick={() => deleteInfo()}>
                                ACEPTAR
                            </Button>
                            <Button onClick={() => setOpen(false)}>
                                CANCELAR
                            </Button>
                        </Row>
                    </Box>
                </Modal>

                <br />
                <br />
                <br />
                <br />
            </Root>



        </>
    );
};

export default DeleteInformation;
