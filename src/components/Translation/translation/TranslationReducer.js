import { TRANSLATION } from "../../GlobalConfig/types";

export const TranslationReducer = (state, action) => {
  switch (action.type) {
    case TRANSLATION.LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case TRANSLATION.TRANSLATIONS:
      return {
        ...state,
        translations: action.payload.data,
        languageOptions: action.payload.options,
      };

    default:
      return state;
  }
};
