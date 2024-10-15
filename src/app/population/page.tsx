"use client";

import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store/store";
import {
  fetchHistoricalDataAsync,
  setSelectedIndicator,
  setSelectedTimeRange,
} from "@/lib/store/populationSlice";
import PopulationChart from "@/ui/PopulationChartComponent";
import PopulationTable from "@/ui/PopulationTable";
import useAppSelector from "@/lib/hooks/appSelector";
import useAppDispatch from "@/lib/hooks/appDispatch";

export default function Population() {
  const dispatch = useAppDispatch();
  const {
    historicalData,
    selectedIndicator,
    selectedTimeRange,
    isLoading,
    error,
  } = useAppSelector((state: RootState) => state.population);

  const fetchData = useCallback(() => {
    dispatch(fetchHistoricalDataAsync())
      .then((result) => console.log("Fetch result:", result))
      .catch((error) => console.error("Fetch error:", error));
  }, [dispatch, selectedIndicator, selectedTimeRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleIndicatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedIndicator(e.target.value));
  };

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedTimeRange(e.target.value));
  };

  return (
    <div className="container mx-auto bg-[#F6F7F5]">
      <div className="flex justify-between px-24 pt-5">
        <select
          className="w-[136.64px] h-[38.01px] p-[8.15px_16.74px] gap-[9.05px] rounded-[14.48px] bg-[#F6F7F5] border-[0.91px]  border-solid border-[#D4D4D4] "
          onChange={handleIndicatorChange}
          value={selectedIndicator}
        >
          <option value="population">Population</option>
          <option value="populationDensity">Population Density</option>
          <option value="growthRate">Growth Rate</option>
          <option value="lifeExpAtBirth">Life Expectancy at Birth</option>
          <option value="birthRate">Birth Rate</option>
          <option value="deathRate">Death Rate</option>
          <option value="fertilityRate">Fertility Rate</option>
        </select>
        <select
          className="w-[136.64px]  h-[38.01px] p-[8.15px_16.74px] gap-[9.05px] rounded-[14.48px] bg-[#F6F7F5] border-[0.91px] border-solid border-[#D4D4D4] b "
          onChange={handleTimeRangeChange}
          value={selectedTimeRange}
        >
          <option value="5Yrs">5 Years</option>
          <option value="10Yrs">10 Years</option>
          <option value="20Yrs">20 Years</option>
          <option value="50Yrs">50 Years</option>
          <option value="100Yrs">100 Years</option>
        </select>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {historicalData?.length > 0 && (
        <div className="">
          <PopulationChart data={historicalData} isPopulationPage={true} />
        </div>
      )}

       
      <PopulationTable />
    </div>
  );
}
