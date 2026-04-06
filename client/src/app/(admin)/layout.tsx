import { AdminSidebar } from "@/components/admin/AdminSidebar";
import RoleGuard from "@/components/auth/RoleGuard";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RoleGuard allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
            <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
                <AdminSidebar />
                <main className="flex-1 p-6 lg:p-10 overflow-auto">
                    {children}
                </main>
            </div>
        </RoleGuard>
    );
}
