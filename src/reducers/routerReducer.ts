import {createSlice} from "@reduxjs/toolkit";

// expo router cant indentify the proper goBack()
interface RouterProps {
  previousRoutes: string[];
}

const initialState: RouterProps = {
  previousRoutes: [],
};

export const routerReducer = createSlice({
  name: "router",
  initialState,
  reducers: {
    handlePreviousRoute: (state, action) => {
      //   state.previousRoutes = [...state.previousRoutes, action.payload];
      const isDuplicate = state.previousRoutes.includes(action.payload);

      if (!isDuplicate) {
        // If the string is not a duplicate, add it to the array
        state.previousRoutes = [...state.previousRoutes, action.payload];
      }
    },
    handleRemovePreviousRoute: (state, action) => {
      state.previousRoutes = [...state.previousRoutes].filter(
        (item) => item !== action.payload
      );
    },
  },
});

export const {handlePreviousRoute, handleRemovePreviousRoute} =
  routerReducer.actions;

export default routerReducer.reducer;
