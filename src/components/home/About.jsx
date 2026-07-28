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
    <section className="py-12">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-forest-light to-forest-deep">
          <Image
            src="/who.jpeg"
            alt="About MainFarm"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <SectionHeading
            eyebrow="Who We Are"
            title="Mai farm pride of Dinara"
          />
          <p className="mt-5 text-sm leading-relaxed text-muted">
            MAI Integrated Farm – Bihar's First Integrated Farming Model with 10 Projects Running Simultaneously.
            
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Mai farm complete training center for farmer to increase economical condition.
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
