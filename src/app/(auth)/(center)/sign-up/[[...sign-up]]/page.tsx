import { SignUp } from '@clerk/nextjs';

export const metadata = {
  title: 'Registrera dig - Caire',
  description: 'Skapa ett nytt Caire-konto',
};

export default function SignUpPage() {
  return (
    <div className="w-full max-w-[400px] px-4">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        redirectUrl="/dashboard"
        appearance={{
          elements: {
            rootBox: 'w-full',
            card: 'w-full shadow-none border border-border',
            formButtonPrimary: 'bg-primary hover:bg-primary/90',
          },
        }}
      />
    </div>
  );
}
