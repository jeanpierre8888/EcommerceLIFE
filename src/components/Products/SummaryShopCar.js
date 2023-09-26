import React, { useContext, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import { Root, Tittle, Content, Column, CssTextField, BoxCss, TittleGenShopCar, TittlePayment } from "../Products/style";
import { ProductContext } from "../Products/ProductContext/ProductContext";
import { Container, Col, Row } from "reactstrap";
import Modal from '@mui/material/Modal';
import { Button, ButtonCantLeft, ButtonCantRight, ButtonAdrress } from '../GeneralInformation/UpdateInformation/style';
import { LoginContext } from "../Loggin/login/LoginContext";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { SalesContext } from "./../Sales/SalesContext/SalesContext";
import { CustomerContext } from './../Customer/CustomerContext/CustomerContext';
import Wait from "../Wait";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Radio from '@mui/material/Radio';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';




const steps = ['Resumen de la compra', 'Dirección de entrega', 'Pago'];

const SummaryShopCar = () => {
    const { getShopCar, shopCar } = useContext(SalesContext);
    const { stateEnrollmet } = useContext(CustomerContext);
    const { getCountries, getStates, custAddress, getCustAddress } = useContext(ProductContext);
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [objAddress, setObjAddress] = useState(
        {
            accountNum: stateEnrollmet.custAccount,
            Parameter2: ''
        }
    );

    useEffect(() => {
        const fetchData2 = async () => {
            await Promise.all([getCountries(), getStates("ECU"), getShopCar(stateEnrollmet?.custAccount)]);
        };
        fetchData2();
        const fetchData3 = async () => {
            await Promise.all([getCustAddress(objAddress)]);
            console.log("direcciones " + custAddress.length);
        };
         
        if (shopCar[0]?.salesId) {
            setObjAddress(
                {
                    accountNum: stateEnrollmet.custAccount,
                    Parameter2: shopCar[0]?.salesId
                }
            );
            fetchData3();
        }
        
        
    }, []);

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };



    return (
        <Root>

            <br /><br /><br /><br />
            <Box sx={{ width: '100%' }}>
                <Stepper nonLinear activeStep={activeStep} alternativeLabel>
                    <Step key={steps[0]} completed={completed[0]}>
                        <StepButton color="inherit" onClick={handleStep(0)}>
                            {steps[0]}
                        </StepButton>
                    </Step>
                    <Step disabled={shopCar?.length > 0 ? false : true} key={steps[1]} completed={completed[1]}>
                        <StepButton color="inherit" onClick={handleStep(1)}>
                            {steps[1]}
                        </StepButton>
                    </Step>
                    <Step disabled={(shopCar?.length > 0) && (custAddress?.length>0) ?  false : true} key={steps[1]} key={steps[2]} completed={completed[2]}>
                        <StepButton color="inherit" onClick={handleStep(2)}>
                            {steps[2]}
                        </StepButton>
                    </Step>
                </Stepper>
            </Box>
            {
                activeStep === 0
                    ?
                    <Summary />
                    :
                    activeStep === 1
                        ?
                        <Address />
                        :
                        activeStep === 2
                            ?
                            <PaymentMethod />
                            :
                            <div>
                                No se ha seleccionado un paso
                            </div>
            }


        </Root>
    );
};

