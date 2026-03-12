import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata = {
  title: "SCG Digital | Futuristic Digital Marketing Agency",
  description: "Empowering brands with cutting-edge branding, social media marketing, and influencer marketing. Generate content calendars and connect with influencers.",
  keywords: "digital marketing, branding, social media marketing, influencer marketing, content calendar, influencer platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-background text-foreground">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main className="relative z-10 min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
