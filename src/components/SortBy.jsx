import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';
import { motion } from 'framer-motion';

const SortBy = ({ sortBy, setSortBy }) => {
  const [expanded, setExpanded] = useState(true);
  
  // Handle sort selection
  const handleSortChange = (sort) => {
    setSortBy(sort === sortBy ? '' : sort);
  };
  
  // Toggle section expansion
  const toggleExpanded = () => {
    setExpanded(prev => !prev);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleExpanded}
      >
        <h3 className="text-base font-medium text-gray-700" data-testid="sort-header">Sort By</h3>
        {expanded ? 
          <ChevronUp size={18} className="text-gray-500" /> : 
          <ChevronDown size={18} className="text-gray-500" />
        }
      </div>
      
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mt-3 space-y-3"
        >
          <div className="flex items-center">
            <input
              id="sort-fees"
              type="radio"
              className="w-4 h-4 text-blue-600 border-gray-300"
              checked={sortBy === 'fees'}
              onChange={() => handleSortChange('fees')}
              data-testid="sort-fees"
            />
            <label htmlFor="sort-fees" className="ml-2 text-sm text-gray-700">
              Fees (Low to High)
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="sort-experience"
              type="radio"
              className="w-4 h-4 text-blue-600 border-gray-300"
              checked={sortBy === 'experience'}
              onChange={() => handleSortChange('experience')}
              data-testid="sort-experience"
            />
            <label htmlFor="sort-experience" className="ml-2 text-sm text-gray-700">
              Experience (High to Low)
            </label>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SortBy;