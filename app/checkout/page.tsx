import { Suspense } from "react";
import { CheckoutView } from "@/components/checkout-view";

export default function CheckoutPage(props: PageProps<"/checkout">) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-serif text-4xl text-stone-900">주문 확인</h1>
      <p className="mt-2 text-sm text-stone-600">
        결제 전에 주문 상품과 금액을 확인하세요.
      </p>
      <div className="mt-8">
        <Suspense
          fallback={
            <p className="text-sm text-stone-500">
              주문 정보를 불러오는 중입니다.
            </p>
          }
        >
          <CheckoutContent searchParams={props.searchParams} />
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
    typeof productIdValue === "string" ? productIdValue : undefined;

  return <CheckoutView buyNowProductId={buyNowProductId} />;
}
