import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "마음마을 이야기 — 아이들의 마음에 색을 입히는 곳",
  description: "일곱 동물 친구들과 함께 동화를 읽고 색칠하며 사회정서 역량을 키우는 교육 콘텐츠 플랫폼",
  openGraph: {
    title: "마음마을 이야기",
    description: "아이들의 마음에 색을 입히는 곳",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 낡은 Service Worker 자동 해제 — sw.js 없는 배포 환경에서 캐시된 SW 제거 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(regs) {
    regs.forEach(function(reg) { reg.unregister(); });
  });
}
`,
          }}
        />
      </head>
      <body className="antialiased sb-paper">
        <Header />
        <main className="max-w-[1440px] mx-auto min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
