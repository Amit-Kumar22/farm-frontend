import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MainOffset from "@/components/layout/MainOffset";

export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <MainOffset>{children}</MainOffset>
      <Footer />
    </>
  );
}
