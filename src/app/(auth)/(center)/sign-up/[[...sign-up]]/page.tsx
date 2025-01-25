import { SignUp } from '@clerk/nextjs';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skapa konto | Caire',
  description: 'Skapa ett nytt Caire-konto.',
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: 'bg-purple-600 hover:bg-purple-700',
            footerActionLink: 'text-purple-600 hover:text-purple-700',
          },
        }}
        redirectUrl="/onboarding/organization-selection"
      />
    </div>
  );
}
