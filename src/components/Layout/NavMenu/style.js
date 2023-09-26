import { styled } from "@mui/material/styles";

import { MenuItem, Select, Button, Container } from "@mui/material";

const stylesCss = {
    ButtonDropDown: {
        width: "100%",
        color: "black",
        textAlign: "left",
        fontFamily: "Poppins, sans-serif",
        fontWeight: "bold",
    },
    CssSelect: {
        marginTop: "-11px",
        fontFamily: "Poppins, sans-serif",
        fontSize: "15px",
    }
};
const CssNativeSelect1 = styled(Select)({
    ".MuiOutlinedInput-notchedOutline": {
        border: "0px",
    },
    "MuiSelect-select MuiSelect-outlined MuiOutlinedInput-input MuiInputBase-input css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
    {
        marginTop: "-10px",
    },
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
});
const CSSMenuItem = styled(MenuItem)({
    ".MuiOutlinedInput-notchedOutline": {
        border: "0px",
    },
    fontSize: "15px",
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
});
const OptionNav = styled(Container)({
    color: "black",
    marginTop: "7px",
    fontFamily: "Poppins, sans-serif",
    fontSize: "15px",
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace:"nowrap"
    
});

export default stylesCss;
export { CssNativeSelect1, CSSMenuItem, OptionNav };
