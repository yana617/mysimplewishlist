import { WishlistHeader } from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-screen">
            <WishlistHeader />
            {children}
        </div>
    );
}
