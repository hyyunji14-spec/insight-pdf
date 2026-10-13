import Link from "next/link";

export default function SeriesNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="font-serif text-3xl text-stone-900">
        시리즈를 찾을 수 없습니다
      </h1>
      <p className="mt-3 text-sm text-stone-600">
        Combo, Combo Junior, Coreset 중에서 선택해 주세요.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-700"
      >
        메인으로 돌아가기
      </Link>
    </div>
  );
}
