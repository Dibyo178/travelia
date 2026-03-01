import React from 'react';

const PackageCard = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
      <img 
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" 
        alt="Destination" 
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-orange-500 font-bold">$150.00</span>
          <span className="text-sm text-gray-500">7 Days</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-slate-900">Beautiful Island Resort</h3>
        <p className="text-gray-600 text-sm mb-4">Explore the beauty of the blue ocean and white sands.</p>
        <button className="w-full py-3 bg-slate-100 font-bold rounded-lg hover:bg-orange-500 hover:text-white transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PackageCard;