export const PERSONAL_INFO = {
    GET_PERSONAL_INFORMATION: "GET_PERSONAL_INFORMATION",
    UPDATE_PERSONAL_INFO:"UPDATE_PERSONAL_INFO",
    GET_SPECIELITIES: "GET_SPECIELITIES",
    GET_LEGAL_DOCUMENT: "GET_LEGAL_DOCUMENT"
}


export const PersonalInformationReducer = (state, action) => {
    switch (action.type) {
        case PERSONAL_INFO.GET_PERSONAL_INFORMATION:
            return {
                ...state,
                personalInfo: action.payload,
            };
        case PERSONAL_INFO.GET_SPECIELITIES:
            return {
                ...state,
                specielities: action.payload,
            };
        case PERSONAL_INFO.GET_LEGAL_DOCUMENT:
            return {
                ...state,
                document: action.payload,
            };
        default:
            return state;
    }
};
