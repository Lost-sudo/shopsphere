import { AdminSidebar } from "@/components/admin/AdminSidebar";
import RoleGuard from "@/components/auth/RoleGuard";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RoleGuard allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
            <div className="relative flex min-h-screen bg-slate-50 overflow-hidden">
                {/* Global Background Animated Blobs */}
                <div className="fixed top-0 -left-4 w-96 h-96 bg-luxury-gold/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob pointer-events-none" />
                <div className="fixed top-20 -right-4 w-96 h-96 bg-neutral-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob [animation-delay:2000ms] pointer-events-none" />
                <div className="fixed bottom-20 left-20 w-96 h-96 bg-stone-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob [animation-delay:4000ms] pointer-events-none" />

                <AdminSidebar />
                <main className="relative z-10 flex-1 p-6 lg:p-10 overflow-auto">
                    {children}
                </main>
            </div>
        </RoleGuard>
    );
}

