import { SignIn } from '@clerk/nextjs';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Logga in | Caire',
  description: 'Logga in på ditt Caire-konto.',
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: 'bg-purple-600 hover:bg-purple-700',
            footerActionLink: 'text-purple-600 hover:text-purple-700',
          },
        }}
        redirectUrl="/dashboard"
      />
    </div>
  );
}
