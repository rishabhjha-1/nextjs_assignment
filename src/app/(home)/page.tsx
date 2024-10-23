"use client";

import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store/store";
import {
  fetchHistoricalDataAsync,
} from "@/lib/store/populationSlice";
import PopulationChart from "@/ui/PopulationChartComponent";
import useAppSelector from "@/lib/hooks/appSelector";
import useAppDispatch from "@/lib/hooks/appDispatch";
import Link from "next/link";

export default function Population() {
  const dispatch = useAppDispatch();
  const {
    historicalData,
    selectedIndicator,
    selectedTimeRange,
    averageDensityData,
    populationIncrease,
    lifeExpentancyValue,
  
  } = useAppSelector((state: RootState) => state.population);

  const fetchData = useCallback(() => {
    dispatch(fetchHistoricalDataAsync())
      .then((result) => console.log("Fetch result:", result))
      .catch((error) => console.error("Fetch error:", error));
  }, [dispatch, selectedIndicator, selectedTimeRange]);

  useEffect(() => {
    fetchData();
  
  }, [fetchData]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <div className="text-center w-[482px] h-auto rounded-[12px] p-[24px_51px_24px_51px] gap-[10px] bg-[#F6F7F5]">
          <div className="text-xs text-gray-500 font-bold">
            World Population
          </div>
          <div className="text-2xl text-black font-bold text-center">
            {(historicalData[0]?.value / 1000000000).toFixed(1)}B
          </div>
        </div>
        <div className="text-center w-[482px] h-auto rounded-[12px] p-[24px_51px_24px_51px] gap-[10px] bg-[#F6F7F5]">
          <div className="text-xs text-gray-500 font-bold">Average density</div>
          <div className="text-2xl text-black font-bold text-center">
            {averageDensityData.toFixed(1)} p/sqft
          </div>
        </div>

      </div>
      {historicalData?.length > 0 && (
        <div className="flex mt-6 bg-[#F6F7F5] rounded-[12px] ">
          <div className="relative  m-auto ">
            <div className="text-center my-4 h-auto rounded-[12px] w-[145px] gap-[10px] bg-[#F6F7F5]">
              <div className="text-xs text-gray-500 font-bold">
                Total Population
              </div>
              <div className="text-2xl text-black font-bold ">
                {(historicalData[0]?.value / 1000000000).toFixed(1)}B
              </div>
            </div>
            <div className="text-center my-4  h-auto rounded-[12px] w-[145px] gap-[10px] bg-[#F6F7F5]">
              <div className="text-xs text-gray-500 font-bold">
                Change in last year
              </div>
              <div className="text-2xl text-black font-bold ">
                +{(populationIncrease / 1000000).toFixed(1)}M
              </div>
            </div>
            <div className="text-center  my-4 h-auto rounded-[12px] w-[145px] gap-[10px] bg-[#F6F7F5]">
              <div className="text-xs text-gray-500 font-bold">
                Life Expentacy at Birth
              </div>
              <div className="text-2xl text-black font-bold ">
                {lifeExpentancyValue.toFixed(0)} Yrs
              </div>
            </div>
            <div className="text-center">
              <Link href='/population' className="w-[113px] h-[38px] px-[24px] text-white font-bold py-[11px] gap-[10px] rounded-[24.36px] bg-gradient-to-r from-[#5B00FF] text-xs to-[#FB8D8D] ">Dive deeper</Link>
            </div>
          </div>
          <PopulationChart data={historicalData} />
        </div>
      )}
    </div>
  );
}
