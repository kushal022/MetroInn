import { createContext, useReducer } from "react";
import DarkModeReducer from "./darkModeReducer";

//Todo: Create Initial State
const INITIAL_STATE = {
  darkMode: false,
};


//Todo: Create DarkMode Context Component
export const DarkModeContext = createContext(INITIAL_STATE);


//Todo: Create DarkModeContext Provider Component
export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};
