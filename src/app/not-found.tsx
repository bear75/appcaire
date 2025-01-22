import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404 - Sidan kunde inte hittas</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Sidan du letar efter finns inte eller har flyttats.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
        >
          Gå till startsidan
        </Link>
      </div>
    </div>
  );
} 