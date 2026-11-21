import { Outlet } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/features/cart/CartDrawer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
