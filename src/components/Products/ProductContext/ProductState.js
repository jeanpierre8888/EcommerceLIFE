import React, { useReducer } from "react";
import { ProductContext } from "./ProductContext";
import { ProductReducer } from "./ProductReducer";
import { PRODUCT } from "./ProductReducer";
import { useMsal } from "@azure/msal-react";



const ProductState = (props) => {
    const { accounts } = useMsal();
    const initialState = {


    };
    const [state, dispatch] = useReducer(ProductReducer, initialState);


    const getAllProducts = async () => {
        try {
            const category = "SUPLEM";
            const localUrl = "products/getAllProducts/" + category;
            const response = await fetch(localUrl);
            if (response.status === 200) {
                const data = await response.json();

                dispatch(
                    {
                        type: PRODUCT.SET_PRODS,
                        payload: { products: JSON.parse(data), productsLocal: JSON.parse(data) },
                    }
                );
            }
        }
        catch (e) {
            console.log(e)
        }

    }
    const getDefaultImg = async () => {
        try {

            const localUrl = "products/getDefaultImg/";
            const response = await fetch(localUrl);
            if (response.status === 200) {
                const data = await response.json();


                dispatch({
                    type: PRODUCT.GET_DEFAULT_IMG,
                    payload: JSON.parse(data),
                });
            }
        }
        catch (e) {
            console.log(e)
        }

    }
    const getCountries = async () => {
        try {

            const localUrl = "customerenrollment/getCountries/";
            const response = await fetch(localUrl);
            if (response.status === 200) {
                const data = await response.json();

                dispatch({
                    type: PRODUCT.GET_COUNTRIES,
                    payload: data,
                });
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    const getStates = async (CountryRegionId) => {
        try {

            const localUrl = "customerenrollment/getStates/" + CountryRegionId;
            const response = await fetch(localUrl);
            if (response.status === 200) {
                const data = await response.json();
                dispatch({
                    type: PRODUCT.GET_STATES,
                    payload: data,
                });
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    const getProv = async (CountryRegionId, StateId) => {
        if (CountryRegionId != '' && StateId != '') {
            try {
                const localUrl = "customerenrollment/getCounties/" + CountryRegionId + "/" + StateId;
                const response = await fetch(localUrl);
                if (response.status === 200) {
                    const data = await response.json();
                    dispatch({
                        type: PRODUCT.GET_COUNTIES,
                        payload: data,
                    });
                }
            }
            catch (e) {
                console.log(e)
            }
        }
    }
    const getCities = async (CountryRegionId, StateId, CountyId) => {
        if (CountryRegionId != '' && StateId != '', CountyId != '') {
            try {
                const localUrl = "customerenrollment/getCities/" + CountryRegionId + "/" + StateId + "/" + CountyId;
                const response = await fetch(localUrl);
                if (response.status === 200) {
                    const data = await response.json();
                    dispatch({
                        type: PRODUCT.GET_CITIES,
                        payload: data,
                    });
                }
            }
            catch (e) {
                console.log(e)
            }
        }
    }
    const getDistricts = async (CityRecId) => {
        if (CityRecId != '') {
            try {
                const localUrl = "customerenrollment/getDistricts/" + CityRecId;
                const response = await fetch(localUrl);
                if (response.status === 200) {
                    const data = await response.json();
                    dispatch({
                        type: PRODUCT.GET_DISTRICTS,
                        payload: data,
                    });
                }
            }
            catch (e) {
                console.log(e)
            }
        }
    }
    const createAddress = async (objAddress) => {
        try {
            const baseUrl = "";
            let localUrl = baseUrl + "/customerenrollment/createCustAddressB2C";
            const response = await fetch(localUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(objAddress),

            });

        }
        catch (e) {
            console.log(e)
        }

    }
    const getCustAddressHome = async (AccountNum) => {
        if (AccountNum) {
            try {
                const localUrl = "customerenrollment/getCustAddress/" + AccountNum;
                const response = await fetch(localUrl);
                if (response.status === 200) {
                    const data = await response.json();
                    dispatch({
                        type: PRODUCT.GET_CUSTOMER_ADDRESS,
                        payload: data,
                    });
                }
            }
            catch (e) {
                console.log(e)
            }
        }
    }
    const getCustAddress = async (obj) => {
        console.log("objeto" + obj);
        if (obj.accountNum == null) {
            obj.accountNum = "";
        }
        if (obj.Parameter2 == null) {
            obj.Parameter2 = "";
        }         
        try {
            const baseUrl = "";
            let localUrl = baseUrl + "/customerenrollment/getCustAddress";
            const response = await fetch(localUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });
            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                dispatch({
                    type: PRODUCT.GET_CUSTOMER_ADDRESS,
                    payload: data,
                });
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    const deleteAddress = async (AccountNum, locationRecId) => {
        try {
            const baseUrl = "";
            let localUrl = baseUrl + "customerenrollment/deleteCustAddress/" + AccountNum + "/" + locationRecId;
            const response = await fetch(localUrl);
            if (response.status === 200) {
                const data = await response.json();
                return (JSON.parse(data));
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    const filter = (e) => {
        const keyword = e;
        if (keyword !== '') {
            const results = state.productsLocal.filter((prod) => {
                //return prod.itemName.toLowerCase().startsWith(keyword.toLowerCase());  
                return prod.itemName.toLowerCase().includes(keyword.toLowerCase());
            });
            dispatch(
                {
                    type: PRODUCT.SET_PRODS_FILTER,
                    payload: results,
                }
            );
        } else {
            dispatch(
                {
                    type: PRODUCT.SET_PRODS_FILTER,
                    payload: state.products,
                }
            );
        }
    }

    return (
        <ProductContext.Provider
            value={{
                defaultImg: state.defaultImg,
                products: state.products,
                searchFilter: state.searchFilter,
                productsLocal: state.productsLocal,
                custAddress: state.custAddress,
                getAllProducts,
                getDefaultImg,
                filter,
                country: state.country,
                states: state.states,
                county: state.county,
                city: state.city,
                district: state.district,
                getCountries,
                getStates,
                getProv,
                getCities,
                getDistricts,
                createAddress,
                getCustAddress,
                deleteAddress
            }}
        >
            {props.children}
        </ProductContext.Provider>
    );
};

export default ProductState;
