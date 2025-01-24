import { cn } from '@/lib/utils/helpers/utils';

export const Background = (props: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn('w-full bg-secondary', props.className)}>
    {props.children}
  </div>
);
