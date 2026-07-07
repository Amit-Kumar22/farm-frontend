import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { siteSettingsApi } from "@/lib/api/siteSettings";

export default async function Timeline() {
  const res = await siteSettingsApi.get().catch(() => null);
  const timeline = res?.data?.timeline || [];

  if (!timeline.length) return null;

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Our Journey"
          title="Farming, Growing Since Day One"
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map((item) => (
            <div key={`${item.year}-${item.title}`} className="text-center">
              <p className="text-3xl font-extrabold text-gold-dark">{item.year}</p>
              <p className="mt-2 font-semibold text-forest-deep">{item.title}</p>
              {item.description && <p className="mt-1 text-sm text-muted">{item.description}</p>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
