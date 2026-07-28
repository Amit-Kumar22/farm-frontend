import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";
import RatingSubmissionForm from "@/components/contact/RatingSubmissionForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactMap from "@/components/contact/ContactMap";

export const metadata = {
  title: "Contact Us — MainFarm",
  description: "Get in touch with MAI Integrated Farm. We're here to answer your questions about our sustainable farming practices.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-forest-deep via-forest to-forest-light py-14">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center text-cream">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
              <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                Get in Touch
              </p>
            </div>
            <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              We'd Love to <span className="text-gold">Hear</span> From You
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-cream/90 sm:text-lg">
              Have questions about our integrated farming practices? Want to schedule a farm tour?
              We're here to help and excited to connect with you.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="relative py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-cream-dark/30 to-white" />
        <Container className="relative">
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
            {/* Contact Information - Takes 2 columns */}
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>

            {/* Contact Form - Takes 3 columns */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Rating/Review Section */}
      <section className="relative py-12 bg-cream-dark/30">
        <Container>
          <div className="mx-auto max-w-2xl">
            <RatingSubmissionForm />
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <ContactMap />
    </>
  );
}
