"use client";

import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store/store";
import {
  avgDensity,
  fetchHistoricalDataAsync,
  lifeExpentancy,
  populationDataAsync,
  setSelectedIndicator,
  setSelectedTimeRange,
} from "@/lib/store/populationSlice";
import PopulationChart from "@/ui/PopulationChartComponent";

export default function Population() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    populationData,
    historicalData,
    selectedIndicator,
    selectedTimeRange,
    isLoading,
    error,
    averageDensityData,
    populationIncrease,
    lifeExpentancyValue,
  } = useSelector((state: RootState) => state.population);

  const fetchData = useCallback(() => {
    dispatch(populationDataAsync())
      .then((result) => console.log("Fetch result:", result))
      .catch((error) => console.error("Fetch error:", error));
  }, [dispatch, selectedIndicator, selectedTimeRange]);
  const fetchAverageDensity = useCallback(() => {
    dispatch(avgDensity())
      .then((result) => console.log("Fetch result:", result))
      .catch((error) => console.error("Fetch error:", error));
  }, [dispatch, selectedIndicator, selectedTimeRange]);
  const fetchLifeExpectancy = useCallback(() => {
    dispatch(lifeExpentancy())
      .then((result) => console.log("Fetch result:", result))
      .catch((error) => console.error("Fetch error:", error));
  }, [dispatch, selectedIndicator, selectedTimeRange]);

  useEffect(() => {
    fetchData();
    fetchAverageDensity();
    fetchLifeExpectancy()
  }, [fetchData]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <div className="text-center w-[482px] h-auto rounded-[12px] p-[24px_51px_24px_51px] gap-[10px] bg-[#F6F7F5]">
          {/* Population: {historicalData[0]?.value} */}
          <div className="text-xs text-gray-500 font-bold">
            World Population
          </div>
          <div className="text-2xl text-black font-bold text-center">
            {(historicalData[0]?.value / 1000000000).toFixed(1)}B
          </div>
        </div>
        <div className="text-center w-[482px] h-auto rounded-[12px] p-[24px_51px_24px_51px] gap-[10px] bg-[#F6F7F5]">
          {/* Population: {historicalData[0]?.value} */}
          <div className="text-xs text-gray-500 font-bold">Average density</div>
          <div className="text-2xl text-black font-bold text-center">
            {averageDensityData.toFixed(0)} p/sqft
          </div>
        </div>

        {/* <div className='w-[482px] h-auto rounded-[12px] p-[24px_51px_24px_51px] gap-[10px]  bg-[#F6F7F5]'>Density:{averageDensityData}</div> */}
      </div>
      {historicalData?.length > 0 && (
        <div className="flex mt-6 bg-[#F6F7F5] rounded-[12px] ">
          <div className="relative  m-auto ">
            <div className="text-center my-4 h-auto rounded-[12px] w-[145px] gap-[10px] bg-[#F6F7F5]">
              {/* Population: {historicalData[0]?.value} */}
              <div className="text-xs text-gray-500 font-bold">
                Total Population
              </div>
              <div className="text-2xl text-black font-bold ">
                {(historicalData[0]?.value / 1000000000).toFixed(1)}B
              </div>
            </div>
            <div className="text-center my-4  h-auto rounded-[12px] w-[145px] gap-[10px] bg-[#F6F7F5]">
              {/* Population: {historicalData[0]?.value} */}
              <div className="text-xs text-gray-500 font-bold">
                Change in last year
              </div>
              <div className="text-2xl text-black font-bold ">
                +{(populationIncrease / 1000000).toFixed(1)}M
              </div>
            </div>
            <div className="text-center  my-4 h-auto rounded-[12px] w-[145px] gap-[10px] bg-[#F6F7F5]">
              {/* Population: {historicalData[0]?.value} */}
              <div className="text-xs text-gray-500 font-bold">
                Life Expentacy at Birth
              </div>
              <div className="text-2xl text-black font-bold ">
                {lifeExpentancyValue.toFixed(1)} Yrs
              </div>
            </div>
          </div>
          <PopulationChart data={historicalData} />
        </div>
      )}
    </div>
  );
}
