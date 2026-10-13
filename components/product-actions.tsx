"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";

type ProductActionsProps = {
  productId: string;
};

export function ProductActions({ productId }: ProductActionsProps) {
  const router = useRouter();
  const { addItem, isInCart } = useCart();
  const alreadyInCart = isInCart(productId);
  const [notice, setNotice] = useState<string | null>(null);

  function handleAdd() {
    const { added } = addItem(productId);
    if (!added) {
      setNotice("이미 장바구니에 담긴 상품입니다.");
      return;
    }
    setNotice("장바구니에 담았습니다.");
  }

  function handleBuyNow() {
    router.push(`/checkout?productId=${encodeURIComponent(productId)}`);
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleAdd}
          disabled={alreadyInCart}
          className="rounded-full border border-stone-300 px-3 py-2 text-sm font-medium text-stone-800 transition-colors hover:bg-stone-100 disabled:cursor-not-allowed disabled:border-stone-200 disabled:bg-stone-100 disabled:text-stone-400"
        >
          {alreadyInCart ? "담김" : "장바구니 담기"}
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="rounded-full bg-stone-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
        >
          바로 구매
        </button>
      </div>
      {notice ? <p className="text-xs text-stone-500">{notice}</p> : null}
    </div>
  );
}
