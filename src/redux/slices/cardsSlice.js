import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Mock function to simulate API call for fetching cards
const fetchCardsAPI = async () => {
  try {
    const response = await fetch("http://localhost:57679/Product", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cards from API");
    }

    const cards = await response.json();
    const formattedCards = transformCards(cards); 
    //cards = formattedCards;
    // Ensures you can inspect formattedCards before returning
    return formattedCards; // ✅ No need to wrap in a new Promise

  } catch (error) {
    console.error("Error fetching cards:", error);
    return []; // Return an empty array in case of an error
  }
};

const transformCards = (apiResponse) => {
  return apiResponse.map((card) => ({
    id:card.id,
    title: card.productName,          // Map 'productName' to 'title'
    description: card.productsDescription, // Map 'productsDescription' to 'description'
    price: card.productPrice,         // Map 'productPrice' to 'price'card
    minimumOrder: card.productQuantity, 
    imagePath:card.imageUrl,// Map 'productQuantity' to 'minimumOrder'
  }));
};

// Mock function to simulate API call for adding a card
const addCardAPI = async (card) => {
  try {
    const formData = new FormData();
    formData.append("file", card.imagePath);

    console.log("Uploading image...");

    // ✅ First API Call: Upload Image
    const uploadResponse = await fetch("http://localhost:57679/uploadimage", {
      method: "POST",
      headers: {
        accept: "application/json",  // ✅ No 'Content-Type' for FormData
      },
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error("Image upload failed!");
    }
    const uploadResult = await uploadResponse.json();
    console.log("Image uploaded successfully:", uploadResult);

    // ✅ Second API Call: uploadimages
    console.log("Calling second API: uploadimages...");

    const secondResponse = await fetch("http://localhost:57679/Product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        ProductName: card.title,
        ProductsDescription: card.description,
        ImageUrl: uploadResult,
        Id:0,
        ProductPrice:card.price,
        ProductQuantity:card.minimumOrder,
      }),
    });
    
    if (!secondResponse.ok) {
      throw new Error("Second API call failed!");
    }    
    const secondResult = await secondResponse.json();
    console.log("Second API Response:", secondResult);

    return secondResult;  // ✅ Return final result
  } catch (error) {
    console.error("Error:", error);
  }
};

 const fetchCardsAPIById = async () => {
    try {
      const response = await fetch("http://localhost:57679/Product", {
        method: "GET",
        headers: {
          accept: "application/json",
        },
        body: JSON.stringify(id),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cards from API");
      }
      debugger;
      const cards = await response.json();
      const formattedCards = transformCards(cards); // Ensures you can inspect formattedCards before returning
      return formattedCards; // ✅ No need to wrap in a new Promise
    } catch (error) {
      console.error("Error fetching cards:", error);
      return []; // Return an empty array in case of an error
    }
  };


export const fetchCards = createAsyncThunk("cards/fetchCards", async () => {
  const response = await fetchCardsAPI();
  return response;
});

export const addCard = createAsyncThunk("cards/addCard", async (card) => {
  const response = await addCardAPI(card);
  return response;
});


export const fetchCardById = createAsyncThunk("cards/fetchCards", async () => {
  const response = await fetchCardsAPI();
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
