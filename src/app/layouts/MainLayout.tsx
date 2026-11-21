import { Suspense } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { transition, useShouldReduceMotion } from "@animate-ui/react/utils/motion";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/features/cart/CartDrawer";
import { PulseLoader } from "@/components/ui/PulseLoader";

export default function MainLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  const reduceMotion = useShouldReduceMotion();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8, transition: transition.fade }}
            transition={transition.reveal}
          >
            <Suspense fallback={<div className="grid min-h-[60vh] place-items-center bg-[#FFF8F8]"><PulseLoader label="Loading FlexPulse" /></div>}>
              {outlet}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
