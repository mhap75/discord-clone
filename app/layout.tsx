import Clerk from "@/Providers/Clerk";
import ModalProvider from "@/Providers/ModalProvider";
import { ThemeProvider } from "@/Providers/ThemeProvider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.scss";

const os = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discord CL",
  description: "Discover my new discord clone NEXT application",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Clerk>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(os.className, "bg-white dark:bg-primary-background")}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            storageKey="discord-theme"
          >
            <main>
              <ModalProvider />
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </Clerk>
  );
}
