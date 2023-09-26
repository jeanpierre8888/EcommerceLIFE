import React, { useContext, useEffect, useState } from "react";
import { Container, Col, Row } from "reactstrap";
import { Root, Tittle, Content, Column, Field, FieldInfo, ColReport } from "./style";
import { useTranslation } from "react-i18next";
import { useMsal } from "@azure/msal-react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Svg, PDFViewer, Image } from '@react-pdf/renderer';
import UpdateInformation from '../UpdateInformation/UpdateInformation';
import { PersonalInformationContext } from './../../PersonalInformationContext/PersonalInformationContext'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { Button } from "../UpdateInformation/style";




const styles = StyleSheet.create({
    page: {
        padding: 10
    },
    section: {
        textAlign: 'center',
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    img: {
        width: 200,
        textAlign: 'center',
        margin:'0 auto'
    },
    titulo: {
        fontSize: 30,
        marginTop: 30,
        marginBottom: 30,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold'
    },
    Labels: {
        fontSize: 15,
        marginTop: 20,
        textAlign: 'left',
        fontWeight: 'bold'

    }, valuesLabels: {

    },
    LabelsTit: {
        fontSize: 20,
        marginTop: 20,
        textAlign: 'left',
        fontWeight: 'bold'

    },
    contInfo: {
        marginLeft: 40
    }

});

const ReportGeneralInformation = () => {
    const { accounts } = useMsal();
    const [nameSpeciality, setnameSpeciality] = useState();
    const [nameSpeciality2, setnameSpeciality2] = useState();

    const { t } = useTranslation();
    const { name, personalInfo, getPersonalInformation, specialities } = useContext(PersonalInformationContext);



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



    }, [personalInfo]);

    const MyDoc = () => (
        <Document>
            <Page style={styles.page}>
                <View style={{ textAlign:'center' }}>
                    <Image src="/logo-life.png" style={styles.img} />
                </View>

                <br /><br /><br />
                <Text style={styles.titulo}>
                    {t("personalDoc")}
                </Text>
                <View style={styles.contInfo}>


                    <View style={{ flexDirection: 'row', marginRight: '25%' }}>
                        <Text style={styles.LabelsTit}>
                            Cédula o Ruc:&nbsp;&nbsp;&nbsp;
                        </Text>
                        <Text style={styles.Labels}>
                            {personalInfo.accountNum.substring(0, 10)}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginRight: '25%' }}>
                        <Text style={styles.LabelsTit}>
                            Email:&nbsp;&nbsp;&nbsp;
                        </Text>
                        <Text style={styles.Labels}>
                            {personalInfo.email}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }} >
                        <View style={{ flexDirection: 'row', marginRight: '20%' }}>
                            <Text style={styles.LabelsTit}>
                                {t("name")}s:&nbsp;&nbsp;&nbsp;
                            </Text>
                            <Text style={styles.Labels}>
                                {personalInfo.name}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.LabelsTit}>
                                Apellidos:&nbsp;&nbsp;&nbsp;
                            </Text>
                            <Text style={styles.Labels}>
                                {personalInfo.lastName}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginRight: '25%' }}>
                        <Text style={styles.LabelsTit}>
                            Teléfono:&nbsp;&nbsp;&nbsp;
                        </Text>
                        <Text style={styles.Labels}>
                            {personalInfo.telephone}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginRight: '25%' }}>
                        <Text style={styles.LabelsTit}>
                            Fecha de cumpleaños:&nbsp;&nbsp;&nbsp;
                        </Text>
                        <Text style={styles.Labels}>
                            {new Date(personalInfo.birthDate).toISOString().slice(0, 10).toString()}
                        </Text>
                    </View>

                    {/*<View style={{ flexDirection: 'row', marginRight: '20%' }}>*/}
                    {/*    <Text style={styles.LabelsTit}>*/}
                    {/*        Especialidad 1:&nbsp;&nbsp;&nbsp;*/}
                    {/*    </Text>*/}
                    {/*    <Text style={styles.Labels}>                           */}
                    {/*        {nameSpeciality}*/}
                    {/*    </Text>*/}
                    {/*</View>*/}
                    {/*<View style={{ flexDirection: 'row' }}>*/}
                    {/*    <Text style={styles.LabelsTit}>*/}
                    {/*        Especialidad 2:&nbsp;&nbsp;&nbsp;*/}
                    {/*    </Text>*/}
                    {/*    <Text style={styles.Labels}>*/}
                    {/*        {nameSpeciality2}*/}
                    {/*    </Text>*/}
                    {/*</View>*/}
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.LabelsTit}>
                            Género:&nbsp;&nbsp;&nbsp;
                        </Text>
                        <Text style={styles.Labels}>
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
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.LabelsTit}>
                            Trabaja en el sector público:&nbsp;&nbsp;&nbsp;
                        </Text>
                        <Text style={styles.Labels}>
                            {personalInfo.workPublicSector == 1 ? "SI" : "NO"}
                        </Text>
                    </View>

                </View>





                {/*<Svg viewBox="0 0 400 35"></Svg>*/}
            </Page>
        </Document>
    );


    return (
        <>
            <Row>
                <ColReport>
                    <UpdateInformation />              
                </ColReport>
                <ColReport>
                    <Container style={{ paddingTop: '30px' }}>
                        <PDFViewer style={{ width: '100%' }} height={700} showToolbar={true}>
                            <MyDoc />
                        </PDFViewer>
                    </Container>

                    <br />
                    <PDFDownloadLink document={<MyDoc />} fileName={"DatosPersonales" + personalInfo.lastName + ".pdf"}>
                        {
                            ({ blob, url, loading, error }) =>
                                loading ? 'Loading document...'
                                    :
                                    <Button>
                                        Descargar Reporte<DownloadForOfflineIcon />
                                    </Button>
                        }
                    </PDFDownloadLink>
                </ColReport>

                <br /><br />
                <br /><br />
                <br /><br />


            </Row>
            <Row>
            </Row>




        </>
    );
};

export default ReportGeneralInformation;
