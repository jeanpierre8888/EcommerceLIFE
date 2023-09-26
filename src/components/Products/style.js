import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Row } from "reactstrap";




const Root = styled("div")(({ theme }) => ({
    textAlign: "center",
    padding: "50px",
    [theme.breakpoints.down("md")]: {
        padding: "20px",
    },
}));
const Tittle = styled("p")(({ theme }) => ({
    color: "#FF0000",
    fontWeight: "bold",
    fontSize: "3rem",
    [theme.breakpoints.down("sm")]: {
        fontSize: "2rem",
    },
}));
const TittleGenShopCar = styled("p")(({ theme }) => ({
    color: "#FF0000",
    fontWeight: "bold",
    fontSize: "2rem",
    [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
    },
}));
const Content = styled("div")(({ theme }) => ({
    justifyContent: "center",    
    margin: "auto",
    display: "flex",
    borderRadius: "15px",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "100%",
    background:"white",
    //background: "#F3F3F3",
    [theme.breakpoints.down("md")]: {
        padding: "8px",
    },
    [theme.breakpoints.down("sm")]: {
        minHeight: "500px",
    },
}));
const Column = styled("div")(({ theme }) => ({
    marginInline: "25px",
    marginBottom: "15px",
    borderRadius: "20px",
    minHeight: "300px",
    padding: "15px",
    width: "100%",
    maxWidth: "450px",
    bgcolor: 'background.paper',
    boxShadow: "2",
    
    border: "2px solid #DADADA",
    '&:hover': {
        border: "2px solid #B1000E",
    },
    background: "white",
     [theme.breakpoints.down("sm")]: {
       minHeight: "500px",
     },
}));
const Field = styled("p")(({ theme }) => ({
    fontSize: "1.5rem",
    textTransform: "uppercase",
    fontWeight: "450",
    color: "#FF0000",
}));
const FieldInfo = styled("p")(({ theme }) => ({
    fontSize: "1.2rem",
    textTransform: "uppercase",
    fontWeight: "300",
    color: "grey",
}));
const AddCar = styled("div")(({ theme }) => ({
    marginLeft:"-16px",
    padding:"20px",
    marginTop:"25px",
    fontSize: "1.5rem",
    width:"108%",
    fontWeight: "450",
    color: "white",
    background: "#B1000E",
    '&:hover': {
        background: "red",
    },
    borderRadius: "0px 0 20px 20px",
    marginBottom:"-16px",
}));
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const CssTextField = styled(TextField)(({ theme }) => ({
    width: "50%",
    marginBlock: "5px",
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
    [theme.breakpoints.down("md")]: {
        
    },
    [theme.breakpoints.down("sm")]: {
        
    },
}));
const RowModal = styled(Row)(({ theme }) => ({
    marginBlock:"5px",
    [theme.breakpoints.down("md")]: {
        
    },
    [theme.breakpoints.down("sm")]: {
        
    },
}));


const BoxCss = styled(Box)(({ theme }) => ({
    
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    paddingInline: '80px',
    backgroundColor: 'white',
    paddingBottom: '50px',
    [theme.breakpoints.down("md")]: {        
        width: '95%',
        fontSize: '12px',
        paddingInline: '25px',
    },
    [theme.breakpoints.down("lg")]: {
        paddingInline: '25px',
    },
}));

////////////////////////////////////////////Payment

const TittlePayment = styled("p")(({ theme }) => ({
    color: "black",
    fontWeight: "bold",
    fontSize: "1.5rem",
    [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
    },
}));

export {
    Root, Tittle, Content, Column, Field,
    FieldInfo, AddCar, CssTextField, BoxCss,
    Item, TittleGenShopCar, TittlePayment,
    RowModal
};
