import { Link } from "react-router-dom";
import { ArrowLeft, BrainCircuit } from "lucide-react";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-[#09090b] text-white flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Icon */}
        <div className="mx-auto mb-6 w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
          <BrainCircuit className="w-6 h-6 text-violet-400" />
        </div>

        {/* 404 */}
        <h1 className="text-6xl font-semibold tracking-tight bg-linear-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-xl font-medium">Cortex lost this page.</h2>

        {/* Description */}
        <p className="mt-3 text-zinc-400 leading-relaxed">
          The page you're looking for doesn't exist or may have been moved
          somewhere else.
        </p>

        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8 px-5 py-3 rounded-xl text-sm bg-linear-to-br from-indigo-500 to-violet-700 hover:from-indigo-400 hover:to-violet-600 hover:bg-violet-500 font-medium border border-indigo-500/30 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-15 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to CortexAI
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
