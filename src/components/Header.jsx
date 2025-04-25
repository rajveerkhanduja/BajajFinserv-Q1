import { useState, useRef, useEffect } from 'react';
import { Search } from 'react-feather';

const Header = ({ searchTerm, setSearchTerm, doctors }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  // Filter doctors based on search term
  useEffect(() => {
    if (searchTerm.trim() && doctors.length > 0) {
      const filtered = doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, doctors]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim()) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (doctorName) => {
    setSearchTerm(doctorName);
    setShowSuggestions(false);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container px-4 py-4 mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">Doctor Finder</h1>
          
          <div className="relative w-full max-w-md" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for doctors..."
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={handleSearchChange}
                data-testid="search-input"
              />
              <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
            </div>
            
            {showSuggestions && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                {suggestions.map((doctor) => (
                  <div 
                    key={doctor.id}
                    className="flex items-center p-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(doctor.name)}
                    data-testid={`suggestion-${doctor.id}`}
                  >
                    <div className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full">
                      {doctor.photo ? (
                        <img 
                          src={doctor.photo} 
                          alt={doctor.name} 
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-white bg-blue-500">
                          {doctor.name_initials || doctor.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">{doctor.name}</div>
                      <div className="text-sm text-gray-500">
                        {doctor.specialities && doctor.specialities.length > 0 
                          ? doctor.specialities.map(s => s.name).join(', ') 
                          : 'Specialist'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;