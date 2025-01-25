export * from './client';
export * from './types';

// Re-export commonly used Clerk components and hooks
export {
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  UserButton,
} from '@clerk/nextjs';
export {
  useOrganization,
  useSession,
  useSignIn,
  useSignUp,
  useUser,
} from '@clerk/nextjs';
