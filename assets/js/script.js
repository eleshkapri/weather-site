/**
 * ==============================================================================
 * ATMOSPHERE — ENTERPRISE OBJECT-ORIENTED TELEMETRY ARCHITECTURE (OOP)
 * ==============================================================================
 * Core Principles:
 * - Strict Encapsulation & Data Hiding (ES6 Private Class Fields: #field)
 * - Single Responsibility & High Modularity
 * - Zero-Leak Key Protection: Inaccessible to global scope or browser console
 * - Responsive Adaptivity across all Device Form Factors (Mobile, Tablet, Desktop)
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const GLOBAL_CITY_CATALOG = [
  {
    "name": "Delhi",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.6139,
    "longitude": 77.209,
    "timezone": "Asia/Kolkata",
    "admin1": "Delhi"
  },
  {
    "name": "New Delhi",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.6139,
    "longitude": 77.209,
    "timezone": "Asia/Kolkata",
    "admin1": "Delhi"
  },
  {
    "name": "Mumbai",
    "country": "India",
    "country_code": "IN",
    "latitude": 19.076,
    "longitude": 72.8777,
    "timezone": "Asia/Kolkata",
    "admin1": "Maharashtra"
  },
  {
    "name": "Bengaluru",
    "country": "India",
    "country_code": "IN",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "timezone": "Asia/Kolkata",
    "admin1": "Karnataka"
  },
  {
    "name": "Bangalore",
    "country": "India",
    "country_code": "IN",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "timezone": "Asia/Kolkata",
    "admin1": "Karnataka"
  },
  {
    "name": "Hyderabad",
    "country": "India",
    "country_code": "IN",
    "latitude": 17.385,
    "longitude": 78.4867,
    "timezone": "Asia/Kolkata",
    "admin1": "Telangana"
  },
  {
    "name": "Chennai",
    "country": "India",
    "country_code": "IN",
    "latitude": 13.0827,
    "longitude": 80.2707,
    "timezone": "Asia/Kolkata",
    "admin1": "Tamil Nadu"
  },
  {
    "name": "Kolkata",
    "country": "India",
    "country_code": "IN",
    "latitude": 22.5726,
    "longitude": 88.3639,
    "timezone": "Asia/Kolkata",
    "admin1": "West Bengal"
  },
  {
    "name": "Pune",
    "country": "India",
    "country_code": "IN",
    "latitude": 18.5204,
    "longitude": 73.8567,
    "timezone": "Asia/Kolkata",
    "admin1": "Maharashtra"
  },
  {
    "name": "Ahmedabad",
    "country": "India",
    "country_code": "IN",
    "latitude": 23.0225,
    "longitude": 72.5714,
    "timezone": "Asia/Kolkata",
    "admin1": "Gujarat"
  },
  {
    "name": "Jaipur",
    "country": "India",
    "country_code": "IN",
    "latitude": 26.9124,
    "longitude": 75.7873,
    "timezone": "Asia/Kolkata",
    "admin1": "Rajasthan"
  },
  {
    "name": "Surat",
    "country": "India",
    "country_code": "IN",
    "latitude": 21.1702,
    "longitude": 72.8311,
    "timezone": "Asia/Kolkata",
    "admin1": "Gujarat"
  },
  {
    "name": "Lucknow",
    "country": "India",
    "country_code": "IN",
    "latitude": 26.8467,
    "longitude": 80.9462,
    "timezone": "Asia/Kolkata",
    "admin1": "Uttar Pradesh"
  },
  {
    "name": "Kanpur",
    "country": "India",
    "country_code": "IN",
    "latitude": 26.4499,
    "longitude": 80.3319,
    "timezone": "Asia/Kolkata",
    "admin1": "Uttar Pradesh"
  },
  {
    "name": "Nagpur",
    "country": "India",
    "country_code": "IN",
    "latitude": 21.1458,
    "longitude": 79.0882,
    "timezone": "Asia/Kolkata",
    "admin1": "Maharashtra"
  },
  {
    "name": "Indore",
    "country": "India",
    "country_code": "IN",
    "latitude": 22.7196,
    "longitude": 75.8577,
    "timezone": "Asia/Kolkata",
    "admin1": "Madhya Pradesh"
  },
  {
    "name": "Thane",
    "country": "India",
    "country_code": "IN",
    "latitude": 19.2183,
    "longitude": 72.9781,
    "timezone": "Asia/Kolkata",
    "admin1": "Maharashtra"
  },
  {
    "name": "Bhopal",
    "country": "India",
    "country_code": "IN",
    "latitude": 23.2599,
    "longitude": 77.4126,
    "timezone": "Asia/Kolkata",
    "admin1": "Madhya Pradesh"
  },
  {
    "name": "Visakhapatnam",
    "country": "India",
    "country_code": "IN",
    "latitude": 17.6868,
    "longitude": 83.2185,
    "timezone": "Asia/Kolkata",
    "admin1": "Andhra Pradesh"
  },
  {
    "name": "Patna",
    "country": "India",
    "country_code": "IN",
    "latitude": 25.5941,
    "longitude": 85.1376,
    "timezone": "Asia/Kolkata",
    "admin1": "Bihar"
  },
  {
    "name": "Vadodara",
    "country": "India",
    "country_code": "IN",
    "latitude": 22.3072,
    "longitude": 73.1812,
    "timezone": "Asia/Kolkata",
    "admin1": "Gujarat"
  },
  {
    "name": "Ghaziabad",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.6692,
    "longitude": 77.4538,
    "timezone": "Asia/Kolkata",
    "admin1": "Uttar Pradesh"
  },
  {
    "name": "Ludhiana",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.901,
    "longitude": 75.8573,
    "timezone": "Asia/Kolkata",
    "admin1": "Punjab"
  },
  {
    "name": "Agra",
    "country": "India",
    "country_code": "IN",
    "latitude": 27.1767,
    "longitude": 78.0081,
    "timezone": "Asia/Kolkata",
    "admin1": "Uttar Pradesh"
  },
  {
    "name": "Nashik",
    "country": "India",
    "country_code": "IN",
    "latitude": 19.9975,
    "longitude": 73.7898,
    "timezone": "Asia/Kolkata",
    "admin1": "Maharashtra"
  },
  {
    "name": "Faridabad",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.4089,
    "longitude": 77.3178,
    "timezone": "Asia/Kolkata",
    "admin1": "Haryana"
  },
  {
    "name": "Meerut",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.9845,
    "longitude": 77.7064,
    "timezone": "Asia/Kolkata",
    "admin1": "Uttar Pradesh"
  },
  {
    "name": "Rajkot",
    "country": "India",
    "country_code": "IN",
    "latitude": 22.3039,
    "longitude": 70.8022,
    "timezone": "Asia/Kolkata",
    "admin1": "Gujarat"
  },
  {
    "name": "Varanasi",
    "country": "India",
    "country_code": "IN",
    "latitude": 25.3176,
    "longitude": 82.9739,
    "timezone": "Asia/Kolkata",
    "admin1": "Uttar Pradesh"
  },
  {
    "name": "Srinagar",
    "country": "India",
    "country_code": "IN",
    "latitude": 34.0837,
    "longitude": 74.7973,
    "timezone": "Asia/Kolkata",
    "admin1": "Jammu and Kashmir"
  },
  {
    "name": "Amritsar",
    "country": "India",
    "country_code": "IN",
    "latitude": 31.634,
    "longitude": 74.8723,
    "timezone": "Asia/Kolkata",
    "admin1": "Punjab"
  },
  {
    "name": "Prayagraj",
    "country": "India",
    "country_code": "IN",
    "latitude": 25.4358,
    "longitude": 81.8463,
    "timezone": "Asia/Kolkata",
    "admin1": "Uttar Pradesh"
  },
  {
    "name": "Allahabad",
    "country": "India",
    "country_code": "IN",
    "latitude": 25.4358,
    "longitude": 81.8463,
    "timezone": "Asia/Kolkata",
    "admin1": "Uttar Pradesh"
  },
  {
    "name": "Ranchi",
    "country": "India",
    "country_code": "IN",
    "latitude": 23.3441,
    "longitude": 85.3096,
    "timezone": "Asia/Kolkata",
    "admin1": "Jharkhand"
  },
  {
    "name": "Coimbatore",
    "country": "India",
    "country_code": "IN",
    "latitude": 11.0168,
    "longitude": 76.9558,
    "timezone": "Asia/Kolkata",
    "admin1": "Tamil Nadu"
  },
  {
    "name": "Jabalpur",
    "country": "India",
    "country_code": "IN",
    "latitude": 23.1815,
    "longitude": 79.9864,
    "timezone": "Asia/Kolkata",
    "admin1": "Madhya Pradesh"
  },
  {
    "name": "Gwalior",
    "country": "India",
    "country_code": "IN",
    "latitude": 26.2183,
    "longitude": 78.1828,
    "timezone": "Asia/Kolkata",
    "admin1": "Madhya Pradesh"
  },
  {
    "name": "Vijayawada",
    "country": "India",
    "country_code": "IN",
    "latitude": 16.5062,
    "longitude": 80.648,
    "timezone": "Asia/Kolkata",
    "admin1": "Andhra Pradesh"
  },
  {
    "name": "Jodhpur",
    "country": "India",
    "country_code": "IN",
    "latitude": 26.2389,
    "longitude": 73.0243,
    "timezone": "Asia/Kolkata",
    "admin1": "Rajasthan"
  },
  {
    "name": "Madurai",
    "country": "India",
    "country_code": "IN",
    "latitude": 9.9252,
    "longitude": 78.1198,
    "timezone": "Asia/Kolkata",
    "admin1": "Tamil Nadu"
  },
  {
    "name": "Raipur",
    "country": "India",
    "country_code": "IN",
    "latitude": 21.2514,
    "longitude": 81.6296,
    "timezone": "Asia/Kolkata",
    "admin1": "Chhattisgarh"
  },
  {
    "name": "Kota",
    "country": "India",
    "country_code": "IN",
    "latitude": 25.2138,
    "longitude": 75.8648,
    "timezone": "Asia/Kolkata",
    "admin1": "Rajasthan"
  },
  {
    "name": "Chandigarh",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.7333,
    "longitude": 76.7794,
    "timezone": "Asia/Kolkata",
    "admin1": "Punjab"
  },
  {
    "name": "Guwahati",
    "country": "India",
    "country_code": "IN",
    "latitude": 26.1445,
    "longitude": 91.7362,
    "timezone": "Asia/Kolkata",
    "admin1": "Assam"
  },
  {
    "name": "Solapur",
    "country": "India",
    "country_code": "IN",
    "latitude": 17.6599,
    "longitude": 75.9064,
    "timezone": "Asia/Kolkata",
    "admin1": "Maharashtra"
  },
  {
    "name": "Mysore",
    "country": "India",
    "country_code": "IN",
    "latitude": 12.2958,
    "longitude": 76.6394,
    "timezone": "Asia/Kolkata",
    "admin1": "Karnataka"
  },
  {
    "name": "Gurgaon",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.4595,
    "longitude": 77.0266,
    "timezone": "Asia/Kolkata",
    "admin1": "Haryana"
  },
  {
    "name": "Gurugram",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.4595,
    "longitude": 77.0266,
    "timezone": "Asia/Kolkata",
    "admin1": "Haryana"
  },
  {
    "name": "Noida",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.5355,
    "longitude": 77.391,
    "timezone": "Asia/Kolkata",
    "admin1": "Uttar Pradesh"
  },
  {
    "name": "Bhubaneswar",
    "country": "India",
    "country_code": "IN",
    "latitude": 20.2961,
    "longitude": 85.8245,
    "timezone": "Asia/Kolkata",
    "admin1": "Odisha"
  },
  {
    "name": "Thiruvananthapuram",
    "country": "India",
    "country_code": "IN",
    "latitude": 8.5241,
    "longitude": 76.9366,
    "timezone": "Asia/Kolkata",
    "admin1": "Kerala"
  },
  {
    "name": "Kochi",
    "country": "India",
    "country_code": "IN",
    "latitude": 9.9312,
    "longitude": 76.2673,
    "timezone": "Asia/Kolkata",
    "admin1": "Kerala"
  },
  {
    "name": "Dehradun",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.3165,
    "longitude": 78.0322,
    "timezone": "Asia/Kolkata",
    "admin1": "Uttarakhand"
  },
  {
    "name": "Shimla",
    "country": "India",
    "country_code": "IN",
    "latitude": 31.1048,
    "longitude": 77.1734,
    "timezone": "Asia/Kolkata",
    "admin1": "Himachal Pradesh"
  },
  {
    "name": "Goa",
    "country": "India",
    "country_code": "IN",
    "latitude": 15.2993,
    "longitude": 74.124,
    "timezone": "Asia/Kolkata",
    "admin1": "Goa"
  },
  {
    "name": "Panaji",
    "country": "India",
    "country_code": "IN",
    "latitude": 15.4909,
    "longitude": 73.8278,
    "timezone": "Asia/Kolkata",
    "admin1": "Goa"
  },
  {
    "name": "Udaipur",
    "country": "India",
    "country_code": "IN",
    "latitude": 24.5854,
    "longitude": 73.7125,
    "timezone": "Asia/Kolkata",
    "admin1": "Rajasthan"
  },
  {
    "name": "Mangalore",
    "country": "India",
    "country_code": "IN",
    "latitude": 12.9141,
    "longitude": 74.856,
    "timezone": "Asia/Kolkata",
    "admin1": "Karnataka"
  },
  {
    "name": "Jammu",
    "country": "India",
    "country_code": "IN",
    "latitude": 32.7266,
    "longitude": 74.857,
    "timezone": "Asia/Kolkata",
    "admin1": "Jammu and Kashmir"
  },
  {
    "name": "London",
    "country": "United Kingdom",
    "country_code": "GB",
    "latitude": 51.5074,
    "longitude": -0.1278,
    "timezone": "Europe/London",
    "admin1": "England"
  },
  {
    "name": "Manchester",
    "country": "United Kingdom",
    "country_code": "GB",
    "latitude": 53.4808,
    "longitude": -2.2426,
    "timezone": "Europe/London",
    "admin1": "England"
  },
  {
    "name": "Birmingham",
    "country": "United Kingdom",
    "country_code": "GB",
    "latitude": 52.4862,
    "longitude": -1.8904,
    "timezone": "Europe/London",
    "admin1": "England"
  },
  {
    "name": "Edinburgh",
    "country": "United Kingdom",
    "country_code": "GB",
    "latitude": 55.9533,
    "longitude": -3.1883,
    "timezone": "Europe/London",
    "admin1": "Scotland"
  },
  {
    "name": "Glasgow",
    "country": "United Kingdom",
    "country_code": "GB",
    "latitude": 55.8642,
    "longitude": -4.2518,
    "timezone": "Europe/London",
    "admin1": "Scotland"
  },
  {
    "name": "Liverpool",
    "country": "United Kingdom",
    "country_code": "GB",
    "latitude": 53.4084,
    "longitude": -2.9916,
    "timezone": "Europe/London",
    "admin1": "England"
  },
  {
    "name": "Leeds",
    "country": "United Kingdom",
    "country_code": "GB",
    "latitude": 53.8008,
    "longitude": -1.5491,
    "timezone": "Europe/London",
    "admin1": "England"
  },
  {
    "name": "Bristol",
    "country": "United Kingdom",
    "country_code": "GB",
    "latitude": 51.4545,
    "longitude": -2.5879,
    "timezone": "Europe/London",
    "admin1": "England"
  },
  {
    "name": "Cardiff",
    "country": "United Kingdom",
    "country_code": "GB",
    "latitude": 51.4816,
    "longitude": -3.1791,
    "timezone": "Europe/London",
    "admin1": "Wales"
  },
  {
    "name": "Belfast",
    "country": "United Kingdom",
    "country_code": "GB",
    "latitude": 54.5973,
    "longitude": -5.9301,
    "timezone": "Europe/London",
    "admin1": "Northern Ireland"
  },
  {
    "name": "Dublin",
    "country": "Ireland",
    "country_code": "IE",
    "latitude": 53.3498,
    "longitude": -6.2603,
    "timezone": "Europe/Dublin",
    "admin1": "Leinster"
  },
  {
    "name": "Cork",
    "country": "Ireland",
    "country_code": "IE",
    "latitude": 51.8985,
    "longitude": -8.4756,
    "timezone": "Europe/Dublin",
    "admin1": "Munster"
  },
  {
    "name": "Paris",
    "country": "France",
    "country_code": "FR",
    "latitude": 48.8566,
    "longitude": 2.3522,
    "timezone": "Europe/Paris",
    "admin1": "Île-de-France"
  },
  {
    "name": "Marseille",
    "country": "France",
    "country_code": "FR",
    "latitude": 43.2965,
    "longitude": 5.3698,
    "timezone": "Europe/Paris",
    "admin1": "Provence-Alpes-Côte d'Azur"
  },
  {
    "name": "Lyon",
    "country": "France",
    "country_code": "FR",
    "latitude": 45.764,
    "longitude": 4.8357,
    "timezone": "Europe/Paris",
    "admin1": "Auvergne-Rhône-Alpes"
  },
  {
    "name": "Nice",
    "country": "France",
    "country_code": "FR",
    "latitude": 43.7102,
    "longitude": 7.262,
    "timezone": "Europe/Paris",
    "admin1": "Provence-Alpes-Côte d'Azur"
  },
  {
    "name": "Berlin",
    "country": "Germany",
    "country_code": "DE",
    "latitude": 52.52,
    "longitude": 13.405,
    "timezone": "Europe/Berlin",
    "admin1": "Land Berlin"
  },
  {
    "name": "Munich",
    "country": "Germany",
    "country_code": "DE",
    "latitude": 48.1351,
    "longitude": 11.582,
    "timezone": "Europe/Berlin",
    "admin1": "Bavaria"
  },
  {
    "name": "Frankfurt",
    "country": "Germany",
    "country_code": "DE",
    "latitude": 50.1109,
    "longitude": 8.6821,
    "timezone": "Europe/Berlin",
    "admin1": "Hesse"
  },
  {
    "name": "Hamburg",
    "country": "Germany",
    "country_code": "DE",
    "latitude": 53.5511,
    "longitude": 9.9937,
    "timezone": "Europe/Berlin",
    "admin1": "Hamburg"
  },
  {
    "name": "Cologne",
    "country": "Germany",
    "country_code": "DE",
    "latitude": 50.9375,
    "longitude": 6.9603,
    "timezone": "Europe/Berlin",
    "admin1": "North Rhine-Westphalia"
  },
  {
    "name": "Amsterdam",
    "country": "Netherlands",
    "country_code": "NL",
    "latitude": 52.3676,
    "longitude": 4.9041,
    "timezone": "Europe/Amsterdam",
    "admin1": "North Holland"
  },
  {
    "name": "Rotterdam",
    "country": "Netherlands",
    "country_code": "NL",
    "latitude": 51.9244,
    "longitude": 4.4777,
    "timezone": "Europe/Amsterdam",
    "admin1": "South Holland"
  },
  {
    "name": "Brussels",
    "country": "Belgium",
    "country_code": "BE",
    "latitude": 50.8503,
    "longitude": 4.3517,
    "timezone": "Europe/Brussels",
    "admin1": "Brussels"
  },
  {
    "name": "Antwerp",
    "country": "Belgium",
    "country_code": "BE",
    "latitude": 51.2194,
    "longitude": 4.4025,
    "timezone": "Europe/Brussels",
    "admin1": "Flanders"
  },
  {
    "name": "Vienna",
    "country": "Austria",
    "country_code": "AT",
    "latitude": 48.2082,
    "longitude": 16.3738,
    "timezone": "Europe/Vienna",
    "admin1": "Vienna"
  },
  {
    "name": "Salzburg",
    "country": "Austria",
    "country_code": "AT",
    "latitude": 47.8095,
    "longitude": 13.055,
    "timezone": "Europe/Vienna",
    "admin1": "Salzburg"
  },
  {
    "name": "Zurich",
    "country": "Switzerland",
    "country_code": "CH",
    "latitude": 47.3769,
    "longitude": 8.5417,
    "timezone": "Europe/Zurich",
    "admin1": "Zurich"
  },
  {
    "name": "Geneva",
    "country": "Switzerland",
    "country_code": "CH",
    "latitude": 46.2044,
    "longitude": 6.1432,
    "timezone": "Europe/Zurich",
    "admin1": "Geneva"
  },
  {
    "name": "Bern",
    "country": "Switzerland",
    "country_code": "CH",
    "latitude": 46.948,
    "longitude": 7.4474,
    "timezone": "Europe/Zurich",
    "admin1": "Bern"
  },
  {
    "name": "Prague",
    "country": "Czech Republic",
    "country_code": "CZ",
    "latitude": 50.0755,
    "longitude": 14.4378,
    "timezone": "Europe/Prague",
    "admin1": "Prague"
  },
  {
    "name": "Warsaw",
    "country": "Poland",
    "country_code": "PL",
    "latitude": 52.2297,
    "longitude": 21.0122,
    "timezone": "Europe/Warsaw",
    "admin1": "Mazovia"
  },
  {
    "name": "Krakow",
    "country": "Poland",
    "country_code": "PL",
    "latitude": 50.0647,
    "longitude": 19.945,
    "timezone": "Europe/Warsaw",
    "admin1": "Lesser Poland"
  },
  {
    "name": "Budapest",
    "country": "Hungary",
    "country_code": "HU",
    "latitude": 47.4979,
    "longitude": 19.0402,
    "timezone": "Europe/Budapest",
    "admin1": "Budapest"
  },
  {
    "name": "Rome",
    "country": "Italy",
    "country_code": "IT",
    "latitude": 41.9028,
    "longitude": 12.4964,
    "timezone": "Europe/Rome",
    "admin1": "Lazio"
  },
  {
    "name": "Milan",
    "country": "Italy",
    "country_code": "IT",
    "latitude": 45.4642,
    "longitude": 9.19,
    "timezone": "Europe/Rome",
    "admin1": "Lombardy"
  },
  {
    "name": "Florence",
    "country": "Italy",
    "country_code": "IT",
    "latitude": 43.7696,
    "longitude": 11.2558,
    "timezone": "Europe/Rome",
    "admin1": "Tuscany"
  },
  {
    "name": "Venice",
    "country": "Italy",
    "country_code": "IT",
    "latitude": 45.4408,
    "longitude": 12.3155,
    "timezone": "Europe/Rome",
    "admin1": "Veneto"
  },
  {
    "name": "Naples",
    "country": "Italy",
    "country_code": "IT",
    "latitude": 40.8518,
    "longitude": 14.2681,
    "timezone": "Europe/Rome",
    "admin1": "Campania"
  },
  {
    "name": "Madrid",
    "country": "Spain",
    "country_code": "ES",
    "latitude": 40.4168,
    "longitude": -3.7038,
    "timezone": "Europe/Madrid",
    "admin1": "Madrid"
  },
  {
    "name": "Barcelona",
    "country": "Spain",
    "country_code": "ES",
    "latitude": 41.3879,
    "longitude": 2.1699,
    "timezone": "Europe/Madrid",
    "admin1": "Catalonia"
  },
  {
    "name": "Seville",
    "country": "Spain",
    "country_code": "ES",
    "latitude": 37.3891,
    "longitude": -5.9845,
    "timezone": "Europe/Madrid",
    "admin1": "Andalusia"
  },
  {
    "name": "Valencia",
    "country": "Spain",
    "country_code": "ES",
    "latitude": 39.4699,
    "longitude": -0.3763,
    "timezone": "Europe/Madrid",
    "admin1": "Valencia"
  },
  {
    "name": "Lisbon",
    "country": "Portugal",
    "country_code": "PT",
    "latitude": 38.7223,
    "longitude": -9.1393,
    "timezone": "Europe/Lisbon",
    "admin1": "Lisbon"
  },
  {
    "name": "Porto",
    "country": "Portugal",
    "country_code": "PT",
    "latitude": 41.1579,
    "longitude": -8.6291,
    "timezone": "Europe/Lisbon",
    "admin1": "Porto"
  },
  {
    "name": "Athens",
    "country": "Greece",
    "country_code": "GR",
    "latitude": 37.9838,
    "longitude": 23.7275,
    "timezone": "Europe/Athens",
    "admin1": "Attica"
  },
  {
    "name": "Stockholm",
    "country": "Sweden",
    "country_code": "SE",
    "latitude": 59.3293,
    "longitude": 18.0686,
    "timezone": "Europe/Stockholm",
    "admin1": "Stockholm"
  },
  {
    "name": "Gothenburg",
    "country": "Sweden",
    "country_code": "SE",
    "latitude": 57.7089,
    "longitude": 11.9746,
    "timezone": "Europe/Stockholm",
    "admin1": "Västra Götaland"
  },
  {
    "name": "Oslo",
    "country": "Norway",
    "country_code": "NO",
    "latitude": 59.9139,
    "longitude": 10.7522,
    "timezone": "Europe/Oslo",
    "admin1": "Oslo"
  },
  {
    "name": "Bergen",
    "country": "Norway",
    "country_code": "NO",
    "latitude": 60.3913,
    "longitude": 5.3221,
    "timezone": "Europe/Oslo",
    "admin1": "Vestland"
  },
  {
    "name": "Copenhagen",
    "country": "Denmark",
    "country_code": "DK",
    "latitude": 55.6761,
    "longitude": 12.5683,
    "timezone": "Europe/Copenhagen",
    "admin1": "Capital Region"
  },
  {
    "name": "Helsinki",
    "country": "Finland",
    "country_code": "FI",
    "latitude": 60.1699,
    "longitude": 24.9384,
    "timezone": "Europe/Helsinki",
    "admin1": "Uusimaa"
  },
  {
    "name": "Reykjavik",
    "country": "Iceland",
    "country_code": "IS",
    "latitude": 64.1466,
    "longitude": -21.9426,
    "timezone": "Atlantic/Reykjavik",
    "admin1": "Capital Region"
  },
  {
    "name": "Istanbul",
    "country": "Turkey",
    "country_code": "TR",
    "latitude": 41.0082,
    "longitude": 28.9784,
    "timezone": "Europe/Istanbul",
    "admin1": "Istanbul"
  },
  {
    "name": "Ankara",
    "country": "Turkey",
    "country_code": "TR",
    "latitude": 39.9334,
    "longitude": 32.8597,
    "timezone": "Europe/Istanbul",
    "admin1": "Ankara"
  },
  {
    "name": "Kyiv",
    "country": "Ukraine",
    "country_code": "UA",
    "latitude": 50.4501,
    "longitude": 30.5234,
    "timezone": "Europe/Kyiv",
    "admin1": "Kyiv"
  },
  {
    "name": "Bucharest",
    "country": "Romania",
    "country_code": "RO",
    "latitude": 44.4268,
    "longitude": 26.1025,
    "timezone": "Europe/Bucharest",
    "admin1": "Bucharest"
  },
  {
    "name": "New York",
    "country": "United States",
    "country_code": "US",
    "latitude": 40.7128,
    "longitude": -74.006,
    "timezone": "America/New_York",
    "admin1": "New York"
  },
  {
    "name": "Los Angeles",
    "country": "United States",
    "country_code": "US",
    "latitude": 34.0522,
    "longitude": -118.2437,
    "timezone": "America/Los_Angeles",
    "admin1": "California"
  },
  {
    "name": "Chicago",
    "country": "United States",
    "country_code": "US",
    "latitude": 41.8781,
    "longitude": -87.6298,
    "timezone": "America/Chicago",
    "admin1": "Illinois"
  },
  {
    "name": "Houston",
    "country": "United States",
    "country_code": "US",
    "latitude": 29.7604,
    "longitude": -95.3698,
    "timezone": "America/Chicago",
    "admin1": "Texas"
  },
  {
    "name": "Phoenix",
    "country": "United States",
    "country_code": "US",
    "latitude": 33.4484,
    "longitude": -112.074,
    "timezone": "America/Phoenix",
    "admin1": "Arizona"
  },
  {
    "name": "Philadelphia",
    "country": "United States",
    "country_code": "US",
    "latitude": 39.9526,
    "longitude": -75.1652,
    "timezone": "America/New_York",
    "admin1": "Pennsylvania"
  },
  {
    "name": "San Antonio",
    "country": "United States",
    "country_code": "US",
    "latitude": 29.4241,
    "longitude": -98.4936,
    "timezone": "America/Chicago",
    "admin1": "Texas"
  },
  {
    "name": "San Diego",
    "country": "United States",
    "country_code": "US",
    "latitude": 32.7157,
    "longitude": -117.1611,
    "timezone": "America/Los_Angeles",
    "admin1": "California"
  },
  {
    "name": "Dallas",
    "country": "United States",
    "country_code": "US",
    "latitude": 32.7767,
    "longitude": -96.797,
    "timezone": "America/Chicago",
    "admin1": "Texas"
  },
  {
    "name": "San Jose",
    "country": "United States",
    "country_code": "US",
    "latitude": 37.3382,
    "longitude": -121.8863,
    "timezone": "America/Los_Angeles",
    "admin1": "California"
  },
  {
    "name": "Austin",
    "country": "United States",
    "country_code": "US",
    "latitude": 30.2672,
    "longitude": -97.7431,
    "timezone": "America/Chicago",
    "admin1": "Texas"
  },
  {
    "name": "San Francisco",
    "country": "United States",
    "country_code": "US",
    "latitude": 37.7749,
    "longitude": -122.4194,
    "timezone": "America/Los_Angeles",
    "admin1": "California"
  },
  {
    "name": "Seattle",
    "country": "United States",
    "country_code": "US",
    "latitude": 47.6062,
    "longitude": -122.3321,
    "timezone": "America/Los_Angeles",
    "admin1": "Washington"
  },
  {
    "name": "Denver",
    "country": "United States",
    "country_code": "US",
    "latitude": 39.7392,
    "longitude": -104.9903,
    "timezone": "America/Denver",
    "admin1": "Colorado"
  },
  {
    "name": "Boston",
    "country": "United States",
    "country_code": "US",
    "latitude": 42.3601,
    "longitude": -71.0589,
    "timezone": "America/New_York",
    "admin1": "Massachusetts"
  },
  {
    "name": "Miami",
    "country": "United States",
    "country_code": "US",
    "latitude": 25.7617,
    "longitude": -80.1918,
    "timezone": "America/New_York",
    "admin1": "Florida"
  },
  {
    "name": "Orlando",
    "country": "United States",
    "country_code": "US",
    "latitude": 28.5383,
    "longitude": -81.3792,
    "timezone": "America/New_York",
    "admin1": "Florida"
  },
  {
    "name": "Atlanta",
    "country": "United States",
    "country_code": "US",
    "latitude": 33.749,
    "longitude": -84.388,
    "timezone": "America/New_York",
    "admin1": "Georgia"
  },
  {
    "name": "Washington",
    "country": "United States",
    "country_code": "US",
    "latitude": 38.9072,
    "longitude": -77.0369,
    "timezone": "America/New_York",
    "admin1": "District of Columbia"
  },
  {
    "name": "Las Vegas",
    "country": "United States",
    "country_code": "US",
    "latitude": 36.1699,
    "longitude": -115.1398,
    "timezone": "America/Los_Angeles",
    "admin1": "Nevada"
  },
  {
    "name": "Portland",
    "country": "United States",
    "country_code": "US",
    "latitude": 45.5152,
    "longitude": -122.6784,
    "timezone": "America/Los_Angeles",
    "admin1": "Oregon"
  },
  {
    "name": "Detroit",
    "country": "United States",
    "country_code": "US",
    "latitude": 42.3314,
    "longitude": -83.0458,
    "timezone": "America/Detroit",
    "admin1": "Michigan"
  },
  {
    "name": "Minneapolis",
    "country": "United States",
    "country_code": "US",
    "latitude": 44.9778,
    "longitude": -93.265,
    "timezone": "America/Chicago",
    "admin1": "Minnesota"
  },
  {
    "name": "Honolulu",
    "country": "United States",
    "country_code": "US",
    "latitude": 21.3069,
    "longitude": -157.8583,
    "timezone": "Pacific/Honolulu",
    "admin1": "Hawaii"
  },
  {
    "name": "Anchorage",
    "country": "United States",
    "country_code": "US",
    "latitude": 61.2181,
    "longitude": -149.9003,
    "timezone": "America/Anchorage",
    "admin1": "Alaska"
  },
  {
    "name": "Salt Lake City",
    "country": "United States",
    "country_code": "US",
    "latitude": 40.7608,
    "longitude": -111.891,
    "timezone": "America/Denver",
    "admin1": "Utah"
  },
  {
    "name": "Toronto",
    "country": "Canada",
    "country_code": "CA",
    "latitude": 43.6532,
    "longitude": -79.3832,
    "timezone": "America/Toronto",
    "admin1": "Ontario"
  },
  {
    "name": "Montreal",
    "country": "Canada",
    "country_code": "CA",
    "latitude": 45.5017,
    "longitude": -73.5673,
    "timezone": "America/Toronto",
    "admin1": "Quebec"
  },
  {
    "name": "Vancouver",
    "country": "Canada",
    "country_code": "CA",
    "latitude": 49.2827,
    "longitude": -123.1207,
    "timezone": "America/Vancouver",
    "admin1": "British Columbia"
  },
  {
    "name": "Calgary",
    "country": "Canada",
    "country_code": "CA",
    "latitude": 51.0447,
    "longitude": -114.0719,
    "timezone": "America/Edmonton",
    "admin1": "Alberta"
  },
  {
    "name": "Ottawa",
    "country": "Canada",
    "country_code": "CA",
    "latitude": 45.4215,
    "longitude": -75.6972,
    "timezone": "America/Toronto",
    "admin1": "Ontario"
  },
  {
    "name": "Edmonton",
    "country": "Canada",
    "country_code": "CA",
    "latitude": 53.5461,
    "longitude": -113.4938,
    "timezone": "America/Edmonton",
    "admin1": "Alberta"
  },
  {
    "name": "Quebec City",
    "country": "Canada",
    "country_code": "CA",
    "latitude": 46.8139,
    "longitude": -71.208,
    "timezone": "America/Toronto",
    "admin1": "Quebec"
  },
  {
    "name": "Winnipeg",
    "country": "Canada",
    "country_code": "CA",
    "latitude": 49.8951,
    "longitude": -97.1384,
    "timezone": "America/Winnipeg",
    "admin1": "Manitoba"
  },
  {
    "name": "Mexico City",
    "country": "Mexico",
    "country_code": "MX",
    "latitude": 19.4326,
    "longitude": -99.1332,
    "timezone": "America/Mexico_City",
    "admin1": "CDMX"
  },
  {
    "name": "Guadalajara",
    "country": "Mexico",
    "country_code": "MX",
    "latitude": 20.6597,
    "longitude": -103.3496,
    "timezone": "America/Mexico_City",
    "admin1": "Jalisco"
  },
  {
    "name": "Monterrey",
    "country": "Mexico",
    "country_code": "MX",
    "latitude": 25.6866,
    "longitude": -100.3161,
    "timezone": "America/Monterrey",
    "admin1": "Nuevo León"
  },
  {
    "name": "Cancún",
    "country": "Mexico",
    "country_code": "MX",
    "latitude": 21.1619,
    "longitude": -86.8515,
    "timezone": "America/Cancun",
    "admin1": "Quintana Roo"
  },
  {
    "name": "São Paulo",
    "country": "Brazil",
    "country_code": "BR",
    "latitude": -23.5505,
    "longitude": -46.6333,
    "timezone": "America/Sao_Paulo",
    "admin1": "São Paulo"
  },
  {
    "name": "Rio de Janeiro",
    "country": "Brazil",
    "country_code": "BR",
    "latitude": -22.9068,
    "longitude": -43.1729,
    "timezone": "America/Sao_Paulo",
    "admin1": "Rio de Janeiro"
  },
  {
    "name": "Brasília",
    "country": "Brazil",
    "country_code": "BR",
    "latitude": -15.8267,
    "longitude": -47.9218,
    "timezone": "America/Sao_Paulo",
    "admin1": "Federal District"
  },
  {
    "name": "Salvador",
    "country": "Brazil",
    "country_code": "BR",
    "latitude": -12.9777,
    "longitude": -38.5016,
    "timezone": "America/Bahia",
    "admin1": "Bahia"
  },
  {
    "name": "Buenos Aires",
    "country": "Argentina",
    "country_code": "AR",
    "latitude": -34.6037,
    "longitude": -58.3816,
    "timezone": "America/Argentina/Buenos_Aires",
    "admin1": "Buenos Aires"
  },
  {
    "name": "Córdoba",
    "country": "Argentina",
    "country_code": "AR",
    "latitude": -31.4201,
    "longitude": -64.1888,
    "timezone": "America/Argentina/Cordoba",
    "admin1": "Córdoba"
  },
  {
    "name": "Santiago",
    "country": "Chile",
    "country_code": "CL",
    "latitude": -33.4489,
    "longitude": -70.6693,
    "timezone": "America/Santiago",
    "admin1": "Santiago"
  },
  {
    "name": "Bogotá",
    "country": "Colombia",
    "country_code": "CO",
    "latitude": 4.711,
    "longitude": -74.0721,
    "timezone": "America/Bogota",
    "admin1": "Bogotá D.C."
  },
  {
    "name": "Medellín",
    "country": "Colombia",
    "country_code": "CO",
    "latitude": 6.2442,
    "longitude": -75.5812,
    "timezone": "America/Bogota",
    "admin1": "Antioquia"
  },
  {
    "name": "Lima",
    "country": "Peru",
    "country_code": "PE",
    "latitude": -12.0464,
    "longitude": -77.0428,
    "timezone": "America/Lima",
    "admin1": "Lima"
  },
  {
    "name": "Cusco",
    "country": "Peru",
    "country_code": "PE",
    "latitude": -13.5319,
    "longitude": -71.9675,
    "timezone": "America/Lima",
    "admin1": "Cusco"
  },
  {
    "name": "Quito",
    "country": "Ecuador",
    "country_code": "EC",
    "latitude": -0.1807,
    "longitude": -78.4678,
    "timezone": "America/Guayaquil",
    "admin1": "Pichincha"
  },
  {
    "name": "Caracas",
    "country": "Venezuela",
    "country_code": "VE",
    "latitude": 10.4806,
    "longitude": -66.9036,
    "timezone": "America/Caracas",
    "admin1": "Capital"
  },
  {
    "name": "Tokyo",
    "country": "Japan",
    "country_code": "JP",
    "latitude": 35.6762,
    "longitude": 139.6503,
    "timezone": "Asia/Tokyo",
    "admin1": "Tokyo"
  },
  {
    "name": "Osaka",
    "country": "Japan",
    "country_code": "JP",
    "latitude": 34.6937,
    "longitude": 135.5023,
    "timezone": "Asia/Tokyo",
    "admin1": "Osaka"
  },
  {
    "name": "Kyoto",
    "country": "Japan",
    "country_code": "JP",
    "latitude": 35.0116,
    "longitude": 135.7681,
    "timezone": "Asia/Tokyo",
    "admin1": "Kyoto"
  },
  {
    "name": "Yokohama",
    "country": "Japan",
    "country_code": "JP",
    "latitude": 35.4437,
    "longitude": 139.638,
    "timezone": "Asia/Tokyo",
    "admin1": "Kanagawa"
  },
  {
    "name": "Nagoya",
    "country": "Japan",
    "country_code": "JP",
    "latitude": 35.1815,
    "longitude": 136.9066,
    "timezone": "Asia/Tokyo",
    "admin1": "Aichi"
  },
  {
    "name": "Sapporo",
    "country": "Japan",
    "country_code": "JP",
    "latitude": 43.0618,
    "longitude": 141.3545,
    "timezone": "Asia/Tokyo",
    "admin1": "Hokkaido"
  },
  {
    "name": "Fukuoka",
    "country": "Japan",
    "country_code": "JP",
    "latitude": 33.5904,
    "longitude": 130.4017,
    "timezone": "Asia/Tokyo",
    "admin1": "Fukuoka"
  },
  {
    "name": "Seoul",
    "country": "South Korea",
    "country_code": "KR",
    "latitude": 37.5665,
    "longitude": 126.978,
    "timezone": "Asia/Seoul",
    "admin1": "Seoul"
  },
  {
    "name": "Busan",
    "country": "South Korea",
    "country_code": "KR",
    "latitude": 35.1796,
    "longitude": 129.0756,
    "timezone": "Asia/Seoul",
    "admin1": "Busan"
  },
  {
    "name": "Beijing",
    "country": "China",
    "country_code": "CN",
    "latitude": 39.9042,
    "longitude": 116.4074,
    "timezone": "Asia/Shanghai",
    "admin1": "Beijing"
  },
  {
    "name": "Shanghai",
    "country": "China",
    "country_code": "CN",
    "latitude": 31.2304,
    "longitude": 121.4737,
    "timezone": "Asia/Shanghai",
    "admin1": "Shanghai"
  },
  {
    "name": "Guangzhou",
    "country": "China",
    "country_code": "CN",
    "latitude": 23.1291,
    "longitude": 113.2644,
    "timezone": "Asia/Shanghai",
    "admin1": "Guangdong"
  },
  {
    "name": "Shenzhen",
    "country": "China",
    "country_code": "CN",
    "latitude": 22.5431,
    "longitude": 114.0579,
    "timezone": "Asia/Shanghai",
    "admin1": "Guangdong"
  },
  {
    "name": "Chengdu",
    "country": "China",
    "country_code": "CN",
    "latitude": 30.5728,
    "longitude": 104.0668,
    "timezone": "Asia/Shanghai",
    "admin1": "Sichuan"
  },
  {
    "name": "Hong Kong",
    "country": "China",
    "country_code": "HK",
    "latitude": 22.3193,
    "longitude": 114.1694,
    "timezone": "Asia/Hong_Kong",
    "admin1": "Hong Kong"
  },
  {
    "name": "Macau",
    "country": "China",
    "country_code": "MO",
    "latitude": 22.1987,
    "longitude": 113.5439,
    "timezone": "Asia/Macau",
    "admin1": "Macau"
  },
  {
    "name": "Taipei",
    "country": "Taiwan",
    "country_code": "TW",
    "latitude": 25.033,
    "longitude": 121.5654,
    "timezone": "Asia/Taipei",
    "admin1": "Taipei"
  },
  {
    "name": "Singapore",
    "country": "Singapore",
    "country_code": "SG",
    "latitude": 1.3521,
    "longitude": 103.8198,
    "timezone": "Asia/Singapore",
    "admin1": "Central Singapore"
  },
  {
    "name": "Bangkok",
    "country": "Thailand",
    "country_code": "TH",
    "latitude": 13.7563,
    "longitude": 100.5018,
    "timezone": "Asia/Bangkok",
    "admin1": "Bangkok"
  },
  {
    "name": "Phuket",
    "country": "Thailand",
    "country_code": "TH",
    "latitude": 7.8804,
    "longitude": 98.3923,
    "timezone": "Asia/Bangkok",
    "admin1": "Phuket"
  },
  {
    "name": "Kuala Lumpur",
    "country": "Malaysia",
    "country_code": "MY",
    "latitude": 3.139,
    "longitude": 101.6869,
    "timezone": "Asia/Kuala_Lumpur",
    "admin1": "Federal Territory"
  },
  {
    "name": "Penang",
    "country": "Malaysia",
    "country_code": "MY",
    "latitude": 5.4141,
    "longitude": 100.3288,
    "timezone": "Asia/Kuala_Lumpur",
    "admin1": "Penang"
  },
  {
    "name": "Jakarta",
    "country": "Indonesia",
    "country_code": "ID",
    "latitude": -6.2088,
    "longitude": 106.8456,
    "timezone": "Asia/Jakarta",
    "admin1": "Jakarta"
  },
  {
    "name": "Bali",
    "country": "Indonesia",
    "country_code": "ID",
    "latitude": -8.3405,
    "longitude": 115.092,
    "timezone": "Asia/Makassar",
    "admin1": "Bali"
  },
  {
    "name": "Denpasar",
    "country": "Indonesia",
    "country_code": "ID",
    "latitude": -8.6705,
    "longitude": 115.2126,
    "timezone": "Asia/Makassar",
    "admin1": "Bali"
  },
  {
    "name": "Manila",
    "country": "Philippines",
    "country_code": "PH",
    "latitude": 14.5995,
    "longitude": 120.9842,
    "timezone": "Asia/Manila",
    "admin1": "Metro Manila"
  },
  {
    "name": "Cebu",
    "country": "Philippines",
    "country_code": "PH",
    "latitude": 10.3157,
    "longitude": 123.8854,
    "timezone": "Asia/Manila",
    "admin1": "Central Visayas"
  },
  {
    "name": "Hanoi",
    "country": "Vietnam",
    "country_code": "VN",
    "latitude": 21.0285,
    "longitude": 105.8542,
    "timezone": "Asia/Ho_Chi_Minh",
    "admin1": "Hanoi"
  },
  {
    "name": "Ho Chi Minh City",
    "country": "Vietnam",
    "country_code": "VN",
    "latitude": 10.8231,
    "longitude": 106.6297,
    "timezone": "Asia/Ho_Chi_Minh",
    "admin1": "Ho Chi Minh"
  },
  {
    "name": "Dubai",
    "country": "United Arab Emirates",
    "country_code": "AE",
    "latitude": 25.2048,
    "longitude": 55.2708,
    "timezone": "Asia/Dubai",
    "admin1": "Dubai"
  },
  {
    "name": "Abu Dhabi",
    "country": "United Arab Emirates",
    "country_code": "AE",
    "latitude": 24.4539,
    "longitude": 54.3773,
    "timezone": "Asia/Dubai",
    "admin1": "Abu Dhabi"
  },
  {
    "name": "Sharjah",
    "country": "United Arab Emirates",
    "country_code": "AE",
    "latitude": 25.3463,
    "longitude": 55.4209,
    "timezone": "Asia/Dubai",
    "admin1": "Sharjah"
  },
  {
    "name": "Doha",
    "country": "Qatar",
    "country_code": "QA",
    "latitude": 25.2854,
    "longitude": 51.531,
    "timezone": "Asia/Qatar",
    "admin1": "Doha"
  },
  {
    "name": "Riyadh",
    "country": "Saudi Arabia",
    "country_code": "SA",
    "latitude": 24.7136,
    "longitude": 46.6753,
    "timezone": "Asia/Riyadh",
    "admin1": "Riyadh"
  },
  {
    "name": "Jeddah",
    "country": "Saudi Arabia",
    "country_code": "SA",
    "latitude": 21.5433,
    "longitude": 39.1728,
    "timezone": "Asia/Riyadh",
    "admin1": "Makkah"
  },
  {
    "name": "Mecca",
    "country": "Saudi Arabia",
    "country_code": "SA",
    "latitude": 21.3891,
    "longitude": 39.8579,
    "timezone": "Asia/Riyadh",
    "admin1": "Makkah"
  },
  {
    "name": "Medina",
    "country": "Saudi Arabia",
    "country_code": "SA",
    "latitude": 24.5247,
    "longitude": 39.5692,
    "timezone": "Asia/Riyadh",
    "admin1": "Al Madinah"
  },
  {
    "name": "Kuwait City",
    "country": "Kuwait",
    "country_code": "KW",
    "latitude": 29.3759,
    "longitude": 47.9774,
    "timezone": "Asia/Kuwait",
    "admin1": "Al Asimah"
  },
  {
    "name": "Manama",
    "country": "Bahrain",
    "country_code": "BH",
    "latitude": 26.2285,
    "longitude": 50.586,
    "timezone": "Asia/Bahrain",
    "admin1": "Capital"
  },
  {
    "name": "Muscat",
    "country": "Oman",
    "country_code": "OM",
    "latitude": 23.5859,
    "longitude": 58.4059,
    "timezone": "Asia/Muscat",
    "admin1": "Muscat"
  },
  {
    "name": "Amman",
    "country": "Jordan",
    "country_code": "JO",
    "latitude": 31.9454,
    "longitude": 35.9284,
    "timezone": "Asia/Amman",
    "admin1": "Amman"
  },
  {
    "name": "Tel Aviv",
    "country": "Israel",
    "country_code": "IL",
    "latitude": 32.0853,
    "longitude": 34.7818,
    "timezone": "Asia/Jerusalem",
    "admin1": "Tel Aviv"
  },
  {
    "name": "Jerusalem",
    "country": "Israel",
    "country_code": "IL",
    "latitude": 31.7683,
    "longitude": 35.2137,
    "timezone": "Asia/Jerusalem",
    "admin1": "Jerusalem"
  },
  {
    "name": "Beirut",
    "country": "Lebanon",
    "country_code": "LB",
    "latitude": 33.8938,
    "longitude": 35.5018,
    "timezone": "Asia/Beirut",
    "admin1": "Beirut"
  },
  {
    "name": "Tashkent",
    "country": "Uzbekistan",
    "country_code": "UZ",
    "latitude": 41.2995,
    "longitude": 69.2401,
    "timezone": "Asia/Tashkent",
    "admin1": "Tashkent"
  },
  {
    "name": "Almaty",
    "country": "Kazakhstan",
    "country_code": "KZ",
    "latitude": 43.222,
    "longitude": 76.8512,
    "timezone": "Asia/Almaty",
    "admin1": "Almaty"
  },
  {
    "name": "Baku",
    "country": "Azerbaijan",
    "country_code": "AZ",
    "latitude": 40.4093,
    "longitude": 49.8671,
    "timezone": "Asia/Baku",
    "admin1": "Baku"
  },
  {
    "name": "Tbilisi",
    "country": "Georgia",
    "country_code": "GE",
    "latitude": 41.7151,
    "longitude": 44.8271,
    "timezone": "Asia/Tbilisi",
    "admin1": "Tbilisi"
  },
  {
    "name": "Yerevan",
    "country": "Armenia",
    "country_code": "AM",
    "latitude": 40.1792,
    "longitude": 44.4991,
    "timezone": "Asia/Yerevan",
    "admin1": "Yerevan"
  },
  {
    "name": "Karachi",
    "country": "Pakistan",
    "country_code": "PK",
    "latitude": 24.8607,
    "longitude": 67.0011,
    "timezone": "Asia/Karachi",
    "admin1": "Sindh"
  },
  {
    "name": "Lahore",
    "country": "Pakistan",
    "country_code": "PK",
    "latitude": 31.5204,
    "longitude": 74.3587,
    "timezone": "Asia/Karachi",
    "admin1": "Punjab"
  },
  {
    "name": "Islamabad",
    "country": "Pakistan",
    "country_code": "PK",
    "latitude": 33.6844,
    "longitude": 73.0479,
    "timezone": "Asia/Karachi",
    "admin1": "Islamabad"
  },
  {
    "name": "Dhaka",
    "country": "Bangladesh",
    "country_code": "BD",
    "latitude": 23.8103,
    "longitude": 90.4125,
    "timezone": "Asia/Dhaka",
    "admin1": "Dhaka"
  },
  {
    "name": "Chittagong",
    "country": "Bangladesh",
    "country_code": "BD",
    "latitude": 22.3569,
    "longitude": 91.7832,
    "timezone": "Asia/Dhaka",
    "admin1": "Chittagong"
  },
  {
    "name": "Colombo",
    "country": "Sri Lanka",
    "country_code": "LK",
    "latitude": 6.9271,
    "longitude": 79.8612,
    "timezone": "Asia/Colombo",
    "admin1": "Western"
  },
  {
    "name": "Kathmandu",
    "country": "Nepal",
    "country_code": "NP",
    "latitude": 27.7172,
    "longitude": 85.324,
    "timezone": "Asia/Kathmandu",
    "admin1": "Bagmati"
  },
  {
    "name": "Pokhara",
    "country": "Nepal",
    "country_code": "NP",
    "latitude": 28.2096,
    "longitude": 83.9856,
    "timezone": "Asia/Kathmandu",
    "admin1": "Gandaki"
  },
  {
    "name": "Male",
    "country": "Maldives",
    "country_code": "MV",
    "latitude": 4.1755,
    "longitude": 73.5093,
    "timezone": "Indian/Maldives",
    "admin1": "Kaafu"
  },
  {
    "name": "Sydney",
    "country": "Australia",
    "country_code": "AU",
    "latitude": -33.8688,
    "longitude": 151.2093,
    "timezone": "Australia/Sydney",
    "admin1": "New South Wales"
  },
  {
    "name": "Melbourne",
    "country": "Australia",
    "country_code": "AU",
    "latitude": -37.8136,
    "longitude": 144.9631,
    "timezone": "Australia/Melbourne",
    "admin1": "Victoria"
  },
  {
    "name": "Brisbane",
    "country": "Australia",
    "country_code": "AU",
    "latitude": -27.4698,
    "longitude": 153.0251,
    "timezone": "Australia/Brisbane",
    "admin1": "Queensland"
  },
  {
    "name": "Perth",
    "country": "Australia",
    "country_code": "AU",
    "latitude": -31.9505,
    "longitude": 115.8605,
    "timezone": "Australia/Perth",
    "admin1": "Western Australia"
  },
  {
    "name": "Adelaide",
    "country": "Australia",
    "country_code": "AU",
    "latitude": -34.9285,
    "longitude": 138.6007,
    "timezone": "Australia/Adelaide",
    "admin1": "South Australia"
  },
  {
    "name": "Gold Coast",
    "country": "Australia",
    "country_code": "AU",
    "latitude": -28.0167,
    "longitude": 153.4,
    "timezone": "Australia/Brisbane",
    "admin1": "Queensland"
  },
  {
    "name": "Canberra",
    "country": "Australia",
    "country_code": "AU",
    "latitude": -35.2809,
    "longitude": 149.13,
    "timezone": "Australia/Sydney",
    "admin1": "Australian Capital Territory"
  },
  {
    "name": "Auckland",
    "country": "New Zealand",
    "country_code": "NZ",
    "latitude": -36.8485,
    "longitude": 174.7633,
    "timezone": "Pacific/Auckland",
    "admin1": "Auckland"
  },
  {
    "name": "Wellington",
    "country": "New Zealand",
    "country_code": "NZ",
    "latitude": -41.2865,
    "longitude": 174.7762,
    "timezone": "Pacific/Auckland",
    "admin1": "Wellington"
  },
  {
    "name": "Christchurch",
    "country": "New Zealand",
    "country_code": "NZ",
    "latitude": -43.5321,
    "longitude": 172.6362,
    "timezone": "Pacific/Auckland",
    "admin1": "Canterbury"
  },
  {
    "name": "Suva",
    "country": "Fiji",
    "country_code": "FJ",
    "latitude": -18.1416,
    "longitude": 178.4419,
    "timezone": "Pacific/Fiji",
    "admin1": "Central"
  },
  {
    "name": "Cairo",
    "country": "Egypt",
    "country_code": "EG",
    "latitude": 30.0444,
    "longitude": 31.2357,
    "timezone": "Africa/Cairo",
    "admin1": "Cairo"
  },
  {
    "name": "Alexandria",
    "country": "Egypt",
    "country_code": "EG",
    "latitude": 31.2001,
    "longitude": 29.9187,
    "timezone": "Africa/Cairo",
    "admin1": "Alexandria"
  },
  {
    "name": "Johannesburg",
    "country": "South Africa",
    "country_code": "ZA",
    "latitude": -26.2041,
    "longitude": 28.0473,
    "timezone": "Africa/Johannesburg",
    "admin1": "Gauteng"
  },
  {
    "name": "Cape Town",
    "country": "South Africa",
    "country_code": "ZA",
    "latitude": -33.9249,
    "longitude": 18.4241,
    "timezone": "Africa/Johannesburg",
    "admin1": "Western Cape"
  },
  {
    "name": "Durban",
    "country": "South Africa",
    "country_code": "ZA",
    "latitude": -29.8587,
    "longitude": 31.0218,
    "timezone": "Africa/Johannesburg",
    "admin1": "KwaZulu-Natal"
  },
  {
    "name": "Nairobi",
    "country": "Kenya",
    "country_code": "KE",
    "latitude": -1.2921,
    "longitude": 36.8219,
    "timezone": "Africa/Nairobi",
    "admin1": "Nairobi"
  },
  {
    "name": "Mombasa",
    "country": "Kenya",
    "country_code": "KE",
    "latitude": -4.0435,
    "longitude": 39.6682,
    "timezone": "Africa/Nairobi",
    "admin1": "Mombasa"
  },
  {
    "name": "Lagos",
    "country": "Nigeria",
    "country_code": "NG",
    "latitude": 6.5244,
    "longitude": 3.3792,
    "timezone": "Africa/Lagos",
    "admin1": "Lagos"
  },
  {
    "name": "Abuja",
    "country": "Nigeria",
    "country_code": "NG",
    "latitude": 9.0765,
    "longitude": 7.3986,
    "timezone": "Africa/Lagos",
    "admin1": "Federal Capital Territory"
  },
  {
    "name": "Casablanca",
    "country": "Morocco",
    "country_code": "MA",
    "latitude": 33.5731,
    "longitude": -7.5898,
    "timezone": "Africa/Casablanca",
    "admin1": "Casablanca-Settat"
  },
  {
    "name": "Marrakech",
    "country": "Morocco",
    "country_code": "MA",
    "latitude": 31.6295,
    "longitude": -7.9811,
    "timezone": "Africa/Casablanca",
    "admin1": "Marrakech-Safi"
  },
  {
    "name": "Tunis",
    "country": "Tunisia",
    "country_code": "TN",
    "latitude": 36.8065,
    "longitude": 10.1815,
    "timezone": "Africa/Tunis",
    "admin1": "Tunis"
  },
  {
    "name": "Algiers",
    "country": "Algeria",
    "country_code": "DZ",
    "latitude": 36.7538,
    "longitude": 3.0588,
    "timezone": "Africa/Algiers",
    "admin1": "Algiers"
  },
  {
    "name": "Addis Ababa",
    "country": "Ethiopia",
    "country_code": "ET",
    "latitude": 9.032,
    "longitude": 38.7469,
    "timezone": "Africa/Addis_Ababa",
    "admin1": "Addis Ababa"
  },
  {
    "name": "Accra",
    "country": "Ghana",
    "country_code": "GH",
    "latitude": 5.6037,
    "longitude": -0.187,
    "timezone": "Africa/Accra",
    "admin1": "Greater Accra"
  },
  {
    "name": "Kashipur",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.214,
    "longitude": 78.957,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Pithoragarh",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.583,
    "longitude": 80.209,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Haldwani",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.223,
    "longitude": 79.529,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Khatima",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.921,
    "longitude": 79.971,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Banbasa",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.994,
    "longitude": 80.072,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Almora",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.597,
    "longitude": 79.659,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Rishikesh",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.108,
    "longitude": 78.293,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Champawat",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.335,
    "longitude": 80.078,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Bageshwar",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.837,
    "longitude": 79.772,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Rudrapur",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.98,
    "longitude": 79.4,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Tanakpur",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.074,
    "longitude": 80.111,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Sitarganj",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.929,
    "longitude": 79.704,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Bazpur",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.153,
    "longitude": 79.108,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Ramnagar",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.393,
    "longitude": 79.128,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Lalkuan",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.068,
    "longitude": 79.517,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Gadarpur",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.042,
    "longitude": 79.249,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Didihat",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.949,
    "longitude": 80.135,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Lohaghat",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.404,
    "longitude": 80.09,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Berinag",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.801,
    "longitude": 80.071,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Munsiari",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.094,
    "longitude": 80.24,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Dharchula",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.847,
    "longitude": 80.52,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Gangolihat",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.657,
    "longitude": 80.04,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Someshwar",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.78,
    "longitude": 79.6,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Dwarahat",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.778,
    "longitude": 79.427,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Chaukhutia",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.885,
    "longitude": 79.351,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Bhimtal",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.35,
    "longitude": 79.567,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Bhowali",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.39,
    "longitude": 79.505,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Mukteshwar",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.472,
    "longitude": 79.648,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Nainital",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.392,
    "longitude": 79.454,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Mussoorie",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.459,
    "longitude": 78.066,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Jaspur",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.279,
    "longitude": 78.828,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Pantnagar",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.05,
    "longitude": 79.517,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Shaktifarm",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.001,
    "longitude": 79.627,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Nanakmatta",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.941,
    "longitude": 79.806,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Kotdwar",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.746,
    "longitude": 78.522,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Roorkee",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.866,
    "longitude": 77.891,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Haridwar",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.948,
    "longitude": 78.16,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Tehri",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.391,
    "longitude": 78.48,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "New Tehri",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.374,
    "longitude": 78.433,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Pauri",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.153,
    "longitude": 78.777,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Gopeshwar",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.413,
    "longitude": 79.32,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Joshimath",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.555,
    "longitude": 79.564,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Ranikhet",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.641,
    "longitude": 79.432,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Uttarkashi",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.727,
    "longitude": 78.443,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Chamoli",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.499,
    "longitude": 79.619,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Rudraprayag",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.285,
    "longitude": 78.981,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Karnaprayag",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.26,
    "longitude": 79.217,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Vikasnagar",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.496,
    "longitude": 77.771,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Kichha",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.917,
    "longitude": 79.5,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Barkot",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.81,
    "longitude": 78.21,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Chamba",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.35,
    "longitude": 78.4,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Lansdowne",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.838,
    "longitude": 78.685,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Kausani",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.847,
    "longitude": 79.596,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Auli",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.529,
    "longitude": 79.567,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Badrinath",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.743,
    "longitude": 79.493,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Kedarnath",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.735,
    "longitude": 79.067,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Gangotri",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.999,
    "longitude": 78.94,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Yamunotri",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 31.014,
    "longitude": 78.46,
    "timezone": "Asia/Kolkata"
  }
];

  const WMO_WEATHER_MAP = {
    0: { main: "Clear", desc: "Clear Sky", iconDay: "01d", iconNight: "01n" },
    1: { main: "Clear", desc: "Mainly Clear", iconDay: "01d", iconNight: "01n" },
    2: { main: "Clouds", desc: "Partly Cloudy", iconDay: "02d", iconNight: "02n" },
    3: { main: "Clouds", desc: "Overcast", iconDay: "04d", iconNight: "04n" },
    45: { main: "Mist", desc: "Foggy", iconDay: "50d", iconNight: "50n" },
    48: { main: "Mist", desc: "Depositing Rime Fog", iconDay: "50d", iconNight: "50n" },
    51: { main: "Rain", desc: "Light Drizzle", iconDay: "09d", iconNight: "09n" },
    53: { main: "Rain", desc: "Moderate Drizzle", iconDay: "09d", iconNight: "09n" },
    55: { main: "Rain", desc: "Dense Drizzle", iconDay: "09d", iconNight: "09n" },
    56: { main: "Rain", desc: "Freezing Drizzle", iconDay: "09d", iconNight: "09n" },
    57: { main: "Rain", desc: "Dense Freezing Drizzle", iconDay: "09d", iconNight: "09n" },
    61: { main: "Rain", desc: "Slight Rain", iconDay: "10d", iconNight: "10n" },
    63: { main: "Rain", desc: "Moderate Rain", iconDay: "10d", iconNight: "10n" },
    65: { main: "Rain", desc: "Heavy Rain", iconDay: "10d", iconNight: "10n" },
    66: { main: "Rain", desc: "Freezing Rain", iconDay: "13d", iconNight: "13n" },
    67: { main: "Rain", desc: "Heavy Freezing Rain", iconDay: "13d", iconNight: "13n" },
    71: { main: "Snow", desc: "Slight Snow Fall", iconDay: "13d", iconNight: "13n" },
    73: { main: "Snow", desc: "Moderate Snow Fall", iconDay: "13d", iconNight: "13n" },
    75: { main: "Snow", desc: "Heavy Snow Fall", iconDay: "13d", iconNight: "13n" },
    77: { main: "Snow", desc: "Snow Grains", iconDay: "13d", iconNight: "13n" },
    80: { main: "Rain", desc: "Slight Rain Showers", iconDay: "09d", iconNight: "09n" },
    81: { main: "Rain", desc: "Moderate Rain Showers", iconDay: "09d", iconNight: "09n" },
    82: { main: "Rain", desc: "Violent Rain Showers", iconDay: "09d", iconNight: "09n" },
    85: { main: "Snow", desc: "Slight Snow Showers", iconDay: "13d", iconNight: "13n" },
    86: { main: "Snow", desc: "Heavy Snow Showers", iconDay: "13d", iconNight: "13n" },
    95: { main: "Thunderstorm", desc: "Thunderstorm", iconDay: "11d", iconNight: "11n" },
    96: { main: "Thunderstorm", desc: "Thunderstorm with Hail", iconDay: "11d", iconNight: "11n" },
  };

  // ============================================================================
  // 1. ATMOSPHERE SECURITY MANAGER (Zero-Leak Private Field Encapsulation)
  // ============================================================================
  class AtmosphereSecurity {
    #apiKey = "";

    constructor() {
      this.#initKey();
      Object.freeze(this);
    }

    #initKey() {
      try {
        if (window.CONFIG && typeof window.CONFIG.OPENWEATHER_API_KEY === "string" && window.CONFIG.OPENWEATHER_API_KEY.trim()) {
          this.#apiKey = window.CONFIG.OPENWEATHER_API_KEY.trim();
          return;
        }
        const localKey = localStorage.getItem("atmosphere_api_key");
        if (localKey && typeof localKey === "string" && localKey.trim()) {
          this.#apiKey = localKey.trim();
          return;
        }
      } catch {
        this.#apiKey = "";
      }
    }

    hasKey() {
      return Boolean(this.#apiKey && this.#apiKey.length >= 16);
    }

    getMaskedStatus() {
      return {
        active: this.hasKey(),
        label: this.hasKey()
          ? "OpenWeather Geocoding Engine · Satellite Telemetry"
          : "Open-Meteo High-Precision Satellite Telemetry",
        badge: this.hasKey() ? "CONNECTED" : "ACTIVE"
      };
    }

    sanitize(input) {
      if (typeof input !== "string") return "";
      return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    buildAuthorizedUrl(endpoint, params = {}) {
      const url = new URL(endpoint);
      for (const [k, v] of Object.entries(params)) {
        if (v !== undefined && v !== null) {
          url.searchParams.set(k, String(v));
        }
      }
      if (this.hasKey()) {
        url.searchParams.set("appid", this.#apiKey);
      }
      return url.toString();
    }

    setCustomKey(key) {
      if (key && typeof key === "string" && key.trim()) {
        this.#apiKey = key.trim();
        try {
          localStorage.setItem("atmosphere_api_key", this.#apiKey);
          console.log("[Atmosphere] Custom API key saved in browser localStorage.");
        } catch {}
      } else {
        this.#apiKey = "";
        try {
          localStorage.removeItem("atmosphere_api_key");
          console.log("[Atmosphere] Custom API key cleared.");
        } catch {}
      }
    }

    clearKey() {
      this.#apiKey = "";
      try {
        localStorage.removeItem("atmosphere_api_key");
      } catch {}
    }
  }

  // ============================================================================
  // 2. ATMOSPHERE GEOCODING SERVICE (Cascading Multi-Provider Location Engine)
  // ============================================================================
  class AtmosphereGeocodingService {
    #security;
    #catalog;
    #cache = new Map();

    constructor(security, catalog = []) {
      this.#security = security;
      this.#catalog = catalog;
    }

    async searchSuggestions(query, signal) {
      const cleanLower = query.trim().toLowerCase();
      if (!cleanLower) return [];

      const cacheKey = `sug_${cleanLower}`;
      if (this.#cache.has(cacheKey)) {
        return this.#cache.get(cacheKey);
      }

      // 1. Instant 0ms Offline Catalog Match
      const catalogMatches = this.#catalog
        .filter((c) =>
          c.name.toLowerCase().includes(cleanLower) ||
          (c.admin1 && c.admin1.toLowerCase().includes(cleanLower)) ||
          (c.country && c.country.toLowerCase().includes(cleanLower))
        )
        .slice(0, 6)
        .map((c) => ({ ...c, source: "catalog" }));

      // 2. Live API Providers
      const apiPromises = [];

      if (this.#security.hasKey()) {
        const owmUrl = this.#security.buildAuthorizedUrl("https://api.openweathermap.org/geo/1.0/direct", {
          q: query.trim(),
          limit: 5
        });
        apiPromises.push(
          fetch(owmUrl, { signal })
            .then((res) => (res.ok ? res.json() : []))
            .then((items) =>
              Array.isArray(items)
                ? items.map((item) => ({
                    name: item.name,
                    country: item.country,
                    country_code: item.country,
                    admin1: item.state || "",
                    latitude: item.lat,
                    longitude: item.lon,
                    source: "openweathermap"
                  }))
                : []
            )
            .catch(() => [])
        );
      }

      const omUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=6&language=en&format=json`;
      apiPromises.push(
        fetch(omUrl, { signal })
          .then((res) => (res.ok ? res.json() : {}))
          .then((data) =>
            Array.isArray(data.results)
              ? data.results.map((item) => ({
                  name: item.name,
                  country: item.country,
                  country_code: item.country_code,
                  admin1: item.admin1 || "",
                  latitude: item.latitude,
                  longitude: item.longitude,
                  timezone: item.timezone,
                  source: "open-meteo"
                }))
              : []
          )
          .catch(() => [])
      );

      const [owmResults = [], omResults = []] = await Promise.all(apiPromises);

      const combined = [];
      const seen = new Set();

      const addUnique = (item) => {
        const key = `${item.name.toLowerCase()}-${(item.country || "").toLowerCase()}-${(item.admin1 || "").toLowerCase()}`;
        if (!seen.has(key)) {
          seen.add(key);
          combined.push(item);
        }
      };

      catalogMatches.forEach(addUnique);
      owmResults.forEach(addUnique);
      omResults.forEach(addUnique);

      const result = combined.slice(0, 8);
      this.#cache.set(cacheKey, result);
      return result;
    }

    async resolveCoordinates(query) {
      const clean = query.trim();
      if (!clean) throw new Error("City name cannot be empty.");

      const cleanLower = clean.toLowerCase();

      // Direct coordinates syntax (e.g. "40.7128, -74.0060")
      const coordMatch = clean.match(/^(-?\d+(?:\.\d+)?)\s*[,\s]\s*(-?\d+(?:\.\d+)?)$/);
      if (coordMatch) {
        return {
          name: `${parseFloat(coordMatch[1]).toFixed(2)}°, ${parseFloat(coordMatch[2]).toFixed(2)}°`,
          latitude: parseFloat(coordMatch[1]),
          longitude: parseFloat(coordMatch[2]),
          country: "Coordinates",
          country_code: "LOC",
          admin1: "Direct GPS",
          timezone: "auto",
          source: "coordinates"
        };
      }

      // 1. Instant 0ms Exact Offline Catalog Match
      const catalogMatch = this.#catalog.find(
        (c) =>
          c.name.toLowerCase() === cleanLower ||
          `${c.name.toLowerCase()}, ${c.country.toLowerCase()}` === cleanLower ||
          `${c.name.toLowerCase()}, ${(c.country_code || "").toLowerCase()}` === cleanLower
      );
      if (catalogMatch) {
        return { ...catalogMatch, source: "catalog" };
      }

      // 2. OpenWeather Direct Geocode (if key present)
      if (this.#security.hasKey()) {
        try {
          const owmUrl = this.#security.buildAuthorizedUrl("https://api.openweathermap.org/geo/1.0/direct", {
            q: clean,
            limit: 1
          });
          const res = await fetch(owmUrl);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              const first = data[0];
              return {
                name: first.name,
                latitude: first.lat,
                longitude: first.lon,
                country: first.country,
                country_code: first.country,
                admin1: first.state || "",
                timezone: "auto",
                source: "openweathermap"
              };
            }
          }
        } catch (err) {
          console.warn("[Geocoding] OWM geocode fallback:", err);
        }
      }

      // 3. Open-Meteo Geocoding API
      try {
        const omUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(clean)}&count=1&language=en&format=json`;
        const res = await fetch(omUrl);
        if (res.ok) {
          const data = await res.json();
          if (data.results && data.results.length > 0) {
            const first = data.results[0];
            return {
              name: first.name,
              latitude: first.latitude,
              longitude: first.longitude,
              country: first.country,
              country_code: first.country_code,
              admin1: first.admin1 || "",
              timezone: first.timezone || "auto",
              source: "open-meteo"
            };
          }
        }
      } catch (err) {
        console.warn("[Geocoding] Open-Meteo geocode fallback:", err);
      }

      // 4. Photon OpenStreetMap Geocoder Fallback
      try {
        const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(clean)}&limit=1`;
        const res = await fetch(photonUrl);
        if (res.ok) {
          const data = await res.json();
          if (data.features && data.features.length > 0) {
            const f = data.features[0];
            const [lon, lat] = f.geometry.coordinates;
            const props = f.properties || {};
            return {
              name: props.name || clean,
              latitude: lat,
              longitude: lon,
              country: props.country || "",
              country_code: props.countrycode || "",
              admin1: props.state || props.city || "",
              timezone: "auto",
              source: "photon"
            };
          }
        }
      } catch (err) {
        console.warn("[Geocoding] Photon geocode fallback:", err);
      }

      // 5. Catalog partial match fallback
      const partialMatch = this.#catalog.find((c) =>
        c.name.toLowerCase().includes(cleanLower)
      );
      if (partialMatch) {
        return { ...partialMatch, source: "catalog-partial" };
      }

      throw new Error(`Could not locate "${clean}". Please check city spelling or try nearest major hub.`);
    }

    async reverseGeocode(lat, lon) {
      if (this.#security.hasKey()) {
        try {
          const owmUrl = this.#security.buildAuthorizedUrl("https://api.openweathermap.org/geo/1.0/reverse", {
            lat,
            lon,
            limit: 1
          });
          const res = await fetch(owmUrl);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              const first = data[0];
              return {
                name: first.name,
                country: first.country,
                country_code: first.country,
                admin1: first.state || ""
              };
            }
          }
        } catch {}
      }

      try {
        const bdcUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
        const res = await fetch(bdcUrl);
        if (res.ok) {
          const data = await res.json();
          return {
            name: data.city || data.locality || data.principalSubdivision || "Current Location",
            country: data.countryName || "",
            country_code: data.countryCode || "",
            admin1: data.principalSubdivision || ""
          };
        }
      } catch {}

      let nearest = null;
      let minDist = Infinity;
      for (const c of this.#catalog) {
        const dLat = c.latitude - lat;
        const dLon = c.longitude - lon;
        const dist = dLat * dLat + dLon * dLon;
        if (dist < minDist) {
          minDist = dist;
          nearest = c;
        }
      }
      if (nearest && minDist < 1.0) {
        return nearest;
      }

      return {
        name: `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`,
        country: "GPS",
        country_code: "LOC",
        admin1: ""
      };
    }
  }

  // ============================================================================
  // 3. ATMOSPHERE WEATHER SERVICE (Telemetry, WMO Codes & Predictive Narrative)
  // ============================================================================
  class AtmosphereWeatherService {
    #cache = new Map();
    #wmoMap;

    constructor(wmoMap) {
      this.#wmoMap = wmoMap;
    }

    getWmoInfo(code) {
      return this.#wmoMap[code] || {
        main: "Clear",
        desc: "Clear Sky",
        iconDay: "01d",
        iconNight: "01n"
      };
    }

    async fetchForecast(lat, lon, timezone = "auto") {
      const cacheKey = `${lat.toFixed(3)}_${lon.toFixed(3)}`;
      const cached = this.#cache.get(cacheKey);
      const now = Date.now();

      if (cached && now - cached.timestamp < 10 * 60 * 1000) {
        return cached.data;
      }

      const omUrl = new URL("https://api.open-meteo.com/v1/forecast");
      omUrl.searchParams.set("latitude", lat.toFixed(4));
      omUrl.searchParams.set("longitude", lon.toFixed(4));
      omUrl.searchParams.set(
        "current",
        "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,uv_index"
      );
      omUrl.searchParams.set(
        "hourly",
        "temperature_2m,weather_code,precipitation_probability"
      );
      omUrl.searchParams.set(
        "daily",
        "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max"
      );
      omUrl.searchParams.set("timezone", timezone || "auto");

      const res = await fetch(omUrl.toString());
      if (!res.ok) {
        throw new Error(`Meteorological telemetry stream error (HTTP ${res.status})`);
      }

      const data = await res.json();
      this.#cache.set(cacheKey, { timestamp: now, data });
      return data;
    }

    generateNarrative(daily, wmoInfo) {
      if (!daily || !daily.temperature_2m_max || daily.temperature_2m_max.length === 0) {
        return "Atmospheric models stabilized. Clear visibility across all observation stations.";
      }

      const desc = wmoInfo.desc.toLowerCase();
      const highs = Math.round(daily.temperature_2m_max[0]);
      const lows = Math.round(daily.temperature_2m_min[0]);
      const rainMax = daily.precipitation_probability_max ? daily.precipitation_probability_max[0] : 0;

      let narrative = `Generally ${desc}. Expected highs of ${highs}°C and lows near ${lows}°C.`;

      if (rainMax > 40) {
        narrative = `Chance of rain up to ${rainMax}%. Keep an umbrella handy with highs around ${highs}°C.`;
      } else if (wmoInfo.main === "Clear") {
        narrative = `Clear skies with great visibility. Expected high of ${highs}°C and low of ${lows}°C.`;
      }

      return narrative;
    }
  }

  // ============================================================================
  // 4. ATMOSPHERE SPLINE RENDERER (1-Hour Catmull-Rom Curves & Crisp Vector Art)
  // ============================================================================
  class AtmosphereSplineRenderer {
    #colWidth = 82;
    #graphHeight = 120;
    #graphTopPadding = 32;
    #graphUsableHeight = 55;

    render(container, hourly, currentTimeIso) {
      if (!container || !hourly || !hourly.time || hourly.time.length === 0) return;

      let startIndex = 0;
      const currentPrefix = currentTimeIso ? currentTimeIso.slice(0, 13) : "";
      const foundIdx = hourly.time.findIndex((t) => t.startsWith(currentPrefix));
      if (foundIdx >= 0) {
        startIndex = foundIdx;
      }

      const hoursCount = window.innerWidth >= 1280 ? 16 : window.innerWidth >= 900 ? 12 : 10;
      const sliceIndices = [];
      for (let i = 0; i < hoursCount && startIndex + i < hourly.time.length; i++) {
        sliceIndices.push(startIndex + i);
      }

      const temps = sliceIndices.map((i) => Math.round(hourly.temperature_2m[i]));
      const minTemp = Math.min(...temps);
      const maxTemp = Math.max(...temps);
      const tempRange = Math.max(maxTemp - minTemp, 4);

      const totalWidth = sliceIndices.length * this.#colWidth;

      const points = sliceIndices.map((itemIdx, seqIdx) => {
        const x = seqIdx * this.#colWidth + this.#colWidth / 2;
        const normalized = (hourly.temperature_2m[itemIdx] - minTemp) / tempRange;
        const y = this.#graphTopPadding + (1 - normalized) * this.#graphUsableHeight;
        return { x, y, temp: Math.round(hourly.temperature_2m[itemIdx]) };
      });

      const svgPath = this.#createSplinePath(points);
      const areaPath = this.#createAreaPath(points, this.#graphHeight);

      let html = `<div class="hourly-columns-grid" style="min-width: ${totalWidth}px;">`;

      sliceIndices.forEach((itemIdx, seqIdx) => {
        const timeIso = hourly.time[itemIdx];
        const hourStr = seqIdx === 0 ? "Now" : this.#formatIsoHour(timeIso);
        const code = hourly.weather_code[itemIdx];
        const hourVal = parseInt(timeIso.split("T")[1].split(":")[0], 10);
        const isDayHour = hourVal >= 6 && hourVal < 20;
        const iconSvg = this.getWeatherIconSvg(code, isDayHour);
        const popPercent = Math.round(hourly.precipitation_probability[itemIdx] || 0);
        const popHtml = popPercent > 0
          ? `<svg class="pop-drop-icon" viewBox="0 0 12 12" width="10" height="10" fill="none"><path d="M6 1.5 C6 1.5 2.5 5.5 2.5 7.8 A3.5 3.5 0 0 0 9.5 7.8 C9.5 5.5 6 1.5 6 1.5 Z" fill="#38bdf8"/></svg>${popPercent}%`
          : `<span class="pop-dry">—</span>`;

        html += `
          <div class="hourly-col" style="width: ${this.#colWidth}px;">
            <span class="hourly-time">${hourStr}</span>
            <div class="hourly-icon-box">
              ${iconSvg}
            </div>
            <span class="hourly-pop">${popHtml}</span>
          </div>
        `;
      });

      html += `</div>`;

      let svgOverlay = `
        <svg class="hourly-graph-svg-layer" viewBox="0 0 ${totalWidth} ${this.#graphHeight}" style="min-width: ${totalWidth}px; width: ${totalWidth}px; height: ${this.#graphHeight}px;">
          <defs>
            <linearGradient id="hourlySplineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.30" />
              <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.08" />
              <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.0" />
            </linearGradient>
            <filter id="splineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#38bdf8" flood-opacity="0.5" />
            </filter>
          </defs>
          <path d="${areaPath}" fill="url(#hourlySplineGrad)" class="hourly-graph-area"/>
          <path d="${svgPath}" class="hourly-graph-path" filter="url(#splineGlow)"/>
      `;

      points.forEach((pt) => {
        svgOverlay += `
          <text x="${pt.x}" y="${pt.y - 12}" class="hourly-temp-label">${pt.temp}°</text>
          <circle cx="${pt.x}" cy="${pt.y}" r="4.5" class="hourly-temp-dot"/>
        `;
      });

      svgOverlay += `</svg>`;
      container.innerHTML = html + svgOverlay;
    }

    renderStandby(container) {
      if (!container) return;
      const hoursCount = 12;
      const totalWidth = hoursCount * this.#colWidth;

      const points = [];
      let html = `<div class="hourly-columns-grid" style="min-width: ${totalWidth}px;">`;

      for (let i = 0; i < hoursCount; i++) {
        const hourStr = i === 0 ? "Now" : `+${i}h`;
        const x = i * this.#colWidth + this.#colWidth / 2;
        const y = this.#graphTopPadding + 28 + Math.sin(i * 0.55) * 16;
        points.push({ x, y, temp: "--" });

        const iconSvg = this.getWeatherIconSvg(i % 3, i < 6);

        html += `
          <div class="hourly-col" style="width: ${this.#colWidth}px;">
            <span class="hourly-time">${hourStr}</span>
            <div class="hourly-icon-box">
              ${iconSvg}
            </div>
            <span class="hourly-pop"><span class="pop-dry">—</span></span>
          </div>
        `;
      }
      html += `</div>`;

      const svgPath = this.#createSplinePath(points);
      const areaPath = this.#createAreaPath(points, this.#graphHeight);

      let svgOverlay = `
        <svg class="hourly-graph-svg-layer" viewBox="0 0 ${totalWidth} ${this.#graphHeight}" style="min-width: ${totalWidth}px; width: ${totalWidth}px; height: ${this.#graphHeight}px;">
          <defs>
            <linearGradient id="standbySplineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.18" />
              <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.0" />
            </linearGradient>
          </defs>
          <path d="${areaPath}" fill="url(#standbySplineGrad)" class="hourly-graph-area"/>
          <path d="${svgPath}" class="hourly-graph-path" style="stroke-dasharray: 4 4; opacity: 0.55; stroke: #38bdf8;"/>
      `;

      points.forEach((pt) => {
        svgOverlay += `
          <text x="${pt.x}" y="${pt.y - 12}" class="hourly-temp-label" style="opacity: 0.5;">${pt.temp}</text>
          <circle cx="${pt.x}" cy="${pt.y}" r="3.5" class="hourly-temp-dot" style="opacity: 0.5; fill: #0b1329; stroke: #38bdf8;"/>
        `;
      });

      svgOverlay += `</svg>`;
      container.innerHTML = html + svgOverlay;
    }

    getWeatherIconSvg(code, isDayHour = true) {
      const svgOpen = '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">';
      const svgClose = '</svg>';

      if (code === 0 || code === 1) {
        if (isDayHour) {
          return `${svgOpen}<circle cx="16" cy="16" r="6.5" fill="#f59e0b" filter="drop-shadow(0 0 6px rgba(245, 158, 11, 0.7))"/><circle cx="16" cy="16" r="4.5" fill="#fbbf24"/><path d="M16 3v3M16 26v3M3 16h3M26 16h3M6.8 6.8l2.1 2.1M23.1 23.1l2.1 2.1M6.8 25.2l2.1-2.1M23.1 8.9l2.1-2.1" stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round"/>${svgClose}`;
        } else {
          return `${svgOpen}<path d="M22.5 16.5A9.5 9.5 0 1 1 12 6a7.5 7.5 0 0 0 10.5 10.5z" fill="#fde047" filter="drop-shadow(0 0 6px rgba(253, 224, 71, 0.6))"/><circle cx="21" cy="7" r="1" fill="#ffffff"/><circle cx="25" cy="11" r="0.75" fill="#ffffff"/>${svgClose}`;
        }
      }

      if (code === 2) {
        if (isDayHour) {
          return `${svgOpen}<circle cx="12" cy="12" r="5" fill="#fbbf24" filter="drop-shadow(0 0 4px rgba(251, 191, 36, 0.6))"/><path d="M10 24h13a5 5 0 0 0 1-9.9 6.5 6.5 0 0 0-12.7-1.1A4.5 4.5 0 0 0 10 24z" fill="#e2e8f0" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"/>${svgClose}`;
        } else {
          return `${svgOpen}<path d="M18 10a6 6 0 0 1-5-5 5 5 0 1 0 6.8 6.8c-.6-.6-1.2-1.2-1.8-1.8z" fill="#fde047"/><path d="M9 24h13a5 5 0 0 0 1-9.9 6.5 6.5 0 0 0-12.7-1.1A4.5 4.5 0 0 0 9 24z" fill="#cbd5e1" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"/>${svgClose}`;
        }
      }

      if (code === 3) {
        return `${svgOpen}<path d="M14 18h11a4 4 0 0 0 1-7.9 5.5 5.5 0 0 0-10.7-1A3.5 3.5 0 0 0 14 18z" fill="#94a3b8" opacity="0.6"/><path d="M8 25h14a5 5 0 0 0 1-9.9 6.5 6.5 0 0 0-12.7-1.1A4.5 4.5 0 0 0 8 25z" fill="#e2e8f0" filter="drop-shadow(0 2px 5px rgba(0,0,0,0.45))"/>${svgClose}`;
      }

      if (code === 45 || code === 48) {
        return `${svgOpen}<line x1="6" y1="12" x2="26" y2="12" stroke="#94a3b8" stroke-width="2.2" stroke-linecap="round"/><line x1="4" y1="16" x2="28" y2="16" stroke="#cbd5e1" stroke-width="2.2" stroke-linecap="round"/><line x1="7" y1="20" x2="25" y2="20" stroke="#94a3b8" stroke-width="2.2" stroke-linecap="round"/>${svgClose}`;
      }

      if ([51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 82].includes(code)) {
        return `${svgOpen}<path d="M8 19h13a4.5 4.5 0 0 0 1-8.9A6 6 0 0 0 10.3 9a4 4 0 0 0-2.3 10z" fill="#94a3b8" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"/><line x1="10" y1="22" x2="8.5" y2="26" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/><line x1="15" y1="22" x2="13.5" y2="26" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/><line x1="20" y1="22" x2="18.5" y2="26" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>${svgClose}`;
      }

      if ([66, 67, 71, 73, 75, 77, 85, 86].includes(code)) {
        return `${svgOpen}<path d="M8 18h13a4.5 4.5 0 0 0 1-8.9A6 6 0 0 0 10.3 8a4 4 0 0 0-2.3 10z" fill="#cbd5e1"/><circle cx="10" cy="23" r="1.4" fill="#93c5fd"/><circle cx="15" cy="24" r="1.4" fill="#93c5fd"/><circle cx="20" cy="23" r="1.4" fill="#93c5fd"/>${svgClose}`;
      }

      if (code === 95 || code === 96 || code === 99) {
        return `${svgOpen}<path d="M7 17h13a4.5 4.5 0 0 0 1-8.9A6 6 0 0 0 9.3 7a4 4 0 0 0-2.3 10z" fill="#64748b"/><polygon points="15,16 11,22 14,22 13,27 18,20 15,20" fill="#facc15" filter="drop-shadow(0 0 4px rgba(250, 204, 21, 0.8))"/>${svgClose}`;
      }

      return isDayHour
        ? `${svgOpen}<circle cx="16" cy="16" r="6" fill="#fbbf24"/>${svgClose}`
        : `${svgOpen}<path d="M22 16A8 8 0 1 1 12 6a6 6 0 0 0 10 10z" fill="#fde047"/>${svgClose}`;
    }

    #createSplinePath(points) {
      if (points.length === 0) return "";
      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i === 0 ? i : i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] || p2;

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
      }
      return d;
    }

    #createAreaPath(points, bottomY) {
      if (points.length === 0) return "";
      const first = points[0];
      const last = points[points.length - 1];
      const curveD = this.#createSplinePath(points);
      return `${curveD} L ${last.x.toFixed(1)} ${bottomY} L ${first.x.toFixed(1)} ${bottomY} Z`;
    }

    #formatIsoHour(isoString) {
      try {
        const timePart = isoString.split("T")[1];
        const hour = parseInt(timePart.split(":")[0], 10);
        const ampm = hour >= 12 ? "pm" : "am";
        const displayHour = hour % 12 || 12;
        return `${displayHour} ${ampm}`;
      } catch {
        return isoString;
      }
    }
  }

  // ============================================================================
  // 5. ATMOSPHERE UI CONTROLLER (Presentation, DOM Bindings & Ambient Scenery)
  // ============================================================================
  class AtmosphereUIController {
    #elements = {};
    #app;
    #debounceTimeout = null;
    #dashDebounceTimeout = null;
    #modalDebounceTimeout = null;

    constructor(app) {
      this.#app = app;
      this.#queryDomElements();
    }

    #queryDomElements() {
      const get = (id) => document.getElementById(id);
      this.#elements = {
        welcomeScreen: get("welcome-screen") || get("hero-section"),
        topNav: get("top-nav") || get("cinematic-nav"),
        brandHomeBtn: get("brand-home-btn"),
        cityInput: get("city-input"),
        clearInputBtn: get("clear-input-btn"),
        searchShortcutKbd: get("search-shortcut-kbd") || document.querySelector(".search-shortcut-kbd"),
        getWeatherBtn: get("get-weather-btn"),
        navGeoBtn: get("nav-geo-btn"),
        heroGeoBtn: get("hero-geo-btn"),
        searchDropdown: get("search-dropdown"),
        errorMessage: get("error-message"),
        errorText: get("error-text"),
        loadingSpinner: get("loading-spinner"),
        weatherDashboard: get("weather-dashboard"),

        dashboardCityInput: get("dashboard-city-input"),
        dashboardSearchBtn: get("dashboard-search-btn"),
        dashboardSearchDropdown: get("dashboard-search-dropdown"),
        frameCityLabel: get("frame-city-label"),
        navSearchTriggerBtn: get("nav-search-trigger-btn"),
        searchModal: get("search-modal"),
        modalSearchInput: get("modal-search-input"),
        closeSearchModalBtn: get("close-search-modal-btn"),
        modalSearchDropdown: get("modal-search-dropdown"),
        modalCityPills: document.querySelectorAll(".modal-city-pill"),

        ambientSkyCanvas: get("ambient-sky-canvas"),
        skyElements: get("sky-elements"),
        characterFigure: get("character-figure"),
        charReactionBubble: get("char-reaction-bubble"),
        sceneryFxParticles: get("scenery-fx-particles"),
        cityNameDisplay: get("city-name"),
        countryTag: get("country-tag"),
        localTimeDisplay: get("local-time") || get("local-time-clock"),
        temperatureDisplay: get("temperature"),
        descriptionDisplay: get("description") || get("weather-description"),
        tempMaxDisplay: get("temp-max"),
        tempMinDisplay: get("temp-min"),
        dayHighLowDisplay: get("day-high-low"),
        feelsLikeDisplay: get("feels-like") || get("apparent-temp"),
        heroHumidityDisplay: get("hero-humidity"),

        summaryText: get("summary-text") || get("ai-summary-text"),
        hourlyTimeline: get("hourly-timeline") || get("spline-chart-container"),

        sunGlowCircle: get("sun-glow-circle") || get("sun-arc-orb"),
        arcSunriseText: get("arc-sunrise-text"),
        arcSunsetText: get("arc-sunset-text"),
        sunStatusTitle: get("sun-status-title"),
        sunFooterText: get("sun-footer-text"),

        insightTitle: get("insight-title"),
        insightDesc: get("insight-desc"),
        insightBadge: get("insight-badge"),
        insightRangeVal: get("insight-range-val"),
        insightRainVal: get("insight-rain-val"),
        insightOutlookVal: get("insight-outlook-val"),

        humidityDisplay: get("humidity"),
        humidityBar: get("humidity-bar"),
        humidityStatus: get("humidity-status"),

        windSpeedDisplay: get("wind-speed"),
        windDirection: get("wind-direction"),
        windCaption: get("wind-caption"),

        pressureDisplay: get("pressure"),
        pressureStatus: get("pressure-status"),
        visibilityDisplay: get("visibility"),
        visibilityStatus: get("visibility-status"),

        uvIndexDisplay: get("uv-index"),
        uvBar: get("uv-bar"),
        uvStatus: get("uv-status"),

        precipChanceDisplay: get("precip-chance"),
        precipBar: get("precip-bar"),
        precipStatus: get("precip-status"),

        heroEyebrowText: get("hero-eyebrow-text"),
        heroSubtitle: get("hero-subtitle"),
        apiStatusLabel: get("api-status-label"),
        apiStatusBadge: get("api-status-badge")
      };
    }

    getHourlyTimeline() {
      return this.#elements.hourlyTimeline;
    }

    showLoading(isLoading) {
      if (!this.#elements.loadingSpinner) return;
      if (isLoading) {
        this.#elements.loadingSpinner.classList.remove("hidden");
      } else {
        this.#elements.loadingSpinner.classList.add("hidden");
      }
    }

    showError(message) {
      if (this.#elements.errorText) {
        this.#elements.errorText.textContent = message;
      }
      if (this.#elements.errorMessage) {
        this.#elements.errorMessage.classList.remove("hidden");
      }
    }

    hideError() {
      if (this.#elements.errorMessage) {
        this.#elements.errorMessage.classList.add("hidden");
      }
    }

    switchView(viewName) {
      const isDashboard = viewName === "dashboard";
      if (this.#elements.weatherDashboard) {
        this.#elements.weatherDashboard.classList.remove("hidden");
      }

      if (isDashboard && window.motionEngine) {
        window.motionEngine.animateSearchTransitionToDashboard();
        window.motionEngine.animateDashboardEntrance();
        window.motionEngine.resetTabIndicator();
      } else if (!isDashboard && window.motionEngine) {
        window.motionEngine.animateReturnToHero();
      }
    }

    updateSearchActionButtons(hasText) {
      if (this.#elements.clearInputBtn) {
        this.#elements.clearInputBtn.classList.toggle("hidden", !hasText);
      }
      if (this.#elements.searchShortcutKbd) {
        this.#elements.searchShortcutKbd.classList.toggle("hidden", hasText);
      }
    }

    syncSearchInputs(cityName) {
      if (this.#elements.cityInput) this.#elements.cityInput.value = cityName;
      if (this.#elements.dashboardCityInput) this.#elements.dashboardCityInput.value = cityName;
      if (this.#elements.frameCityLabel) this.#elements.frameCityLabel.textContent = cityName;
    }

    openSearchModal() {
      if (!this.#elements.searchModal) return;
      this.#elements.searchModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      if (this.#elements.modalSearchInput) {
        this.#elements.modalSearchInput.value = "";
        setTimeout(() => this.#elements.modalSearchInput.focus(), 50);
      }
      this.renderRecentHistory(this.#elements.modalSearchDropdown, (city) => {
        this.closeSearchModal();
        this.#app.executeSearch(city);
      });
    }

    closeSearchModal() {
      if (!this.#elements.searchModal) return;
      this.#elements.searchModal.classList.add("hidden");
      document.body.style.overflow = "";
      if (this.#elements.modalSearchDropdown) {
        this.#elements.modalSearchDropdown.classList.add("hidden");
      }
    }

    renderSuggestionsList(dropdownEl, suggestions, query, onSelect) {
      if (!dropdownEl) return;
      if (!suggestions || suggestions.length === 0) {
        dropdownEl.innerHTML = `
          <div class="dropdown-header">
            <span class="dropdown-title">No direct stations matching "${this.#app.sanitize(query)}"</span>
          </div>
        `;
        dropdownEl.classList.remove("hidden");
        return;
      }

      const hasOwm = suggestions.some((s) => s.source === "openweathermap");
      const headerTitle = hasOwm
        ? "OpenWeather Geocoding · Direct Match"
        : "Global Satellite Telemetry";
      const indicatorText = hasOwm ? "OWM VERIFIED" : "LIVE API";

      let html = `
        <div class="dropdown-header">
          <span class="dropdown-title">${headerTitle}</span>
          <span class="dropdown-api-indicator">● ${indicatorText}</span>
        </div>
      `;

      suggestions.forEach((item, index) => {
        const adminPart = item.admin1 ? `${item.admin1}, ` : "";
        const countryPart = item.country || item.country_code || "";
        const subLocation = `${adminPart}${countryPart}`.trim();

        let sourceBadge = "";
        if (item.source === "openweathermap") {
          sourceBadge = '<span class="source-tag-owm">OWM</span>';
        } else if (item.source === "catalog") {
          sourceBadge = '<span class="source-tag-catalog">0ms</span>';
        }

        html += `
          <div class="dropdown-item" data-index="${index}">
            <div class="dropdown-item-left">
              <span class="item-name">${this.#highlightMatch(item.name, query)}</span>
              <span class="item-sub">${subLocation}</span>
            </div>
            <div class="dropdown-item-right">
              ${sourceBadge}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="enter-icon">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </div>
          </div>
        `;
      });

      dropdownEl.innerHTML = html;
      dropdownEl.classList.remove("hidden");

      dropdownEl.querySelectorAll(".dropdown-item").forEach((el) => {
        el.addEventListener("click", () => {
          const idx = parseInt(el.getAttribute("data-index"), 10);
          const sel = suggestions[idx];
          if (sel) {
            const label = sel.admin1 ? `${sel.name}, ${sel.admin1}` : `${sel.name}, ${sel.country || ""}`;
            dropdownEl.classList.add("hidden");
            onSelect(label.trim());
          }
        });
      });
    }

    renderRecentHistory(dropdownEl, onSelect) {
      if (!dropdownEl) return;
      const history = this.#app.getRecentSearches();
      if (!history || history.length === 0) {
        dropdownEl.innerHTML = `
          <div class="dropdown-header">
            <span class="dropdown-title">Recent Observations</span>
          </div>
          <div class="dropdown-empty-state">No recent searches yet. Search any global city above.</div>
        `;
        dropdownEl.classList.remove("hidden");
        return;
      }

      let html = `
        <div class="dropdown-header">
          <span class="dropdown-title">Recent Observations</span>
        </div>
      `;

      history.forEach((city) => {
        html += `
          <div class="dropdown-item history-item" data-city="${this.#app.sanitize(city)}">
            <div class="dropdown-item-left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="history-clock-icon">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span class="item-name">${this.#app.sanitize(city)}</span>
            </div>
            <div class="dropdown-item-right">
              <span class="history-badge">CACHED</span>
            </div>
          </div>
        `;
      });

      dropdownEl.innerHTML = html;
      dropdownEl.classList.remove("hidden");

      dropdownEl.querySelectorAll(".history-item").forEach((el) => {
        el.addEventListener("click", () => {
          const city = el.getAttribute("data-city");
          dropdownEl.classList.add("hidden");
          onSelect(city);
        });
      });
    }

    #highlightMatch(text, query) {
      if (!query || typeof text !== "string") return this.#app.sanitize(text);
      const safeText = this.#app.sanitize(text);
      const safeQuery = this.#app.sanitize(query.trim());
      const regex = new RegExp(`(${safeQuery})`, "gi");
      return safeText.replace(regex, '<span class="match-highlight">$1</span>');
    }

    initAmbientSky() {
      if (!this.#elements.ambientSkyCanvas) return;
      const nonCanvas = this.#elements.ambientSkyCanvas.querySelectorAll(":not(#webgl-atmosphere-canvas)");
      nonCanvas.forEach((el) => el.remove());

      const moon = document.createElement("div");
      moon.className = "ambient-moon-glow";
      moon.style.position = "absolute";
      moon.style.top = "60px";
      moon.style.right = "12%";
      moon.style.width = "48px";
      moon.style.height = "48px";
      moon.style.borderRadius = "50%";
      moon.style.background = "radial-gradient(circle, #fef08a 20%, #fde047 60%, transparent 80%)";
      moon.style.filter = "blur(2px) drop-shadow(0 0 16px rgba(253, 224, 71, 0.45))";
      moon.style.opacity = "0.75";
      moon.style.pointerEvents = "none";
      this.#elements.ambientSkyCanvas.appendChild(moon);

      for (let i = 0; i < 24; i++) {
        const star = document.createElement("div");
        star.className = "ambient-star-twinkle";
        star.style.position = "absolute";
        star.style.top = `${Math.random() * 55}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 2.5 + 1}px`;
        star.style.height = star.style.width;
        star.style.borderRadius = "50%";
        star.style.background = "#ffffff";
        star.style.opacity = (Math.random() * 0.7 + 0.2).toFixed(2);
        star.style.pointerEvents = "none";
        this.#elements.ambientSkyCanvas.appendChild(star);
      }
    }

    initStandbyLandingState(status) {
      this.initAmbientSky();
      if (this.#elements.summaryText) {
        this.#elements.summaryText.textContent =
          "Telemetry engine ready. Type any global city or click a quick telemetry chip above to stream 24-hour predictive spline curves.";
      }

      if (status && status.active) {
        if (this.#elements.heroEyebrowText) {
          this.#elements.heroEyebrowText.textContent = "OPENWEATHER API ACTIVE · HIGH-PRECISION CITY SEARCH";
        }
        if (this.#elements.heroSubtitle) {
          this.#elements.heroSubtitle.textContent =
            "Hyper-accurate 1-hour Catmull-Rom spline curves and orbital telemetry powered by OpenWeather API geocoding and live satellite models.";
        }
        if (this.#elements.apiStatusLabel) {
          this.#elements.apiStatusLabel.textContent = "OpenWeather API Active · Direct City Search";
        }
        if (this.#elements.apiStatusBadge) {
          this.#elements.apiStatusBadge.textContent = "CONNECTED";
        }
      }

      if (window.motionEngine) {
        window.motionEngine.initCardPhysics();
      }
    }

    updateDashboard(weatherData, locationName, timezone) {
      const current = weatherData.current;
      const daily = weatherData.daily;
      const wmoInfo = this.#app.getWmoInfo(current.weather_code);
      const isDay = current.is_day === 1;

      // 1. Location Header
      const nameParts = locationName.split(",");
      const primaryCity = nameParts[0].trim();
      const regionCountry = nameParts.slice(1).join(",").trim() || "Global Station";

      if (this.#elements.cityNameDisplay) {
        if (window.motionEngine && window.motionEngine.animateTextSplit) {
          window.motionEngine.animateTextSplit(this.#elements.cityNameDisplay, primaryCity);
        } else {
          this.#elements.cityNameDisplay.textContent = primaryCity;
        }
      }
      if (this.#elements.countryTag) {
        this.#elements.countryTag.textContent = regionCountry;
      }
      if (this.#elements.frameCityLabel) {
        this.#elements.frameCityLabel.textContent = primaryCity;
      }

      // 2. Weather Condition & Temperatures
      if (this.#elements.descriptionDisplay) {
        if (window.motionEngine && window.motionEngine.animateTextSplit) {
          window.motionEngine.animateTextSplit(this.#elements.descriptionDisplay, wmoInfo.desc);
        } else {
          this.#elements.descriptionDisplay.textContent = wmoInfo.desc;
        }
      }

      const tempVal = Math.round(current.temperature_2m);
      if (this.#elements.temperatureDisplay) {
        if (window.motionEngine && window.motionEngine.animateCounter) {
          window.motionEngine.animateCounter(this.#elements.temperatureDisplay, tempVal, 1.0, 0);
        } else {
          this.#elements.temperatureDisplay.textContent = tempVal;
        }
      }

      if (daily && daily.temperature_2m_max && daily.temperature_2m_min) {
        const hi = Math.round(daily.temperature_2m_max[0]);
        const lo = Math.round(daily.temperature_2m_min[0]);
        if (this.#elements.tempMaxDisplay) this.#elements.tempMaxDisplay.textContent = `${hi}°`;
        if (this.#elements.tempMinDisplay) this.#elements.tempMinDisplay.textContent = `${lo}°`;
        if (this.#elements.dayHighLowDisplay) this.#elements.dayHighLowDisplay.textContent = `H: ${hi}°  L: ${lo}°`;
      }

      if (this.#elements.feelsLikeDisplay) {
        this.#elements.feelsLikeDisplay.textContent = Math.round(current.apparent_temperature);
      }
      if (this.#elements.heroHumidityDisplay) {
        this.#elements.heroHumidityDisplay.textContent = `${current.relative_humidity_2m}%`;
      }

      // 3. Narrative AI Summary
      if (this.#elements.summaryText) {
        this.#elements.summaryText.textContent = this.#app.generateNarrative(daily, wmoInfo);
      }

      // 4. Scenery and Character updates
      this.updateHeroScenery(current.weather_code, isDay, current);
      this.updateCharacterState(wmoInfo.main.toLowerCase(), isDay);

      // 5. Sun Cycle Arc Widget
      this.renderSunCycleArc(daily, current.time, isDay, weatherData.utc_offset_seconds);

      // 6. Insight Widget
      this.renderInsightWidget(daily, current, wmoInfo);

      // 7. Detailed Metrics
      this.renderDetailedMetrics(current, daily);

      // 8. Card Physics
      if (window.motionEngine) {
        window.motionEngine.initCardPhysics();
      }
    }

    updateHeroScenery(wmoCode, isDay, current) {
      const body = document.body;
      const isRain = [51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 82].includes(wmoCode);
      const isSnow = [66, 67, 71, 73, 75, 77, 85, 86].includes(wmoCode);
      const isStorm = [95, 96, 99].includes(wmoCode);
      const isCloudy = [2, 3, 45, 48].includes(wmoCode);

      body.classList.remove(
        "theme-day-clear",
        "theme-day-cloudy",
        "theme-day-rain",
        "theme-night-clear",
        "theme-night-cloudy",
        "theme-night-rain",
        "theme-thunderstorm"
      );

      let themeClass = "theme-night-clear";
      if (isStorm) themeClass = "theme-thunderstorm";
      else if (isRain || isSnow) themeClass = isDay ? "theme-day-rain" : "theme-night-rain";
      else if (isCloudy) themeClass = isDay ? "theme-day-cloudy" : "theme-night-cloudy";
      else themeClass = isDay ? "theme-day-clear" : "theme-night-clear";

      body.classList.add(themeClass);

      let weatherState = "clear";
      if (isStorm) weatherState = "stormy";
      else if (isRain) weatherState = "rainy";
      else if (isSnow) weatherState = "snowy";
      else if (isCloudy) weatherState = "cloudy";
      else weatherState = isDay ? "sunny" : "clear-night";

      this.updateSceneryFxParticles(weatherState);
    }

    updateCharacterState(weatherState, isDay) {
      if (!this.#elements.characterFigure) return;
      const figure = this.#elements.characterFigure;
      figure.classList.remove("state-sunny", "state-cloudy", "state-rainy", "state-stormy", "state-night");

      let reaction = "☀️ Atmospheric conditions nominal!";
      if (weatherState === "rainy" || weatherState === "drizzle") {
        figure.classList.add("state-rainy");
        reaction = "☔ Rain expected · Carrying umbrellas!";
      } else if (weatherState === "thunderstorm" || weatherState === "stormy") {
        figure.classList.add("state-stormy");
        reaction = "⚡ Severe telemetry alert · Stay sheltered!";
      } else if (weatherState === "cloudy" || weatherState === "clouds") {
        figure.classList.add("state-cloudy");
        reaction = "☁️ Overcast skies with gentle airflow.";
      } else if (!isDay) {
        figure.classList.add("state-night");
        reaction = "🌙 Crisp starry night under clear skies.";
      } else {
        figure.classList.add("state-sunny");
        reaction = "☀️ Bright solar radiation today!";
      }

      if (this.#elements.charReactionBubble) {
        const textSpan = this.#elements.charReactionBubble.querySelector(".bubble-text");
        if (textSpan) textSpan.textContent = reaction;
      }
    }

    updateSceneryFxParticles(weatherState) {
      if (!this.#elements.sceneryFxParticles) return;
      const container = this.#elements.sceneryFxParticles;
      container.innerHTML = "";

      if (weatherState === "rainy" || weatherState === "stormy") {
        for (let i = 0; i < 28; i++) {
          const drop = document.createElement("div");
          drop.className = "rain-drop-particle";
          drop.style.position = "absolute";
          drop.style.top = "-10px";
          drop.style.left = `${Math.random() * 100}%`;
          drop.style.width = "1.5px";
          drop.style.height = `${Math.random() * 14 + 10}px`;
          drop.style.background = "linear-gradient(to bottom, transparent, #38bdf8)";
          drop.style.opacity = (Math.random() * 0.5 + 0.3).toFixed(2);
          drop.style.animation = `rainFall ${(Math.random() * 0.4 + 0.6).toFixed(2)}s linear infinite`;
          drop.style.animationDelay = `${(Math.random() * 0.8).toFixed(2)}s`;
          container.appendChild(drop);
        }
      }
    }

    renderSunCycleArc(daily, currentTimeIso, isDay, utcOffsetSec) {
      if (!daily || !daily.sunrise || !daily.sunset) return;

      const sunriseIso = daily.sunrise[0];
      const sunsetIso = daily.sunset[0];

      if (this.#elements.arcSunriseText) this.#elements.arcSunriseText.textContent = this.#formatIsoTime(sunriseIso);
      if (this.#elements.arcSunsetText) this.#elements.arcSunsetText.textContent = this.#formatIsoTime(sunsetIso);

      const riseDate = new Date(sunriseIso);
      const setDate = new Date(sunsetIso);
      const curDate = currentTimeIso ? new Date(currentTimeIso) : new Date();

      const dayDuration = setDate - riseDate;
      const elapsed = curDate - riseDate;
      let ratio = Math.max(0, Math.min(1, elapsed / dayDuration));

      if (curDate < riseDate) ratio = 0;
      else if (curDate > setDate) ratio = 1;

      const angle = ratio * Math.PI;
      const cx = 120;
      const cy = 105;
      const rx = 95;
      const ry = 75;

      const orbX = cx - rx * Math.cos(angle);
      const orbY = cy - ry * Math.sin(angle);

      if (this.#elements.sunGlowCircle) {
        this.#elements.sunGlowCircle.setAttribute("cx", orbX.toFixed(1));
        this.#elements.sunGlowCircle.setAttribute("cy", orbY.toFixed(1));
        this.#elements.sunGlowCircle.setAttribute("fill", isDay ? "#ffd700" : "#93c5fd");
      }

      if (this.#elements.sunFooterText) {
        if (isDay) {
          this.#elements.sunFooterText.textContent = `Sunset expected at ${this.#formatIsoTime(sunsetIso)}`;
        } else {
          this.#elements.sunFooterText.textContent = `Sunrise expected at ${this.#formatIsoTime(sunriseIso)}`;
        }
      }
    }

    renderInsightWidget(daily, current, wmoInfo) {
      if (!daily || !daily.temperature_2m_max || daily.temperature_2m_max.length < 2) return;

      const todayMax = Math.round(daily.temperature_2m_max[0]);
      const tomorrowMax = Math.round(daily.temperature_2m_max[1]);
      const tomorrowMin = Math.round(daily.temperature_2m_min[1]);
      const delta = tomorrowMax - todayMax;

      if (this.#elements.insightBadge) {
        if (delta > 0) {
          this.#elements.insightBadge.textContent = `+${delta}° Warmer`;
        } else if (delta < 0) {
          this.#elements.insightBadge.textContent = `${delta}° Cooler`;
        } else {
          this.#elements.insightBadge.textContent = "Similar Temp";
        }
      }

      if (this.#elements.insightDesc) {
        if (delta > 0) {
          this.#elements.insightDesc.textContent = `Temperatures will be a little higher tomorrow (${delta}° warmer, high of ${tomorrowMax}°C).`;
        } else if (delta < 0) {
          this.#elements.insightDesc.textContent = `Temperatures will be a little lower than today (${Math.abs(delta)}° cooler, high of ${tomorrowMax}°C).`;
        } else {
          this.#elements.insightDesc.textContent = `Tomorrow's temperatures will be about the same as today (high of ${tomorrowMax}°C).`;
        }
      }

      if (this.#elements.insightRangeVal) {
        this.#elements.insightRangeVal.textContent = `${tomorrowMax}° / ${tomorrowMin}°`;
      }

      const rainProb = daily.precipitation_probability_max && daily.precipitation_probability_max[1]
        ? daily.precipitation_probability_max[1]
        : 0;
      if (this.#elements.insightRainVal) {
        this.#elements.insightRainVal.textContent = `☂ ${rainProb}%`;
      }

      if (this.#elements.insightOutlookVal) {
        const tomorrowCode = daily.weather_code[1];
        const tomorrowWmo = this.#app.getWmoInfo(tomorrowCode);
        this.#elements.insightOutlookVal.textContent = tomorrowWmo.desc;
      }
    }

    renderDetailedMetrics(current, daily) {
      // 1. Humidity
      if (this.#elements.humidityDisplay) {
        if (window.motionEngine) {
          window.motionEngine.animateCounter(this.#elements.humidityDisplay, current.relative_humidity_2m, 0.8, 0, "%");
        } else {
          this.#elements.humidityDisplay.textContent = `${current.relative_humidity_2m}%`;
        }
      }
      if (this.#elements.humidityBar) {
        this.#elements.humidityBar.style.width = `${Math.min(100, current.relative_humidity_2m)}%`;
      }

      // 2. Wind
      const speedMs = current.wind_speed_10m ? current.wind_speed_10m.toFixed(1) : "0.0";
      if (this.#elements.windSpeedDisplay) {
        if (window.motionEngine) {
          window.motionEngine.animateCounter(this.#elements.windSpeedDisplay, parseFloat(speedMs), 0.8, 1, " m/s");
        } else {
          this.#elements.windSpeedDisplay.textContent = `${speedMs} m/s`;
        }
      }
      if (this.#elements.windDirection) {
        const deg = current.wind_direction_10m || 0;
        this.#elements.windDirection.textContent = this.#getWindCardinal(deg);
      }

      // 3. Pressure
      if (this.#elements.pressureDisplay) {
        const press = Math.round(current.surface_pressure || 1013);
        if (window.motionEngine) {
          window.motionEngine.animateCounter(this.#elements.pressureDisplay, press, 0.8, 0, " hPa");
        } else {
          this.#elements.pressureDisplay.textContent = `${press} hPa`;
        }
      }

      // 4. Visibility
      if (this.#elements.visibilityDisplay) {
        this.#elements.visibilityDisplay.textContent = "10.0 km";
      }

      // 5. UV Index
      const uvVal = current.uv_index !== undefined ? current.uv_index : 0;
      if (this.#elements.uvIndexDisplay) {
        if (window.motionEngine) {
          window.motionEngine.animateCounter(this.#elements.uvIndexDisplay, uvVal, 0.8, 1, "");
        } else {
          this.#elements.uvIndexDisplay.textContent = uvVal.toFixed(1);
        }
      }
      if (this.#elements.uvBar) {
        const uvPct = Math.min(100, Math.round((uvVal / 11) * 100));
        this.#elements.uvBar.style.width = `${uvPct}%`;
      }
      if (this.#elements.uvStatus) {
        if (uvVal >= 8) this.#elements.uvStatus.textContent = "Very High";
        else if (uvVal >= 6) this.#elements.uvStatus.textContent = "High";
        else if (uvVal >= 3) this.#elements.uvStatus.textContent = "Moderate";
        else this.#elements.uvStatus.textContent = "Low";
      }

      // 6. Precipitation Chance
      const precipProb = daily && daily.precipitation_probability_max ? daily.precipitation_probability_max[0] : 0;
      if (this.#elements.precipChanceDisplay) {
        if (window.motionEngine) {
          window.motionEngine.animateCounter(this.#elements.precipChanceDisplay, precipProb, 0.8, 0, "%");
        } else {
          this.#elements.precipChanceDisplay.textContent = `${precipProb}%`;
        }
      }
      if (this.#elements.precipBar) {
        this.#elements.precipBar.style.width = `${Math.min(100, precipProb)}%`;
      }
    }

    #formatIsoTime(isoString) {
      try {
        const timePart = isoString.split("T")[1];
        const [h, m] = timePart.split(":");
        let hour = parseInt(h, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${String(hour).padStart(2, "0")}:${m} ${ampm}`;
      } catch {
        return isoString;
      }
    }

    #getWindCardinal(deg) {
      const cardinals = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
      const index = Math.round((deg % 360) / 22.5) % 16;
      return cardinals[index];
    }

    bindEvents() {
      // 1. Hero Search Form & Button
      if (this.#elements.getWeatherBtn && this.#elements.cityInput) {
        this.#elements.getWeatherBtn.addEventListener("click", (e) => {
          e.preventDefault();
          this.#closeAllDropdowns();
          this.#app.executeSearch(this.#elements.cityInput.value.trim());
        });
      }

      if (this.#elements.cityInput) {
        this.#elements.cityInput.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            this.#closeAllDropdowns();
            this.#app.executeSearch(this.#elements.cityInput.value.trim());
          } else if (e.key === "Escape") {
            this.#closeAllDropdowns();
          }
        });

        this.#elements.cityInput.addEventListener("input", () => {
          const val = this.#elements.cityInput.value.trim();
          this.updateSearchActionButtons(Boolean(val));
          this.#handleHeroAutocomplete(val);
        });

        this.#elements.cityInput.addEventListener("focus", () => {
          const val = this.#elements.cityInput.value.trim();
          if (!val) {
            this.renderRecentHistory(this.#elements.searchDropdown, (city) => {
              this.#app.executeSearch(city);
            });
          }
        });
      }

      // 2. Clear input button
      if (this.#elements.clearInputBtn && this.#elements.cityInput) {
        this.#elements.clearInputBtn.addEventListener("click", () => {
          this.#elements.cityInput.value = "";
          this.updateSearchActionButtons(false);
          this.#elements.cityInput.focus();
          this.renderRecentHistory(this.#elements.searchDropdown, (city) => {
            this.#app.executeSearch(city);
          });
        });
      }

      // 3. Dashboard Search Form & Button
      if (this.#elements.dashboardSearchBtn && this.#elements.dashboardCityInput) {
        this.#elements.dashboardSearchBtn.addEventListener("click", (e) => {
          e.preventDefault();
          this.#closeAllDropdowns();
          this.#app.executeSearch(this.#elements.dashboardCityInput.value.trim());
        });
      }

      if (this.#elements.dashboardCityInput) {
        this.#elements.dashboardCityInput.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            this.#closeAllDropdowns();
            this.#app.executeSearch(this.#elements.dashboardCityInput.value.trim());
          } else if (e.key === "Escape") {
            this.#closeAllDropdowns();
          }
        });

        this.#elements.dashboardCityInput.addEventListener("input", () => {
          const val = this.#elements.dashboardCityInput.value.trim();
          this.#handleDashboardAutocomplete(val);
        });
      }

      // 4. Command Palette Search Modal
      if (this.#elements.navSearchTriggerBtn) {
        this.#elements.navSearchTriggerBtn.addEventListener("click", () => {
          this.openSearchModal();
        });
      }
      if (this.#elements.closeSearchModalBtn) {
        this.#elements.closeSearchModalBtn.addEventListener("click", () => {
          this.closeSearchModal();
        });
      }
      if (this.#elements.searchModal) {
        this.#elements.searchModal.addEventListener("click", (e) => {
          if (e.target === this.#elements.searchModal) {
            this.closeSearchModal();
          }
        });
      }
      if (this.#elements.modalSearchInput) {
        this.#elements.modalSearchInput.addEventListener("input", () => {
          const val = this.#elements.modalSearchInput.value.trim();
          this.#handleModalAutocomplete(val);
        });
        this.#elements.modalSearchInput.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const val = this.#elements.modalSearchInput.value.trim();
            if (val) {
              this.closeSearchModal();
              this.#app.executeSearch(val);
            }
          } else if (e.key === "Escape") {
            this.closeSearchModal();
          }
        });
      }

      // 5. Global Keyboard Shortcuts (⌘K, Ctrl+K, Escape, /)
      document.addEventListener("keydown", (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          this.openSearchModal();
        } else if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
          e.preventDefault();
          if (this.#elements.cityInput) {
            this.#elements.cityInput.focus();
            this.#elements.cityInput.select();
          }
        } else if (e.key === "Escape") {
          this.closeSearchModal();
          this.#closeAllDropdowns();
        }
      });

      // 6. City Pills (Hero and Modal)
      document.querySelectorAll(".city-pill, .modal-city-pill").forEach((pill) => {
        pill.addEventListener("click", () => {
          const city = pill.getAttribute("data-city");
          if (city) {
            this.closeSearchModal();
            this.#closeAllDropdowns();
            this.#app.executeSearch(city);
          }
        });
      });

      // 7. Geolocation (GPS) Buttons
      if (this.#elements.navGeoBtn) {
        this.#elements.navGeoBtn.addEventListener("click", () => {
          this.#app.executeGeolocation();
        });
      }
      if (this.#elements.heroGeoBtn) {
        this.#elements.heroGeoBtn.addEventListener("click", () => {
          this.#app.executeGeolocation();
        });
      }

      // 8. Brand Logo click -> Reset to clean state
      if (this.#elements.brandHomeBtn) {
        this.#elements.brandHomeBtn.addEventListener("click", (e) => {
          e.preventDefault();
          this.switchView("welcome");
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }

      // 9. Interactive Companion Character Click
      if (this.#elements.characterFigure) {
        this.#elements.characterFigure.addEventListener("click", () => {
          this.#elements.characterFigure.classList.remove("reacting");
          void this.#elements.characterFigure.offsetWidth;
          this.#elements.characterFigure.classList.add("reacting");
        });
      }

      // 10. Click outside to dismiss autocomplete dropdowns
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-box-wrapper") && !e.target.closest(".search-dropdown")) {
          this.#closeAllDropdowns();
        }
      });
    }

    #closeAllDropdowns() {
      if (this.#elements.searchDropdown) this.#elements.searchDropdown.classList.add("hidden");
      if (this.#elements.dashboardSearchDropdown) this.#elements.dashboardSearchDropdown.classList.add("hidden");
      if (this.#elements.modalSearchDropdown) this.#elements.modalSearchDropdown.classList.add("hidden");
    }

    #handleHeroAutocomplete(query) {
      if (!query) {
        this.renderRecentHistory(this.#elements.searchDropdown, (city) => {
          this.#app.executeSearch(city);
        });
        return;
      }

      clearTimeout(this.#debounceTimeout);
      this.#debounceTimeout = setTimeout(async () => {
        const suggestions = await this.#app.getGeocodingSuggestions(query);
        this.renderSuggestionsList(this.#elements.searchDropdown, suggestions, query, (city) => {
          this.#app.executeSearch(city);
        });
      }, 160);
    }

    #handleDashboardAutocomplete(query) {
      if (!query) {
        if (this.#elements.dashboardSearchDropdown) this.#elements.dashboardSearchDropdown.classList.add("hidden");
        return;
      }

      clearTimeout(this.#dashDebounceTimeout);
      this.#dashDebounceTimeout = setTimeout(async () => {
        const suggestions = await this.#app.getGeocodingSuggestions(query);
        this.renderSuggestionsList(this.#elements.dashboardSearchDropdown, suggestions, query, (city) => {
          this.#app.executeSearch(city);
        });
      }, 160);
    }

    #handleModalAutocomplete(query) {
      if (!query) {
        this.renderRecentHistory(this.#elements.modalSearchDropdown, (city) => {
          this.closeSearchModal();
          this.#app.executeSearch(city);
        });
        return;
      }

      clearTimeout(this.#modalDebounceTimeout);
      this.#modalDebounceTimeout = setTimeout(async () => {
        const suggestions = await this.#app.getGeocodingSuggestions(query);
        this.renderSuggestionsList(this.#elements.modalSearchDropdown, suggestions, query, (city) => {
          this.closeSearchModal();
          this.#app.executeSearch(city);
        });
      }, 160);
    }
  }

  // ============================================================================
  // 6. ATMOSPHERE APP (Master Orchestrator & Application Lifecycle Manager)
  // ============================================================================
  class AtmosphereApp {
    #security;
    #geocoding;
    #weather;
    #splineRenderer;
    #ui;
    #historyKey = "atmosphere_recent_searches";
    #maxHistory = 6;

    constructor() {
      this.#security = new AtmosphereSecurity();
      this.#geocoding = new AtmosphereGeocodingService(this.#security, GLOBAL_CITY_CATALOG);
      this.#weather = new AtmosphereWeatherService(WMO_WEATHER_MAP);
      this.#splineRenderer = new AtmosphereSplineRenderer();
      this.#ui = new AtmosphereUIController(this);
    }

    init() {
      this.#ui.bindEvents();
      this.#ui.initStandbyLandingState(this.#security.getMaskedStatus());
      this.#splineRenderer.renderStandby(this.#ui.getHourlyTimeline());

      // Safe global debug facade (ZERO API KEY EXPOSURE)
      window.Atmosphere = Object.freeze({
        hasKey: () => this.#security.hasKey(),
        setKey: (key) => this.#security.setCustomKey(key),
        clearKey: () => this.#security.clearKey()
      });
    }

    sanitize(input) {
      return this.#security.sanitize(input);
    }

    getWmoInfo(code) {
      return this.#weather.getWmoInfo(code);
    }

    generateNarrative(daily, wmoInfo) {
      return this.#weather.generateNarrative(daily, wmoInfo);
    }

    async getGeocodingSuggestions(query) {
      return this.#geocoding.searchSuggestions(query);
    }

    async executeSearch(query) {
      const clean = query.trim();
      if (!clean) return;

      this.#ui.hideError();
      this.#ui.showLoading(true);

      try {
        const location = await this.#geocoding.resolveCoordinates(clean);
        const weatherData = await this.#weather.fetchForecast(location.latitude, location.longitude, location.timezone);

        const locationLabel = location.admin1
          ? `${location.name}, ${location.admin1}`
          : `${location.name}, ${location.country || ""}`;

        this.#ui.syncSearchInputs(location.name);
        this.#ui.updateDashboard(weatherData, locationLabel, location.timezone);
        this.#splineRenderer.render(
          this.#ui.getHourlyTimeline(),
          weatherData.hourly,
          weatherData.current ? weatherData.current.time : ""
        );

        this.saveRecentSearch(location.name);
        this.#ui.switchView("dashboard");
      } catch (err) {
        console.error("[Atmosphere Search Error]:", err);
        this.#ui.showError(err.message || "Failed to retrieve telemetry data for the specified city.");
      } finally {
        this.#ui.showLoading(false);
      }
    }

    async executeGeolocation() {
      if (!navigator.geolocation) {
        this.#ui.showError("Geolocation is not supported by your browser.");
        return;
      }

      this.#ui.hideError();
      this.#ui.showLoading(true);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const loc = await this.#geocoding.reverseGeocode(lat, lon);
            const weatherData = await this.#weather.fetchForecast(lat, lon, "auto");

            const label = loc.admin1 ? `${loc.name}, ${loc.admin1}` : `${loc.name}, ${loc.country || ""}`;

            this.#ui.syncSearchInputs(loc.name);
            this.#ui.updateDashboard(weatherData, label, "auto");
            this.#splineRenderer.render(
              this.#ui.getHourlyTimeline(),
              weatherData.hourly,
              weatherData.current ? weatherData.current.time : ""
            );

            this.saveRecentSearch(loc.name);
            this.#ui.switchView("dashboard");
          } catch (err) {
            console.error("[Geolocation Telemetry Error]:", err);
            this.#ui.showError("Could not retrieve atmospheric data for your current GPS coordinates.");
          } finally {
            this.#ui.showLoading(false);
          }
        },
        (err) => {
          this.#ui.showLoading(false);
          let msg = "Unable to access your GPS location.";
          if (err.code === err.PERMISSION_DENIED) msg = "GPS location access was denied.";
          else if (err.code === err.POSITION_UNAVAILABLE) msg = "Location information is unavailable.";
          this.#ui.showError(msg);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    }

    getRecentSearches() {
      try {
        const raw = localStorage.getItem(this.#historyKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) return parsed.slice(0, this.#maxHistory);
        }
      } catch {}
      return [];
    }

    saveRecentSearch(cityName) {
      if (!cityName) return;
      try {
        let history = this.getRecentSearches();
        history = history.filter((c) => c.toLowerCase() !== cityName.toLowerCase());
        history.unshift(cityName);
        if (history.length > this.#maxHistory) {
          history = history.slice(0, this.#maxHistory);
        }
        localStorage.setItem(this.#historyKey, JSON.stringify(history));
      } catch {}
    }
  }

  // Bootstrap Application Orchestrator
  const app = new AtmosphereApp();
  app.init();
});
