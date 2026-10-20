
import ComboScrollPicker from "@/components/combo-scroll-picker";
import CoresetScrollPicker from "@/components/coreset-scroll-picker";
import Link from "next/link";
import { notFound } from "next/navigation";
import ComboJuniorScrollPicker from "@/components/combo-junior-scroll-picker";
import {
  getSeries,
  getProductsBySeries,
  seriesSlugs,
} from "@/lib/catalog";

import { getCategoriesBySeries } from "@/lib/categories";

export function generateStaticParams() {
  return seriesSlugs.map((slug) => ({ slug }));
}

export default async function SeriesPage({
  params,
}: PageProps<"/series/[slug]">) {
  const { slug } = await params;
  const series = getSeries(slug);

  if (!series) {
    notFound();
  }

  const categories = getCategoriesBySeries(series.slug);
  const seriesProducts = getProductsBySeries(series.slug);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">

      {/* 시리즈 목록으로 돌아가기 */}
      <Link
        href="/"
        className="text-sm text-white transition-colors hover:text-white/80"
      >
        ← 시리즈 목록
      </Link>

      {/* 시리즈 소개 */}
      <header className="mt-6 max-w-2xl">
        <p className="text-sm text-white">
          {series.tag}
        </p>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[#F5F1E8]">
  {series.name}
</h1>

        <p className="mt-3 text-base leading-7 text-white">
          {series.description}
        </p>
      </header>

      {/* 교재 카테고리 */}
      <section className="mt-10">
        <h2 className="mb-5 text-xl font-bold text-white">
          교재 카테고리
        </h2>

        {series.slug === "combo" ? (
          <div className="space-y-6">

            {/* COMBO 설명 카드 */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <h3 className="text-2xl font-bold text-stone-900">
                COMBO 시리즈
              </h3>

              <p className="mt-3 text-stone-600">
                매일 6문제로 완성하는 수능 영어 실전 학습
              </p>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                학습 수준에 따라 교재를 선택할 수 있습니다.
                학년 구분은 참고용이며, 회차가 진행될수록
                고난도 문제의 비중이 높아집니다.
              </p>
            </div>

            <ComboScrollPicker products={seriesProducts} />
          </div>
          ) : series.slug === "combo-junior" ? (
            <div className="space-y-6">
              <div className="rounded-2xl border border-stone-200 bg-white p-6">
                <h3 className="text-2xl font-bold text-stone-900">
                  COMBO Junior 시리즈
                </h3>
          
                <p className="mt-3 text-stone-600">
                  중학생을 위한 고등 영어 대비 학습
                </p>
          
                <p className="mt-2 text-sm leading-6 text-stone-500">
                  일반 영어 001–200과 어휘 V01–V70 중
                  필요한 유형과 회차를 선택할 수 있습니다.
                  학년 구분은 참고용입니다.
                </p>
              </div>
          
              <ComboJuniorScrollPicker products={seriesProducts} />
            </div>
        ) : series.slug === "coreset" ? (
          <div className="space-y-6">

            {/* CORE SET 설명 카드 */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <h3 className="text-2xl font-bold text-stone-900">
                CORE SET 시리즈
              </h3>

              <p className="mt-3 text-stone-600">
                수능 영어 핵심 유형별 집중 학습
              </p>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                빈칸 추론, 어법, 어휘, 순서 배열,
                문장 삽입 등 필요한 유형을 선택해
                집중적으로 학습할 수 있습니다.
              </p>
            </div>

            <CoresetScrollPicker products={seriesProducts} />
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/series/${series.slug}/${category.id}`}
                className="flex items-center justify-between border-b border-stone-100 px-5 py-5 transition-colors last:border-b-0 hover:bg-stone-50"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: series.accent }}
                  >
                    <span className="text-xl">📚</span>
                  </div>

                  <span className="font-medium text-stone-900">
                    {category.name}
                  </span>
                </div>

                <span className="text-xl text-stone-400">
                  →
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
