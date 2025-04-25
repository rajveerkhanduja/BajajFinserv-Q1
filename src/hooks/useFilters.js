import { useState, useCallback, useMemo } from 'react';

export const useFilters = (doctors = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [consultationMode, setConsultationMode] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [sortBy, setSortBy] = useState('');

  // Extract unique specialties from doctors
  const allSpecialties = useMemo(() => {
    if (!doctors.length) return [];
    
    const specialtiesSet = new Set();
    
    doctors.forEach(doctor => {
      doctor.specialities.forEach(specialty => {
        specialtiesSet.add(specialty.name);
      });
    });
    
    return Array.from(specialtiesSet).sort();
  }, [doctors]);

  // Apply filters and sorting to doctors
  const filteredDoctors = useMemo(() => {
    let result = [...doctors];
    
    // Filter by search term
    if (searchTerm) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(lowercaseSearchTerm)
      );
    }
    
    // Filter by consultation mode
    if (consultationMode) {
      if (consultationMode === 'Video Consult') {
        result = result.filter(doctor => doctor.video_consult);
      } else if (consultationMode === 'In Clinic') {
        result = result.filter(doctor => doctor.in_clinic);
      }
    }
    
    // Filter by specialties
    if (selectedSpecialties.length > 0) {
      result = result.filter(doctor => 
        doctor.specialities.some(specialty => 
          selectedSpecialties.includes(specialty.name)
        )
      );
    }
    
    // Apply sorting
    if (sortBy) {
      if (sortBy === 'fees') {
        result.sort((a, b) => {
          const feeA = parseInt(a.fees.replace(/[^\d]/g, ''), 10);
          const feeB = parseInt(b.fees.replace(/[^\d]/g, ''), 10);
          return feeA - feeB;
        });
      } else if (sortBy === 'experience') {
        result.sort((a, b) => {
          const expA = parseInt(a.experience.match(/\d+/)?.[0] || 0, 10);
          const expB = parseInt(b.experience.match(/\d+/)?.[0] || 0, 10);
          return expB - expA; // descending for experience
        });
      }
    }
    
    return result;
  }, [doctors, searchTerm, consultationMode, selectedSpecialties, sortBy]);

  // Update filters from URL query parameters
  const updateFiltersFromQueryParams = useCallback((queryParams) => {
    const search = queryParams.get('search');
    const mode = queryParams.get('mode');
    const sort = queryParams.get('sort');
    const specialties = queryParams.getAll('specialty');
    
    if (search) setSearchTerm(search);
    if (mode) setConsultationMode(mode);
    if (sort) setSortBy(sort);
    if (specialties.length) setSelectedSpecialties(specialties);
  }, []);

  // Get URL query parameters from current filters
  const getQueryParamsFromFilters = useCallback(() => {
    const params = new URLSearchParams();
    
    if (searchTerm) params.set('search', searchTerm);
    if (consultationMode) params.set('mode', consultationMode);
    if (sortBy) params.set('sort', sortBy);
    
    selectedSpecialties.forEach(specialty => {
      params.append('specialty', specialty);
    });
    
    return params;
  }, [searchTerm, consultationMode, selectedSpecialties, sortBy]);

  return {
    searchTerm,
    setSearchTerm,
    consultationMode,
    setConsultationMode,
    selectedSpecialties,
    setSelectedSpecialties,
    sortBy,
    setSortBy,
    filteredDoctors,
    allSpecialties,
    updateFiltersFromQueryParams,
    getQueryParamsFromFilters
  };
};