import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useShouldReduceMotion } from "@animate-ui/react/utils/motion";

const editorialCards = [
  { title: "Backed by Research", description: "Explore the science behind PEMF.", image: "/assets/quality-lab.webp", to: "/science" },
  { title: "Product Specifications", description: "Discover the technology inside.", image: "/assets/quality-controller.webp", to: "/product" },
  { title: "Real User Stories", description: "Hear from the FlexPulse community.", image: "/assets/quality-lifestyle.webp", to: "/reviews" },
];

export default function V2ExploreDiscoverSection() {
  const reduceMotion = useShouldReduceMotion();

  return (
    <section className="bg-[#F8F9FB] px-5 py-10 sm:px-8 lg:px-12 lg:py-12 xl:px-16">
      <div className="mx-auto grid max-w-[1280px] gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {editorialCards.map(({ title, description, image, to }, index) => (
          <motion.div
            key={title}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.08, ease: [0.23, 1, 0.32, 1] }}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            className="min-w-0"
          >
            <Link to={to} aria-label={`${title}: ${description}`} className="group relative block aspect-[1.2/1] overflow-hidden rounded-[18px] bg-[#E9EDF4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" loading="lazy" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(9,13,20,.7)_0%,rgba(9,13,20,.2)_54%,rgba(9,13,20,.08)_100%)] transition-colors duration-300 group-hover:bg-[linear-gradient(135deg,rgba(9,13,20,.78)_0%,rgba(9,13,20,.27)_54%,rgba(9,13,20,.1)_100%)]" />
              <div className="relative z-10 flex h-full flex-col justify-between p-5 text-white sm:p-6">
                <span className="max-w-[200px]"><span className="block text-[clamp(1.15rem,1.7vw,1.5rem)] font-bold leading-tight tracking-[-0.035em]">{title}</span><span className="mt-2 block text-xs leading-relaxed text-white/80">{description}</span></span>
                <ArrowUpRight className="size-5 self-end transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </div>
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.24, ease: [0.23, 1, 0.32, 1] }}
          whileHover={reduceMotion ? undefined : { y: -2 }}
        >
          <Link to="/product" aria-label="Shop FlexPulse: Explore the FlexPulse G2" className="group relative block aspect-[1.2/1] overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#E3061B_0%,#C90015_56%,#A90012_100%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            <div className="absolute -bottom-[45%] -right-[42%] size-[115%] rounded-full bg-[#71000C]/30 blur-2xl" aria-hidden="true" />
            <img src="/assets/hero-kit.webp" alt="" width="1254" height="1254" className="absolute -bottom-[18%] -right-[23%] z-0 w-[94%] transition-transform duration-500 ease-out group-hover:scale-[1.035]" loading="lazy" />
            <div className="relative z-10 flex h-full flex-col justify-between p-5 text-white sm:p-6">
              <span className="max-w-[190px]"><span className="block text-[clamp(1.15rem,1.7vw,1.5rem)] font-bold leading-tight tracking-[-0.035em]">Shop FlexPulse</span><span className="mt-2 block text-xs leading-relaxed text-white/85">Start your recovery journey today.</span></span>
              <span className="inline-flex items-center gap-2 text-xs font-semibold">Explore Product <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" /></span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
