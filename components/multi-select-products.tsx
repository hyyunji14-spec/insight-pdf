"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { ProductActions } from "@/components/product-actions";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/catalog";

type Props = {
  products: Product[];
};

export function MultiSelectProducts({ products }: Props) {
  const { addItem, isInCart, ready } = useCart();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const allSelected =
    products.length > 0 &&
    products.every((p) => selectedIds.includes(p.id));

  const selectedProducts = products.filter((p) =>
    selectedIds.includes(p.id)
  );

  const totalPrice = selectedProducts.reduce(
    (sum, product) => sum + product.price,
    0
  );

  function toggleProduct(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
    setMessage("");
  }

  function toggleAll() {
    setSelectedIds(
      allSelected ? [] : products.map((p) => p.id)
    );
    setMessage("");
  }

  function addSelectedToCart() {
    if (!ready) return;

    const newProducts = selectedProducts.filter(
      (product) => !isInCart(product.id)
    );

    newProducts.forEach((product) => {
      addItem(product.id);
    });

    const skipped = selectedProducts.length - newProducts.length;

    setMessage(
      `${newProducts.length}권을 장바구니에 담았습니다.` +
      (skipped > 0
        ? ` 이미 담긴 ${skipped}권은 제외했습니다.`
        : "")
    );

    setSelectedIds([]);
  }

  return (
    <section className="mt-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-stone-100 p-4">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={toggleAll}
            disabled={products.length === 0}
            className="h-5 w-5 accent-blue-600"
          />
          <span className="font-medium">전체 선택</span>
        </label>

        <button
          type="button"
          onClick={() => setSelectedIds([])}
          className="text-sm text-stone-600 hover:underline"
        >
          선택 해제
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={selectedIds.includes(product.id)}
                onChange={() => toggleProduct(product.id)}
                className="h-5 w-5 accent-blue-600"
              />

              <span className="text-lg font-semibold">
                {product.name}
              </span>
            </label>

            <p className="mt-3 text-stone-600">
              {formatPrice(product.price)}
            </p>

            <p className="mt-2 text-xs text-stone-500">
              PDF 교재
            </p>

            <div className="mt-5">
              <ProductActions productId={product.id} />
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="rounded-xl border bg-white p-8 text-center text-stone-500">
          등록된 교재가 없습니다.
        </p>
      )}

      <div className="sticky bottom-4 z-10 mt-8 rounded-2xl border border-stone-200 bg-white p-5 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-bold">
              선택한 교재: {selectedProducts.length}권
            </p>
            <p className="mt-1 text-lg font-bold">
              {formatPrice(totalPrice)}
            </p>
          </div>

          <button
            type="button"
            disabled={!ready || selectedProducts.length === 0}
            onClick={addSelectedToCart}
            className="rounded-xl bg-stone-900 px-5 py-3 font-medium text-white hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            선택 상품 장바구니 담기
          </button>
        </div>

        {message && (
          <p role="status" className="mt-3 text-sm text-green-700">
            {message}
          </p>
        )}
      </div>
    </section>
  );
}