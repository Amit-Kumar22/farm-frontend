import Container from "@/components/ui/Container";
import { Home, Fish, Apple, Shell, Bird, Droplet, Egg, Check } from "lucide-react";

export const metadata = {
  title: "Our Services — MainFarm",
  description: "Explore our comprehensive range of agricultural and farming services",
};

const services = [
  {
    id: 1,
    title: "Farm House Stay",
    description: "Experience authentic rural life with comfortable accommodation in our premium farm house.",
    icon: Home,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
    features: ["Private Rooms", "Organic Meals", "Farm Activities", "Nature Walks"],
  },
  {
    id: 2,
    title: "Fish Farming",
    description: "Sustainable aquaculture with fresh, healthy fish from our modern ponds.",
    icon: Fish,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    features: ["Multiple Fish Species", "Guided Tours", "Fishing Experience", "Fresh Fish Sales"],
  },
  {
    id: 3,
    title: "Mushroom Farming",
    description: "Mushroom farming is a sustainable and high-value agricultural practice.",
    icon: Apple,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    features: ["Oyster Mushrooms", "Button Mushrooms", "Fresh Harvest", "Training Programs"],
  },
  {
    id: 4,
    title: "Pearl Farming",
    description: "A profitable and sustainable aquaculture practice that cultivates pearls.",
    icon: Shell,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    features: ["Pearl Cultivation", "Quality Control", "Export Ready", "Training Available"],
  },
  {
    id: 5,
    title: "Duck Farming",
    description: "Our duck farm focuses on raising healthy ducks in a natural environment.",
    icon: Bird,
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600",
    features: ["Organic Feed", "Free Range", "Fresh Eggs", "Quality Meat"],
  },
  {
    id: 6,
    title: "Hydroponic Farming",
    description: "Modern soil-less farming technique for growing fresh vegetables year-round.",
    icon: Droplet,
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
    features: ["Water Efficient", "Pesticide Free", "Year Round Production", "High Yield"],
  },
  {
    id: 7,
    title: "Poultry Farming",
    description: "Pure, organic dairy products from our well-maintained poultry farm.",
    icon: Egg,
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
    features: ["Fresh Eggs", "Organic Products", "Farm Tours", "Healthy Birds"],
  },
];

export default function ServicesPage() {
  return (
    <section className="bg-gradient-to-b from-cream to-white py-16">
      <Container>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Gradient Border Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />
      
      {/* Icon Badge */}
      <div className="relative p-5">
        <div className={`inline-flex rounded-xl ${service.bgColor} p-4 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
          <Icon className={`h-8 w-8 ${service.iconColor}`} strokeWidth={2} />
        </div>
        
        {/* Title */}
        <h3 className="mt-4 text-lg font-bold text-forest-deep">
          {service.title}
        </h3>
        
        {/* Description */}
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-600">
          {service.description}
        </p>

        {/* Features List - Compact */}
        <ul className="mt-4 space-y-1.5">
          {service.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-xs text-forest-deep">
              <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${service.color}`}>
                <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
              </div>
              <span className="font-medium">{feature}</span>
            </li>
          ))}
          {service.features.length > 3 && (
            <li className="ml-6 text-xs text-gray-400">
              +{service.features.length - 3} more
            </li>
          )}
        </ul>
      </div>

      {/* Bottom Accent Line */}
      <div className={`h-1 bg-gradient-to-r ${service.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
    </div>
  );
}
