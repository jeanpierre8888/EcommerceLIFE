import React from "react";

import ReportGeneralInformation from "../GeneralInformation/ReportGeneralInformation/ReportGeneralInformation";
import UpdateInformation from "../GeneralInformation/UpdateInformation/UpdateInformation";
import DeleteInformation from "../GeneralInformation/DeleteInformation/DeleteInformation";
import GeneralInformation from "../GeneralInformation/GeneralInformation";
import AllProducts from "../Products/AllProducts";
import SummaryShopCar from "../Products/SummaryShopCar";


export const listComponents = {
    Report: "ReportGeneralInformation",
    Update: "UpdateInformation",
    Delete: "DeleteInformation",
    GenerarlInfo: "GeneralInformation",
    AllProducts: "AllProducts",
    SummaryShopCar: "SummaryShopCar"
}


export const ComponentsImports = (nameComponent) => {
    switch (nameComponent) {
        case listComponents.Report:
            return (
                <ReportGeneralInformation />
            );
        case listComponents.Update:
            return (
                <UpdateInformation />
            );
        case listComponents.Delete:
            return (
                <DeleteInformation />
            );
        case listComponents.GenerarlInfo:
            return (
                <GeneralInformation />
            )
        case listComponents.AllProducts:
            return (
                <AllProducts />
            )
        case listComponents.SummaryShopCar:
            return (
                <SummaryShopCar />
            )
        default:
            return (
                <>
                    ERROR
                </>
            );
    }
};