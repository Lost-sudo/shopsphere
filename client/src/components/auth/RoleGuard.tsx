"use client";

import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";
import { FullPageLoader } from "@/components/ui/loader";

interface RoleGuardProps {
    children: ReactNode;
    allowedRoles: ("CUSTOMER" | "ADMIN" | "SUPER_ADMIN")[];
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
    const user = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
            return;
        }

        if (!allowedRoles.includes(user.role)) {
            router.push("/");
        }
    }, [user, allowedRoles, router]);

    if (!user || !allowedRoles.includes(user.role)) {
        return <FullPageLoader />;
    }

    return <>{children}</>;
}
