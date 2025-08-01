export const passwordStrength = (state, dispatch) => {
  const passwordLength = state.passwordValue.trim().length;
  if (passwordLength === 0) {
    dispatch({ type: "PASSWORD_STRENGTH_UPDATE", payload: "" });
    dispatch({ type: "PASSWORD_STRENGTH_COLOR_UPDATE", payload: "" });
  } else if (passwordLength < 8) {
    dispatch({
      type: "PASSWORD_STRENGTH_UPDATE",
      payload: "Weak Password",
    });
    dispatch({ type: "PASSWORD_STRENGTH_COLOR_UPDATE", payload: "danger" });
  } else if (passwordLength >= 8 && passwordLength < 12) {
    dispatch({
      type: "PASSWORD_STRENGTH_UPDATE",
      payload: "Moderately Strong Password",
    });
    dispatch({
      type: "PASSWORD_STRENGTH_COLOR_UPDATE",
      payload: "warning",
    });
  } else {
    dispatch({
      type: "PASSWORD_STRENGTH_UPDATE",
      payload: "Strong Password",
    });
    dispatch({
      type: "PASSWORD_STRENGTH_COLOR_UPDATE",
      payload: "success",
    });
  }
}