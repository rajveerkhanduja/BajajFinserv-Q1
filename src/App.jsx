import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDoctors } from './hooks/useDoctors';
import { useFilters } from './hooks/useFilters';
import Header from './components/Header';
import DoctorsList from './components/DoctorsList';
import FilterPanel from './components/FilterPanel';
import SortBy from './components/SortBy';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';

function App() {
  const { doctors, loading, error } = useDoctors();
  const location = useLocation();
  const navigate = useNavigate();
  
  const {
    searchTerm,
    setSearchTerm,
    consultationMode,
    setConsultationMode,
    selectedSpecialties,
    setSelectedSpecialties,
    sortBy,
    setSortBy,
    filteredDoctors,
    updateFiltersFromQueryParams,
    getQueryParamsFromFilters
  } = useFilters(doctors);

  // Apply filters from URL on mount and when URL changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    updateFiltersFromQueryParams(queryParams);
  }, [location.search, updateFiltersFromQueryParams]);

  // Update URL when filters change
  useEffect(() => {
    const queryParams = getQueryParamsFromFilters();
    navigate({ search: queryParams.toString() }, { replace: true });
  }, [searchTerm, consultationMode, selectedSpecialties, sortBy, navigate, getQueryParamsFromFilters]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        doctors={doctors}
      />
      
      <main className="container px-4 py-6 mx-auto md:py-10">
        <div className="flex flex-col md:flex-row md:gap-6">
          <aside className="w-full mb-6 md:w-1/4 md:mb-0">
            {/* SortBy component placed above FilterPanel */}
            <SortBy
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            
            <FilterPanel
              consultationMode={consultationMode}
              setConsultationMode={setConsultationMode}
              selectedSpecialties={selectedSpecialties}
              setSelectedSpecialties={setSelectedSpecialties}
              doctors={doctors}
            />
          </aside>
          
          <div className="w-full md:w-3/4">
            <DoctorsList 
              doctors={filteredDoctors} 
              searchTerm={searchTerm}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;