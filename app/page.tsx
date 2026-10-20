
import Link from "next/link";
import { seriesList } from "@/lib/catalog";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16">

      {/* 메인 소개 */}
      <section className="max-w-2xl">
        <p className="text-sm font-medium tracking-wide text-white">
          인사이트 영어 교재
        </p>

        <h1 className="mt-2 font-sans text-4xl font-semibold leading-tight tracking-tight text-[#F5F1E8] sm:text-5xl">
  콤보, 콤보 주니어, 코어셋
</h1>

        <p className="mt-4 text-base leading-7 text-white">
          시리즈를 선택한 뒤 필요한 권만 장바구니에 담거나 바로 구매할 수
          있습니다. 실제 결제와 다운로드는 다음 단계에서 연결됩니다.
        </p>
      </section>

      {/* 교재 시리즈 목록 */}
      <section className="mt-10 grid gap-5 sm:grid-cols-2">
        {seriesList.map((series) => (
          <Link
            key={series.slug}
            href={`/series/${series.slug}`}
            className={`group flex flex-col rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-md ${
              series.slug === "coreset"
                ? "sm:col-span-2 sm:w-[calc(50%-0.625rem)] sm:justify-self-center"
                : ""
            }`}
          >
            {/* 색깔 카드 */}
            <div
              className="mb-6 h-36 rounded-2xl"
              style={{ backgroundColor: series.accent }}
            >
              <div className="flex h-full flex-col justify-between p-5 text-white">
                <span className="text-xs uppercase tracking-[0.2em] text-white/80">
                  Series
                </span>

                {/* 영어 교재명 */}
                <span className="font-sans text-3xl font-bold">
                  {series.englishName}
                </span>
              </div>
            </div>

            {/* 한글 교재 설명 */}
            <p className="text-xs font-medium text-stone-500">
              {series.tag}
            </p>

            <h2 className="mt-1 text-xl font-medium text-stone-900">
              {series.name}
            </h2>

            <p className="mt-2 flex-1 text-sm leading-6 text-stone-600">
              {series.description}
            </p>

            <p className="mt-5 text-sm text-stone-800 group-hover:underline">
              {series.volumeCount}권 보기
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
