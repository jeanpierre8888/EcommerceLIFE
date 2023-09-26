import { styled } from "@mui/material/styles";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";


const Root = styled("div")(({ theme }) => ({
    textAlign: "center",
    padding: "50px",
    margin: "0px 100px",
    [theme.breakpoints.down("md")]: {
        padding: "20px",
        margin: "0px 10px",
    },
}));
const CssNativeSelect = styled(NativeSelect)({
    "& .MuiNativeSelect-select": {
        textAlign: "center",
        paddingTop: "12px",
    },
});
const ContentDialog = styled("div")(({ theme }) => ({
    margin: "auto",
    marginBottom: "30px",
    padding: "15px",
}));
const BoxDialog = styled("div")(({ theme }) => ({
    display: "flex",
    m: "auto",
    position: "relative",
}));
const ButtonCancel = styled("button")(({ theme }) => ({
    backgroundColor: "#9F9F9F",
    margin: "15px",
    textAlign: "center",
    padding: "5px",
    paddingLeft: "18px",
    paddingRight: "18px",
    borderRadius: "18px",
    border: "0px",
    color: "white",
    "&:hover": {
        backgroundColor: "#D2D1D1",
    },
    "&:focus": {
        outline: "0 !important",
    },
}));
const H3 = styled("h3")(({ theme }) => ({
    padding: "35px",
    color: "gray",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        padding: "20px",
    },
}));
const Hr = styled("hr")(({ theme }) => ({
    backgroundColor: "#9F9F9F",
    height: "3px",
}));
const AlertSpan = styled("span")(({ theme }) => ({
    color: "red",
    fontSize: "15px",
}));
const Tittle = styled("p")(({ theme }) => ({
    color: "#FF0000",
    padding: "35px 0px 0px 0px",
    fontWeight: "bold",
    fontSize: "2.5rem",
    [theme.breakpoints.down("sm")]: {
        fontSize: "2rem",
    },
}));
const ColumnButtons = styled("div")(({ theme }) => ({
    margin: "auto",
    borderRadius: "20px",
    width: "250px",
    [theme.breakpoints.down("sm")]: {
        minHeight: "70px",
    },
}));
const Button = styled("button")(({ theme }) => ({
    marginTop: "35px",
    width: "100%",
    backgroundColor: "#FF0000",
    textAlign: "center",
    padding: "15px",
    borderRadius: "15px",
    border: "0px",
    color: "white",
    [theme.breakpoints.down("sm")]: {
        marginTop: "15px",
    },
    "&:disabled": {
        backgroundColor: '#C9A4A4'

    },
    "&:enabled": {
        "&: hover": {
            backgroundColor: "#ffcdd2",
            opacity: [0.9, 0.8, 0.7],
            color: "black",
        },
    },
    "&:focus": {
        outline: "0 !important",
    },
}));

const ButtonAdrress = styled("button")(({ theme }) => ({
    
    marginBlock:"10px",
    width: "30%",
    backgroundColor: "#D8D8D8",
    textAlign: "center",
    padding: "5px",
    borderRadius: "15px",
    border: "2px solid #D8D8D8",
    color: "black",
    [theme.breakpoints.down("sm")]: {
        marginTop: "15px",
    },
    "&:disabled": {
        backgroundColor: '#C9A4A4'

    },
    "&:enabled": {
        "&: hover": {
            backgroundColor: "black",
            opacity: [0.9, 0.8, 0.7],
            color: "white",
        },
    },
    "&:focus": {
        outline: "0 !important",
    },
}));

