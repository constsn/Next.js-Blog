import { Metadata } from 'next';
import './globals.css';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: {
    default: 'shuto tech',
    template: '%s | shuto tech',
  },
  description:
    'これは私の個人ブログです。Web開発、日記、技術記事などを発信しています。',
  keywords: ['ブログ', 'Web開発', 'Next.js', 'TypeScript', 'ポートフォリオ'],
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: 'shuto tech',
    description: 'Web開発、技術記事、日記などを発信する個人ブログです。',
    url: `${baseUrl}`,
    siteName: 'shuto tech',
    images: [
      {
        url: `${baseUrl}/ogp.png`,
        width: 1200,
        height: 630,
        alt: 'shuto tech',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'shuto tech',
    description: 'Web開発や技術に関する情報を発信中。',
    images: [`${baseUrl}/ogp.png`],
  },
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
