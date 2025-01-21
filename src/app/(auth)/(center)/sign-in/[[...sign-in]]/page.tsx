import { SignIn } from '@clerk/nextjs';

export const metadata = {
  title: 'Logga in - Caire',
  description: 'Logga in på ditt Caire-konto',
};

export default function SignInPage() {
  return (
    <div className="w-full max-w-[400px] px-4">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
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
