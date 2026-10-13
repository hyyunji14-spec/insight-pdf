
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSeries, seriesSlugs } from "@/lib/catalog";
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

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        className="text-sm text-stone-500 transition-colors hover:text-stone-800"
      >
        ← 시리즈 목록
      </Link>

      <header className="mt-6 max-w-2xl">
        <p className="text-sm text-stone-500">
          {series.tag}
        </p>

        <h1 className="mt-2 text-4xl font-bold text-stone-900">
          {series.name}
        </h1>

        <p className="mt-3 text-base leading-7 text-stone-600">
          {series.description}
        </p>
      </header>

      <section className="mt-10">
        <h2 className="mb-5 text-xl font-bold text-stone-900">
          교재 카테고리
        </h2>

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
      </section>
    </main>
  );
}
