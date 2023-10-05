import Cart from "@/components/Cart";
import Checkout from "@/components/Checkout";
import Header from "@/components/Header";

export default function CheckoutMain() {
  return (
    <main className="flex min-h-screen flex-col gap-5 items-center justify-center gap-4 p-24">
      <Header />
      <Checkout />
    </main>
  );
}
