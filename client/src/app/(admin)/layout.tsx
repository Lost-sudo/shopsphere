import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />
            <main className="flex-1 p-6 lg:p-10 overflow-auto">
                {children}
            </main>
        </div>
    );
}
