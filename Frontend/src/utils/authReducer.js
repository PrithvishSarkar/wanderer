// Defining the initial state for 'useReducer' Hook
export const initialState = {
  nameValue: "",
  emailValue: "",
  passwordValue: "",
  passwordShow: false,
  passwordStrength: "",
  passwordStrengthColor: "",
  loading: false,
};

// Reducer Function takes two arguments - "state" and "action"
export const reducer = (state, action) => {
  switch (action.type) {
    case "NAME_UPDATE":
      return { ...state, nameValue: action.payload };
    case "EMAIL_UPDATE":
      return { ...state, emailValue: action.payload };
    case "PASSWORD_UPDATE":
      return { ...state, passwordValue: action.payload };
    case "TOGGLE_PASSWORD_SHOW":
      return { ...state, passwordShow: !state.passwordShow };
    case "PASSWORD_STRENGTH_UPDATE":
      return { ...state, passwordStrength: action.payload };
    case "PASSWORD_STRENGTH_COLOR_UPDATE":
      return { ...state, passwordStrengthColor: action.payload };
    case "LOADING_STATUS_UPDATE":
      return { ...state, loading: !state.loading };
    default: break;
  }
};
