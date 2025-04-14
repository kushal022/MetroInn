import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  city: null,
  date: [],
  options: {
    adult: null,
    children: null, // Fixed lowercase "children" for consistency
    room: null,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

// Reducer function
const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      // return {
      //     ...state,
      //     ...action.payload, // Ensure previous state structure is maintained
      // };
      return action.payload;

    case "RESET_SEARCH": // Fixed action type (underscore instead of space)
      return INITIAL_STATE;
    default:
      return state;
  }
};

// Context Provider
export const SearchContextProvider = ({ children }) => {
  // Fixed `childrenCompo` to `children`
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      // value={{ ...state, dispatch }}
      value={{
        city: state.city,
        date: state.date,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