const Summary = () => {
    const { shopCar, linesShopCar, getShopCar, updateLines, deleteLines } = useContext(SalesContext);
    const { stateEnrollmet } = useContext(CustomerContext);
    const [linesShopCarLocal, setLinesShopCarLocal] = useState(linesShopCar);
    const { getCustAddress } = useContext(ProductContext);
    const [objUpdateLine, setObjUpdateLine] = useState(
        {
            accountNum: stateEnrollmet?.custAccount,
            recId: '',
            salesId: '',
            company: '',
            qty: '',
            lineAmount: '',
            lineQty: ''
        }
    )

    const [waitUpdate, setWaitUpdate] = useState(false);
    const [recIdUpdate, setRecIdUpdate] = useState(0);
    const [changeValue, setChangeValue] = useState(true);

    useEffect(() => {
        /*if (linesShopCarLocal == null) { }*/
        setLinesShopCarLocal(linesShopCar);

    }, [linesShopCar]);
    useEffect(() => {


    }, [linesShopCarLocal]);


    const incrementCant = (recIdField) => {
        setChangeValue(false);
        var newObject = JSON.parse(JSON.stringify(linesShopCarLocal));
        newObject.salesLineField.filter(x => x.recIdField == recIdField)[0].salesQtyField++;
        newObject.salesLineField.filter(x => x.recIdField == recIdField)[0].lineAmountField = newObject.salesLineField.filter(x => x.recIdField == recIdField)[0].linePricePercentTotal * newObject.salesLineField.filter(x => x.recIdField == recIdField)[0].salesQtyField;
        setLinesShopCarLocal(newObject);
    }
    const decrementCant = (recIdField) => {
        setChangeValue(false);
        var newObject = JSON.parse(JSON.stringify(linesShopCarLocal));
        if (newObject.salesLineField.filter(x => x.recIdField == recIdField)[0].salesQtyField >= 1) {
            newObject.salesLineField.filter(x => x.recIdField == recIdField)[0].salesQtyField--;
            newObject.salesLineField.filter(x => x.recIdField == recIdField)[0].lineAmountField = newObject.salesLineField.filter(x => x.recIdField == recIdField)[0].linePricePercentTotal * newObject.salesLineField.filter(x => x.recIdField == recIdField)[0].salesQtyField;
            setLinesShopCarLocal(newObject);
        }
    }
    const changeValueCant = (event, recIdField) => {
        setChangeValue(false);
        var input = event.target.value;
        if (containsOnlyNumbers(input) || input === '') {
            var newObject = JSON.parse(JSON.stringify(linesShopCarLocal));
            newObject.salesLineField.filter(x => x.recIdField == recIdField)[0].salesQtyField = Number(input);
            if (input !== '') {
                newObject.salesLineField.filter(x => x.recIdField == recIdField)[0].lineAmountField = input * newObject.salesLineField.filter(x => x.recIdField == recIdField)[0].linePricePercentTotal;
            }
            else {
                newObject.salesLineField.filter(x => x.recIdField == recIdField)[0].lineAmountField = 0;
            }

            setLinesShopCarLocal(newObject);
        }
    }
    const containsOnlyNumbers = (str) => {
        return /^[0-9]+$/.test(str);
    }
    const updateValuesLine = async (recIdField) => {
        setRecIdUpdate(recIdField);
        setChangeValue(true);
        setWaitUpdate(true);
        try {
            var newLine = linesShopCarLocal.salesLineField.filter(x => x.recIdField == recIdField)[0];
            var objtUpdate =
            {
                accountNum: stateEnrollmet.custAccount,
                recId: recIdField.toString(),
                salesId: shopCar[0].salesId,
                company: '',
                qty: newLine.salesQtyField.toString(),
                lineAmount: newLine.linePricePercentTotal.toString(),
                lineQty: linesShopCar.salesLineField.filter(x => x.recIdField == recIdField)[0].salesQtyField.toString()

            }
            setObjUpdateLine((prevState) => ({ ...prevState, objtUpdate }));
            var resp = await updateLines(objtUpdate);
            if (resp.resp != null) {
                await getShopCar(stateEnrollmet.custAccount);
                setWaitUpdate(false);
                setChangeValue(false);
            }

        } catch (e) {
            console.log(e)
        }
    }
    const deleteLine = async (recIdField) => {
        setRecIdUpdate(recIdField);
        setWaitUpdate(true);
        try {
            var newLine = linesShopCarLocal.salesLineField.filter(x => x.recIdField == recIdField)[0];
            var objtDelete =
            {
                accountNum: stateEnrollmet.custAccount,
                recId: recIdField.toString(),
                salesId: shopCar[0].salesId,
                company: ""
            }
            var resp = await deleteLines(objtDelete);
            if (resp.resp != null) {
                await getShopCar(stateEnrollmet.custAccount);
                setWaitUpdate(false);
            }

        } catch (e) {
            console.log(e)
        }
    }


    return (
        <Root>
            <TittleGenShopCar>Carrito de compras</TittleGenShopCar>
            <br />

            <br />
            <Container>
                {
                    shopCar != null
                        ?
                        linesShopCar?.salesLineField?.length > 0
                            ?
                            <>
                                {
                                    linesShopCarLocal?.salesLineField?.map((item) => (
                                        <Card key={item.recIdField} elevation={4} sx={{ display: 'flex', marginBottom: '30px', paddingBlock: '5px', justifyContent: 'center' }}>
                                            <ProductImg itemId={item.itemIdField} />
                                            <Box sx={{ justifyContent: 'center', width: '80%' }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                    <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: '20px', justifyContent: 'center' }}>
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: "50%" }}>
                                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                                    PRODUCTO
                                                                </Typography>
                                                                <Typography component="div" variant="h5">
                                                                    {item.itemNameField}
                                                                </Typography>

                                                            </CardContent>

                                                        </Box>

                                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: "50%" }}>
                                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                                    PRECIO UNITARIO
                                                                </Typography>
                                                                <Typography component="div" variant="h5">
                                                                    $ {item.linePricePercentTotal.toFixed(2)}
                                                                </Typography>

                                                            </CardContent>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: '20px', justifyContent: 'center' }}>
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: "50%" }}>
                                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                                    CANTIDAD
                                                                </Typography>
                                                                <ButtonCantRight onClick={() => decrementCant(item.recIdField)}>-</ButtonCantRight>
                                                                <input
                                                                    variant="h5"
                                                                    name="salesQtyField"
                                                                    value={item.salesQtyField}
                                                                    onChange={(e) => changeValueCant(e, item.recIdField)}
                                                                    style={{ border: '2px solid #DEDEDE', textAlign: 'center', fontSize: 30, width: 100, paddingBlock: 10 }} />
                                                                <ButtonCantLeft onClick={() => incrementCant(item.recIdField)}>+</ButtonCantLeft>
                                                                {
                                                                    waitUpdate && recIdUpdate === item.recIdField
                                                                        ?
                                                                        <Box>
                                                                            <img visible={waitUpdate} style={{ width: '120px', height: 'auto' }} src="/waiting.svg" />
                                                                            <br />
                                                                        </Box>
                                                                        :
                                                                        <></>
                                                                }
                                                            </CardContent>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: "50%" }}>
                                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                                    SUBTOTAL
                                                                </Typography>
                                                                <Typography component="div" variant="h4">
                                                                    $ {item.lineAmountField.toFixed(2)}
                                                                </Typography>

                                                            </CardContent>
                                                        </Box>
                                                    </Box>

                                                    <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: '10px', justifyContent: 'center' }}>


                                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: "50%" }}>
                                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                                <Button disabled={linesShopCar.salesLineField.filter(x => x.recIdField == item.recIdField)[0]?.salesQtyField !== linesShopCarLocal.salesLineField.filter(x => x.recIdField == item.recIdField)[0].salesQtyField
                                                                    &&
                                                                    waitUpdate == false
                                                                    &&
                                                                    linesShopCarLocal.salesLineField.filter(x => x.recIdField == item.recIdField)[0].salesQtyField > 0
                                                                    ? false : true}
                                                                    type="submit"
                                                                    onClick={() => updateValuesLine(item.recIdField)}>
                                                                    <CheckCircleIcon sx={{ fontSize: 30 }} />
                                                                    Actualizar Cantidad
                                                                </Button>
                                                            </CardContent>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: "50%" }}>
                                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                                <Button type="submit" sx={{ backgroundColor: 'gray' }} onClick={() => deleteLine(item.recIdField)}>
                                                                    <DeleteIcon sx={{ fontSize: 30 }} />
                                                                    Eliminar Producto
                                                                </Button>
                                                            </CardContent>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>

                                        </Card>
                                    ))
                                }

                                <Container>
                                    <Card elevation={1} sx={{ marginBottom: '30px', paddingBlock: '5px', width: '100%' }}>
                                        <Box sx={{ flexDirection: 'row', textAlign: 'left', marginInline: '30px', marginBlock: '10px' }}>
                                            <div style={{ fontSize: '30px' }}>Código de compra</div>  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>#{shopCar[0]?.salesId}</div>
                                        </Box>
                                        <Box sx={{ flexDirection: 'row', textAlign: 'center', marginInline: '30px', marginBlock: '0px' }}>
                                            <TittleGenShopCar>Totales</TittleGenShopCar>
                                        </Box>
                                        <Box sx={{ flexDirection: 'row', textAlign: 'left', marginInline: '30px', marginBlock: '0px' }}>
                                            <div style={{ fontSize: '30px' }}>Subtotal</div>  <div style={{ fontSize: '40px', fontWeight: 'bold' }}>$ {linesShopCarLocal?.totalBalanceField?.toFixed(2)}</div>
                                        </Box>
                                        <Box sx={{ flexDirection: 'row', textAlign: 'left', marginInline: '30px', marginBlock: '0px' }}>
                                            <div style={{ fontSize: '30px' }}>Iva</div>  <div style={{ fontSize: '40px', fontWeight: 'bold' }}>$ {linesShopCarLocal?.totalSalesTaxField?.toFixed(2)}</div>
                                        </Box>
                                        <Box sx={{ flexDirection: 'row', textAlign: 'left', marginInline: '30px', marginBlock: '0px' }}>
                                            <div style={{ fontSize: '30px' }}>Total</div>  <div style={{ fontSize: '40px', fontWeight: 'bold' }}>$ {linesShopCarLocal?.totalInvoiceField?.toFixed(2)}</div>
                                        </Box>
                                    </Card>
                                </Container>
                            </>
                            :
                            <>
                                <div>No hay productos seleccionados</div>
                            </>
                        :
                        <Wait />


                }

            </Container>



        </Root>
    );
}

