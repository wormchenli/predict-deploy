import Papa from 'papaparse';

export const getPrices = async () => {
  try {
    console.log('Fetching file from ../BTC-USD.csv...');
    const response = await fetch('../BTC-USD.csv');

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    console.log('File fetched successfully.');

    const csvText = await response.text();
    console.log('CSV Text:', csvText);

    // Parse the CSV text using PapaParse
    const data = Papa.parse(csvText, { header: true }).data;
    console.log('Parsed Data:', data);

    return data;
  } catch (error) {
    console.error('Error loading CSV file:', error);
  }
};