const ButtonCantRight = styled("button")(({ theme }) => ({
    fontWeight: 'bold',
    paddingBlock: 10,
    border: "2px solid #DEDEDE",
    fontSize: 30,
    backgroundColor: "white",
    textAlign: "center",
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px",
    width: 50,
    color: "black",
    [theme.breakpoints.down("sm")]: {
        marginTop: "15px",
    },
    "&:hover": {
        backgroundColor: "#ffcdd2",
        opacity: [0.9, 0.8, 0.7],
        color: "black",
    },
    "&:focus": {
        outline: "0 !important",
    },
}));
const ButtonCantLeft = styled("button")(({ theme }) => ({
    fontWeight: 'bold',
    paddingBlock: 10,
    border: "2px solid #DEDEDE",
    fontSize: 30,
    backgroundColor: "white",
    textAlign: "center",
    borderTopRightRadius: "15px",
    borderBottomRightRadius: "15px",
    width: 50,
    color: "black",
    [theme.breakpoints.down("sm")]: {
        marginTop: "15px",
    },
    "&:hover": {
        backgroundColor: "#ffcdd2",
        opacity: [0.9, 0.8, 0.7],
        color: "black",
    },
    "&:focus": {
        outline: "0 !important",
    },
}));


const Column = styled("div")(({ theme }) => ({
    //   margin: "auto",
    marginBottom: "30px",
    borderRadius: "20px",
    padding: "15px",
    width: "100%",
    maxWidth: "50%",
    [theme.breakpoints.down("md")]: {
        maxWidth: "100%",
        margin: "auto",
    },
}));
const ButtonNonDelete = styled("button")(({ theme }) => ({
    backgroundColor: "#9F9F9F",
    margin: "15px",
    textAlign: "center",
    padding: "5px",
    paddingLeft: "18px",
    paddingRight: "18px",
    borderRadius: "15px",
    border: "0px",
    color: "white",
    "&:hover": {
        backgroundColor: "#D2D1D1",
    },
    "&:focus": {
        outline: "0 !important",
    },
}));
const ButtonDelete = styled("button")(({ theme }) => ({
    backgroundColor: "red",
    textAlign: "center",
    margin: "15px",
    padding: "5px",
    paddingLeft: "18px",
    paddingRight: "18px",
    borderRadius: "15px",
    border: "0px",
    color: "white",
    "&:hover": {
        color: "black",
    },
    "&:focus": {
        outline: "0 !important",
    },
}));
const Container = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        padding: "8px",
    },
}));
const BorderContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    border: "1px solid #f0f0f0",
    borderRadius: "15px",
    boxShadow: "10px 5px 5px #efe2e2",
    // margin: "35px",
    // [theme.breakpoints.down("md")]: {
    //   flexDirection: "column",
    //   padding: "8px",
    // },
}));
const stylesCss = {
    root: {},
    radioGroup: {
        alignItems: "center",
    },
    radio: {
        color: "#FF0000",
        "&.Mui-checked": {
            color: "#FF0000",
        },
    },
};
const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "black",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "gray",
        },
        "&:hover fieldset": {
            borderColor: "gray",
        },
        "&.Mui-focused fieldset": {
            borderColor: "gray",
        },
    },
});
const OneColumn = styled("div")(({ theme }) => ({
    margin: "auto",
    marginBottom: "30px",
    borderRadius: "20px",
    padding: "15px",
    width: "100%",
    [theme.breakpoints.down("md")]: {
        maxWidth: "100%",
    },
}));
const OptionSelect = styled("option")(({ theme }) => ({
    color: "black",
    background: "white",
    display: "flex",
    whiteSpace: "pre",
    minHeight: "20px",
    textAlign: "center",
    fontSize: "18px",
}));

export default stylesCss;
export {
    OneColumn,
    CssTextField,
    Root,
    CssNativeSelect,
    ContentDialog,
    BoxDialog,
    ButtonCancel,
    Hr,
    H3,
    ButtonNonDelete,
    ButtonDelete,
    AlertSpan,
    Tittle,
    Button,
    Column,
    ColumnButtons,
    Container,
    BorderContainer,
    OptionSelect,
    ButtonCantLeft,
    ButtonCantRight,
    ButtonAdrress
};
