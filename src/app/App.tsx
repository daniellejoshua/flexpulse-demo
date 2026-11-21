import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { transition, useShouldReduceMotion } from "@animate-ui/react/utils/motion";
import MainLayout from "@/app/layouts/MainLayout";
import { PulseLoader } from "@/components/ui/PulseLoader";

const Home = lazy(() => import("@/features/home/HomePage"));
const HomeV2 = lazy(() => import("@/features/home/HomePageV2"));
const Product = lazy(() => import("@/features/product/ProductPage"));
const Checkout = lazy(() => import("@/features/checkout/CheckoutPage"));
const Reviews = lazy(() => import("@/pages/ReviewsPage"));
const PemfTherapy = lazy(() => import("@/pages/PemfTherapyPage"));
const Blog = lazy(() => import("@/pages/BlogPage"));
const BlogArticle = lazy(() => import("@/pages/BlogArticlePage"));
const Contact = lazy(() => import("@/pages/ContactPage"));
const Faq = lazy(() => import("@/pages/FaqPage"));
const About = lazy(() => import("@/pages/AboutPage"));
const Science = lazy(() => import("@/pages/SciencePage"));
const GettingStarted = lazy(() => import("@/pages/GettingStartedPage"));
const Shipping = lazy(() => import("@/pages/ShippingPage"));
const Guarantee = lazy(() => import("@/pages/GuaranteePage"));
const Privacy = lazy(() => import("@/pages/PrivacyPage"));
const Terms = lazy(() => import("@/pages/TermsPage"));
const Contraindications = lazy(() => import("@/pages/ContraindicationsPage"));
const HowItWorks = lazy(() => import("@/pages/HowItWorksPage"));
const Programs = lazy(() => import("@/pages/ProgramsPage"));
const CoilPlacement = lazy(() => import("@/pages/CoilPlacementPage"));
const Shop = lazy(() => import("@/pages/ShopPage"));
const CoilProduct = lazy(() => import("@/pages/CoilProductPage"));
const ChargerProduct = lazy(() => import("@/pages/ChargerProductPage"));
const Affiliate = lazy(() => import("@/pages/AffiliatePage"));
const Search = lazy(() => import("@/pages/SearchPage"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();
  const reduceMotion = useShouldReduceMotion();

  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center bg-[#FFF8F8]"><PulseLoader label="Loading FlexPulse" /></div>}>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -8, transition: transition.fade }}
          transition={transition.reveal}
        >
          <Routes location={location}>
            <Route path="/checkout" element={<Checkout />} />
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/v2" element={<HomeV2 />} />
              <Route path="/product" element={<Product />} />
              <Route path="/product/flexpulse-coil" element={<CoilProduct />} />
              <Route path="/product/flexpulse-charger" element={<ChargerProduct />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/pemf-therapy" element={<PemfTherapy />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/a-guide-to-pemf-therapy-gamma-waves" element={<BlogArticle />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/about" element={<About />} />
              <Route path="/science" element={<Science />} />
              <Route path="/getting-started" element={<GettingStarted />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/guarantee" element={<Guarantee />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contraindications" element={<Contraindications />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/coil-placement" element={<CoilPlacement />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/products" element={<Shop />} />
              <Route path="/search" element={<Search />} />
              <Route path="/affiliate" element={<Affiliate />} />
            </Route>
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Suspense>
  );
}
