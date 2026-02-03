"use client";

import { ReactNode } from "react";
import { useGetMeQuery } from "@/features/auth/auth.api";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { FullPageLoader } from "@/components/ui/loader";

interface AuthGuardProps {
    children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const user = useSelector((state: RootState) => state.auth.user);

    const { isLoading } = useGetMeQuery(undefined, {
        skip: !!user,
    });

    if (isLoading) {
        return <FullPageLoader />;
    }

    return <>{children}</>;
}
