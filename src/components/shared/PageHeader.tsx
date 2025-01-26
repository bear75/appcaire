type PageHeaderProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

export function PageHeader({
  title,
  description,
  icon,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
          {description && (
            <p className="text-sm text-slate-600">{description}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
