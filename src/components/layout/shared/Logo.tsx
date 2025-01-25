import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
} & React.SVGProps<SVGSVGElement>;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-purple-600', className)}
      {...props}
    >
      {/* Cross plus symbol commonly used for healthcare */}
      <path d="M9 12h6" />
      <path d="M12 9v6" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
