export default function FormCard({ title, children }) {
    return (
        <main className="flex justify-center items-center min-h-screen bg-base-200">
            <section className="w-full max-w-md p-8 shadow-xl rounded-2xl bg-base-100">
                <h2 className="text-2xl font-semibold text-center mb-6 tracking-wide">{title}</h2>
                {children}
            </section>
        </main>
    );
}
