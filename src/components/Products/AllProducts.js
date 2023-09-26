import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMsal } from "@azure/msal-react";
import { Root, CssTextField } from "../Products/style";
import { ProductContext } from "./ProductContext/ProductContext";
import ContentProducts from "../Products/ContentProducts"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { LoginContext } from "../Loggin/login/LoginContext";
import { useNavigate } from 'react-router-dom';
import ModalCreateCustomer from '../Products/ModalCreateCustomer';
import { CustomerContext } from './../Customer/CustomerContext/CustomerContext';
import { SalesContext } from "./../Sales/SalesContext/SalesContext";





const AllProducts = () => {
    const navigate = useNavigate();
    const { upLogoutRedirect } = useContext(LoginContext);
    const { stateEnrollmet } = useContext(CustomerContext);
    const { getShopCar, numProds } = useContext(SalesContext);
    const [numProducts,setNumProducts] = React.useState(0);


    const handleLogOut = () => {
        upLogoutRedirect();
    };
    useEffect(() => {        
        fetchData2();
    }, []);
    const fetchData2 = async () => {
        if (stateEnrollmet != null) {
            await Promise.all([getShopCar(stateEnrollmet.custAccount)]);
            setNumProducts(numProds);
        }
    };


    const { accounts } = useMsal();
    const [open, setOpen] = useState(false);
    const { filter } = useContext(ProductContext);

    const [obj, setObj] = useState(
        {
            accountNum: "",
            name: accounts[0].idTokenClaims.given_name,
            lastName: accounts[0].idTokenClaims.family_name,
            email: accounts[0].username,
            phoneNumber: ""
        }
    );
    
    const goToPurchSummary = async () => {
        if (stateEnrollmet != null) {
            navigate('/shopCar');
        }
        else {
            setOpen(true);
        }        

    }

    const setInfo = (event) => {
        setObj((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }
    const searchProd = (event) => {        
        filter(event.target.value);
    }
    return (
        <>
            <Root>
                <br />
                <div style={{ height: "80px", marginBlock: "5px" }}>
                    <CssTextField
                        type={"text"}
                        fullWidth
                        label="Buscar Producto"
                        id="email"
                        name="email"
                        onChange={(e)=>searchProd(e)}
                    />
                    
                    <div style={{ float: "right", cursor: "pointer" }}>
                        <span style={{ borderRadius: "50px", backgroundColor: "#DADADA", width: "50px", float: "right", color: "black", fontWeight: "bold", fontSize: "25px", position: "relative", right: "20px" }} sx={{ "& :hover": { backgroundColor: "red" } }}>{numProds} </span>
                        <ShoppingCartIcon style={{ fontSize: "90px", color: "black", float: "right", marginBlock: "-00px", cursor: "pointer" }} sx={{ "& :hover": { color: "red" } }} onClick={() => goToPurchSummary()} />
                        
                    </div>
                </div>
                <br />
                <ContentProducts />
                <br />
                <br />
                <br />
                <br />
                <ModalCreateCustomer open={open} setOpen={setOpen}/>
            </Root>

        </>
    );
};

export default AllProducts;


