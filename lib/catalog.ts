
export type SeriesSlug = "combo" | "combo-junior" | "coreset";

export type Series = {
  slug: SeriesSlug;
  name: string;
  englishName: string;
  tag: string;
  description: string;
  accent: string;
  volumeCount: number;
};

export type Product = {
  id: string;
  seriesSlug: SeriesSlug;
  seriesName: string;
  name: string;
  volume: number;
  price: number;
  accent: string;
  categoryId?: string;
};

// 교재 시리즈 정보
export const seriesList: Series[] = [
  {
    slug: "combo",
    name: "콤보",
    englishName: "Combo",
    tag: "고등 종합",
    description:
      "<콤보>는 수능 및 내신에 대비한 실력을 향상시키고, 꾸준히 공부하는 습관을 키워줍니다.",
    accent: "#F58FB0",
    volumeCount: 700,
  },
  {
    slug: "combo-junior",
    name: "콤보 주니어",
    englishName: "Combo Junior",
    tag: "중등 입문",
    description:
      "<콤보 주니어>는 중학생 때부터 수능형 문제에 자연스럽고 빠르게 적응할 수 있도록 해 줍니다.",
    accent: "#82C94B",
    volumeCount: 200,
  },
  {
    slug: "coreset",
    name: "코어셋",
    englishName: "Coreset",
    tag: "수능 및 내신 영어의 약점을 해결",
    description:
      "시험과 내신에 자주 나오는 핵심만 모아 집중 학습할 수 있는 시리즈입니다.",
    accent: "#69BEF5",
    volumeCount: 50,
  },
];

// 시리즈별 가격
const PRICE_BY_SERIES: Record<SeriesSlug, number> = {
  combo: 3000,
  "combo-junior": 2000,
  coreset: 4500,
};

// 개별 교재 자동 생성
const generatedProducts: Product[] = seriesList
  .filter((series) => series.slug !== "coreset")
  .flatMap((series) =>
  Array.from({ length: series.volumeCount }, (_, index) => {
    const volume = index + 1;

    return {
      id: `${series.slug}-${volume}`,
      seriesSlug: series.slug,
      seriesName: series.name,
      name: `${series.slug === "combo" ? "CB" : series.slug === "combo-junior" ? "CBJ" : "CORE"}-${volume}`,
      volume,
      price: PRICE_BY_SERIES[series.slug],
      accent: series.accent,
    };
  }),
);

type CoresetCategory = {
  id: string;
  prefix: string;
  count: number;
};

// Coreset 유형별 권수 설정
const CORESET_CATEGORIES: CoresetCategory[] = [
  { id: "b", prefix: "B", count: 15 },
  { id: "bx", prefix: "Bx", count: 30 },
  { id: "mini-b", prefix: "mini B", count: 15 },
  { id: "g", prefix: "G", count: 15 },
  { id: "gx-2022-2024", prefix: "Gx", count: 15 },
  { id: "gx-2025", prefix: "Gx", count: 15 },
  { id: "v", prefix: "V", count: 15 },
  { id: "vx-2022-2024", prefix: "Vx", count: 15 },
  { id: "vx-2025", prefix: "Vx", count: 15 },
  { id: "a", prefix: "A", count: 15 },
  { id: "l", prefix: "L", count: 15 },
  { id: "t", prefix: "T", count: 15 },
  { id: "u", prefix: "U", count: 15 },
  { id: "h", prefix: "H", count: 15 },
  { id: "hm", prefix: "HM", count: 15 },
  { id: "s", prefix: "S", count: 15 },
  { id: "2q", prefix: "2Q", count: 15 },
];

const coresetProducts: Product[] = CORESET_CATEGORIES.flatMap(
  (category) =>
    Array.from({ length: category.count }, (_, index) => {
      const volume = index + 1;

      return {
        id: `coreset-${category.id}-${volume}`,
        seriesSlug: "coreset" as SeriesSlug,
        seriesName: "코어셋",
        name: `${category.prefix}-${String(volume).padStart(2, "0")}`,
        volume,
        price: 4000,
        accent: "#69BEF5",
        categoryId: category.id,
      };
    })
);

// 최종 상품 목록
export const products: Product[] = [
  ...generatedProducts,
  ...coresetProducts,
];

// 시리즈 조회
export function getSeries(slug: string): Series | undefined {
  return seriesList.find((series) => series.slug === slug);
}

// 해당 시리즈의 교재 목록 조회
export function getProductsBySeries(
  slug: SeriesSlug
): Product[] {
  return products.filter(
    (product) => product.seriesSlug === slug
  );
}

// 개별 교재 조회
export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

// 전체 시리즈 주소 목록
export const seriesSlugs = seriesList.map(
  (series) => series.slug
);
