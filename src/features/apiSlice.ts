import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

interface StartGameResponse {
  gameId: string;
  score: number;
  gold: number;
  lives: number;
}

interface Ad {
  id: string;
  content: string;
}

interface FetchAdsResponse {
  ads: Ad[];
}

interface SolveAdPayload {
  gameId: string;
  adId: string;
}

interface SolveAdResponse {
  success: boolean;
  message: string;
}

interface ShopItem {
  id: string;
  name: string;
  price: number;
}

interface FetchShopItemsResponse {
  items: ShopItem[];
}

interface PurchaseItemResponse {
  success: boolean;
  message: string;
}

interface PurchaseItemPayload {
  gameId: string;
  itemId: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_BASE_URL}),
  endpoints: (builder) => ({
    startGame: builder.mutation<StartGameResponse, void>({
      query: () => ({
        url: "/game/start",
        method: "POST",
      }),
    }),
    fetchAds: builder.query<FetchAdsResponse, string>({
      query: (gameId) => `/game/${gameId}/messages`,
    }),
    solveAd: builder.mutation<SolveAdResponse, SolveAdPayload>({
      query: ({gameId, adId}) => ({
        url: `/game/${gameId}/solve/${adId}`,
        method: "POST",
      }),
    }),
    fetchShopItems: builder.query<FetchShopItemsResponse, string>({
      query: (gameId) => `/game/${gameId}/shop`,
    }),
    purchaseItem: builder.mutation<PurchaseItemResponse, PurchaseItemPayload>({
      query: ({gameId, itemId}) => ({
        url: `/game/${gameId}/shop/buy/${itemId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useStartGameMutation,
  useFetchAdsQuery,
  useSolveAdMutation,
  useFetchShopItemsQuery,
  usePurchaseItemMutation,
} = apiSlice;
