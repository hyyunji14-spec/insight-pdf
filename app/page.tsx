
import { seriesList } from "@/lib/catalog";
import SeriesPreviewCard from "@/components/series-preview-card";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <section className="max-w-2xl">
        <p className="text-sm font-medium tracking-wide text-white">
          인사이트 영어 교재
        </p>

        <h1 className="mt-2 font-sans text-4xl font-semibold leading-tight tracking-tight text-[#F5F1E8] sm:text-5xl">
          콤보, 콤보 주니어, 코어셋
        </h1>

        <p className="mt-4 text-base leading-7 text-white">
          시리즈를 선택한 뒤 필요한 권만 장바구니에 담거나
          바로 구매할 수 있습니다. 실제 결제와 다운로드는
          다음 단계에서 연결됩니다.
        </p>
      </section>

      <section className="mt-10 grid gap-5 sm:grid-cols-2">
        {seriesList.map((series) => (
          <div
            key={series.slug}
            className={
              series.slug === "coreset"
                ? "sm:col-span-2 sm:w-[calc(50%-0.625rem)] sm:justify-self-center"
                : ""
            }
          >
            <SeriesPreviewCard
              slug={series.slug}
              name={series.name}
              englishName={series.englishName}
              tag={series.tag}
              description={series.description}
              accent={series.accent}
              volumeCount={series.volumeCount}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
