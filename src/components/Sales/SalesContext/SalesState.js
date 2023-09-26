import React, { useReducer } from "react";
import { SalesContext } from "../SalesContext/SalesContext";
import { SalesReducer } from "../SalesContext/SalesReducer";
import { SALES } from "../SalesContext/SalesReducer";
import { useMsal } from "@azure/msal-react";



const SalesState = (props) => {
    const { accounts } = useMsal();
    const initialState = {


    };
    const [state, dispatch] = useReducer(SalesReducer, initialState);
    const getShopCar = async (accountNum) => {
        try {
            if (accountNum != "") {
                const localUrl = "sales/getCarrito/" + accountNum;
                const response = await fetch(localUrl);
                if (response.status === 200) {
                    const data = await response.json();                   
                    if (data != null) {                        
                        const objSales = JSON.parse(data);
                        if (objSales.length > 0) {
                            dispatch({
                                type: SALES.GET_SALE,
                                payload: JSON.parse(data),
                            });
                            //ACTUALIZAR EL ALMACÉN DE LA ORDEN DE VENTA
                            if (objSales[0].salesId != '') {
                                updateLocation(objSales[0].salesId);
                            }                        
                            //TRAER LINEAS DE LA OV
                            const obj = {
                                accountNum: accountNum,
                                Parameter2: objSales[0].salesId,
                            }
                            getLines(obj);
                        }
                        else {
                            console.log(JSON.parse(data));
                            //////////////No existe una orden de venta creada
                            dispatch({
                                type: SALES.GET_SALE,
                                payload: JSON.parse(data),
                            });
                        }
                        
                    }

                }
            } else {
                dispatch(
                    {
                        type: SALES.GET_LINES_PRODS,
                        payload: { linesShopCar: null, numProds: 0 },
                    }
                );
            }


        }
        catch (e) {
            console.log(e)
        }

    }
    const getLines = async (obj) => {
        try {
            const baseUrl = "";
            let localUrl = baseUrl + "/sales/detailsLines";
            const response = await fetch(localUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });
            var numProducts = 0;
            if (response.status === 200) {
                const data = await response.json();
                if (data != null) {
                    var objLines = JSON.parse(data);
                    objLines?.salesLineField?.forEach(x => numProducts = numProducts + x.salesQtyField);
                }                
                dispatch(
                    {
                        type: SALES.GET_LINES_PRODS,
                        payload: { linesShopCar: JSON.parse(data), numProds: numProducts },
                    }
                );
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    const updateLocation = async (salesId) => {
        if (salesId != "") {
            const localUrl = "sales/updateLocation/" + salesId;
            const response = await fetch(localUrl);
            if (response.status === 200) {
                const data = await response.json();            
            }
        }
    }
    const updateLines = async (obj) => {
        try {
            const baseUrl = "";
            let localUrl = baseUrl + "/sales/updateLine";
            const response = await fetch(localUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });
            if (response.status === 200) {
                const data = await response.json();
                return (JSON.parse(data));
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    const updateAddressSalesTable = async (obj) => {
        try {
            const baseUrl = "";
            let localUrl = baseUrl + "/sales/updateAddressSalesTable";
            const response = await fetch(localUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),

            });
            if (response.status === 200) {
                const data = await response.json();
                return (JSON.parse(data));
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    const createLine = async (obj) => {
        try {
            const baseUrl = "";
            let localUrl = baseUrl + "/sales/createLine";
            const response = await fetch(localUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });
            if (response.status === 200) {
                const data = await response.json();
                return (JSON.parse(data));
                
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    const deleteLines = async (obj) => {
        try {
            const baseUrl = "";
            let localUrl = baseUrl + "/sales/deleteLine";
            const response = await fetch(localUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });
            if (response.status === 200) {
                const data = await response.json();
                return (JSON.parse(data));
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <SalesContext.Provider
            value={{
                shopCar: state.shopCar,
                linesShopCar: state.linesShopCar,
                numProds: state.numProds,
                getShopCar,
                updateLines,
                updateAddressSalesTable,
                createLine,
                deleteLines
            }}
        >
            {props.children}
        </SalesContext.Provider>
    );
};

export default SalesState;
