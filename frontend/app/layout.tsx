import type {Metadata} from 'next';
import { Jost } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css'; // Global styles

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
});

export const metadata: Metadata = {
  title: 'Simbiose Desafio Fullstack',
  description: 'Frontend para o desafio fullstack da Simbiose Ventures',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${jost.variable} dark`}>
      <body className="font-sans bg-[#112342] text-white antialiased selection:bg-[#70a7cb] selection:text-white" suppressHydrationWarning>
        {children}
        <Toaster theme="dark" position="top-right" richColors />
      </body>
    </html>
  );
}