const Address = () => {
    const { deleteAddress, getCustAddress, createAddress, country, states, county, getProv, getCities, city, district, getDistricts, custAddress } = useContext(ProductContext);
    const { stateEnrollmet } = useContext(CustomerContext);
    const { updateAddressSalesTable } = useContext(SalesContext);
    const [open, setOpen] = useState(false);
    const { shopCar } = useContext(SalesContext);
    const [objAddress, setObjAddress] = useState(
        {
            accountNum: stateEnrollmet.custAccount,
            Parameter2: shopCar[0]?.salesId
        }
    );
    const [obj, setObj] = useState(
        {
            addressRecId: 0,
            custAccount: '',
            description: '',
            logisticsAddressCity: '',
            logisticsAddressCountryRegionId: 'ECU',
            logisticsAddressCountyId: '',
            logisticsAddressDistrictName: '',
            logisticsAddressStateId: '',
            streetName: '',
            streetNum: ''
        }
    );
    const { upLogoutRedirect } = useContext(LoginContext);
    const handleLogOut = () => {
        upLogoutRedirect();
    };
    const [refAddress, setRefAddress] = useState('');
    const insertRefAddress = (event) => {
        setRefAddress(event.target.value);
    }
    const handleChange = (event) => {
        setObj((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));

        if (event.target.name === "logisticsAddressStateId") {
            setObj((prevState) => ({
                ...prevState,
                logisticsAddressCountyId: '',
                logisticsAddressCity: '',
                logisticsAddressDistrictName: '',
            }));
            getProv(obj.logisticsAddressCountryRegionId, obj.logisticsAddressStateId);
        }
        if (event.target.name === "logisticsAddressCountyId") {
            setObj((prevState) => ({
                ...prevState,
                logisticsAddressCity: '',
                logisticsAddressDistrictName: '',
            }));
            getCities(obj.logisticsAddressCountryRegionId, obj.logisticsAddressStateId, obj.logisticsAddressCountyId);
        }
        if (event.target.name === "logisticsAddressCity") {
            setObj((prevState) => ({
                ...prevState,
                logisticsAddressDistrictName: '',
            }));
            getDistricts(city.find(x => x.name == event.target.value).recId);
        }


    };
    useEffect(() => {
        if (custAddress != null) {
            setAddressLocal(custAddress);
        }
    }, [custAddress]);

    useEffect(() => {
        if (obj.logisticsAddressStateId != '') {
            getProv(obj.logisticsAddressCountryRegionId, obj.logisticsAddressStateId);
        }
    }, [obj.logisticsAddressStateId]);
    useEffect(() => {
        if (obj.logisticsAddressCountyId != '') {
            getCities(obj.logisticsAddressCountryRegionId, obj.logisticsAddressStateId, obj.logisticsAddressCountyId);
        }
    }, [obj.logisticsAddressCountyId]);
    useEffect(() => {
        if (obj.logisticsAddressCity != '') {
            getDistricts(city.find(x => x.name == obj.logisticsAddressCity).recId);
        }
    }, [obj.logisticsAddressCity]);
    useEffect(() => {
        const fetchData2 = async () => {
            await Promise.all([getCustAddress(objAddress)]);
        };
        fetchData2();
        setObj(
            {
                addressRecId: 0,
                custAccount: '',
                description: '',
                logisticsAddressCity: '',
                logisticsAddressCountryRegionId: 'ECU',
                logisticsAddressCountyId: '',
                logisticsAddressDistrictName: '',
                logisticsAddressStateId: '',
                streetName: '',
                streetNum: ''
            }
        );
        setRefAddress('');
    }, []);
    const [addressLocal, setAddressLocal] = useState(custAddress);
    const [recIdAddress, setRecIdAddress] = useState(0);
    useEffect(() => {
        if (addressLocal == null) {
            setAddressLocal(custAddress);
        }
    }, [custAddress]);
    const saveOrUpdateAddress = async () => {
        setOpen(false);
        obj.streetName = obj.streetName + ' - ' + refAddress;
        await createAddress(obj);
        getCustAddress(objAddress)
    }
    const openModalAddress = () => {
        setOpen(true);
        setObj(
            {
                addressRecId: 0,
                custAccount: stateEnrollmet.custAccount,
                description: '',
                logisticsAddressCity: '',
                logisticsAddressCountryRegionId: 'ECU',
                logisticsAddressCountyId: '',
                logisticsAddressDistrictName: '',
                logisticsAddressStateId: '',
                streetName: '',
                streetNum: ''
            }
        );
    }
    const selectAddress = async () => {
        handleClose();
        setWaitUpdateAdd(true);
        var newObject = JSON.parse(JSON.stringify(addressLocal));
        if (newObject.filter(x => x.postalAddressRecId == recIdAddress)[0].isAddressSalesTable == false) {
            newObject.forEach(element => element.isAddressSalesTable = false);
            newObject.filter(x => x.postalAddressRecId == recIdAddress)[0].isAddressSalesTable = true;
            setAddressLocal(newObject);
            var objUpdateAdd =
            {
                company: '',
                salesId: shopCar[0].salesId,
                recIdAddress: recIdAddress
            }
            var resp = await updateAddressSalesTable(objUpdateAdd);
            if (resp.resp != null) {
                await getCustAddress(objAddress);
                setWaitUpdateAdd(false);
            }
        }
    }
    const [openConfirmAdd, setOpenConfirmAdd] = useState(false);
    const handleClickOpen = (recId) => {
        setOpenConfirmAdd(true);
        setRecIdAddress(recId);
    };
    const handleClose = () => {
        setOpenConfirmAdd(false);
    };
    const [waitUpdateAdd, setWaitUpdateAdd] = useState(false);

    const [openDelete, setOpenDelete] = useState(false);
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    const handleClickDeleteOpen = (recId) => {
        setOpenDelete(true);
        setRecIdAddress(recId);
    };
    const deleteCustAddress = async () => {
        handleCloseDelete();
        setWaitUpdateAdd(true);
        var AccountNum = stateEnrollmet.custAccount;
        var resp = await deleteAddress(AccountNum, recIdAddress);
        if (resp != null) {
            await getCustAddress(objAddress);
            setWaitUpdateAdd(false);
        }
    }

    return (
        <Root>
            <TittleGenShopCar>Direcciones de entrega</TittleGenShopCar>
            <br />
            <Content>
                <br /><br />
                {
                    waitUpdateAdd
                        ?
                        <Box>
                            <img visible={waitUpdateAdd} style={{ width: '120px', height: 'auto' }} src="/waiting.svg" />
                            <br />
                        </Box>
                        :
                        <></>
                }
                <RadioGroup
                    style={{ width: '100%' }}
                    name="radio-buttons-group">
                    {
                        addressLocal != null
                            ?
                            addressLocal.map((item) => (
                                <Card key={item.postalAddressRecId} elevation={2}
                                    sx={{
                                        cursor: 'pointer',
                                        width: '100%',
                                        marginBottom: '30px',
                                        paddingBlock: '0px',
                                        justifyContent: 'center',
                                        pointerEvents: waitUpdateAdd ? 'none' : 'initial',
                                        backgroundColor: waitUpdateAdd ? '#D3D3D3' : 'white',
                                        "& :hover":
                                        {
                                            backgroundColor: "#D57670",
                                            color: 'white', fontWeight: 'bold'
                                        }

                                    }}>
                                    <Row style={{ paddingBlock: '15px' }}>
                                        <Col xs="1"><LocationOnOutlinedIcon style={{ fontSize: 40 }} /></Col>
                                        <Col xs="2"><FormControlLabel onClick={() => handleClickOpen(item.postalAddressRecId)} value={item.postalAddressRecId} checked={item.isAddressSalesTable} control={<Radio sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 38,
                                            },
                                            '&.Mui-checked': {
                                                color: 'black',
                                            },
                                        }} />} /></Col>

                                        <Col style={{ fontSize: '20px' }}>{item.address}</Col>
                                        {/*<Col>{item.address.split('\n').map(str => <div style={{ fontSize: 20 }}>{str.toUpperCase()}<br /></div>)}</Col>*/}
                                        <Col xs="2">
                                            <ButtonAdrress onClick={() => handleClickDeleteOpen(item.location)} type="submit">
                                                Eliminar
                                            </ButtonAdrress>
                                        </Col>
                                    </Row>
                                    {/*<div style={{ marginBottom: 40 }} >*/}
                                    {/*    {item.isAddressSalesTable ? <CheckCircleIcon style={{ marginRight: '80%', fontSize: 35, height: 30 }} /> : <div style={{ height: 30 }}></div>}*/}
                                    {/*</div>                                                                */}
                                </Card>
                            ))
                            :
                            <>
                                <Box>
                                    <img visible={waitUpdateAdd} style={{ width: '120px', height: 'auto' }} src="/waiting.svg" />
                                    <br />
                                </Box>
                            </>
                    }
                </RadioGroup>
                {
                    custAddress != null
                        ?
                        <Card onClick={openModalAddress} elevation={0} sx={{ cursor: 'pointer', width: '5%', marginBottom: '30px', paddingBlock: '0px', justifyContent: 'center', "& :hover": { color: 'red' } }}>
                            <AddLocationAltOutlinedIcon style={{ fontSize: 80 }} />
                        </Card>

                        :
                        <></>
                }
            </Content>
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

                        <Typography id="modal-modal-title" variant="h6" component="h1" style={{ marginBottom: '40px' }}>
                            Ingresa una dirección de entrega
                        </Typography>
                    </Container>
                    <Col>
                        <Row>

                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">País</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="logisticsAddressCountryRegionId"
                                        name="logisticsAddressCountryRegionId"
                                        value={obj.logisticsAddressCountryRegionId}
                                        label={country?.find(x => x.id === "ECU")?.label}
                                        onChange={handleChange}
                                    >
                                        {
                                            country.map((item) => (
                                                <MenuItem key={item.id} value={item.id}> {item.label}</MenuItem>
                                            ))

                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ minWidth: 120, marginBlock: 2 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Región</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="logisticsAddressStateId"
                                        name="logisticsAddressStateId"
                                        value={obj.logisticsAddressStateId}
                                        label="Región"
                                        onChange={handleChange}
                                    >
                                        {
                                            states.map((item) => (
                                                <MenuItem key={item.id} value={item.id}> {item.label}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                        </Row>
                        <Row>
                            <Col>
                                <Box sx={{ minWidth: 120, marginBlock: 2 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Provincia</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="logisticsAddressCountyId"
                                            name="logisticsAddressCountyId"
                                            value={obj.logisticsAddressCountyId}
                                            label="Provincia"
                                            onChange={handleChange}
                                        >
                                            {
                                                county?.length > 0
                                                    ?
                                                    county.map((item) => (
                                                        <MenuItem key={item.countyId} value={item.countyId}> {item.name}</MenuItem>
                                                    ))
                                                    :
                                                    <MenuItem key={0} value={0}> No hay provincias</MenuItem>
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Col>
                            <Col>
                                <Box sx={{ minWidth: 120, marginBlock: 2 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Cantón</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="logisticsAddressCity"
                                            name="logisticsAddressCity"
                                            value={obj.logisticsAddressCity}
                                            label="Ciudad"
                                            onChange={handleChange}
                                        >
                                            {
                                                city?.length > 0
                                                    ?
                                                    city.map((item) => (
                                                        <MenuItem key={item.recId} value={item.name}> {item.description}</MenuItem>
                                                    ))
                                                    :
                                                    <MenuItem key={0} value={0}> No hay ciudades</MenuItem>

                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Ciudad</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="logisticsAddressDistrictName"
                                        name="logisticsAddressDistrictName"
                                        value={obj.logisticsAddressDistrictName}
                                        label="Sector"
                                        onChange={handleChange}
                                    >
                                        {
                                            district?.length > 0
                                                ?
                                                district.map((item) => (
                                                    <MenuItem key={item.recId} value={item.name}> {item.description}</MenuItem>
                                                ))
                                                :
                                                <MenuItem key={0} value={0}> No hay ciudades</MenuItem>

                                        }
                                    </Select>
                                </FormControl>
                            </Col>
                        </Row>

                        <br />
                        <CssTextField
                            required={true}
                            style={{ width: "100%" }}
                            type={"text"}
                            fullWidth
                            label="Calles"
                            value={obj.streetName}
                            id="streetName"
                            name="streetName"
                            onChange={handleChange}
                        />
                        <br /><br />
                        <CssTextField
                            required={true}
                            style={{ width: "100%" }}
                            type={"text"}
                            fullWidth
                            label="Número de calle"
                            value={obj.streetNum}
                            id="streetNum"
                            name="streetNum"
                            onChange={handleChange}
                        />
                        <br /><br />
                        <CssTextField
                            required={true}
                            style={{ width: "100%" }}
                            type={"text"}
                            multiline
                            maxRows={4}
                            fullWidth
                            label="Ingresa alguna referencia"
                            value={refAddress}
                            id="refAddress"
                            name="refAddress"
                            onChange={insertRefAddress}
                        />
                    </Col>
                    <Row>
                        <Col>
                            <Button type="submit" onClick={() => saveOrUpdateAddress()}>
                                Guardar
                            </Button>
                            {/*{*/}
                            {/*    obj.accountNum === "" || obj.email === "" || obj.name === "" || obj.lastName === "" || obj.phoneNumber === ""*/}
                            {/*        ?*/}
                            {/*        <Button type="submit" disabled={true} style={{ backgroundColor: 'gray', color: "white" }}>*/}
                            {/*            Guardar*/}
                            {/*        </Button>*/}
                            {/*        :*/}
                            {/*        <Button type="submit" onClick={() => createCustomerB2C(obj)}>*/}
                            {/*            Guardar*/}
                            {/*        </Button>*/}
                            {/*}*/}

                        </Col>
                        <Col>
                            <Button type="submit" onClick={() => setOpen(false)}>
                                Cancelar
                            </Button>
                        </Col>
                    </Row>




                </BoxCss>
            </Modal>

            <Dialog
                open={openConfirmAdd}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <DialogTitle sx={{ paddingBlock: 2, fontWeight: 'bold' }} id="alert-dialog-title">
                    ¿Está seguro de cambiar la dirección de entrega?
                </DialogTitle>

                <DialogActions sx={{ paddingBottom: 3, paddingInline: 5 }}>
                    <Button onClick={selectAddress} autoFocus>
                        Aceptar
                    </Button>
                    <Button onClick={handleClose}>Cancelar</Button>

                </DialogActions>
            </Dialog>

            <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <DialogTitle sx={{ paddingBlock: 2, fontWeight: 'bold' }} id="alert-dialog-title">
                    ¿Está seguro de eliminar la dirección de entrega?
                </DialogTitle>

                <DialogActions sx={{ paddingBottom: 3, paddingInline: 5 }}>
                    <Button onClick={deleteCustAddress} autoFocus>
                        Aceptar
                    </Button>
                    <Button onClick={handleCloseDelete}>Cancelar</Button>

                </DialogActions>
            </Dialog>


        </Root>
    );
}

const PaymentMethod = () => {
    let navigate = useNavigate();
    const { stateEnrollmet } = useContext(CustomerContext);
    const { custAddress } = useContext(ProductContext);
    const { shopCar, linesShopCar } = useContext(SalesContext);
    const [finalAddress, setFinalAddress] = useState({});
    const [urlPayment, setUrlPayment] = useState('https://payurl.link/c7OxEZ5910001195475');
    const [waitUpdateAdd, setWaitUpdateAdd] = useState(false);
    const [obj, setObj] = useState(
        {
            document: "",
            document_type: "",
            name: "",
            email: "",
            phones: "",
            address: "",
            type: "",                     
            description: "",
            amount: 0,
            amount_with_tax: 0,
            amount_without_tax: 0,
            tax_value: 0           
        }
    );
    const createObjPaymentRequest = async () => {
        var newObj =
        {
            document: stateEnrollmet.custAccount,
            document_type: "",
            name: stateEnrollmet.name + " " + stateEnrollmet.lastName,
            email: stateEnrollmet.email,
            phones: stateEnrollmet.phoneNumber,
            address: finalAddress.address,
            type: "",
            description: shopCar[0]?.salesId,
            amount: linesShopCar?.totalInvoiceField?.toFixed(2),
            amount_with_tax: linesShopCar?.totalBalanceField?.toFixed(2),
            amount_without_tax: 0,
            tax_value: linesShopCar?.totalSalesTaxField?.toFixed(2)

        }
        await setObj(newObj);
        createPaymentRequest(newObj);
    }

    const createPaymentRequest = async (PaymentPagoMedios) => {
        console.log(PaymentPagoMedios);
        setWaitUpdateAdd(true);
        
        try {
            const baseUrl = "";
            let localUrl = baseUrl + "/payment/createPayment";
            const response = await fetch(localUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(PaymentPagoMedios),

            });
            if (response.status === 200) {
                const data = await response.json();
                console.log(data.data?.url);
                if (data.data?.url != '') {
                    setUrlPayment(data.data?.url);
                    gotoPaymentUrl(data.data?.url);
                }
                
            }
        }
        catch (e) {
            console.log(e)
        }

    }


    useEffect(() => {
        setFinalAddress(custAddress.filter(x => x.isAddressSalesTable == true)[0]);
    }, [finalAddress]);

    var wpwlOptions = {
        style: "plain"
    }
    const handleSubmit = (event) => {
        console.log(event)
    }
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        fontWeight: 'bold',
        fontSize: '20px'
    }));
    const Item2 = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        fontSize: '24px'
    }));

    const gotoPaymentUrl = (url) => {
        window.open(url, '_blank');
    }
    return (
        <Root>
            <TittleGenShopCar>Revisa tu pedido</TittleGenShopCar>
            <br />
            {
                waitUpdateAdd
                    ?
                    <Box>
                        <img visible={waitUpdateAdd} style={{ width: '120px', height: 'auto' }} src="/waiting.svg" />
                        <br />
                    </Box>
                    :
                    <></>
            }
            <br />
            <Button
                sx={{ width: '30%', marginBlock: '5px', }}
                type="submit"
                onClick={() => createObjPaymentRequest()}>
                <CheckCircleIcon sx={{ fontSize: 30 }} />
                Pagar
            </Button>
            <br /><br />
            <Card elevation={4} sx={{ textAlign: 'center', paddingInline: '30px' }}>
                <br />
                <TittlePayment>Datos de Facturación</TittlePayment>
                <b>Nombres y Apellidos:</b> {stateEnrollmet.name}  {stateEnrollmet.lastName}<br />
                <b>Cédula o RUC:</b> {stateEnrollmet.custAccount} <br />
                <b>Email:</b> {stateEnrollmet.email} <br />
                <b>Teléfono:</b> {stateEnrollmet.phoneNumber}
                <br /><br />
                <TittlePayment>Dirección de Entrega</TittlePayment>
                <b>{finalAddress.address}</b>
                <br /><br />

                <Card elevation={1} sx={{ textAlign: 'left', marginBottom: '30px', paddingBlock: '5px', width: '100%', paddingInline: '30px' }}>
                    <TittlePayment>Totales</TittlePayment>
                    <Box sx={{ flexDirection: 'column', textAlign: 'left', marginInline: '30px', marginBlock: '10px' }}>
                        <div style={{ fontSize: '20px' }}>Código de compra</div>  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>#{shopCar[0]?.salesId}</div>
                    </Box>
                    <Box sx={{ flexDirection: 'column', textAlign: 'left', marginInline: '30px', marginBlock: '0px' }}>
                        <div style={{ fontSize: '20px' }}>Subtotal</div>  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>$ {linesShopCar?.totalBalanceField?.toFixed(2)}</div>
                    </Box>
                    <Box sx={{ flexDirection: 'row', textAlign: 'left', marginInline: '30px', marginBlock: '0px' }}>
                        <div style={{ fontSize: '20px' }}>Iva</div>  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>$ {linesShopCar?.totalSalesTaxField?.toFixed(2)}</div>
                    </Box>
                    <Box sx={{ flexDirection: 'row', textAlign: 'left', marginInline: '30px', marginBlock: '0px' }}>
                        <div style={{ fontSize: '20px' }}>Total</div>  <div style={{ fontSize: '30px', fontWeight: 'bold' }}>$ {linesShopCar?.totalInvoiceField?.toFixed(2)}</div>
                    </Box>
                </Card>
                <TittlePayment>Lista de Productos</TittlePayment>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Item>Nombre del producto</Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>Cantidad</Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>Precio Unitario</Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>Subtotal</Item>
                    </Grid>
                </Grid>
                <br />
                {
                    linesShopCar?.salesLineField?.map((item) => (
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Item2>{item.itemNameField}</Item2>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item2>{item.salesQtyField}</Item2>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item2>{item.linePricePercentTotal.toFixed(2)}</Item2>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item2>{item.lineAmountField.toFixed(2)}</Item2>
                                </Grid>
                            </Grid>


                        </>
                    )
                    )
                }
                <br /><br />
            </Card>


            {/*<Helmet>*/}
            {/*    <script*/}
            {/*        src="https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=C0EFAEFD3E9EBB9D0C42BA73BDA75330.uat01-vm-tx03">*/}
            {/*    </script>*/}
            {/*</Helmet>*/}
            {/*<form action="<?php echo $baseUrl ?>" className="paymentWidgets" data-brands="VISA MASTER DINERS DISCOVER AMEX" >*/}
            {/*</form>*/}
        </Root >
    );
}

const ProductImg = ({ itemId }) => {
    const { defaultImg } = useContext(ProductContext);
    const [urlImg, setUrlImg] = useState(defaultImg);
    const { stateEnrollmet } = useContext(CustomerContext);


    useEffect(() => {
        const objItem = {
            accountNum: stateEnrollmet.custAccount,
            itemId: itemId,
            qty: 0
        }
        getInfoProduct(objItem);

    }, []);

    const getInfoProduct = async (obj) => {
        try {
            const localUrl = "/products/detalleProductos";
            const response = await fetch(localUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),

            });
            if (response.status === 200) {
                const data = await response.json();
                const objProduct = JSON.parse(data)
                if (data != null) {
                    if (objProduct[0].itemImage != "") {
                        setUrlImg(objProduct[0].itemImage);
                    }
                }


            }
        }
        catch (e) {
            console.log(e)
        }
    }




    return (
        <CardMedia
            sx={{ width: '20%', objectFit: 'contain', marginInline: "40px" }}
            component="img"
            src={`data:image/jpeg;base64,${urlImg}`}
            alt={itemId}
        />
    )
}


export default SummaryShopCar;


