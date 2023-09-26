import React, { useReducer } from "react";
import { RolesContext } from "./RolesContext";
import { RolesReducer } from "./RolesReducer";
import { ROLES } from "./RolesReducer";


const RolesState = (props) => {
    const initialState = {
        allRoles:[]

    };
    const [state, dispatch] = useReducer(RolesReducer, initialState);


    const getComponentsRoles = async () => {        
        const localUrl = "rolespermissions/getSecurityComponentsRoles";
        const response = await fetch(localUrl);
        if (response.status === 200) {
            const data = await response.json();                  
            dispatch({
                type: ROLES.LIST_ROUTES_ROLES,
                payload: data,
            });
        }
    }

    const getUserRoles = async (guid) => {
        const localUrl = "rolespermissions/getUserRoles/" + guid;
        const response = await fetch(localUrl);
        if (response.status === 200) {
            const data = await response.json();            

            dispatch({
                type: ROLES.LIST_USER_ROLES,
                payload: data,
            });
        }
    }
    

    return (
        <RolesContext.Provider
            value={{
                listUserRoles: state.listUserRoles,
                listObjetsInterface: state.listObjetsInterface,
                getUserRoles,
                getComponentsRoles           
            }}

        >
            
            {props.children}
        </RolesContext.Provider>
    );
};

export default RolesState;
