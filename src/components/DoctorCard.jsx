import { Video, MapPin } from 'react-feather';

const DoctorCard = ({ doctor }) => {
  // Format specialties as comma-separated string
  const specialties = doctor.specialities.map(spec => spec.name).join(', ');
  
  return (
    <div className="doctor-card" data-testid="doctor-card">
      <div className="flex">
        {/* Doctor Image */}
        <div className="w-20 h-20 mr-4">
          <img 
            src={doctor.photo || 'https://via.placeholder.com/80x80?text=Dr'} 
            alt={doctor.name}
            className="object-cover w-full h-full rounded-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/80x80?text=Dr';
            }}
          />
        </div>
        
        {/* Doctor Info */}
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-800" data-testid="doctor-name">
            {doctor.name}
          </h3>
          
          <p className="mb-1 text-sm text-gray-600" data-testid="doctor-specialty">
            {specialties}
          </p>
          
          <p className="mb-2 text-sm text-gray-600" data-testid="doctor-experience">
            {doctor.experience}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {doctor.video_consult && (
              <span className="flex items-center px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">
                <Video size={12} className="mr-1" /> Video Consult
              </span>
            )}
            
            {doctor.in_clinic && (
              <span className="flex items-center px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                <MapPin size={12} className="mr-1" /> In Clinic
              </span>
            )}
          </div>
        </div>
        
        {/* Fee */}
        <div className="flex flex-col items-end justify-between">
          <span className="font-medium text-primary-600" data-testid="doctor-fee">
            {doctor.fees}
          </span>
          
          <button className="px-4 py-1 text-sm text-white transition-colors bg-primary-600 rounded-md hover:bg-primary-700">
            Book Now
          </button>
        </div>
      </div>
      
      {/* Location */}
      {doctor.clinic && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-medium">{doctor.clinic.name}</span> •{' '}
            {doctor.clinic.address.locality}, {doctor.clinic.address.city}
          </p>
        </div>
      )}
      
      {/* Languages */}
      {doctor.languages && doctor.languages.length > 0 && (
        <div className="mt-2">
          <p className="text-xs text-gray-500">
            <span className="font-medium">Speaks:</span> {doctor.languages.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;