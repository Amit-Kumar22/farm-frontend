import { Sprout, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { siteSettingsApi } from "@/lib/api/siteSettings";

const fallbackStats = [
  { label: "Eco Farms Worldwide", value: "90%" },
  { label: "Special Equipment", value: "78%" },
];

export default async function About() {
  const res = await siteSettingsApi.get().catch(() => null);
  const stats = res?.data?.stats?.length ? res.data.stats : fallbackStats;

  return (
    <section className="py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-forest-light to-forest-deep">
          <Image
            src="/about.png"
            alt="About MainFarm"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <SectionHeading
            eyebrow="Who We Are"
            title="Currently we are growing and selling organic food"
          />
          <p className="mt-5 text-sm leading-relaxed text-muted">
            MainFarm runs multiple farming businesses side by side — from fish and dairy to
            vegetables and mushrooms — all managed with the same commitment to sustainable,
            professional agriculture.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-6">
            {stats.slice(0, 2).map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                  <ShieldCheck size={20} />
                </span>
                <div>
                  <p className="text-lg font-bold text-forest-deep">{stat.value}</p>
                  <p className="text-xs text-muted">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
