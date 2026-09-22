import { Quiz } from "@/components/Quiz";

export default function Home() {
  return (
    <main className="min-h-screen py-12">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-center mb-2">Japan Visa Finder</h1>
        <p className="text-gray-500 text-center text-sm mb-8">
          Find your path to Japan
        </p>
        <Quiz />
      </div>
    </main>
  );
}
