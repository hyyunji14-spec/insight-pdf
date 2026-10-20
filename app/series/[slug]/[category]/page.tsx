
import Link from "next/link";
import { notFound } from "next/navigation";
import { MultiSelectProducts } from "@/components/multi-select-products";
export const instant = false;
import {
  getSeries,
  getProductsBySeries,
} from "@/lib/catalog";

import { getCategoriesBySeries } from "@/lib/categories";


export default async function CategoryPage({
  params,
}: {
  params: Promise<{
    slug: string;
    category: string;
  }>;
}) {
  const { slug, category: categoryId } = await params;

  // 시리즈 정보 조회
  const series = getSeries(slug);

  if (!series) {
    notFound();
  }

  // 카테고리 정보 조회
  const category = getCategoriesBySeries(series.slug).find(
    (item) => item.id === categoryId
  );

  if (!category) {
    notFound();
  }

  // 해당 시리즈의 전체 상품
  const allProducts = getProductsBySeries(series.slug);

  // Combo 및 Combo Junior 번호별 범위
  const ranges: Record<string, [number, number]> = {
    "cb-101-200": [101, 200],
    "cb-201-300": [201, 300],
    "cb-301-400": [301, 400],
    "cb-401-500": [401, 500],
    "cb-501-600": [501, 600],
    "cb-601-700": [601, 700],
    "cbj-001-100": [1, 100],
    "cbj-101-200": [101, 200],
  };

  const range = ranges[categoryId];

  // 카테고리에 해당하는 상품만 표시
  const products = range
    ? allProducts.filter(
        (product) =>
          product.volume >= range[0] &&
          product.volume <= range[1]
      )
    : allProducts.filter(
        (product) => product.categoryId === categoryId
      );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">

      {/* 뒤로 가기 */}
      <Link
        href={`/series/${slug}`}
        className="text-sm text-white transition-colors hover:text-white/80"
      >
        ← {series.name} 목록으로
      </Link>

      {/* 카테고리 제목 */}
      <header className="mt-6">
        <h1 className="text-3xl font-bold text-white">
          {category.name}
        </h1>

        <p className="mt-2 text-white">
          총 {products.length}권의 교재
        </p>
      </header>

      {/* 상품 목록 및 다중 선택 */}
      {products.length === 0 ? (
        <div className="mt-10 rounded-xl border border-stone-200 bg-white p-8 text-center text-stone-500">
          이 카테고리의 개별 교재 데이터는
          아직 등록되지 않았습니다.
        </div>
      ) : (
        <MultiSelectProducts products={products} />
      )}

    </main>
  );
}
