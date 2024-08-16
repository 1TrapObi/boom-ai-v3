import React from "react";
import { useParams, Link } from "react-router-dom";

const ConfirmSelection = () => {
  const { source } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Confirmation</h1>
        <p className="text-xl mb-8 text-gray-300">
          {source === "skipped"
            ? "You've selected a data source."
            : `You've selected ${source} as your data source.`}
        </p>
        <Link
          to="/ask-boom-ai"
          className="bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 inline-block"
        >
          Start Using BoomAI
        </Link>
      </div>
    </div>
  );
};

export default ConfirmSelection;
