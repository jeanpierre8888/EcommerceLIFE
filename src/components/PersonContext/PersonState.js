import React, { useReducer } from "react";
import { PersonContext } from "./PersonContext";
import { PersonReducer } from "./PersonReducer";
import { PERSONAL_INFO } from "./PersonReducer";
import { useMsal } from "@azure/msal-react";



const PersonState = (props) => {
    const { accounts } = useMsal();
    const initialState = {
        

    };
    const [state, dispatch] = useReducer(PersonReducer, initialState);

    const getPersonEntity = async () => {
        try {
            const localUrl = "personalinformation/getPersonalInformation/" + accounts[0].localAccountId + "/" + accounts[0].username;
            const response = await fetch(localUrl);
            if (response.status === 200) {
                const data = await response.json();

                //Campos necesarios para generar el reporte de aceptación de políticas de privacidad
                if (data.accountNum === "") {
                    data.accountNum = "----";
                }
                if (data.lastName === "" && data.idCRM === "") {
                    if (accounts[0].idTokenClaims.family_name === accounts[0].idTokenClaims.given_name) {
                        data.lastName = " ";
                    } else {
                        data.lastName = accounts[0].idTokenClaims.family_name;
                    }
                    
                }
                if (data.name === "") {
                    data.name = accounts[0].idTokenClaims.given_name;
                }       
                dispatch({
                    type: PERSONAL_INFO.GET_PERSONAL_INFORMATION,
                    payload: data,
                });
            }
        }
        catch (e) {
            console.log(e)
        }

    }

   
    
    return (
        <PersonContext.Provider
            value={{
                person: state.personalInfo,                
                getPersonEntity,                
            }}
        >            
            {props.children}
        </PersonContext.Provider>
    );
};

export default PersonState;
