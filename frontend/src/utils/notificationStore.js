import axios from "axios";
import { create } from "zustand";
import { BASE_URL } from "../config";

export const useNotificationStore = create((set) => ({
  number: 0,
  fetch: async () => {
    const res = await axios.get(`${BASE_URL}/users/notification`, {
      withCredentials: true,
    });
    console.log(res);
    set({ number: res.data });
  },
  decrease: () => {
    set((prev) => ({ number: prev.number - 1 }));
  },
  reset: () => {
    set({ number: 0 });
  },
}));
