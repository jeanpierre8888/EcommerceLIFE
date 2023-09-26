export const ROLES = {
    LIST_ROLES: "LIST_ROLES",
    LIST_USER_ROLES: "LIST_USER_ROLES",
    LIST_ROUTES_ROLES: "LIST_ROUTES_ROLES"
}


export const RolesReducer = (state, action) => {
    switch (action.type) {
        case ROLES.LIST_ROLES:
            return {
                ...state,
                allRoles: action.payload,
            };
        case ROLES.LIST_USER_ROLES:
            return {
                ...state,
                listUserRoles: action.payload,
            };
        case ROLES.LIST_ROUTES_ROLES:
            return {
                ...state,
                listObjetsInterface: action.payload,
            };
        default:
            return state;
    }
};
