import Container from "@/components/ui/Container";
import { MapPin } from "lucide-react";

export default function ContactMap() {
  // Coordinates for Dinara, Rohtas, Bihar
  const location = {
    lat: 24.8833,
    lng: 83.9167,
    address: "Dinara, Rohtas, Bihar 802213",
  };

  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57600.94876!2d${location.lng}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398ca4c8e1dfaaab%3A0x6e7c79f1e2a93c7d!2sDinara%2C%20Bihar%20802213!5e0!3m2!1sen!2sin!4v1234567890`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-cream-dark/30 py-12">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-forest/10 px-5 py-2 backdrop-blur-sm">
              <MapPin className="text-forest" size={20} />
              <span className="text-sm font-semibold uppercase tracking-wider text-forest">Find Us Here</span>
            </div>
            <h2 className="mb-3 text-3xl font-bold text-forest-deep sm:text-4xl">Visit Our Farm</h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted">
              Located in the heart of Dinara, Rohtas. We welcome visitors to experience our
              integrated farming practices firsthand.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
            <iframe
              src={mapUrl}
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MAI Integrated Farm Location"
              className="w-full"
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white px-6 py-3 text-sm font-semibold text-forest shadow-sm transition-all hover:border-forest hover:bg-forest hover:text-cream hover:shadow-md"
            >
              <MapPin size={18} />
              Open in Google Maps
            </a>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white px-6 py-3 text-sm font-semibold text-forest shadow-sm transition-all hover:border-forest hover:bg-forest hover:text-cream hover:shadow-md"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
