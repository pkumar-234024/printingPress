import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Mock function to simulate API call for fetching cards
const fetchCardsAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(localStorage.getItem("cards") || "[]"));
    }, 500);
  });
};

// Mock function to simulate API call for adding a card
const addCardAPI = (card) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cards = JSON.parse(localStorage.getItem("cards") || "[]");
      const newCards = [...cards, card];
      localStorage.setItem("cards", JSON.stringify(newCards));
      resolve(card);
    }, 500);
  });
};

export const fetchCards = createAsyncThunk("cards/fetchCards", async () => {
  const response = await fetchCardsAPI();
  return response;
});

export const addCard = createAsyncThunk("cards/addCard", async (card) => {
  const response = await addCardAPI(card);
  return response;
});

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    cards: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cards = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.cards.push(action.payload);
      });
  },
});

export default cardsSlice.reducer;
