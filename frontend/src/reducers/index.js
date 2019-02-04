import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import loginReducer from "./reducer_login";

const rootReducer = combineReducers({
  login: loginReducer,
  form: formReducer
});

export default rootReducer;
