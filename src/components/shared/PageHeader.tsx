interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        {description && (
          <p className="text-sm text-slate-600">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
} 