// API service

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetches doctor data from the API with retry mechanism
 * @param {number} maxRetries Maximum number of retry attempts
 * @param {number} retryDelay Delay between retries in milliseconds
 * @returns {Promise<Array>} Array of doctor data
 */
export const fetchDoctors = async (maxRetries = 3, retryDelay = 1000) => {
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // Increased to 30 seconds
      
      console.log(`Attempt ${attempt + 1}: Starting API request...`);
      
      // Use the direct GitHub Pages URL instead of a proxy
      const apiUrl = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';
      
      const response = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      console.log(`Attempt ${attempt + 1}: Response received with status: ${response.status}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`Data successfully parsed, found ${data.length || 0} records`);
      
      // Process the data to add local image fallbacks if needed
      const processedData = data.map(doctor => ({
        ...doctor,
        // You can add a property to indicate a local fallback image should be used
        // This is just an example - adjust according to your actual data structure
        useLocalImage: true
      }));
      
      return processedData;
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt + 1} error:`, error.name, error.message);
      
      if (error.name === 'AbortError') {
        if (attempt < maxRetries - 1) {
          console.log(`Request timed out, will retry (${attempt + 1}/${maxRetries})`);
          await delay(retryDelay);
          continue;
        } else {
          throw new Error('Request timed out after multiple attempts. The server might be down or unreachable.');
        }
      }

      if (attempt < maxRetries - 1) {
        console.log(`Attempt ${attempt + 1} failed, retrying in ${retryDelay}ms...`);
        await delay(retryDelay);
        continue;
      }
    }
  }

  if (lastError instanceof TypeError && lastError.message === 'Failed to fetch') {
    throw new Error('Network error: Please check your internet connection');
  }
  
  throw lastError || new Error('Failed to fetch doctors data after multiple attempts');
};