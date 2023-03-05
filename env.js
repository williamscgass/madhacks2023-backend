const isProduction = process.env.NODE_ENV === 'production';

const SITE_URL = isProduction ? 'https://altruistapp.tech' : 'http://localhost:4000';

module.exports = { SITE_URL }
