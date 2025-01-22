import { Navbar } from '@/templates/Navbar';

export default function UnauthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
} 