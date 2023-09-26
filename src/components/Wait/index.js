import React from "react";
import Container from '@mui/material/Container';
import { useStyles } from "./style";

const Wait = () => {

    return (
        <Container style={{ padding: '10%', justifyContent: 'center', textAlign: 'center' }}>
            <br />
            <img  src="/waiting.svg" />
            <br />
        </Container>
    );
};

export default Wait;
