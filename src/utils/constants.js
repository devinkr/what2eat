// Use localhost for development and heroku when deployed
const prod = {
	API_URL: 'https://devinkr.pythonanywhere.com/api',
};

const dev = {
	API_URL: 'http://localhost:8000/api',
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
