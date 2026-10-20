
import { Suspense } from "react";
import { CheckoutView } from "@/components/checkout-view";

export default function CheckoutPage(
  props: PageProps<"/checkout">
) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">

      {/* 주문 확인 제목 */}
      <h1 className="font-sans text-4xl font-extrabold tracking-tight text-[#F5F1E8]">
        주문 확인
      </h1>

      {/* 주문 확인 안내 문구 */}
      <p className="mt-3 text-sm leading-7 text-white">
        결제 전에 주문 상품과 금액을 확인하세요.
      </p>

      {/* 주문 상품 및 결제 예정 금액 */}
      <div className="mt-8">
        <Suspense
          fallback={
            <p className="text-sm text-white">
              주문 정보를 불러오는 중입니다.
            </p>
          }
        >
          <CheckoutContent
            searchParams={props.searchParams}
          />
        </Suspense>
      </div>
    </div>
  );
}

async function CheckoutContent({
  searchParams,
}: {
  searchParams: PageProps<"/checkout">["searchParams"];
}) {
  const params = await searchParams;

  const productIdValue = params.productId;

  const buyNowProductId =
    typeof productIdValue === "string"
      ? productIdValue
      : undefined;

  return (
    <CheckoutView buyNowProductId={buyNowProductId} />
  );
}
