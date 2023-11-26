import { MontFont, SpaceFont } from '@/font';
import './globals.css';
import { Providers } from './Providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${SpaceFont.variable} ${SpaceFont.className}`}
        suppressHydrationWarning={true}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}