
"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@/lib/catalog";

type Props = {
  products: Product[];
};

const categories = [
  {
    id: "b",
    title: "빈칸 추론",
    range: "B1–B12",
    description: "빈칸 추론 문제 모음집",
    details: "12권 · 총 1,188문제 · 권당 99문제",
    levels: "B1–B3 고1 / B4–B6 고2 / B7–B12 고3",
  },
  {
    id: "bx",
    title: "빈칸 추론 추가",
    range: "Bx1–Bx6",
    description: "기본 빈칸 추론 교재를 마친 후 추가 학습하는 보충용 교재",
    details: "6권 · 총 594문제 · 권당 99문제",
    levels: "Bx1–Bx2 고1 / Bx3–Bx4 고2 / Bx5–Bx6 고3",
  },
  {
    id: "g",
    title: "어법",
    range: "G1–G10",
    description: "수능 및 내신 대비 어법 문제 모음집",
    details: "10권 · 총 990문제 · 권당 99문제",
    levels: "G1–G4 고1 / G5–G7 고2 / G8–G10 고3",
  },
  {
    id: "v",
    title: "어휘",
    range: "V1–V8",
    description:
      "어휘 선택 및 틀린 단어 찾기 문제 모음집. V1·V3·V5·V6·V7은 단어 선택형, V2·V4·V8은 혼합형입니다.",
    details: "8권 · 총 792문제 · 권당 99문제",
    levels: "V1–V2 고1 / V3–V4 고2 / V5–V8 고3",
  },
  {
    id: "a",
    title: "순서 배열",
    range: "A1–A5",
    description: "글의 논리적 흐름에 맞게 순서를 배열하는 문제 모음집",
    details: "5권 · 총 429문제",
    levels: "A1 고1(66) / A2 고2(66) / A3–A5 고3(각 99)",
  },
  {
    id: "l",
    title: "위치 찾기",
    range: "L1–L5",
    description: "글의 흐름에 맞는 문장 삽입 위치를 찾는 문제 모음집",
    details: "5권 · 총 429문제",
    levels: "L1 고1(66) / L2 고2(66) / L3–L5 고3(각 99)",
  },
  {
    id: "t",
    title: "주제 추론",
    range: "T1–T5",
    description: "글의 핵심 주제를 추론하는 문제 모음집. T3은 우리말 선택지로 구성됩니다.",
    details: "5권 · 총 396문제",
    levels: "T1 고1(66) / T2–T3 고2(각 66) / T4–T5 고3(각 99)",
  },
  {
    id: "u",
    title: "무관한 문장 찾기",
    range: "U1–U5",
    description: "글의 전체 흐름과 관계없는 문장을 찾는 문제 모음집",
    details: "5권 · 총 429문제",
    levels: "U1 고1(66) / U2 고2(66) / U3–U5 고3(각 99)",
  },
  {
    id: "h",
    title: "제목 추론",
    range: "H1–H4",
    description: "글의 내용을 바탕으로 적절한 제목을 찾는 문제 모음집",
    details: "4권 · 총 330문제",
    levels: "H1 고1(66) / H2 고2(66) / H3–H4 고3(각 99)",
  },
  {
    id: "hm",
    title: "함축 의미 추론",
    range: "HM3–HM4",
    description: "문맥 속에 담긴 함축적 의미를 추론하는 고난도 문제 모음집",
    details: "2권 · 총 120문제 · 권당 60문제",
    levels: "HM3–HM4 고3",
  },
  {
    id: "s",
    title: "문단 요약",
    range: "S1–S3",
    description: "글의 핵심 내용을 파악하고 요약하는 문제 모음집",
    details: "3권 · 총 220문제",
    levels: "S1 고1(60) / S2 고2(60) / S3 고3(100)",
  },
  {
    id: "2q",
    title: "장문 독해",
    range: "2Q1–2Q3",
    description: "수능 41–42번 유형의 장문 독해 문제 모음집",
    details: "3권 · 총 300문제 · 권당 100문제",
    levels: "2Q1 고1 / 2Q2 고2 / 2Q3 고3",
  },
];

function getLevel(categoryId: string, volume: number) {
  switch (categoryId) {
    case "b":
      return volume <= 3 ? "고1" : volume <= 6 ? "고2" : "고3";
    case "bx":
      return volume <= 2 ? "고1" : volume <= 4 ? "고2" : "고3";
    case "g":
      return volume <= 4 ? "고1" : volume <= 7 ? "고2" : "고3";
    case "v":
      return volume <= 2 ? "고1" : volume <= 4 ? "고2" : "고3";
    case "t":
      return volume === 1 ? "고1" : volume <= 3 ? "고2" : "고3";
    case "hm":
      return "고3";
    default:
      return volume === 1 ? "고1" : volume === 2 ? "고2" : "고3";
  }
}

