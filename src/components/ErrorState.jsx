import { AlertCircle } from 'react-feather';

const ErrorState = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-full">
        <AlertCircle size={32} />
      </div>
      <h2 className="text-xl font-medium text-gray-700">Oops! Something went wrong</h2>
      <p className="mt-2 text-gray-500">{message || 'Failed to load doctors. Please try again later.'}</p>
      <button 
        className="px-4 py-2 mt-4 text-white bg-primary-600 rounded-md hover:bg-primary-700"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorState;