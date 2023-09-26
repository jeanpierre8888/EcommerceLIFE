import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "reactstrap";
import * as Icons from "@mui/icons-material";
import "./style.css";

const Footer = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    // const [heightMarginBottom, setheightMarginBottom] = useState(0);

    const updateWindowDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };
    window.addEventListener("resize", updateWindowDimensions);

    useEffect(() => {
        async function fetchData() {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }
        fetchData();
    }, []);
    return (
        <div>
            {/* <footer className="footer" style={{ bottom: -heightMarginBottom }}> */}
            <footer className="footer" style={{ bottom: -40 }}>
                {width > 767 ? (
                    <div>
                        <Row>
                            <Col>
                                <Container className="logoFooter">
                                    <div>
                                        <img
                                            className="logoLifeFooter"
                                            alt="logoLife"
                                            src="/logo-life-blanco.png"
                                        />
                                    </div>
                                </Container>
                            </Col>
                            <Col className="txtFooter">
                                <Container className="optFooter">
                                    <Icons.Place
                                        sx={{
                                            fontSize: "40px",
                                            ["@media (max-width:390px)"]: {
                                                fontSize: "25px",
                                            },
                                        }}
                                    />
                                    &nbsp; Av. De la Prensa y Juan Galarza, Quito
                                </Container>

                                <Container className="optFooter">
                                    <Icons.AccessTimeFilled
                                        sx={{
                                            fontSize: "40px",
                                            ["@media (max-width:390px)"]: {
                                                fontSize: "25px",
                                            },
                                        }}
                                    />
                                    &nbsp; Lun - Vie 8:30 - 17-00
                                </Container>

                                <Container className="optFooter">
                                    <Icons.Phone
                                        sx={{
                                            fontSize: "40px",
                                            ["@media (max-width:390px)"]: {
                                                fontSize: "25px",
                                            },
                                        }}
                                    />
                                    &nbsp; (+593-2) 22 63 805
                                </Container>

                                <Container className="optFooter">
                                    <Icons.Email
                                        sx={{
                                            fontSize: "40px",
                                            ["@media (max-width:390px)"]: {
                                                fontSize: "25px",
                                            },
                                        }}
                                    />
                                    &nbsp; info@life.com.ec
                                </Container>
                            </Col>
                            <Col>
                                <Container className="socialNetwork">
                                    <Container>
                                        <a
                                            style={{ color: "white", textDecoration: "none" }}
                                            href="https://www.facebook.com/laboratorioslife"
                                        >
                                            <Icons.Facebook
                                                sx={{
                                                    fontSize: "40px",
                                                    ["@media (max-width:390px)"]: {
                                                        fontSize: "25px",
                                                    },
                                                }}
                                            />
                                        </a>
                                    </Container>
                                    <br />
                                    <Container>
                                        <a
                                            style={{ color: "white", textDecoration: "none" }}
                                            href="https://twitter.com/lifedigitalec"
                                        >
                                            <Icons.Twitter
                                                sx={{
                                                    fontSize: "40px",
                                                    ["@media (max-width:390px)"]: {
                                                        fontSize: "25px",
                                                    },
                                                }}
                                            />
                                        </a>
                                    </Container>
                                    <br />
                                    <Container>
                                        <a
                                            style={{ color: "white", textDecoration: "none" }}
                                            href="https://www.instagram.com/laboratorioslifeec/?hl=es"
                                        >
                                            <Icons.Instagram
                                                sx={{
                                                    fontSize: "40px",
                                                    ["@media (max-width:390px)"]: {
                                                        fontSize: "25px",
                                                    },
                                                }}
                                            />
                                        </a>
                                    </Container>
                                    <br />
                                    <Container>
                                        <a
                                            style={{ color: "white", textDecoration: "none" }}
                                            href="https://ec.linkedin.com/company/life---laboratorios-industriales-farmaceuticos-ecuatorianos"
                                        >
                                            <Icons.LinkedIn
                                                sx={{
                                                    fontSize: "40px",
                                                    ["@media (max-width:390px)"]: {
                                                        fontSize: "25px",
                                                    },
                                                }}
                                            />
                                        </a>
                                    </Container>
                                </Container>
                            </Col>
                        </Row>
                        <div className="botFooter" style={{ color: "white" }}>
                            <hr className="lineFooter" />
                            Copyright &copy;
                            <span>
                                <b>{new Date().getFullYear()}&nbsp;</b>
                            </span>
                            All Rights Reserved by&nbsp;
                            <a
                                style={{ color: "white", textDecoration: "none" }}
                                href="https://www.life.com.ec"
                            >
                                <b>Laboratorios LIFE</b>
                            </a>
                            .
                        </div>
                        <br />
                        <br />
                    </div>
                ) : (
                    <Container>
                        <Row>
                            <Container className="logoFooter">
                                <img
                                    style={{ width: '85%' }}
                                    alt="logoLife"
                                    src="/logo-life-blanco.png"
                                />                                
                            </Container>
                        </Row>
                        <br />
                        <br />
                        <Row className="txtFooter">
                            <Container className="optFooter">
                                {/* <Icon.GeoAltFill size={17} color="white" /> */}
                                &nbsp; Av. De la Prensa y Juan Galarza, Quito
                            </Container>

                            <Container className="optFooter">
                                {/* <Icon.ClockFill size={17} color="white" /> */}
                                &nbsp; Lun - Vie 8:30 - 17-00
                            </Container>

                            <Container className="optFooter">
                                {/* <Icon.TelephoneFill size={17} color="white" /> */}
                                &nbsp; (+593-2) 22 63 805
                            </Container>

                            <Container className="optFooter">
                                {/* <Icon.EnvelopeFill size={17} color="white" /> */}
                                &nbsp; info@life.com.ec
                            </Container>
                        </Row>
                        <br />
                        <br />
                        <Row className="socialNetwork">
                            <Col>
                                <a
                                    style={{ color: "white", textDecoration: "none" }}
                                    href="https://www.facebook.com/laboratorioslife"
                                >
                                    {/* <Icon.Facebook size={30} color="white" /> */}
                                </a>
                            </Col>
                            {/*<Col>*/}
                            {/*    <a style={{ color: "white", textDecoration: "none" }} href="https://twitter.com/lifedigitalec"> <Icon.Twitter size={30} color="white" /></a>*/}
                            {/*</Col>*/}
                            <Col>
                                <a
                                    style={{ color: "white", textDecoration: "none" }}
                                    href="https://www.instagram.com/laboratorioslifeec/?hl=es"
                                >
                                    {/* <Icon.Instagram size={30} color="white" /> */}
                                </a>
                            </Col>
                            <Col>
                                <a
                                    style={{ color: "white", textDecoration: "none" }}
                                    href="https://ec.linkedin.com/company/life---laboratorios-industriales-farmaceuticos-ecuatorianos"
                                >
                                    {/* <Icon.Linkedin size={30} color="white" /> */}
                                </a>
                            </Col>
                        </Row>
                        <Container className="botFooter" style={{ color: "white" }}>
                            <hr className="lineFooter" />
                            Copyright &copy;
                            <span>
                                <b>{new Date().getFullYear()}&nbsp;</b>
                            </span>
                            All Rights Reserved by&nbsp;
                            <a
                                style={{ color: "white", textDecoration: "none" }}
                                href="https://www.life.com.ec"
                            >
                                <b>Laboratorios LIFE</b>
                            </a>
                            .
                        </Container>
                        <br />
                        <br />
                    </Container>
                )}
            </footer>
        </div>
    );
};

export default Footer;
