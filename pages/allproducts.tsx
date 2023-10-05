import Image from "next/image";
import { Inter } from "next/font/google";
import ProductList from "@/components/ProductList";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col gap-5 items-center justify-center gap-4 p-24 ${inter.className}`}>
      <Header />
      <ProductList />
    </main>
  );
}
