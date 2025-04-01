import { createSlice } from "@reduxjs/toolkit";
import { fetchAllowedRoutes } from "./routeThunk";

interface RoutesState {
  allowedRoutes: string[];
  loading: boolean;
}

const initialState: RoutesState = {
  allowedRoutes: ["/"],
  loading: true,
};

export const routesSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllowedRoutes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllowedRoutes.fulfilled, (state, action) => {
        state.allowedRoutes = action.payload;
        state.loading = false;
      });
  },
});

export default routesSlice.reducer;
