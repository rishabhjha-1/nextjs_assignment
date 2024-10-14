const BASE_URL = "http://api.worldbank.org/v2";

const INDICATORS: Record<string, string> = {
  population: "SP.POP.TOTL",
  populationDensity: "EN.POP.DNST",
  growthRate: "SP.POP.GROW",
  lifeExpAtBirth: "SP.DYN.LE00.IN",
  birthRate: "SP.DYN.CBRT.IN",
  deathRate: "SP.DYN.CDRT.IN",
  fertilityRate: "SP.DYN.TFRT.IN",
};

// Define the mapping for time ranges to years
const TIME_RANGE_YEARS: Record<string, number> = {
  "5Yrs": 5,
  "10Yrs": 10,
  "20Yrs": 20,
  "50Yrs": 50,
  "100Yrs": 100,
};

export async function fetchHistoricalPopulationData(
  indicatorKey: keyof typeof INDICATORS,
  rangeKey: keyof typeof TIME_RANGE_YEARS
) {
  const years = TIME_RANGE_YEARS[rangeKey];

  if (!years) {
    throw new Error("Invalid time range");
  }

  const endYear = new Date().getFullYear();
  const startYear = endYear - years;
  const indicator = INDICATORS[indicatorKey];

  if (!indicator) {
    throw new Error("Invalid indicator");
  }

  const response = await fetch(
    `${BASE_URL}/country/WLD/indicator/${indicator}?date=${startYear}:${endYear}&format=json`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch historical population data");
  }

  const data = await response.json();
  return data[1];
}

export async function fetchCountryData(year: number, page: number, pageSize: number = 50) {
    const indicators = Object.values(INDICATORS).join(';');
    const response = await fetch(
      `${BASE_URL}/country?date=${year}&format=json&per_page=${pageSize}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch country data");
    }
  
    const data = await response.json();
    return {
      countries: data[1],
      totalPages: Math.ceil(data[0].total / pageSize)
    };
  }