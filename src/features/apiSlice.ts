import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface StartGameResponse {
  gameId: string;
  score: number;
  gold: number;
  lives: number;
  level: number;
  highScore: number;
  turn: number;
}

interface Ad {
  adId: string;
  message: string;
  reward: number;
  expiresIn: number;
  probability: string;
}

type FetchAdsResponse = Ad[];

interface SolveAdPayload {
  gameId: string;
  adId: string;
}

interface SolveAdResponse {
  success: boolean;
  message: string;
  gold: number;
  highScore: number;
  lives: number;
  score: number;
  turn: number;
}

interface ShopItem {
  id: string;
  name: string;
  cost: number;
}

type FetchShopItemsResponse = ShopItem[];

interface PurchaseItemResponse {
  shoppingSuccess: string;
  gold: number;
  lives: number;
  level: number;
  turn: number;
}

interface PurchaseItemPayload {
  gameId: string;
  itemId: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
  endpoints: (builder) => ({
    startGame: builder.mutation<StartGameResponse, void>({
      query: () => ({
        url: '/game/start',
        method: 'POST',
      }),
    }),
    fetchAds: builder.query<FetchAdsResponse, string>({
      query: (gameId) => `/${gameId}/messages`,
    }),
    solveAd: builder.mutation<SolveAdResponse, SolveAdPayload>({
      query: ({ gameId, adId }) => ({
        url: `/${gameId}/solve/${adId}`,
        method: 'POST',
      }),
    }),
    fetchShopItems: builder.query<FetchShopItemsResponse, string>({
      query: (gameId) => `/${gameId}/shop`,
    }),
    purchaseItem: builder.mutation<PurchaseItemResponse, PurchaseItemPayload>({
      query: ({ gameId, itemId }) => ({
        url: `/${gameId}/shop/buy/${itemId}`,
        method: 'POST',
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
