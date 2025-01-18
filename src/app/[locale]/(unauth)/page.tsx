import Link from 'next/link';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import { getI18nPath } from '@/utils/Helpers';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const IndexPage = async (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);
  const t = await getTranslations('Index');

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {t('hero_title')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('hero_description')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={getI18nPath('/sign-up', props.params.locale)}
                className="hover:bg-primary/90 rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {t('get_started')}
              </Link>
              <Link
                href={getI18nPath('/sign-in', props.params.locale)}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {t('sign_in')}
                {' '}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
              {t('benefits_title')}
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="text-xl font-semibold text-gray-900">{t('feature_1_title')}</h3>
                <p className="mt-4 text-gray-600">
                  {t('feature_1_description')}
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="text-xl font-semibold text-gray-900">{t('feature_2_title')}</h3>
                <p className="mt-4 text-gray-600">
                  {t('feature_2_description')}
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="text-xl font-semibold text-gray-900">{t('feature_3_title')}</h3>
                <p className="mt-4 text-gray-600">
                  {t('feature_3_description')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IndexPage;
