import { ReactNode } from "react";
import ResponsiveNav from "@/components/Navbar/ResponsiveNav";
import Footer from "@/components/general/Footer";
import images from "@/constants/images";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-[-1]"
        style={{
          backgroundImage: `url(${images.backgroundImage.src})`,
        }}
      />
      <div className="absolute inset-0 dark:bg-blue-900 bg-blue-800 opacity-50 z-[-1]" />
      <ResponsiveNav />

      {children}
      <Footer />
    </div>
  );
};

export default Layout;
