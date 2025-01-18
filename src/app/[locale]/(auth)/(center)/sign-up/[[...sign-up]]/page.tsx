import { SignUp } from '@clerk/nextjs';
import { getTranslations } from 'next-intl/server';

import { getI18nPath } from '@/utils/Helpers';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'SignUp',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const SignUpPage = (props: { params: { locale: string } }) => (
  <div className="w-full max-w-[400px] px-4">
    <SignUp
      path={getI18nPath('/sign-up', props.params.locale)}
      routing="path"
      signInUrl={getI18nPath('/sign-in', props.params.locale)}
      redirectUrl={getI18nPath('/dashboard', props.params.locale)}
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

export default SignUpPage;
