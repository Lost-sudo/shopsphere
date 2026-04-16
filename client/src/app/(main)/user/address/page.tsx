import { cookies } from "next/headers";
import { AddressClient } from "@/components/account/AddressClient";
import { env } from "@/lib/env";

async function getAddresses() {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
        return [];
    }

    try {
        const response = await fetch(`${env.apiBaseUrl}/addresses/get-user-addresses`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            // We can add cache: 'no-store' or revalidate if needed
            cache: 'no-store', 
        });

        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        return data.addresses || [];
    } catch (error) {
        console.error("Failed to fetch addresses on server:", error);
        return [];
    }
}

export default async function AddressPage() {
    const initialAddresses = await getAddresses();

    return <AddressClient initialAddresses={initialAddresses} />;
}
