import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { RolesContext } from "../Roles/RolesContext/RolesContext";

import React from "react";

const ValidateRolesRoutes = ({ allowedRoles }) => {
    const { listUserRoles } = useContext(RolesContext);
    const location = useLocation();

    return allowedRoles.find((role) => listUserRoles.includes(role))
        ?
        (
            <Outlet />
        )
        :
        listUserRoles?.length>0        
            ?
            (
                <>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div style={{ fontSize: "30px", color:"black" }}>
                        No estás autorizado a ingresar a esta ruta. Comunícate con un administrador.
                    </div>
                </>                
            )
            :
            (
                <>
                    <div>
                        No estas registrado
                    </div>
                </>                
            );
};

export default ValidateRolesRoutes;