import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      <span className="ml-3 text-lg text-gray-700">Cargando...</span>
    </div>
  );
};

export default Loading; 