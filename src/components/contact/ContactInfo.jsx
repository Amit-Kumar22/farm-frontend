import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { siteSettingsApi } from "@/lib/api/siteSettings";

export default async function ContactInfo() {
  const res = await siteSettingsApi.get().catch(() => null);
  const settings = res?.data;

  const contactItems = [
    {
      icon: MapPin,
      title: "Our Address",
      content: (
        <div className="space-y-1">
          <p className="font-semibold text-forest-deep">MAI Integrated Farm</p>
          Dinara, Dinara, Rohtas, Bihar – 802213

        </div>
      ),
    },
    {
      icon: Phone,
      title: "Phone Number",
      content: settings?.phone || " +91 9102674345",
    },
    {
      icon: Mail,
      title: "Email Address",
      content: settings?.email || "mainfarm976@gmail.com",
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: settings?.workingHours || "Mon – Sat: 8:00am – 6:00pm",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-forest/5">
        <h2 className="mb-2 text-2xl font-bold text-forest-deep">Contact Information</h2>
        <p className="text-sm leading-relaxed text-muted">
          Reach out to us through any of the following channels. We're here to help!
        </p>
      </div>

      <div className="space-y-4">
        {contactItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="group rounded-xl border border-forest/10 bg-white p-5 shadow-sm transition-all duration-300 hover:border-forest/30 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-forest/10 to-forest/5 transition-all duration-300 group-hover:from-forest/20 group-hover:to-forest/10">
                  <Icon className="text-forest transition-transform duration-300 group-hover:scale-110" size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-forest">
                    {item.title}
                  </h3>
                  <div className="text-sm leading-relaxed text-forest-deep">
                    {typeof item.content === "string" ? <p className="font-medium">{item.content}</p> : item.content}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-forest/5 to-forest/10 p-6 border border-forest/10">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-forest-deep">
          <span className="h-1.5 w-1.5 rounded-full bg-forest" />
          Why Choose Us?
        </h3>
        <ul className="space-y-2.5 text-sm text-muted">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-forest">✓</span>
            <span>Bihar's First Integrated Farming Model</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-forest">✓</span>
            <span>10 Projects Running Simultaneously</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-forest">✓</span>
            <span>Sustainable & Eco-Friendly Practices</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-forest">✓</span>
            <span>Fresh, Organic Products Direct from Farm</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
