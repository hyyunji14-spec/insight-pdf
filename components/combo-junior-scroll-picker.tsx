
"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";

type JuniorProduct = {
  id: string;
  name: string;
  price: number;
  volume: number;
};

type Props = {
  products: JuniorProduct[];
};

const categories = [
  {
    label: "001–200",
    title: "고1 대비 영어",
    level: "중2·중3 권장",
    description:
      "자연스럽게 고1에 대비할 수 있도록 구성된 교재입니다. 회차가 진행될수록 빈칸 추론, 문법, 어휘, 순서 배열, 위치 찾기 등 고난도 유형의 비율이 높아집니다.",
    summary: "회차당 5문제 · 200회 · 총 1,000문제",
  },
  {
    label: "V01–V70",
    title: "고등 대비 어휘",
    level: "중2·중3 권장",
    description:
      "모든 문제에 그림과 설명이 함께 제시됩니다. 설명 중 잘못된 단어를 찾는 유형으로, 이미지와 단어를 연결하면서 어휘에 대한 이해와 암기 능력을 높일 수 있습니다.",
    summary: "회차당 4문제 · 70회 · 총 280문제",
  },
];

export default function ComboJuniorScrollPicker({
  products,
}: Props) {
  const { addItem, removeItem, isInCart, items, ready } =
    useCart();

  const [category, setCategory] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);

  const current = categories[category];

  // V01~V70 상품인지 구분
  const isVocabulary = (product: JuniorProduct) =>
    /(?:^|[\s_-])V0*\d+(?!\d)/i.test(product.name) ||
    /(?:^|[\s_-])V0*\d+(?!\d)/i.test(product.id);

  // 선택한 유형에 해당하는 교재만 표시
  const visibleProducts = products
    .filter((product) => {
      if (category === 0) {
        return (
          !isVocabulary(product) &&
          product.volume >= 1 &&
          product.volume <= 200
        );
      }

      return (
        isVocabulary(product) &&
        product.volume >= 1 &&
        product.volume <= 70
      );
    })
    .sort((a, b) => a.volume - b.volume);

  const allSelected =
    visibleProducts.length > 0 &&
    visibleProducts.every((product) =>
      selected.includes(product.id)
    );

  function toggleSelect(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }

  function toggleAll() {
    if (allSelected) {
      setSelected([]);
    } else {
      setSelected(visibleProducts.map((p) => p.id));
    }
  }

  function addSelected() {
    selected.forEach((id) => {
      if (!isInCart(id)) {
        addItem(id);
      }
    });

    setSelected([]);
  }

  function toggleCart(id: string) {
    if (isInCart(id)) {
      removeItem(id);
    } else {
      addItem(id);
    }
  }

  const selectedProducts = products.filter((product) =>
    selected.includes(product.id)
  );

  const totalPrice = selectedProducts.reduce(
    (sum, product) => sum + product.price,
    0
  );

  return (
    <div className="space-y-6">

      {/* 유형 선택 */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {categories.map((item, index) => (
          <button
            key={item.label}
            type="button"
            onClick={() => {
              setCategory(index);
              setSelected([]);
            }}
            className={`rounded-2xl border p-5 text-left transition ${
              category === index
                ? "border-blue-500 bg-blue-50"
                : "border-stone-200 bg-white hover:bg-stone-50"
            }`}
          >
            <p className="text-sm text-stone-500">
              {item.level}
            </p>

            <h3 className="mt-2 text-xl font-bold text-stone-900">
              COMBO Jr {item.label}
            </h3>

            <p className="mt-2 text-sm font-medium text-blue-600">
              {item.title}
            </p>
          </button>
        ))}
      </div>

      {/* 선택한 유형 설명 */}
      <div className="rounded-2xl bg-white p-5">
        <h3 className="text-lg font-bold text-stone-900">
          COMBO Jr {current.label}
        </h3>

        <p className="mt-3 text-sm leading-7 text-stone-600">
          {current.description}
        </p>

        <p className="mt-3 text-sm text-stone-500">
          {current.summary} · PDF 교재
        </p>
      </div>

      {/* 교재 선택 */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#F5F1E8]">
            교재 선택
          </h3>

          <p className="mt-1 text-sm text-white">
            원하는 회차를 선택하거나 장바구니에 담으세요.
          </p>
        </div>

        <button
          type="button"
          onClick={toggleAll}
          disabled={visibleProducts.length === 0}
          className="shrink-0 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-stone-800 hover:bg-stone-100 disabled:opacity-50"
        >
          {allSelected ? "전체 선택 해제" : "전체 선택"}
        </button>
      </div>

      {/* 스크롤 교재 목록 */}
      <div className="max-h-[450px] space-y-2 overflow-y-auto rounded-2xl border border-stone-200 bg-white p-3">
        {visibleProducts.map((product) => {
          const inCart = ready && isInCart(product.id);

          return (
            <div
              key={product.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-stone-100 p-4 hover:bg-stone-50"
            >
              <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={selected.includes(product.id)}
                  onChange={() => toggleSelect(product.id)}
                  className="h-5 w-5 accent-blue-600"
                />

                <div>
                  <p className="font-semibold text-stone-900">
                    {product.name}
                  </p>

                  <p className="mt-1 text-sm text-stone-500">
                    {product.price.toLocaleString()}원
                  </p>
                </div>
              </label>

              <button
                type="button"
                disabled={!ready}
                onClick={() => toggleCart(product.id)}
                className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  inCart
                    ? "border border-blue-500 bg-blue-50 text-blue-600"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                } disabled:opacity-50`}
              >
                {inCart ? "✓ 담김" : "장바구니"}
              </button>
            </div>
          );
        })}

        {visibleProducts.length === 0 && (
          <div className="py-12 text-center text-stone-500">
            현재 등록된 교재가 없습니다.
          </div>
        )}
      </div>

      {/* 선택한 교재 장바구니 담기 */}
      <div className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-stone-500">
            선택한 교재
          </p>

          <p className="mt-1 text-2xl font-bold text-stone-900">
            {selected.length}권
          </p>

          <p className="mt-1 text-sm text-stone-500">
            총 {totalPrice.toLocaleString()}원
          </p>
        </div>

        <button
          type="button"
          onClick={addSelected}
          disabled={!ready || selected.length === 0}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-stone-300"
        >
          선택한 교재 장바구니 담기
        </button>
      </div>

      {/* 장바구니 현황 */}
      <div className="flex items-center justify-between rounded-xl bg-stone-100 px-5 py-4">
        <p className="font-medium text-stone-700">
          현재 장바구니
        </p>

        <p className="font-bold text-blue-600">
          {ready ? items.length : 0}권
        </p>
      </div>
    </div>
  );
}
