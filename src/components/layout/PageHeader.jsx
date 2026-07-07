import Container from "../ui/Container";

export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="bg-forest-deep py-16">
      <Container>
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gold">{eyebrow}</p>
        )}
        <h1 className="text-3xl font-extrabold text-cream sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-sm text-cream/70">{subtitle}</p>}
      </Container>
    </section>
  );
}
