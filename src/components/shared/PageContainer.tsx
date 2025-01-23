interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6 bg-slate-50">
      {children}
    </div>
  );
} 