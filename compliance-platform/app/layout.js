import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Layout from "@/components/Layout";
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from "@/shared";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: '/logo.svg',
      href: '/logo.svg',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Layout>{children}</Layout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
