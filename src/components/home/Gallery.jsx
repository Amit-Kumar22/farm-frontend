import { Image as ImageIcon } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import CoverImage from "../ui/CoverImage";
import { galleryApi } from "@/lib/api/gallery";

export default async function Gallery() {
  const res = await galleryApi.list().catch(() => null);
  const images = res?.data || [];

  if (!images.length) return null;

  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="Our Gallery" title="A Look Around The Farm" />
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {images.slice(0, 8).map((img) => (
            <CoverImage
              key={img._id}
              src={img.image}
              alt={img.caption}
              icon={ImageIcon}
              className="h-48 w-full rounded-xl"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
