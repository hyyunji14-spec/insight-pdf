
export type SeriesSlug =
  | "combo"
  | "combo-junior"
  | "coreset";

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
      "수능 및 내신에 대비한 실력을 향상시키고, 꾸준히 공부하는 습관을 키워줍니다.",
    accent: "#F58FB0",
    volumeCount: 700,
  },
  {
    slug: "combo-junior",
    name: "콤보 주니어",
    englishName: "Combo Junior",
    tag: "중등 입문",
    description:
      "중학생 때부터 수능형 문제에 자연스럽고 빠르게 적응할 수 있도록 해 줍니다.",
    accent: "#82C94B",
    volumeCount: 270,
  },
  {
    slug: "coreset",
    name: "코어셋",
    englishName: "Coreset",
    tag: "수능 영어 유형별 집중 학습",
    description:
      "빈칸 추론, 어법, 어휘, 순서 배열 등 수능 영어의 핵심 유형을 집중적으로 학습할 수 있는 교재입니다.",
    accent: "#69BEF5",
    volumeCount: 68,
  },
];

// 시리즈별 가격
const PRICE_BY_SERIES: Record<SeriesSlug, number> = {
  combo: 3000,
  "combo-junior": 2000,
  coreset: 4000,
};

// COMBO 001~700
const comboProducts: Product[] = Array.from(
  { length: 700 },
  (_, index) => {
    const volume = index + 1;

    return {
      id: `combo-${volume}`,
      seriesSlug: "combo",
      seriesName: "콤보",
      name: `CB-${String(volume).padStart(2, "0")}`,
      volume,
      price: PRICE_BY_SERIES.combo,
      accent: "#F58FB0",
    };
  }
);

// COMBO Junior 일반 001~200
const comboJuniorProducts: Product[] = Array.from(
  { length: 200 },
  (_, index) => {
    const volume = index + 1;

    return {
      id: `combo-junior-${volume}`,
      seriesSlug: "combo-junior",
      seriesName: "콤보 주니어",
      name: `CBJ-${String(volume).padStart(3, "0")}`,
      volume,
      price: PRICE_BY_SERIES["combo-junior"],
      accent: "#82C94B",
      categoryId: "junior-regular",
    };
  }
);

// COMBO Junior 어휘 V01~V70
const comboJuniorVocabularyProducts: Product[] =
  Array.from({ length: 70 }, (_, index) => {
    const volume = index + 1;

    return {
      id: `combo-junior-v-${volume}`,
      seriesSlug: "combo-junior",
      seriesName: "콤보 주니어",
      name: `CBJ-V${String(volume).padStart(2, "0")}`,
      volume,
      price: PRICE_BY_SERIES["combo-junior"],
      accent: "#82C94B",
      categoryId: "junior-vocabulary",
    };
  });

// CORE SET 유형 정보
export type CoresetCategory = {
  id: string;
  prefix: string;
  count: number;
  start: number;
};

export const CORESET_CATEGORIES: CoresetCategory[] = [
  { id: "b", prefix: "B", count: 12, start: 1 },
  { id: "bx", prefix: "Bx", count: 6, start: 1 },
  { id: "g", prefix: "G", count: 10, start: 1 },
  { id: "v", prefix: "V", count: 8, start: 1 },
  { id: "a", prefix: "A", count: 5, start: 1 },
  { id: "l", prefix: "L", count: 5, start: 1 },
  { id: "t", prefix: "T", count: 5, start: 1 },
  { id: "u", prefix: "U", count: 5, start: 1 },
  { id: "h", prefix: "H", count: 4, start: 1 },
  { id: "hm", prefix: "HM", count: 2, start: 3 },
  { id: "s", prefix: "S", count: 3, start: 1 },
  { id: "2q", prefix: "2Q", count: 3, start: 1 },
];

// CORE SET 68권 생성
const coresetProducts: Product[] =
  CORESET_CATEGORIES.flatMap((category) =>
    Array.from({ length: category.count }, (_, index) => {
      const volume = category.start + index;

      return {
        id: `coreset-${category.id}-${volume}`,
        seriesSlug: "coreset" as SeriesSlug,
        seriesName: "코어셋",
        name: `${category.prefix}${volume}`,
        volume,
        price: PRICE_BY_SERIES.coreset,
        accent: "#69BEF5",
        categoryId: category.id,
      };
    })
  );

// 전체 상품 목록
export const products: Product[] = [
  ...comboProducts,
  ...comboJuniorProducts,
  ...comboJuniorVocabularyProducts,
  ...coresetProducts,
];

// 시리즈 조회
export function getSeries(
  slug: string
): Series | undefined {
  return seriesList.find(
    (series) => series.slug === slug
  );
}

// 시리즈별 상품 조회
export function getProductsBySeries(
  slug: SeriesSlug
): Product[] {
  return products.filter(
    (product) => product.seriesSlug === slug
  );
}

// 상품 ID로 조회
export function getProduct(
  id: string
): Product | undefined {
  return products.find(
    (product) => product.id === id
  );
}

// 시리즈별 상품 수
export function getProductCount(
  slug: SeriesSlug
): number {
  return getProductsBySeries(slug).length;
}

// CORE SET 유형별 상품 조회
export function getCoresetProductsByCategory(
  categoryId: string
): Product[] {
  return coresetProducts.filter(
    (product) => product.categoryId === categoryId
  );
}

// 정적 페이지 생성용 주소
export const seriesSlugs = seriesList.map(
  (series) => series.slug
);
