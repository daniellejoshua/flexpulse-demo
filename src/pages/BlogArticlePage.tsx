import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { PulseImage } from "@/components/ui/PulseImage";

const relatedPosts = [
  { title: "What Research Says About PEMF and Blood Flow", category: "Research", date: "Jan 11, 2022", image: "/assets/active-recovery.jpg" },
  { title: "How Professional Athletes Use PEMF", category: "PEMF therapy benefits", date: "Oct 22, 2021", image: "/assets/pemf-application.webp" },
  { title: "The Science of Low-Frequency Magnetic Fields", category: "Research", date: "Sep 8, 2021", image: "/assets/quality-lab.webp" },
];

function ArticleHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-12 font-serif text-[clamp(2rem,3.2vw,3rem)] leading-[.98] tracking-[-0.055em] text-[#201C1B] first:mt-0">{children}</h2>;
}

export default function BlogArticlePage() {
  return (
    <main className="overflow-hidden bg-[#FAF8F6] text-[#201C1B]">
      <section className="border-b border-[#E5DED8] bg-[#F0EBE5]" aria-labelledby="article-heading">
        <div className="mx-auto grid w-full max-w-[1280px] gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-16 lg:px-12 lg:py-20 xl:px-0">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }}>
            <Link to="/blog" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#625D59] transition-colors hover:text-[#C71920] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C71920]">
              <ArrowLeft className="size-4" /> All articles
            </Link>
            <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.13em] text-[#C71920]">PEMF THERAPY BENEFITS</p>
            <h1 id="article-heading" className="mt-4 max-w-[570px] font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[.9] tracking-[-0.065em]">A Guide to PEMF Therapy &amp; Gamma Waves</h1>
            <div className="mt-6 flex items-center gap-4 text-sm text-[#625D59]">
              <time>February 16, 2022</time>
              <span className="h-1 w-1 rounded-full bg-[#C71920]" />
              <span className="inline-flex items-center gap-1.5"><Clock3 className="size-4" /> 5 min read</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, ease: "easeOut" }}>
            <PulseImage
              src="/assets/quality-lab.webp"
              alt="Technical laboratory equipment used in FlexPulse quality testing"
              containerClassName="aspect-[16/10] w-full overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem]"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </motion.div>
        </div>
      </section>

      <article className="mx-auto w-full max-w-[760px] px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.45, ease: "easeOut" }} className="text-[15px] leading-[1.72] text-[#4F4A47] sm:text-base">
          <p>Gamma waves (gamma brain oscillations – GEOs) have recently been under a lot of investigation by neuroscientists. In addition to Beta, Alpha, Theta, and Delta brainwave patterns, gamma waves are essential for optimal brain function. But what exactly are Gamma waves?</p>
          <p className="mt-5">These are specific patterns depicting the electrical activity in the brain occurring at frequencies between 30–100 Hz. However, it is at the 40 Hz frequency point that is most interesting. For a long time, the term Gamma has been used to refer to the correlations of brain activity at higher than 30 Hz and frequencies that typically range from 30 Hz to 80 Hz. Just recently, frequencies between 80 Hz and 200 Hz have been labeled “high-gamma.” Both Gamma and high-gamma activity tend to happen simultaneously in the brain.</p>

          <ArticleHeading>Gamma Waves Impact on Cognition</ArticleHeading>
          <p className="mt-5">Gamma waves are helpful when processing high-level information in various brain parts. These high-level tasks mainly deal with cognitive functioning, memory, learning, and information processing by the brain. Gamma waves are linked to memory formation, sensory perception, and voluntary movement. However, the gamma waves need to be at an optimal range for one to enjoy better or improved focus, adequate attention, cognition, sensory processing, learning, information processing, REM sleep, and perception.</p>
          <p className="mt-5">Note that when the gamma activities are too low or too high, there is a possibility of specific problems developing. For instance, too little gamma activity has been linked with issues such as depression, ADHD, and learning disabilities. On the other hand, an excess of gamma activity has been linked with hyper-arousal, and stress.</p>
          <p className="mt-5">Slow brain activity is often linked to low-frequency brainwaves. Improper integration of larger neuron areas in the brain can also trigger memory loss and cognitive impairment. While cognitive function is a complex phenomenon, it needs to be adequate to maintain control, memory and attention.</p>
          <p className="mt-5">It is also essential for grouping constantly changing processes and thoughts. What&apos;s more, proper integration is needed for awareness in the brain. This makes sense of what comes in as input. Interaction is essential, and so is gamma activity since this facilitates integration.</p>
          <p className="mt-5">With the constant external sensory input, a competition among neural reaction events often ensues for perception and representation. Therefore, the brain needs to select and process vital information to utilize its processing resources. Usually, Gamma oscillations get stimulated by the sensory input, which ranges from 40 Hz to 100 Hz, which helps in processing sensory information.</p>
          <p className="mt-5">Gamma rhythms are always triggered one in a way, the action potentials. Magneto-encephalograms (MEGs) — sensitive brain magnetic activity recordings — show that the rhythms could engulf the whole brain and bind multiple perceptions into one cognitive experience.</p>

          <ArticleHeading>PEMF and Gamma Activity: What Researchers Are Exploring</ArticleHeading>
          <p className="mt-5">Researchers are exploring whether magnetic stimulation at the appropriate frequency can help synchronize neuron firing in the brain. Synchronization is necessary as it is needed in integrating nerve signals and neuroplasticity. Additionally, amounts of gamma production and synchronization of signals impact one&apos;s attention—the higher the gamma production and better synchronization, the stronger the attention level.</p>
          <p className="mt-5">At the bottom of the brain&apos;s front, one&apos;s basal forebrain offers important input for gamma activity and attention. Acetylcholine is produced in the basal forebrain. It is a vital component for controlling behavior and is essential to memory. You can tell that this area has been damaged in cases of dementia linked with Alzheimer&apos;s disease and Parkinson&apos;s disease. Researchers are studying whether magnetic stimulation over the temples can influence gamma activity in this area, but this work is still at an early stage.</p>
          <p className="mt-5">Brain stimulation aimed at a particular frequency is used to create entrainment. This refers to a natural brainwaves synchronization of brainwaves. According to research findings, entrainment becomes more noticeable during gamma stimulation and other frequency brainwave patterns happening in the thalamus. This means that entrainment with gamma frequencies appears to be almost stronger than entrainment with different brainwave frequencies.</p>

          <ArticleHeading>Differentiating PEMF Therapy and Other Entrainment Stimuli</ArticleHeading>
          <p className="mt-5">There are numerous stimuli used for entrainment, including audiovisual, sound, pulsing lights, and transcranial electrical stimulation. However, PEMF is a different kind of stimulation: it can offer targeted approaches to brain areas, and its fields can also pass through the entire brain.</p>
          <p className="mt-5">How it also works is quite different. PEMFs pass through the whole brain, striking differences from other techniques. In most cases, alternative entrainment methods are absorbed by the brain. This could easily trigger adverse heating effects. These methods also have an indirect impact as they interact with more bodily nervous systems, and in most cases, PEMFs tend to be a bit more directly controlled. The brain activity, in this case, is more targeted.</p>

          <ArticleHeading>PEMF Therapy and Entrainment Device</ArticleHeading>
          <p className="mt-5">The G2 is a PEMF device invented by FlexPulse. It comes with four new programs, all geared towards brain stimulation. The device also includes several ranges of frequencies you would expect from a general-purpose PEMF machine.</p>
          <p className="mt-5">The program range on this device allows one to choose the frequency for the brainwave frequency band you want to target. The frequencies have been carefully chosen based on the impact of the brainwave frequency bands needed for entrainment. The FlexPulse system took these decades of research and lots of study before it became a reality.</p>
          <p className="mt-5">A typical session is about 30 minutes. Check the program guide for when to use each program. Gamma programs are recommended for people with anxiety, PTSD, insomnia, pain, seizure disorders or tinnitus, and beta programs are best avoided before bedtime. The device can be used by more than one person, and its wide range of installed programs suits different routines.</p>
        </motion.div>
      </article>

      <section className="border-t border-[#E5DED8] bg-[#F0EBE5]" aria-labelledby="keep-reading-heading">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-0">
          <div className="flex items-center justify-between gap-4">
            <h2 id="keep-reading-heading" className="font-serif text-[clamp(2.2rem,3.7vw,3.5rem)] leading-none tracking-[-0.055em]">Keep reading</h2>
            <Link to="/blog" className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#C71920] hover:underline">All articles <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {relatedPosts.map((post) => (
              <article key={post.title} className="group overflow-hidden rounded-[1.1rem] border border-[#DDD4CE] bg-white">
                <PulseImage src={post.image} alt="" containerClassName="aspect-[4/3] w-full" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]" loading="lazy" />
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#C71920]">{post.category}</p>
                  <h3 className="mt-3 font-serif text-[22px] leading-[1.08] tracking-[-0.04em]">{post.title}</h3>
                  <p className="mt-5 text-xs text-[#625D59]">{post.date}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
