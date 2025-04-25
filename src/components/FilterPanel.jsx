import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';
import { motion } from 'framer-motion';

const FilterPanel = ({
  consultationMode,
  setConsultationMode,
  selectedSpecialties,
  setSelectedSpecialties,
  doctors
}) => {
  const [expandedSections, setExpandedSections] = useState({
    consultation: true,
    specialties: true
  });
  
  const [uniqueSpecialties, setUniqueSpecialties] = useState([]);
  
  // Extract unique specialties from doctors data
  useEffect(() => {
    if (doctors && doctors.length > 0) {
      const specialtiesSet = new Set();
      
      doctors.forEach(doctor => {
        doctor.specialities.forEach(specialty => {
          specialtiesSet.add(specialty.name);
        });
      });
      
      setUniqueSpecialties(Array.from(specialtiesSet).sort());
    }
  }, [doctors]);
  
  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Handle consultation mode change
  const handleConsultationChange = (mode) => {
    setConsultationMode(mode === consultationMode ? '' : mode);
  };
  
  // Handle specialty selection
  const handleSpecialtyChange = (specialty) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setConsultationMode('');
    setSelectedSpecialties([]);
  };
  
  return (
    <div className="sticky top-4 bg-white rounded-lg shadow-sm p-4">
      {/* Filters Header with Clear All */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800">Filters</h2>
        <button 
          onClick={clearAllFilters}
          className="text-blue-500 text-sm font-medium"
          data-testid="clear-all-filters"
        >
          Clear All
        </button>
      </div>

      {/* Specialties Filter */}
      <div className="filter-section mb-4 border-b pb-4">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('specialties')}
        >
          <h3 className="filter-header text-base font-medium text-gray-700" data-testid="filter-header-speciality">Specialties</h3>
          {expandedSections.specialties ? 
            <ChevronUp size={18} className="text-gray-500" /> : 
            <ChevronDown size={18} className="text-gray-500" />
          }
        </div>
        
        {expandedSections.specialties && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-3 space-y-3 max-h-60 overflow-y-auto"
          >
            {uniqueSpecialties.map(specialty => (
              <div key={specialty} className="flex items-center">
                <input
                  id={`specialty-${specialty}`}
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  checked={selectedSpecialties.includes(specialty)}
                  onChange={() => handleSpecialtyChange(specialty)}
                  data-testid={`filter-specialty-${specialty.replace('/', '-')}`}
                />
                <label htmlFor={`specialty-${specialty}`} className="ml-2 text-sm text-gray-700">
                  {specialty}
                </label>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Consultation Mode Filter */}
      <div className="filter-section mb-4">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('consultation')}
        >
          <h3 className="filter-header text-base font-medium text-gray-700" data-testid="filter-header-moc">Mode of consultation</h3>
          {expandedSections.consultation ? 
            <ChevronUp size={18} className="text-gray-500" /> : 
            <ChevronDown size={18} className="text-gray-500" />
          }
        </div>
        
        {expandedSections.consultation && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-3 space-y-3"
          >
            <div className="flex items-center">
              <input
                id="video-consult"
                type="radio"
                className="w-4 h-4 text-blue-600 border-gray-300"
                checked={consultationMode === 'Video Consult'}
                onChange={() => handleConsultationChange('Video Consult')}
                data-testid="filter-video-consult"
              />
              <label htmlFor="video-consult" className="ml-2 text-sm text-gray-700">
                Video Consultation
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="in-clinic"
                type="radio"
                className="w-4 h-4 text-blue-600 border-gray-300"
                checked={consultationMode === 'In Clinic'}
                onChange={() => handleConsultationChange('In Clinic')}
                data-testid="filter-in-clinic"
              />
              <label htmlFor="in-clinic" className="ml-2 text-sm text-gray-700">
                In-clinic Consultation
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="all-consultation"
                type="radio"
                className="w-4 h-4 text-blue-600 border-gray-300"
                checked={consultationMode === 'All'}
                onChange={() => handleConsultationChange('All')}
                data-testid="filter-all-consultation"
              />
              <label htmlFor="all-consultation" className="ml-2 text-sm text-gray-700">
                All
              </label>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;