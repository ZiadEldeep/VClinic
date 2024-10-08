import { create } from 'zustand';

interface CartProduct {
  title: string;
  photo: string;
  price: number;
  salesPrice: number;
  rating: number;
  quantity: number;
}

interface CartState {
  cart: CartProduct[];
  addToCart: (product: Omit<CartProduct, 'quantity'>) => void;
  removeFromCart: (title: string) => void;
  isInCart: (title: string) => boolean;  // Check if the product is in the cart
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  addToCart: (product) => {
    set((state) => {
      const existingProduct = state.cart.find((item) => item.title === product.title);
      if (existingProduct) {
        return {
          cart: state.cart.map((item) =>
            item.title === product.title
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }
    });
  },
  removeFromCart: (title) => {
    set((state) => ({
      cart: state.cart.filter((product) => product.title !== title),
    }));
  },
  isInCart: (title) => {
    return !!get().cart.find((product) => product.title === title);
  },
}));
