import React, { useReducer } from "react";
import { CustomerContext } from "./CustomerContext";
import { CustomerReducer } from "./CustomerReducer";
import { CUSTOMER } from "./CustomerReducer";
import { useMsal } from "@azure/msal-react";



const CustomerState = (props) => {
    const { accounts } = useMsal();
    const initialState = {


    };
    const [state, dispatch] = useReducer(CustomerReducer, initialState);    
    const getStatusEnrrolment = async () => {
        try {

            const localUrl = "/customerenrollment/getStatusEnrollment/" + accounts[0].localAccountId;
            const response = await fetch(localUrl);
            if (response.status === 200) {
                const data = await response.json();
                dispatch({
                    type: CUSTOMER.GET_STATE_ENROLLMENT,
                    payload: data,
                });
            }
        }
        catch (e) {
            console.log(e)
        }

    }


    return (
        <CustomerContext.Provider
            value={{
                stateEnrollmet:state.stateEnrollmet,
                getStatusEnrrolment

               
            }}

        >

            {props.children}
        </CustomerContext.Provider>
    );
};

export default CustomerState;
