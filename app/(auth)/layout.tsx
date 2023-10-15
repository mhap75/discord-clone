export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-center h-dynamic bg-primary-background">
      {children}
    </div>
  );
}
