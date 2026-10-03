export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-[#F2F4F5] px-4 py-12">
      <div className="w-full max-w-md rounded-md bg-white p-8 shadow-sm">{children}</div>
    </div>
  );
}
