import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { ArrowDropDown } from "@mui/icons-material";
import { Button, List, ListItem, ListSubheader, Popover } from "@mui/material";
import { TranslationContext } from "../Translation/translation/TranslationContext";

const languageMap = {
    es_EC: { label: "Español", dir: "ltl", active: false },
    en_US: { label: "English", dir: "ltr", active: true },
};

const LanguageSelect = () => {
    const {
        language,
        setLanguage,
        translations,
        getAllTranslation,
        languageOptions,
    } = useContext(TranslationContext);
    const [selected, setSelected] = useState(language);
    const [waitTranslations, setWaitTranslations] = useState(true);

    const { t } = useTranslation();
    const [menuAnchor, setMenuAnchor] = useState(null);

    const handleLanguage = (currentLanguage) => {
        setSelected(currentLanguage);
        i18next.changeLanguage(currentLanguage);
    };

    useEffect(() => {
        try {
            const fetchData2 = async () => {
                await Promise.all([setLanguage(selected)]);
                await Promise.all([getAllTranslation()]);
                setWaitTranslations(false);
            };
            fetchData2();

        } catch (e) {
            console.log(e);
            console.log("error");
        }


    }, []);

    useEffect(() => {

        if (!waitTranslations) {
            for (let index = 0; index < translations.length; index++) {
                i18next.addResourceBundle(
                    translations[index].language,
                    "translation",
                    translations[index].translations
                );
            }
            i18next.changeLanguage(selected);
        }
    }, [waitTranslations]);

    return (
        <div className="d-flex justify-content-end align-items-center language-select-root">
            <Button onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}>

                <img
                    style={{ height: "28px", width: "28px" }}
                    src={"/assets/flags/" + selected + ".svg"}
                />
                <ArrowDropDown fontSize="small" />
            </Button>
            <Popover
                open={!!menuAnchor}
                anchorEl={menuAnchor}
                onClose={() => setMenuAnchor(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <div>
                    <List>
                        <ListSubheader>{t("selectLanguage")}</ListSubheader>
                        {
                            Object.keys(languageOptions)?.map((item) =>
                            (
                                languageOptions?.length < 1
                                    ?
                                    <ListItem
                                        button
                                        key={item}
                                        onClick={() => {
                                            handleLanguage(item);
                                            setMenuAnchor(null);
                                        }}
                                    >
                                        {languageOptions[item].label}
                                    </ListItem>
                                    :
                                    <>
                                    </>
                            ))}
                    </List>
                </div>
            </Popover>
        </div>
    );
};

export default LanguageSelect;
