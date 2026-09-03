import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Long Video Generation Research Map',
  description:
    'A problem-oriented index of long video generation papers, code, project pages, and personal research notes.',
  openGraph: {
    title: 'Long Video Generation Research Map',
    description:
      'Explore long video generation methods by quality, length, speed, interactivity, and controllability.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
