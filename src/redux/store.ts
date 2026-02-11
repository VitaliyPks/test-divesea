import { configureStore } from "@reduxjs/toolkit";
import nftReducer from "@redux/nftSlice/nftSlice";

const store = configureStore({
  devTools: true,
  reducer: { nft: nftReducer },
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
