import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://lami-chemeda-github-io-75n7.vercel.app"),
  title: {
    default: "Lami Chemeda | Full-Stack Developer & ERP Specialist",
    template: "%s | Lami Chemeda",
  },
  description:
    "Lami Chemeda is a Full-Stack Developer and ERP specialist based in Ethiopia, building scalable web, mobile, and enterprise solutions with React, ASP.NET, Node.js, and Python.",
  keywords: [
    "Lami Chemeda",
    "Full-Stack Developer Ethiopia",
    "ERP Developer",
    "React Native Developer",
    "ASP.NET Developer",
    "Node.js Developer",
    "Portfolio",
    "information technology student in ethiopia",
    "Lami Chemeda GitHub",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Lami Chemeda | Full-Stack Developer & ERP Specialist",
    description:
      "Portfolio and professional profile of Lami Chemeda, a full-stack and ERP developer delivering enterprise web and mobile solutions.",
    url: "https://lami-chemeda-github-io-75n7.vercel.app",
    siteName: "Lami Chemeda Portfolio",
    type: "website",
    images: [
      {
        url: "/images/graduate photo.jpg",
        width: 1200,
        height: 630,
        alt: "Lami Chemeda Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lami Chemeda | Full-Stack Developer & ERP Specialist",
    description:
      "Full-stack developer and ERP specialist building scalable web and mobile solutions in Ethiopia.",
    images: ["/images/graduate photo.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
