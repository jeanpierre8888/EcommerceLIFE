import React, { useReducer } from "react";
import { TranslationContext } from "./TranslationContext";
import { TranslationReducer } from "./TranslationReducer";
import { TRANSLATION } from "../../GlobalConfig/types";
import { baseUrl } from "../../GlobalConfig/config";

const TranslationState = (props) => {
    const initialState = {
        language: "es_EC",
        translations: [],
        languageOptions: {},
    };

    const [state, dispatch] = useReducer(TranslationReducer, initialState);

    const setLanguage = async (data) => {
        dispatch({
            type: TRANSLATION.LANGUAGE,
            payload: data,
        });
    };
    const getTranslation = async () => {
        try {
            const localUrl = baseUrl + "/api/translation/lang?lang=" + state.language;
            const response = await fetch(localUrl);
            //si no existe devuelve response.status === 204
            if (response.status === 200) {
                const data = await response.json();
                dispatch({
                    type: TRANSLATION.TRANSLATIONS,
                    payload: data.translations,
                });
            }
        } catch (e) {
            console.log(e)
            console.log("error")
        }
        
    };
    const getAllTranslation = async () => {       
        try {
            let data;
            let options = {};
            if (!JSON.parse(sessionStorage.getItem("dataLang"))) {                
                const localUrl = baseUrl + "api/translation/all";                
                const response = await fetch(localUrl);                
                if (response.status === 200) {                    
                    const data = await response.json();
                    sessionStorage.setItem("dataLang", JSON.stringify(data));
                    for (let index = 0; index < data.length; index++) {
                        options["" + data[index].language] = {
                            label: data[index].description,
                            dir: "ltr",
                            active: false,
                        };
                    }
                    const finalData = {
                        options: options,
                        data: data,
                    };
                    dispatch({
                        type: TRANSLATION.TRANSLATIONS,
                        payload: finalData,
                    });
                }
            } else {
                data = JSON.parse(sessionStorage.getItem("dataLang"));
            }
            if (data) {
                for (let index = 0; index < data.length; index++) {
                    options["" + data[index].language] = {
                        label: data[index].description,
                        dir: "ltr",
                        active: false,
                    };
                }
                const finalData = {
                    options: options,
                    data: data,
                };
                dispatch({
                    type: TRANSLATION.TRANSLATIONS,
                    payload: finalData,
                });
            }

        } catch (e) {
            console.log(e)
            console.log("error")
            
        }
    };

    return (
        <TranslationContext.Provider
            value={{
                language: state.language,
                translations: state.translations,
                languageOptions: state.languageOptions,
                setLanguage,
                getTranslation,
                getAllTranslation,
            }}
        >
            {props.children}
        </TranslationContext.Provider>
    );
};

export default TranslationState;
