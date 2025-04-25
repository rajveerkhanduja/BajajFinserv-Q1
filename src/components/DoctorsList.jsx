import { motion } from 'framer-motion';
import DoctorCard from './DoctorCard';

const DoctorsList = ({ doctors, searchTerm }) => {
  if (!doctors || doctors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="mb-2 text-xl font-semibold text-gray-700">No doctors found</h2>
        {searchTerm ? (
          <p className="text-gray-500">
            No doctors matching "{searchTerm}". Try adjusting your filters.
          </p>
        ) : (
          <p className="text-gray-500">
            No doctors match the current filters. Try changing your filters.
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {doctors.map((doctor, index) => (
          <motion.div
            key={doctor.id} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <DoctorCard doctor={doctor} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;