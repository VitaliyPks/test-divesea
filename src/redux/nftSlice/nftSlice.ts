import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {
  generateRandomBid,
  getRandomImage,
  generateId,
  generateEndTime,
} from "utils/helpers";
import { MOCK_DATA } from "utils/constants";

import { INFTItem, INFTState } from "types/index";

import { fetchNFTsFromAPI } from "services/api";

const initialState: INFTState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchNFTs = createAsyncThunk<
  INFTItem[],
  void,
  { rejectValue: string }
>("nft/fetchNFTs", async (_, thunkAPI) => {
  try {
    const apiNFTs = (await fetchNFTsFromAPI()) || MOCK_DATA;

    const nftItems: INFTItem[] = apiNFTs.map((item) => ({
      id: generateId(),
      name: item.name,
      image: getRandomImage(),
      endTime: generateEndTime(),
      currentBid: generateRandomBid(),
    }));

    return nftItems;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch NFT data");
  }
});

const nftSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {
    clearNFTs: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNFTs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchNFTs.fulfilled,
        (state, action: PayloadAction<INFTItem[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        },
      )
      .addCase(fetchNFTs.rejected, (state, action) => {
        state.status = "failed";
        state.items = MOCK_DATA.map((item) => ({
          id: generateId(),
          name: item.name,
          image: getRandomImage(),
          endTime: generateEndTime(),
          currentBid: generateRandomBid(),
        }));

        state.error = action.payload || "Unknown error occurred";
      });
  },
});

export const nftActions = nftSlice.actions;
export default nftSlice.reducer;
