import React, { useReducer } from "react";
import { PersonalInformationContext } from "./PersonalInformationContext";
import { PersonalInformationReducer } from "./PersonalInformationReducer";
import { PERSONAL_INFO } from "./PersonalInformationReducer";
import { useMsal } from "@azure/msal-react";



const PersonalInformationState = (props) => {
    const { accounts } = useMsal();
    const initialState = {
        

    };
    const [state, dispatch] = useReducer(PersonalInformationReducer, initialState);
    
    const updatePolicyApprovalStatus = async (obj) => {
        try {
            obj.acceptedAgreements = 1;
            //console.log(obj);
            const baseUrl = "";
            let localUrl = baseUrl + "/personalinformation/updatePolicyApprovalStatus";
            const response = await fetch(localUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });




            
            //const response = await fetch('/personalinformation/updatePolicyApprovalStatus', {
            //    method: "POST",
            //    headers: { "Content-Type": "application/json" },
            //    body: JSON.stringify(obj)
            //});
            //var data = await response.json();
            //console.log(data);


            //const localUrl = "personalinformation/updatePolicyApprovalStatus";
            //const response = await fetch(localUrl, {
            //    method: 'POST',
            //    headers: { "Content-Type": "application/json" },
            //    body: JSON.stringify(obj)

            //});
            //if (response.status === 200) {
            //    const data = await response.json();
            //    initialState.name = data.name;


            //    dispatch({
            //        type: PERSONAL_INFO.GET_PERSONAL_INFORMATION,
            //        payload: data,
            //    });
            //}
        }
        catch (e) {
            console.log(e)
        }

    }

    const updatePersonalData = async (obj) => {
        try {
            obj.acceptedAgreements = 1;
            console.log(obj);
            const baseUrl = "";
            let localUrl = baseUrl + "/personalinformation/updateAllData";
            const response = await fetch(localUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
                
            });
            getPersonalInformation();
        }
        catch (e) {
            console.log(e)
        }

    }

    const deletePersonalData = async (obj) => {
        try {
            obj.acceptedAgreements = 1;
            console.log(obj);
            const baseUrl = "";
            let localUrl = baseUrl + "/personalinformation/deleteAllData/" + obj.liActiveDirectoryGuid_STR;
            const response = await fetch(localUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                

            });
            getPersonalInformation();
        }
        catch (e) {
            console.log(e)
        }

    }

    const getPersonalInformation = async () => {
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

    const getSpecielites = async () => {
        try {
            const localUrl = "crm/getSpecialitiesCRM/";
            const response = await fetch(localUrl);
            if (response.status === 200) {
                const data = await response.json();

                dispatch({
                    type: PERSONAL_INFO.GET_SPECIELITIES,
                    payload: data,
                });

            }

        }
        catch (e) {
            console.log(e)
        }
        
    }

    const getDoc = async () => {
        const nameDoc = "privacyPolicy";
        const localUrl = "personalinformation/getPortalLegalDocument/" + nameDoc;
        const response = await fetch(localUrl);
        if (response.status === 200) {
            const data = await response.json();          
            dispatch({
                type: PERSONAL_INFO.GET_LEGAL_DOCUMENT,
                payload: data,
            });

        }
    }
    
    return (
        <PersonalInformationContext.Provider
            value={{
                personalInfo: state.personalInfo,
                specialities: state.specielities,
                document: state.document,
                getPersonalInformation,
                updatePolicyApprovalStatus,
                updatePersonalData,
                deletePersonalData,
                getSpecielites,
                getDoc
            }}

        >
            
            {props.children}
        </PersonalInformationContext.Provider>
    );
};

export default PersonalInformationState;
