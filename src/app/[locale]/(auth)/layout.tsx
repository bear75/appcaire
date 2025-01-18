'use client';

import { svSE } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import { useParams } from 'next/navigation';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  // We still need useParams for Next.js routing but don't need the locale
  useParams();

  // Custom Swedish translations to enhance/override Clerk's built-in ones
  const customSwedishTranslations = {
    signIn: {
      start: {
        title: 'Logga in på ditt konto',
        subtitle: 'för att fortsätta till {{applicationName}}',
        actionText: 'Har du inget konto?',
        actionLink: 'Registrera dig',
      },
      emailCode: {
        title: 'Verifiera din e-post',
        subtitle: 'för att fortsätta till {{applicationName}}',
        formTitle: 'Verifieringskod',
        formSubtitle: 'Ange verifieringskoden som skickats till din e-postadress',
        resendButton: 'Fick du ingen kod? Skicka igen',
      },
      password: {
        title: 'Välkommen tillbaka',
        subtitle: 'för att fortsätta till {{applicationName}}',
        formTitle: 'Ange ditt lösenord',
        actionText: 'Glömt lösenord?',
        forgotPasswordTitle: 'Återställ ditt lösenord',
      },
    },
    signUp: {
      start: {
        title: 'Skapa ditt konto',
        subtitle: 'för att fortsätta till {{applicationName}}',
        actionText: 'Har du redan ett konto?',
        actionLink: 'Logga in',
      },
      emailCode: {
        title: 'Verifiera din e-post',
        subtitle: 'för att fortsätta till {{applicationName}}',
        formTitle: 'Verifieringskod',
        formSubtitle: 'Ange verifieringskoden som skickats till din e-postadress',
        resendButton: 'Fick du ingen kod? Skicka igen',
      },
    },
    userButton: {
      action__signOut: 'Logga ut',
      action__manageAccount: 'Hantera konto',
      action__signOutAll: 'Logga ut från alla enheter',
      action__addAccount: 'Lägg till konto',
    },
    formButtonPrimary: 'Fortsätt',
    formFieldLabel__emailAddress: 'E-postadress',
    formFieldLabel__password: 'Lösenord',
    formFieldAction__forgotPassword: 'Glömt lösenord?',
    formFieldInputPlaceholder__emailAddress: 'namn@exempel.se',
    formFieldInputPlaceholder__password: 'Ange ditt lösenord',
    footerActionLink__useAnotherMethod: 'Använd en annan metod',
    dividerText: 'eller',
    socialButtonsBlockButton: 'Fortsätt med {{provider}}',
  };

  // Always use Swedish locale with custom translations
  const clerkLocale = { ...svSE, ...customSwedishTranslations };

  // Base URLs - always use English routes
  const signInUrl = '/en/sign-in';
  const signUpUrl = '/en/sign-up';
  const dashboardUrl = '/en/dashboard';
  const afterSignOutUrl = '/en';

  return (
    <ClerkProvider
      localization={clerkLocale}
      signInUrl={signInUrl}
      signUpUrl={signUpUrl}
      redirectUrl={dashboardUrl}
      afterSignOutUrl={afterSignOutUrl}
    >
      {children}
    </ClerkProvider>
  );
}
