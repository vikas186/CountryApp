const axios = require('axios');
const { REST_COUNTRIES_API_URL } = require('../utility/config');


// Function to search countries by name
const searchCountries = async (req, res) => {
    // Extract parameters with defaults from query
    const name = req.query.name || ''; // Use query parameters
    const page = parseInt(req.query.page, 10) || 1; // Ensure page is a number
    const limit = parseInt(req.query.limit, 10) || 10; // Ensure limit is a number

    try {
        const response = await axios.get(`${REST_COUNTRIES_API_URL}/all`);
        let countries = response.data.map((country) => ({
            name: country.name.common,
            flag: country.flags.svg,
            population: country.population,
            cca3: country.cca3,
        }));

        // Filter countries based on the search name if provided
        if (name) {
            countries = countries.filter((country) =>
                country.name.toLowerCase().includes(name.toLowerCase())
            );
        }

        // Pagination logic
        const totalCountries = countries.length;
        const totalPages = Math.ceil(totalCountries / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedCountries = countries.slice(startIndex, endIndex);

        res.json({
            total: totalCountries,
            totalPages: totalPages,
            currentPage: page,
            limit: limit,
            countries: paginatedCountries,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




// Function to fetch country details by country code
const getCountryDetails = async (req, res) => {
    const { code } = req.params;

    try {
        const response = await axios.get(`${REST_COUNTRIES_API_URL}/alpha/${code}`);
        const countries = response.data;

        // Check if the response is an array and has at least one country object
        if (!Array.isArray(countries) || countries.length === 0) {
            return res.status(404).json({ error: 'Country not found' });
        }

        const country = countries[0]; // Extract the first country object from the array

        // Ensure country object and its properties exist before accessing them
        if (!country || !country.name || !country.flags || !country.flags.svg) {
            return res.status(404).json({ error: 'Country not found' });
        }

        const countryDetails = {
            name: country.name.common || 'N/A',
            flag: country.flags.svg || 'N/A',
            population: country.population || 'N/A',
            capital: country.capital ? country.capital[0] : 'N/A',
            region: country.region || 'N/A',
            subregion: country.subregion || 'N/A',
            languages: country.languages
                ? Object.values(country.languages).join(', ')
                : 'N/A',
        };

        res.json(countryDetails);

    } catch (error) {
        console.error('Error fetching country details:', error); // Log the error details
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    searchCountries,
    getCountryDetails,
};