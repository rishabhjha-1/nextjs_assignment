import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {  fetchCountryData, fetchHistoricalPopulationData, fetchPopulationData } from '@/lib/api'

interface PopulationState {
  populationData: any;
  historicalData: any[];
  isLoading: boolean;
  error: string | null;
  selectedTimeRange:any;
  selectedIndicator:string;
  averageDensityData:number;
  populationIncrease:number;
  lifeExpentancyValue:number;
  countryData: any[];
  currentPage: number;
  totalPages: number;
  selectedYear: any;
  countriesDataValue:any
}

const initialState: PopulationState = {
  populationData: null,
  historicalData: [],
  isLoading: false,
  error: null,
  selectedIndicator:'population',
  selectedTimeRange:"5Yrs",
  averageDensityData:0,
  populationIncrease:0,
  lifeExpentancyValue:0,
  countryData: [],
  currentPage: 1,
  totalPages: 1,
  selectedYear: 2022,
  countriesDataValue:[]

};

export const fetchCountryDataAsync = createAsyncThunk(
  'population/fetchCountryData',
  async (_, { getState }) => {
    const state = getState() as { population: PopulationState };
    const { selectedYear, currentPage } = state.population;
    return await fetchCountryData(selectedYear, currentPage);
  }
);


export const fetchHistoricalDataAsync = createAsyncThunk(
  'population/fetchHistoricalData',
  async (_, { getState }) => {
    const state = getState() as { population: PopulationState };
    const { selectedIndicator,selectedTimeRange,selectedYear } = state.population;
    const historicalData= await fetchHistoricalPopulationData(selectedIndicator,selectedTimeRange);
    const populationData= await fetchHistoricalPopulationData("population","10Yrs");
    const averageDensity= await fetchHistoricalPopulationData("populationDensity","10Yrs")
    console.log({selectedYear})
    const countriesDataValue=await fetchPopulationData(selectedYear)
    console.log(countriesDataValue,'ds')
    const values = averageDensity.map((item: { value: any; }) => item.value).filter((value: null) => value !== null) as number[];

    const total = values.reduce((sum, value) => sum + value, 0);
    const average = values.length > 0 ? total / 10 : null; // Avoid division by zero

    const averageDensityData = average || 0 ; // 
    const lifeExpentancy=await fetchHistoricalPopulationData("lifeExpAtBirth","5Yrs");
    console.log(lifeExpentancy)
    const sortedData = lifeExpentancy
    .filter((data: { value: null; }) => data.value !== null) // Filter out null values
    .sort((a: { date: number; }, b: { date: number; }) => b.date - a.date); // Sort by date in descending order

  const currentYearData = sortedData[0]; // Get the most recent year data

  if (!currentYearData) {
    throw new Error("No data available to calculate life expectancy");
  }
  const lifeExpentancyValue= currentYearData.value;
  return {historicalData,populationData,averageDensityData,lifeExpentancyValue,countriesDataValue}

  }
);

//   'population/populationData',
//   async (_, { getState }) => {
//     return await fetchHistoricalPopulationData("population","10Yrs");
//   }
// );
// export const avgDensity = createAsyncThunk(
//   'population/averageDensity',
//   async (_, { getState }) => {
//     return await fetchHistoricalPopulationData("populationDensity","10Yrs");
//   }
// );
// export const lifeExpentancy = createAsyncThunk(
//   'population/lifeExpentancy',
//   async (_, { getState }) => {
//     const res=await fetchHistoricalPopulationData("lifeExpAtBirth","5Yrs");
//     console.log(res)
//     const sortedData = res
//     .filter((data: { value: null; }) => data.value !== null) // Filter out null values
//     .sort((a: { date: number; }, b: { date: number; }) => b.date - a.date); // Sort by date in descending order

//   const currentYearData = sortedData[0]; // Get the most recent year data

//   if (!currentYearData) {
//     throw new Error("No data available to calculate life expectancy");
//   }
//   return currentYearData.value;
//   }
// );


// Function to calculate the population increase from the last year
export function calculatePopulationIncrease(historicalData: any[]) {
  if (!historicalData || historicalData.length < 2) {
    throw new Error("Insufficient data to calculate population increase");
  }

  const sortedData = historicalData
    .filter((data) => data.value !== null) 
    .sort((a, b) => b.date - a.date); 

  const latestYearData = sortedData[0]; 
  const previousYearData = sortedData[1]; 

  if (!latestYearData || !previousYearData) {
    throw new Error("Not enough data to calculate the increase");
  }

  const populationIncrease = latestYearData.value - previousYearData.value;

  return populationIncrease
}



const populationSlice = createSlice({
  name: 'population',
  initialState,
  reducers: {
    setSelectedIndicator: (state, action: PayloadAction<string>) => {
      state.selectedIndicator = action.payload; // New reducer for selected indicator
    },
    setSelectedTimeRange: (state, action: PayloadAction<string>) => {
      state.selectedTimeRange = action.payload; // New reducer for selected time range
    },
    setSelectedYear: (state, action: PayloadAction<number>) => {
      state.selectedYear = action.payload;
      state.currentPage = 1; // Reset to first page when year changes
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoricalDataAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHistoricalDataAsync.fulfilled, (state, action) => {
        
        state.isLoading = false;
        state.historicalData = action.payload.historicalData;
        state.averageDensityData=action.payload.averageDensityData
        state.lifeExpentancyValue=action.payload.lifeExpentancyValue
        state.populationData=action.payload.lifeExpentancyValue
        state.populationIncrease= calculatePopulationIncrease(action.payload.historicalData)
        state.countriesDataValue=action.payload.countriesDataValue
      
      })
      .addCase(fetchHistoricalDataAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch historical data';
      })
   
      .addCase(fetchCountryDataAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCountryDataAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.countryData = action.payload.countries;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCountryDataAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch country data';
      });
      
      
      
  },
});

export const { setSelectedIndicator,
  setSelectedTimeRange ,setSelectedYear,setCurrentPage  } = populationSlice.actions;
export default populationSlice.reducer;