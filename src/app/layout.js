import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import AuthProvider from "@/components/providers/AuthProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import MouseGradient from "@/components/ui/MouseGradient";
import ScrollProgress from "@/components/ui/ScrollProgress";

export const metadata = {
  title: "Sumvaik Consulting Group | Futuristic Digital Marketing Agency",
  description: "Empowering brands with cutting-edge branding, social media marketing, and influencer marketing. Generate content calendars and connect with influencers.",
  keywords: "digital marketing, branding, social media marketing, influencer marketing, content calendar, influencer platform",
  openGraph: {
    title: "Sumvaik Consulting Group | Futuristic Digital Marketing Agency",
    description: "Empowering brands with cutting-edge branding, social media marketing, and influencer marketing. Generate content calendars and connect with influencers.",
    url: "https://www.sumvaik.com",
    siteName: "Sumvaik Consulting Group",
    image: "/og-image.png",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumvaik Consulting Group | Futuristic Digital Marketing Agency",
    description: "Empowering brands with cutting-edge branding, social media marketing, and influencer marketing. Generate content calendars and connect with influencers.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-background text-foreground">
        <AuthProvider>
          <SmoothScroll>
            <Preloader />
            <ScrollProgress />
            <CustomCursor />
            <MouseGradient />
            <Navbar />
            <main className="relative z-10 min-h-screen">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
