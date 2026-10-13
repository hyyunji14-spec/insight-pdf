"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartEntry = {
  productId: string;
  selected: boolean;
};

type CartContextValue = {
  items: CartEntry[];
  ready: boolean;
  addItem: (productId: string) => { added: boolean };
  removeItem: (productId: string) => void;
  toggleSelected: (productId: string) => void;
  selectAll: (selected: boolean) => void;
  isInCart: (productId: string) => boolean;
  selectedIds: string[];
};

const STORAGE_KEY = "english-pdf-store-cart";

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartEntry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartEntry[];
    if (!Array.isArray(parsed)) return [];
    const seen = new Set<string>();
    return parsed.filter((entry) => {
      if (!entry?.productId || seen.has(entry.productId)) return false;
      seen.add(entry.productId);
      return true;
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartEntry[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = useCallback((productId: string) => {
    if (items.some((entry) => entry.productId === productId)) {
      return { added: false };
    }
    setItems((current) => {
      if (current.some((entry) => entry.productId === productId)) {
        return current;
      }
      return [...current, { productId, selected: true }];
    });
    return { added: true };
  }, [items]);

  const removeItem = useCallback((productId: string) => {
    setItems((current) =>
      current.filter((entry) => entry.productId !== productId),
    );
  }, []);

  const toggleSelected = useCallback((productId: string) => {
    setItems((current) =>
      current.map((entry) =>
        entry.productId === productId
          ? { ...entry, selected: !entry.selected }
          : entry,
      ),
    );
  }, []);

  const selectAll = useCallback((selected: boolean) => {
    setItems((current) => current.map((entry) => ({ ...entry, selected })));
  }, []);

  const isInCart = useCallback(
    (productId: string) => items.some((entry) => entry.productId === productId),
    [items],
  );

  const selectedIds = useMemo(
    () => items.filter((entry) => entry.selected).map((entry) => entry.productId),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      ready,
      addItem,
      removeItem,
      toggleSelected,
      selectAll,
      isInCart,
      selectedIds,
    }),
    [
      items,
      ready,
      addItem,
      removeItem,
      toggleSelected,
      selectAll,
      isInCart,
      selectedIds,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
