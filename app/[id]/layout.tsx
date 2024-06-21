import { Header } from "@/components/Header";

export default function Layout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
    return (
        <div className="w-full h-screen">
            <Header listId={params.id} />
            {children}
        </div>
    );
}
