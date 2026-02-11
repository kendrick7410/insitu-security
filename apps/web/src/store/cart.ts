import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/data/types';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, type: 'product' | 'pack') => void;
  updateQuantity: (productId: string, type: 'product' | 'pack', quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: item => {
        const existingItem = get().items.find(
          i => i.productId === item.productId && i.type === item.type
        );

        if (existingItem) {
          set({
            items: get().items.map(i =>
              i.productId === item.productId && i.type === item.type
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },

      removeItem: (productId, type) => {
        set({
          items: get().items.filter(i => !(i.productId === productId && i.type === type)),
        });
      },

      updateQuantity: (productId, type, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, type);
          return;
        }

        set({
          items: get().items.map(i =>
            i.productId === productId && i.type === type ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: 'insitu-cart',
    }
  )
);
