import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

import { cn } from '@/lib/utils/css/tailwind';

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FAQItem[];
  className?: string;
};

export function FAQ({ items, className }: FAQProps) {
  return (
    <div
      className={cn(
        'mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40',
        className,
      )}
    >
      <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
        <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
          Vanliga frågor
        </h2>
        <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
          {items.map(item => (
            <div key={item.question} className="space-y-4">
              <Disclosure as="div" className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">
                          {item.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                            className={cn(
                              open ? '-rotate-180' : 'rotate-0',
                              'h-6 w-6 transform transition duration-200',
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">
                        {item.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
