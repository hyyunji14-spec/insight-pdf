
"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";

type ComboProduct = {
  id: string;
  name: string;
  price: number;
  volume: number;
};

type Props = {
  products: ComboProduct[];
};

const categories = [
  {
    label: "101–200",
    start: 101,
    end: 200,
    level: "고1 권장",
    title: "기본·발전",
    description:
      "고1 학생을 위한 교재로, 회차가 진행될수록 고난도 유형과 고2·고3 문제의 비율이 높아집니다.",
  },
  {
    label: "201–300",
    start: 201,
    end: 300,
    level: "고2 권장",
    title: "심화·완성",
    description:
      "고2 학생을 위한 교재로, 회차가 진행될수록 고난도 유형과 고3 문제의 비율이 높아집니다.",
  },
  {
    label: "301–700",
    start: 301,
    end: 700,
    level: "고3·N수 권장",
    title: "실전·고난도",
    description:
      "수능 대비를 위한 고난도 유형 중심의 교재입니다. 빈칸 추론, 어휘, 어법, 순서 배열, 문장 삽입 등을 학습합니다.",
  },
];

export default function ComboScrollPicker({ products }: Props) {
  const { addItem, removeItem, isInCart, items, ready } = useCart();

  const [category, setCategory] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);

  const current = categories[category];

  const visibleProducts = products
    .filter(
      (product) =>
        product.volume >= current.start &&
        product.volume <= current.end
    )
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
      setSelected(visibleProducts.map((product) => product.id));
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

  return (
    <div className="space-y-6">

      {/* 카테고리 선택 */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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
              COMBO {item.label}
            </h3>

            <p className="mt-2 text-sm font-medium text-blue-600">
              {item.title}
            </p>
          </button>
        ))}
      </div>

      {/* 선택한 카테고리 설명 */}
      <div className="rounded-2xl bg-stone-50 p-5">
        <h3 className="text-lg font-bold text-stone-900">
          COMBO {current.label}
        </h3>

        <p className="mt-2 text-sm leading-7 text-stone-600">
          {current.description}
        </p>

        <p className="mt-2 text-sm text-stone-500">
          회차당 6문제 · PDF 교재
        </p>
      </div>

      {/* 교재 선택 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-stone-900">
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
          className="rounded-lg border border-stone-300 px-4 py-2 text-sm hover:bg-stone-50 disabled:opacity-50"
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

      {/* 선택한 교재 일괄 담기 */}
      <div className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-stone-500">
            선택한 교재
          </p>

          <p className="mt-1 text-2xl font-bold text-stone-900">
            {selected.length}권
          </p>

          <p className="mt-1 text-sm text-stone-500">
            총{" "}
            {products
              .filter((product) => selected.includes(product.id))
              .reduce((sum, product) => sum + product.price, 0)
              .toLocaleString()}
            원
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
