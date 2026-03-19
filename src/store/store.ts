import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createFavoriteSlice } from "./favoriteSlice";
import type { Store } from "../types/store";

export const useStore = create<Store>()(
  persist(
    immer((...a) => ({
      ...createFavoriteSlice(...a),
    })),
    {
      name: 'filmData'
    }
  )
)