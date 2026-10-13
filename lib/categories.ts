
import type { SeriesSlug } from "@/lib/catalog";

export type BookCategory = {
  id: string;
  name: string;
  seriesSlug: SeriesSlug;
};

export const bookCategories: BookCategory[] = [
  // Combo
  { id: "cb-101-200", name: "CB 101-200", seriesSlug: "combo" },
  { id: "cb-201-300", name: "CB 201-300", seriesSlug: "combo" },
  { id: "cb-301-400", name: "CB 301-400", seriesSlug: "combo" },
  { id: "cb-401-500", name: "CB 401-500", seriesSlug: "combo" },
  { id: "cb-501-600", name: "CB 501-600", seriesSlug: "combo" },
  { id: "cb-601-700", name: "CB 601-700", seriesSlug: "combo" },

  // Combo Junior
  { id: "cbj-001-100", name: "CBJ 001-100", seriesSlug: "combo-junior" },
  { id: "cbj-101-200", name: "CBJ 101-200", seriesSlug: "combo-junior" },
  { id: "cbj-v01-v70", name: "CBJ V01-V70", seriesSlug: "combo-junior" },

  // Coreset
  { id: "b", name: "B 빈칸 추론", seriesSlug: "coreset" },
  { id: "bx", name: "Bx 빈칸 추론(추가분)", seriesSlug: "coreset" },
  { id: "mini-b", name: "mini B 빈칸 추론(압축형)", seriesSlug: "coreset" },
  { id: "g", name: "G 어법", seriesSlug: "coreset" },
  { id: "gx-2022-2024", name: "Gx 어법 | 2022-2024", seriesSlug: "coreset" },
  { id: "gx-2025", name: "Gx 어법 | 2025+", seriesSlug: "coreset" },
  { id: "v", name: "V 어휘", seriesSlug: "coreset" },
  { id: "vx-2022-2024", name: "Vx 어휘 | 2022-2024", seriesSlug: "coreset" },
  { id: "vx-2025", name: "Vx 어휘 | 2025+", seriesSlug: "coreset" },
  { id: "a", name: "A 순서 배열", seriesSlug: "coreset" },
  { id: "l", name: "L 위치 찾기", seriesSlug: "coreset" },
  { id: "t", name: "T 주제 추론", seriesSlug: "coreset" },
  { id: "u", name: "U 무관한 문장", seriesSlug: "coreset" },
  { id: "h", name: "H 제목 추론", seriesSlug: "coreset" },
  { id: "hm", name: "HM 함축 의미 추론", seriesSlug: "coreset" },
  { id: "s", name: "S 문단 요약", seriesSlug: "coreset" },
  { id: "2q", name: "2Q 장문 독해(2문제 유형)", seriesSlug: "coreset" },
];

export function getCategoriesBySeries(slug: SeriesSlug): BookCategory[] {
  return bookCategories.filter(
    (category) => category.seriesSlug === slug
  );
}
