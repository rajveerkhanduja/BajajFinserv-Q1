# Doctor Finder Application
This project is a web application that helps users find doctors based on various filters like specialties and consultation modes. It provides a user-friendly interface to search for doctors, view their details, and book appointments.

## Features
- Search for doctors by name
- Filter doctors by specialties (Dentist, Neurologist, etc.)
- Filter by consultation mode (Video Consultation, In-clinic)
- Sort doctors by fees or experience
- View detailed doctor information including:
  - Profile photo
  - Name and specialties
  - Years of experience
  - Consultation fees
  - Available languages
  - Clinic location
  - Consultation modes

## Technologies Used
- React.js
- React Router for navigation
- Framer Motion for animations
- Tailwind CSS for styling
- Vite as the build tool
- Vercel for deployment

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
  
### Installation
1. Clone the repository
```bash
git clone <repository-url>
cd BajajFinserv-Q1
 ```

2. Install dependencies
```bash
npm install
 ```

3. Start the development server
```bash
npm run dev
 ```

4. Open your browser and navigate to http://localhost:5173

## Project Structure
```plaintext
BajajFinserv-Q1/
├── api/                  
├── src/
│   ├── components/      
│   ├── hooks/            
│   ├── services/         
│   ├── App.jsx          
│   └── main.jsx         
├── index.html           
├── vite.config.js       
└── vercel.json          
 ```

## API Integration
The application fetches doctor data from an external API(https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json).
For deployment, it uses a serverless function to proxy the requests and avoid CORS issues.
