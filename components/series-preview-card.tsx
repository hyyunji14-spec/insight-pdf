
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  slug: string;
  name: string;
  englishName: string;
  tag: string;
  description: string;
  accent: string;
  volumeCount: number;
};

export default function SeriesPreviewCard({
  slug,
  name,
  englishName,
  tag,
  description,
  accent,
  volumeCount,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const previewUrl = `/previews/${slug}-sample.pdf`;

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      <article className="flex h-full flex-col rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">

        {/* 교재 색상 */}
        <Link href={`/series/${slug}`}>
          <div
            className="mb-6 h-36 rounded-2xl"
            style={{ backgroundColor: accent }}
          >
            <div className="flex h-full flex-col justify-between p-5 text-white">
              <span className="text-xs uppercase tracking-[0.2em] text-white/80">
                Series
              </span>

              <span className="font-sans text-3xl font-bold">
                {englishName}
              </span>
            </div>
          </div>
        </Link>

        <p className="text-xs font-medium text-stone-500">
          {tag}
        </p>

        <h2 className="mt-1 text-xl font-medium text-stone-900">
          {name}
        </h2>

        <p className="mt-2 flex-1 text-sm leading-6 text-stone-600">
          {description}
        </p>

        {/* 하단 버튼 */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/series/${slug}`}
            className="text-sm text-stone-800 hover:underline"
          >
            {volumeCount}권 보기
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-800 transition hover:bg-stone-100"
          >
            미리보기
          </button>
        </div>
      </article>

      {/* PDF 미리보기 팝업 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${name} 교재 미리보기`}
            className="flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
              <h3 className="text-lg font-bold text-stone-900">
                {name} 교재 미리보기
              </h3>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="미리보기 닫기"
                className="rounded-lg px-3 py-2 text-stone-600 hover:bg-stone-100"
              >
                ✕
              </button>
            </div>

            <iframe
              src={`${previewUrl}#toolbar=0`}
              title={`${name} PDF 미리보기`}
              className="min-h-0 w-full flex-1 bg-stone-100"
            />

            <div className="border-t border-stone-200 px-5 py-3 text-xs text-stone-500">
              미리보기는 교재의 일부 내용만 제공됩니다.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
