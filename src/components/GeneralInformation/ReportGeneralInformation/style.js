import { styled } from "@mui/material/styles";

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
const Content = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "15px",
  flexDirection: "row",
  flexWrap: "wrap",
  maxWidth: "1000px",
  background: "#F3F3F3",
  [theme.breakpoints.down("md")]: {
    padding: "8px",
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: "500px",
  },
}));
const Column = styled("div")(({ theme }) => ({
  margin: "auto",
  marginBottom: "15px",
  borderRadius: "20px",
  minHeight: "150px",
  padding: "15px",
  width: "100%",
  maxWidth: "450px",
  background: "#F3F3F3",
  // [theme.breakpoints.down("sm")]: {
  //   minHeight: "500px",
  // },
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

const ColReport = styled("div")(({ theme }) => ({
    width:"50%",
    [theme.breakpoints.down("md")]: {
        width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
}));

export { Root, Tittle, Content, Column, Field, FieldInfo, ColReport };
