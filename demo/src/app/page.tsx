import HomePage from "@/views/home-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "react-adaptive-skeleton | Dynamic React Skeleton Loaders",
  description:
    "Automatically generate perfect skeleton loaders for your React components. No manual sizing, preserving layout integrity with zero configuration.",
};

export default function Home() {
  return <HomePage />;
}
