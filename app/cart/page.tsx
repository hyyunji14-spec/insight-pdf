import { CartView } from "@/components/cart-view";

export default function CartPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-serif text-4xl text-stone-900">장바구니</h1>
      <p className="mt-2 text-sm text-stone-600">
        여러 권을 선택한 뒤 결제 예정 금액을 확인할 수 있습니다. 같은 상품은
        한 번만 담깁니다.
      </p>
      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}
