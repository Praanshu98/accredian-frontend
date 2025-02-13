import React, { useState } from "react";
import ReferEarnModal from "./component/ReferEarnModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Refer & Earn</h1>
        <p className="mb-6">Earn rewards by referring your friends!</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100"
        >
          Refer Now
        </button>
      </header>

      {isModalOpen && <ReferEarnModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default App;
