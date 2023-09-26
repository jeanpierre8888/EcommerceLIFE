import React, { useContext, useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { Root, Tittle, Content, Column, Field, FieldInfo, AddCar, BoxCss, Item } from "./style";
import { ProductContext } from "./ProductContext/ProductContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Wait from "../Wait";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { CustomerContext } from './../Customer/CustomerContext/CustomerContext';
import { SalesContext } from "./../Sales/SalesContext/SalesContext";
import ModalCreateCustomer from '../Products/ModalCreateCustomer';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ButtonCantLeft, ButtonCantRight } from '../GeneralInformation/UpdateInformation/style';





const AllProducts = () => {
    const { productsLocal, getAllProducts, getDefaultImg, products, defaultImg, getCountries, getStates } = useContext(ProductContext);
    const { createLine, getShopCar } = useContext(SalesContext);
    const [isLoading, setLoading] = useState(true);
    const [prodSelect, setProdSelect] = useState({});
    const [subtotal, setSubtotal] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const { stateEnrollmet } = useContext(CustomerContext);
    const [open, setOpen] = useState(false);//Dialog agregar producto
    const [openCreateCust, setOpenCreateCust] = useState(false);//modal crear cliente
    const [waitCreate, setWaitCreate] = useState(false);//Esperar hasta q se agregue el item al carrito


    const [enableMessage, setEnableMessage] = useState(false);
    const [respAddToCar, setRespAddToCar] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData2 = async () => {
            await Promise.all([getAllProducts(), getDefaultImg(), getCountries(), getStates("ECU")]);
            setLoading(false);
        };

        fetchData2();


    }, []);

    const counterSeconds = (seconds) => {
        const timeId = setTimeout(() => {

            setEnableMessage(false)
        }, seconds * 1000)
        return () => {
            clearTimeout(timeId)
        }
    }



    const handleClickOpen = (selectProd) => {
        setCantidad(0);
        setSubtotal(0);
        setProdSelect(selectProd);

        setOpen(true);
    };
    const addToCar = async () => {
        if (stateEnrollmet != null) {
            setWaitCreate(true);
            setSubtotal(0);
            console.log("Se ha agregado el producto al carrito")
            var obj = {
                accountNum: stateEnrollmet.custAccount,
                itemId: prodSelect.itemId,
                qty: cantidad,
                therapeuticGroupId: prodSelect.liessItemCategoryId,
                price: prodSelect.salesFinalPrice
            }
            var resp = await createLine(obj);

            if (resp.resp != null) {
                /*await getShopCar(stateEnrollmet.custAccount);*/
                //setOpen(false);
                getShopCar(stateEnrollmet.custAccount);
                setWaitCreate(false);

                setRespAddToCar(resp.resp);
                setMessage(resp.message);
                setEnableMessage(true);
                counterSeconds(2);
            }
        }
        else {
            setOpenCreateCust(true);
        }
    }

    const handleClose = () => {
        setOpen(false);
    };
    const incrementCant = () => {
        setCantidad(cantidad + 1);
        setSubtotal(prodSelect.itemSalesPrice * (cantidad + 1));
       
    }
    const decrementCant = () => {
        if (cantidad >= 1) {
            setCantidad(cantidad - 1);
            setSubtotal(prodSelect.itemSalesPrice * (cantidad - 1));
        }
        
    }
    

    const changeValueCant = (event) => {
        if (event.target.value != "") {
            var num = Number(parseFloat(event.target.value).toFixed(0))
            setCantidad(num);
            if (event.target.value > 0) {
                setSubtotal(prodSelect.itemSalesPrice * event.target.value);
            }
            else {
                setSubtotal(0);
            }
        }
        else {
            setCantidad(0);
            setSubtotal(0);
        }

    }
    return (
        <>
            <>


                {
                    productsLocal != null && defaultImg != null
                        ?
                        <Content >
                            {
                                productsLocal.map((item) => (
                                    <Column key={item.itemName} style={{ cursor: 'pointer' }}>


                                        <div>

                                            {
                                                item.itemImage != ""
                                                    ?
                                                    <img style={{ width: "70%", height: "auto" }} alt={item.itemName} src={`data:image/jpeg;base64,${item.itemImage}`} />
                                                    :
                                                    <img style={{ width: "70%", height: "auto" }} alt={item.itemName} src={`data:image/jpeg;base64,${defaultImg}`} />
                                            }
                                            <br />
                                            <div style={{ fontSize: "25px", height: "60px" }} >{item.itemName}</div>
                                            <br />
                                            <div style={{ fontSize: "40px" }}><AttachMoneyIcon />{item.itemSalesPrice.toFixed(2)}</div>
                                            <br />
                                            <AddCar onClick={() => handleClickOpen(item)}>
                                                Agregar <ShoppingCartIcon />
                                            </AddCar>
                                        </div>
                                    </Column>
                                ))
                            }
                        </Content>
                        :
                        <>
                            <Wait />

                        </>
                }

                {
                    Object.keys(prodSelect).length === 0
                        ?
                        <></>
                        :
                        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">

                            <DialogTitle style={{ fontSize: "35px", textAlign: "center", fontWeight: "bold" }}>{prodSelect.itemName}</DialogTitle>
                            <DialogContent>
                                <DialogContentText >
                                    <Grid container columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
                                        <Grid item xs={6}>
                                            <Item>
                                                {
                                                    prodSelect.itemImage != ""
                                                        ?
                                                        <img style={{ width: "100%", height: "auto" }} alt={prodSelect.itemName} src={`data:image/jpeg;base64,${prodSelect.itemImage}`} />
                                                        :
                                                        <img style={{ width: "100%", height: "auto" }} alt={prodSelect.itemName} src={`data:image/jpeg;base64,${defaultImg}`} />
                                                }
                                            </Item>
                                        </Grid>
                                        <Grid item xs={6} style={{ textAlign: "center" }}>
                                            <br /><br /><br />
                                            <div >Precio Unitario</div>
                                            <div style={{ fontSize: "30px" }} >{prodSelect?.itemSalesPrice.toFixed(2)}</div>
                                            

                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    CANTIDAD
                                                </Typography>
                                                <ButtonCantRight onClick={() => decrementCant()}>-</ButtonCantRight>
                                                <input
                                                    variant="h5"
                                                    name="salesQtyField"
                                                    value={cantidad}
                                                    onChange={(e) => changeValueCant(e)}
                                                    style={{ border: '2px solid #DEDEDE', textAlign: 'center', fontSize: 30, width: 100, paddingBlock: 10 }} />
                                                <ButtonCantLeft onClick={() => incrementCant()}>+</ButtonCantLeft>                                                
                                            </CardContent>

                                            {/*<TextField*/}
                                            {/*    sx={{*/}
                                            {/*        "& .MuiInputLabel-root": { color: 'black' },//styles the label*/}
                                            {/*        "& .MuiOutlinedInput-root": {*/}
                                            {/*            "& > fieldset": { borderColor: "black" },*/}
                                            {/*        },*/}
                                            {/*    }}*/}
                                            {/*    autoFocus*/}
                                            {/*    margin="dense"*/}
                                            {/*    id="cantidad"*/}
                                            {/*    label="Cantidad"*/}
                                            {/*    type="number"*/}
                                            {/*    inputProps={{*/}
                                            {/*        min: 0*/}
                                            {/*    }}*/}
                                            {/*    fullWidth*/}
                                            {/*    value={cantidad}*/}
                                            {/*    onChange={(e) => changeValueCant(e)}*/}


                                            {/*/>*/}
                                            <br /><br />
                                            <div >SUBTOTAL</div>
                                            <div style={{ fontSize: "30px" }}>{subtotal.toFixed(2)}</div>
                                            {
                                                waitCreate
                                                    ?
                                                    <Box>
                                                        <img visible={waitCreate} style={{ width: '120px', height: 'auto' }} src="/waiting.svg" />
                                                        <br />
                                                    </Box>
                                                    :
                                                    enableMessage
                                                        ?
                                                        <Collapse in={enableMessage}>
                                                            <Alert
                                                                severity={respAddToCar ? "success" : "error"}
                                                                action={
                                                                    <IconButton
                                                                        aria-label="close"
                                                                        color="inherit"
                                                                        size="small"
                                                                        onClick={() => {
                                                                            setEnableMessage(false);
                                                                        }}
                                                                    >
                                                                        <CloseIcon fontSize="inherit" />
                                                                    </IconButton>
                                                                }
                                                                sx={{ mb: 2 }}
                                                            >
                                                                {message}
                                                            </Alert>
                                                        </Collapse>
                                                        :
                                                        <></>

                                            }
                                        </Grid>


                                    </Grid>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button sx={{
                                    backgroundColor: "#B1000E", color: "white",
                                    '&:hover': {
                                        backgroundColor: "red",
                                    },
                                }} onClick={handleClose}>Cancelar</Button>

                                {
                                    subtotal > 0
                                        ?
                                        <Button
                                            sx={{
                                                backgroundColor: "#B1000E", color: "white",
                                                '&:hover': {
                                                    backgroundColor: "red",
                                                },
                                            }}
                                            onClick={() => addToCar()}>
                                            Agregar al Carrito
                                        </Button>
                                        :
                                        <Button sx={{
                                            backgroundColor: "gray", color: "white",
                                            '&:hover': {
                                                backgroundColor: "gray",
                                            }
                                        }}
                                        >
                                            Agregar al Carrito
                                        </Button>
                                }



                            </DialogActions>
                            <br />

                        </Dialog>


                }


                <br />
                <br />
                <ModalCreateCustomer open={openCreateCust} setOpen={setOpenCreateCust} />
                <br />
                <br />
            </>



        </>
    );
};

export default AllProducts;
