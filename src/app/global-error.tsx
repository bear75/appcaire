'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Ett allvarligt fel har inträffat</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Vi har notifierats om felet och arbetar på en lösning.
        </p>
        <button
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-400"
          onClick={() => reset()}
          type="button"
        >
          Försök igen
        </button>
      </div>
    </div>
  );
}
