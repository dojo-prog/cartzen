import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { UserCircle } from "lucide-react";

const Navbar = () => {
  const { data: user } = useCurrentUser();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-6">
      <div>
        <p className="text-sm font-medium">Admin Dashboard</p>
      </div>

      <button
        type="button"
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted"
      >
        <UserCircle className="size-7 text-muted-foreground" />

        <div className="hidden text-left sm:block">
          <p className="text-sm font-medium">{user?.username ?? "Admin"}</p>
          <p className="text-xs text-muted-foreground">Administrator</p>
        </div>
      </button>
    </header>
  );
};

export default Navbar;
