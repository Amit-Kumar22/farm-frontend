import Container from "../ui/Container";
import Button from "../ui/Button";

export default function CtaBanner() {
  return (
    <section className="bg-gold py-12">
      <Container className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <h3 className="text-2xl font-bold text-ink">
          We&apos;re a trusted, multi-business farm you can rely on
        </h3>
        <Button href="/businesses" variant="dark">
          Discover More
        </Button>
      </Container>
    </section>
  );
}
