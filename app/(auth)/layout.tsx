import { Link } from "@nextui-org/react";
import { Headphones } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-content1">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center items-center gap-2 mb-8">
          <Headphones className="w-10 h-10 text-primary" />
          <span className="text-3xl font-bold">HelpDesk Pro</span>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 dark:bg-content1/80 backdrop-blur-md py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-divider">
          {children}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-default-600">
          © 2024 HelpDesk Pro. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
