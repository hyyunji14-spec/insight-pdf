"use client";

import Link from "next/link";
import { useMemo } from "react";
import { CoverPlaceholder } from "@/components/cover-placeholder";
import { useCart } from "@/components/cart-provider";
import { getProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

type CheckoutViewProps = {
  buyNowProductId?: string;
};

export function CheckoutView({ buyNowProductId }: CheckoutViewProps) {
  const { selectedIds, ready } = useCart();

  const productIds = useMemo(() => {
    if (buyNowProductId) return [buyNowProductId];
    return selectedIds;
  }, [buyNowProductId, selectedIds]);

  const orderItems = productIds
    .map((id) => getProduct(id))
    .filter((product) => product !== undefined);

  const total = orderItems.reduce((sum, product) => sum + product.price, 0);

  if (!buyNowProductId && !ready) {
    return (
      <p className="text-sm text-stone-500">주문 정보를 불러오는 중입니다.</p>
    );
  }

  if (buyNowProductId && orderItems.length === 0) {
    return (
      <EmptyState
        title="바로 구매할 상품을 찾을 수 없습니다."
        href="/"
        label="시리즈로 돌아가기"
      />
    );
  }

  if (orderItems.length === 0) {
    return (
      <EmptyState
        title="주문할 상품이 없습니다."
        description="장바구니에서 결제할 권을 선택한 뒤 다시 시도해 주세요."
        href="/cart"
        label="장바구니로 이동"
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {buyNowProductId ? (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          바로 구매: 선택한 한 권만 주문 확인에 표시됩니다.
        </p>
      ) : null}

      <ul className="space-y-3">
        {orderItems.map((product) => (
          <li
            key={product.id}
            className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-4"
          >
            <CoverPlaceholder
              title={product.seriesName}
              volume={product.volume}
              accent={product.accent}
              className="h-28 w-20 shrink-0"
            />
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="text-xs text-stone-500">{product.seriesName}</p>
                <h2 className="font-medium text-stone-900">{product.name}</h2>
                <p className="mt-1 text-sm text-stone-600">{product.volume}권</p>
              </div>
              <p className="font-medium text-stone-900">
                {formatPrice(product.price)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <section className="rounded-2xl border border-stone-200 bg-white p-5">
        <div className="flex items-center justify-between text-sm text-stone-600">
          <span>주문 권수</span>
          <span>{orderItems.length}권</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-lg font-medium text-stone-900">
          <span>결제 예정 금액</span>
          <span>{formatPrice(total)}</span>
        </div>
        <button
          type="button"
          disabled
          className="mt-5 flex h-11 w-full cursor-not-allowed items-center justify-center rounded-full bg-stone-300 text-sm font-medium text-stone-500"
        >
          결제 준비 중
        </button>
        <p className="mt-3 text-center text-xs leading-5 text-stone-400">
          실제 결제, 회원가입, PDF 다운로드는 아직 구현되어 있지 않습니다.
        </p>
      </section>
    </div>
  );
}

function EmptyState({
  title,
  description,
  href,
  label,
}: {
  title: string;
  description?: string;
  href: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
      <p className="text-stone-800">{title}</p>
      {description ? (
        <p className="mt-2 text-sm text-stone-500">{description}</p>
      ) : null}
      <Link
        href={href}
        className="mt-6 inline-flex rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-700"
      >
        {label}
      </Link>
    </div>
  );
}
