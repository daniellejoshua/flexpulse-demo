import { motion, type MotionProps } from "motion/react";

const imageMotion: MotionProps = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export default function EngineeringCollage() {
  return (
    <motion.div {...imageMotion} className="grid gap-3 sm:gap-5">
      <div className="overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]">
        <img
          src="/assets/quality-lab.webp"
          alt="Technician performing circuit-board testing with laboratory equipment"
          className="aspect-[2.4/1] w-full object-cover transition-transform duration-300 hover:scale-[1.025]"
          loading="lazy"
        />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        <div className="overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem]">
          <img
            src="/assets/quality-controller.webp"
            alt="FlexPulse G2 controller"
            className="aspect-[1.15/1] w-full object-cover object-[50%_22%] transition-transform duration-300 hover:scale-[1.025]"
            loading="lazy"
          />
        </div>
        <div className="overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem]">
          <img
            src="/assets/quality-lifestyle.webp"
            alt="Person walking outdoors in a green setting"
            className="aspect-[1.15/1] w-full object-cover transition-transform duration-300 hover:scale-[1.025]"
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );
}
