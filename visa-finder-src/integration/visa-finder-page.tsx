/**
 * Copy this file to your site as: app/visa-finder/page.tsx
 * (or pages/visa-finder.tsx for Pages Router)
 */
import { QuizProvider } from "@/context/QuizContext";
import { Quiz } from "@/components/Quiz";

export default function VisaFinderPage() {
  return (
    <QuizProvider>
      <main className="min-h-screen py-12">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-center mb-2">Japan Visa Finder</h1>
          <p className="text-gray-500 text-center text-sm mb-8">
            Find your path to Japan
          </p>
          <Quiz />
        </div>
      </main>
    </QuizProvider>
  );
}
