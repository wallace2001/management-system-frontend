import { auth } from "@/lib/auth/auth-config";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await auth();

  if (!data?.user) {
    redirect('/auth/login');
  }

  return (
    <div>
        {children}
    </div>
  );
}
