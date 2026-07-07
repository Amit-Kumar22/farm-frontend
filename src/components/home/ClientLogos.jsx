import Container from "../ui/Container";

const brands = ["Rice Co.", "Farm Fresh", "Eco Product", "Tractor Works", "Farming Today"];

export default function ClientLogos() {
  return (
    <section className="border-y border-forest/10 bg-cream-dark/60 py-10">
      <Container className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {brands.map((b) => (
          <span key={b} className="text-sm font-bold uppercase tracking-wide text-muted/70">
            {b}
          </span>
        ))}
      </Container>
    </section>
  );
}
