import { UserManagement } from "@/components/admin/UserManagement";

export default function UsersPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          User Management
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 font-medium">
          View, filter, and manage all registered users.
        </p>
      </div>

      {/* User Management Component */}
      <UserManagement />
    </div>
  );
}
