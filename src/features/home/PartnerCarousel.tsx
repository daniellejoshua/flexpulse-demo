const partners = [
  { name: "Pemfit", src: "/assets/pemfit.webp" },
  { name: "Dr. Pawluk", src: "/assets/dr-pawluk.svg" },
];

export default function PartnerCarousel() {
  return (
    <section className="overflow-hidden border-y border-border bg-white py-5 sm:py-6">
      <h2 className="mb-4 text-center text-sm font-semibold text-ink sm:mb-5">Our affiliate partners</h2>
      <div className="partner-marquee" aria-hidden="true">
        <div className="partner-marquee__track">
          {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
            <div key={index} className="partner-marquee__logo">
              <img src={partner.src} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
