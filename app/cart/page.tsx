
import { CartView } from "@/components/cart-view";

export default function CartPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">

      {/* 장바구니 제목 */}
      <h1 className="font-sans text-4xl font-extrabold tracking-tight text-[#F5F1E8]">
        장바구니
      </h1>

      {/* 장바구니 안내 문구 */}
      <p className="mt-3 text-sm leading-7 text-white">
        여러 권을 선택한 뒤 결제 예정 금액을 확인할 수 있습니다.
        같은 상품은 한 번만 담깁니다.
      </p>

      {/* 장바구니 상품 목록 */}
      <div className="mt-8">
        <CartView />
      </div>

    </div>
  );
}
