import { Users, Leaf, Tractor, ShieldCheck } from "lucide-react";
import Container from "../ui/Container";

const features = [
  { icon: Users, title: "Professional Farmers", text: "Experienced hands managing every business we run." },
  { icon: Leaf, title: "Fresh & Organic", text: "Produce and livestock raised the natural way." },
  { icon: Tractor, title: "Multiple Businesses", text: "Fish, dairy, vegetables, mushrooms and more." },
  { icon: ShieldCheck, title: "100% Guaranteed", text: "Quality you can trust, every single time." },
];

export default function FeatureBar() {
  return (
    <section className="relative z-10 -mt-12">
      <Container>
        <div className="grid grid-cols-1 gap-4 rounded-2xl bg-white p-6 shadow-md sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3 p-2">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                <Icon size={20} />
              </span>
              <div>
                <p className="font-semibold text-forest-deep">{title}</p>
                <p className="text-sm text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