function getQuestionCount(categoryId: string, volume: number) {
  if (["a", "l", "t", "u", "h"].includes(categoryId)) {
    if (categoryId === "t" && volume === 3) return 66;
    return volume <= 2 ? 66 : 99;
  }

  if (categoryId === "hm") return 60;
  if (categoryId === "s") return volume === 3 ? 100 : 60;
  if (categoryId === "2q") return 100;

  return 99;
}

export default function CoresetScrollPicker({ products }: Props) {
  const { addItem, removeItem, isInCart, items, ready } = useCart();

  const [activeCategory, setActiveCategory] = useState("b");
  const [selected, setSelected] = useState<string[]>([]);

  const current = categories.find(
    (category) => category.id === activeCategory
  )!;

  const visibleProducts = products
    .filter((product) => product.categoryId === activeCategory)
    .sort((a, b) => a.volume - b.volume);

  const selectedProducts = visibleProducts.filter(
    (product) => selected.includes(product.id)
  );

  const allSelected =
    visibleProducts.length > 0 &&
    visibleProducts.every((product) => selected.includes(product.id));

  const selectedTotal = selectedProducts.reduce(
    (sum, product) => sum + product.price,
    0
  );

  function toggleSelect(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }

  function toggleAll() {
    setSelected(
      allSelected ? [] : visibleProducts.map((product) => product.id)
    );
  }

  function addSelected() {
    selectedProducts.forEach((product) => {
      if (!isInCart(product.id)) {
        addItem(product.id);
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
      {/* 유형별 카테고리 */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => {
              setActiveCategory(category.id);
              setSelected([]);
            }}
            className={`rounded-2xl border p-4 text-left transition ${
              activeCategory === category.id
                ? "border-sky-500 bg-sky-50"
                : "border-stone-200 bg-white hover:bg-stone-50"
            }`}
          >
            <p className="text-lg font-bold text-stone-900">
              {category.id.toUpperCase()}
            </p>

            <p className="mt-1 text-sm font-medium text-stone-700">
              {category.title}
            </p>

            <p className="mt-2 text-xs text-stone-500">
              {category.range}
            </p>
          </button>
        ))}
      </div>

      {/* 유형 설명 */}
      <div className="rounded-2xl bg-sky-50 p-5 sm:p-6">
        <h3 className="text-xl font-bold text-stone-900">
          {current.title}
        </h3>

        <p className="mt-2 text-sm text-stone-700">
          {current.description}
        </p>

        <p className="mt-3 text-sm font-medium text-sky-700">
          {current.details}
        </p>

        <p className="mt-2 text-sm leading-6 text-stone-600">
          {current.levels}
        </p>

        <p className="mt-2 text-xs text-stone-500">
          ※ 학년 구분은 참고용입니다.
        </p>
      </div>

      {/* 교재 목록 헤더 */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-stone-900">
            교재 선택
          </h3>

          <p className="mt-1 text-sm text-stone-500">
            {visibleProducts.length}권의 교재
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

      {/* 스크롤 목록 */}
      <div className="max-h-[440px] space-y-2 overflow-y-auto rounded-2xl border border-stone-200 bg-white p-3">
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
                  className="h-5 w-5 accent-sky-600"
                />

                <div>
                  <p className="font-semibold text-stone-900">
                    CORE SET {product.name}
                  </p>

                  <p className="mt-1 text-xs text-stone-500">
                    {getLevel(activeCategory, product.volume)}
                    {" · "}
                    {getQuestionCount(activeCategory, product.volume)}문제
                  </p>

                  <p className="mt-1 text-sm text-stone-600">
                    {product.price.toLocaleString()}원
                  </p>
                </div>
              </label>

              <button
                type="button"
                onClick={() => toggleCart(product.id)}
                disabled={!ready}
                className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition sm:px-4 ${
                  inCart
                    ? "border border-sky-500 bg-sky-50 text-sky-700"
                    : "bg-sky-600 text-white hover:bg-sky-700"
                } disabled:opacity-50`}
              >
                {inCart ? "✓ 담김" : "장바구니"}
              </button>
            </div>
          );
        })}

        {visibleProducts.length === 0 && (
          <p className="py-10 text-center text-stone-500">
            등록된 교재가 없습니다.
          </p>
        )}
      </div>

      {/* 다중 선택 */}
      <div className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-stone-500">
            선택한 교재
          </p>

          <p className="mt-1 text-2xl font-bold text-stone-900">
            {selectedProducts.length}권
          </p>

          <p className="mt-1 text-sm text-stone-500">
            총 {selectedTotal.toLocaleString()}원
          </p>
        </div>

        <button
          type="button"
          onClick={addSelected}
          disabled={!ready || selectedProducts.length === 0}
          className="rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700 disabled:bg-stone-300"
        >
          선택한 교재 장바구니 담기
        </button>
      </div>

      {/* 장바구니 현황 */}
      <div className="flex items-center justify-between rounded-xl bg-stone-100 px-5 py-4">
        <span className="font-medium text-stone-700">
          현재 장바구니
        </span>

        <span className="font-bold text-sky-700">
          {ready ? items.length : 0}권
        </span>
      </div>
    </div>
  );
}
