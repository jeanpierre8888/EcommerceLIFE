import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { Container as contReact } from "reactstrap";

import {
    Tittle, Column,
    CssTextField, Button,
    OneColumn,
    Container,
    CssNativeSelect,
    OptionSelect

} from "./style";
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import {
    FormControl,
    InputLabel
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { useMsal } from "@azure/msal-react";
import { PersonalInformationContext } from './../../PersonalInformationContext/PersonalInformationContext'




const UpdateInformation = () => {
    const { accounts } = useMsal();
    const { t } = useTranslation();
    const { setNameObject, personalInfo, specialities, updatePersonalData } = useContext(PersonalInformationContext);

    const [personalInfoLocal, setPersonalInfoLocal] = useState(personalInfo);

    const updatePersonalInfo = () => {
        console.log(personalInfoLocal);
        updatePersonalData(personalInfoLocal);
    }
    const setInfo = (event) => {
        setPersonalInfoLocal((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }

    useEffect(() => {
        console.log("ESPECIALIDAD 2"+ personalInfoLocal.secondarySpeciality);
        if (personalInfoLocal.primarySpeciality == null || personalInfoLocal.primarySpeciality=="") {
            personalInfoLocal.primarySpeciality = "0ffc1074-ec05-ec11-b815-00155d10b71a";            
        }
        if (personalInfoLocal.secondarySpeciality == null || personalInfoLocal.secondarySpeciality=== "") {
            personalInfoLocal.secondarySpeciality = "0ffc1074-ec05-ec11-b815-00155d10b71a";            
        }



    }, []);    

    return (
        <>
            <div style={{ marginInline: '2%' }}>
                <br />
                <div >
                    <Tittle>{t("updtInfo")}</Tittle>
                    <Container>
                        <Column>
                            <CssTextField
                                type={"text"}
                                required={true}
                                value={personalInfoLocal.email}
                                fullWidth
                                label="Correo electrónico principal"
                                id="email"
                                name="email"
                                onChange={(e) => setInfo(e)}
                            />
                        </Column>
                        <Column>
                            <CssTextField
                                type={"text"}
                                required={true}
                                value={personalInfoLocal.accountNum.substring(0, 10)}
                                fullWidth
                                label={t("identityCard")}
                                id="accountNum"
                                name="accountNum"
                                onChange={(e) => setInfo(e)}
                            />
                        </Column>
                    </Container>
                    <Container>
                        <Column>
                            <CssTextField
                                type={"text"}
                                required={true}
                                value={personalInfoLocal.name}
                                fullWidth
                                label="Nombres"
                                id="name"
                                name="name"
                                onChange={(e) => setInfo(e)}
                            />
                        </Column>
                        <Column>
                            <CssTextField
                                type={"text"}
                                required={true}
                                value={personalInfoLocal.lastName}
                                fullWidth
                                label="Apellidos"
                                id="lastName"
                                name="lastName"
                                onChange={(e) => setInfo(e)}
                            />
                        </Column>
                    </Container>
                    <Container>
                        <Column>
                            <CssTextField
                                type={"text"}
                                required={true}
                                value={personalInfoLocal.telephone}
                                fullWidth
                                label="Teléfono principal"
                                id="telephone"
                                name="telephone"
                                onChange={(e) => setInfo(e)}
                            />
                        </Column>
                        <Column>
                            <CssTextField
                                type={"text"}
                                required={true}
                                value={
                                    personalInfoLocal.gender == 0
                                        ?
                                        "N/A"
                                        :
                                        personalInfoLocal.gender == 0
                                            ?
                                            "N/A"
                                            :
                                            personalInfo.gender == 1
                                                ?
                                                "MASCULINO"
                                                :
                                                "FEMENINO"
                                }
                                fullWidth
                                label="Género"
                                id="gender"
                                name="gender"
                                onChange={(e) => setInfo(e)}
                            />
                        </Column>
                        
                        {/*<Column>*/}
                        {/*    <FormControl style={{ width: '100%' }}>*/}
                        {/*        <InputLabel variant="standard" style={{ textDecoration: 'none' }}>*/}
                        {/*            Especialidad 1*/}
                        {/*        </InputLabel>*/}
                        {/*        <CssNativeSelect*/}
                        {/*            value={personalInfoLocal.primarySpeciality}*/}
                        {/*            id="primarySpeciality"*/}
                        {/*            name="primarySpeciality"*/}
                        {/*            onChange={(e) => setInfo(e)}*/}

                        {/*        >*/}
                        {/*            {specialities.map((item) => (*/}
                        {/*                <OptionSelect*/}
                        {/*                    key={item.li_medicalspecialitiesid}*/}
                        {/*                    value={item.li_medicalspecialitiesid}*/}
                        {/*                >*/}
                        {/*                    {item.li_name}*/}
                        {/*                </OptionSelect>*/}
                        {/*            ))}                                   */}
                        {/*        </CssNativeSelect>*/}
                        {/*    </FormControl>*/}
                        {/*</Column>*/}

                    </Container>
                    <Container>
                        {/*<Column>*/}
                        {/*    <FormControl style={{ width: '100%' }}>*/}
                        {/*        <InputLabel variant="standard" style={{ textDecoration: 'none' }}>*/}
                        {/*            Especialidad 2*/}
                        {/*        </InputLabel>*/}
                        {/*        <CssNativeSelect*/}
                        {/*            value={personalInfoLocal.secondarySpeciality}*/}
                        {/*            id="secondarySpeciality"*/}
                        {/*            name="secondarySpeciality"*/}
                        {/*            onChange={(e) => setInfo(e)}*/}

                        {/*        >*/}
                        {/*            {specialities.map((item) => (*/}
                        {/*                <OptionSelect*/}
                        {/*                    key={item.li_medicalspecialitiesid}*/}
                        {/*                    value={item.li_medicalspecialitiesid}*/}
                        {/*                >*/}
                        {/*                    {item.li_name}*/}
                        {/*                </OptionSelect>*/}
                        {/*            ))}*/}
                        {/*        </CssNativeSelect>*/}
                        {/*    </FormControl>*/}
                        {/*</Column>*/}
                        
                    </Container>
                    <Container>
                        <Column>
                            <CssTextField
                                value={new Date(personalInfoLocal.birthDate).toISOString().slice(0, 10).toString()}
                                type="date"
                                required={true}
                                fullWidth
                                label="Fecha de cumpleaños"
                                id="birthDate"
                                name="birthDate"
                                onChange={(e) => setInfo(e)}
                            />
                        </Column>
                        <Column>
                            <FormControl style={{ width: '100%' }}>
                                <InputLabel variant="standard" style={{ textDecoration:'none' }}>
                                    Trabaja en el sector público
                                </InputLabel>
                                <CssNativeSelect
                                    value={personalInfoLocal.workPublicSector}
                                    id="workPublicSector"
                                    name="workPublicSector"
                                    onChange={(e) => setInfo(e)}

                                >
                                    <OptionSelect key="0" value="0">
                                        NO
                                    </OptionSelect>
                                    <OptionSelect key="1" value="1">
                                        SI
                                    </OptionSelect>
                                    

                                </CssNativeSelect>
                            </FormControl>
                        </Column>
                    </Container>
                    <Container>
                        <OneColumn>
                            <Button onClick={() => updatePersonalInfo()}>
                                {t("update")} <SaveIcon />
                            </Button>
                        </OneColumn>
                    </Container>
                </div>
            </div>






        </>
    );
};

export default UpdateInformation
