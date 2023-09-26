import React, { useReducer } from "react";
import { InitialLoginContext } from "./InitialLoginContext";
import { InitialLoginReducer } from "./InitialLoginReducer";
import { LOGIN } from "./InitialLoginReducer";



const InitialLoginState = (props) => {

    const initialState = {
        loginState: false

    };
    const [state, dispatch] = useReducer(InitialLoginReducer, initialState);

    const SetloginState = async () => {
        try {
            var newState = false;

            if (state.loginState == false) {
                newState = true;
            }

            console.log("Nuevo estado" + newState);

            dispatch({
                type: LOGIN.SET_STATUS_LOGIN,
                payload: newState,
            });

        }
        catch (e) {
            console.log(e)
        }

    }



    return (
        <InitialLoginContext.Provider
            value={{
                loginState: state.loginState,
                SetloginState,
            }}
        >
            {props.children}
        </InitialLoginContext.Provider>
    );
};

export default InitialLoginState;
