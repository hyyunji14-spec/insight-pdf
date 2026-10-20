
"use client";

import Link from "next/link";
import { useMemo } from "react";
import { CoverPlaceholder } from "@/components/cover-placeholder";
import { useCart } from "@/components/cart-provider";
import { getProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

export function CartView() {
  const {
    items,
    ready,
    removeItem,
    toggleSelected,
    selectAll,
    selectedIds,
  } = useCart();

  const rows = useMemo(
    () =>
      items
        .map((entry) => {
          const product = getProduct(entry.productId);
          if (!product) return null;

          return { ...entry, product };
        })
        .filter((row) => row !== null),
    [items]
  );

  const selectedTotal = rows
    .filter((row) => row.selected)
    .reduce((sum, row) => sum + row.product.price, 0);

  const allSelected =
    rows.length > 0 && rows.every((row) => row.selected);

  // 장바구니 전체 비우기
  function clearCart() {
    if (
      !window.confirm(
        "장바구니에 담긴 모든 교재를 삭제하시겠습니까?"
      )
    ) {
      return;
    }

    items.forEach((item) => {
      removeItem(item.productId);
    });
  }

  if (!ready) {
    return (
      <p className="text-sm text-white">
        장바구니를 불러오는 중입니다.
      </p>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
        <p className="text-stone-800">
          장바구니가 비어 있습니다.
        </p>

        <p className="mt-2 text-sm text-stone-500">
          시리즈를 선택해 원하는 권을 담아 보세요.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-700"
        >
          시리즈 보러 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">

      {/* 장바구니 상품 목록 */}
      <section className="space-y-4">

        {/* 전체 선택 / 전체 비우기 */}
        <div className="flex items-center justify-between gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-white">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(event) =>
                selectAll(event.target.checked)
              }
              className="size-4 accent-stone-900"
            />
            전체 선택
          </label>

          <button
            type="button"
            onClick={clearCart}
            className="rounded-lg border border-white/60 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
          >
            전체 비우기
          </button>
        </div>

        <ul className="space-y-3">
          {rows.map(({ product, selected }) => (
            <li
              key={product.id}
              className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-4"
            >
              <input
                type="checkbox"
                checked={selected}
                onChange={() =>
                  toggleSelected(product.id)
                }
                className="mt-3 size-4 shrink-0 accent-stone-900"
                aria-label={`${product.name} 선택`}
              />

              <CoverPlaceholder
                title={product.seriesName}
                volume={product.volume}
                accent={product.accent}
                className="h-28 w-20 shrink-0"
              />

              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                  <p className="text-xs text-stone-500">
                    {product.seriesName}
                  </p>

                  <h2 className="font-medium text-stone-900">
                    {product.name}
                  </h2>

                  <p className="mt-1 text-sm text-stone-600">
                    {product.volume}권
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="font-medium text-stone-900">
                    {formatPrice(product.price)}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      removeItem(product.id)
                    }
                    className="text-sm text-stone-500 underline-offset-2 hover:text-stone-800 hover:underline"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 결제 예정 금액 */}
      <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-5 lg:sticky lg:top-24">
        <h2 className="font-serif text-xl text-stone-900">
          결제 예정 금액
        </h2>

        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between text-stone-600">
            <dt>선택한 권수</dt>
            <dd>{selectedIds.length}권</dd>
          </div>

          <div className="flex justify-between text-lg font-medium text-stone-900">
            <dt>합계</dt>
            <dd>{formatPrice(selectedTotal)}</dd>
          </div>
        </dl>

        {selectedIds.length === 0 ? (
          <p className="mt-4 text-sm text-stone-500">
            결제할 권을 선택해 주세요.
          </p>
        ) : (
          <Link
            href="/checkout"
            className="mt-5 flex h-11 items-center justify-center rounded-full bg-stone-900 text-sm font-medium text-white hover:bg-stone-700"
          >
            선택 상품 주문 확인
          </Link>
        )}

        <p className="mt-3 text-xs leading-5 text-stone-400">
          실제 결제, 회원가입, PDF 다운로드는 아직 제공되지 않습니다.
        </p>
      </aside>
    </div>
  );
}
