import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store/store';
import {
  fetchCountryDataAsync,
  setSelectedYear,
  setCurrentPage,
} from '@/lib/store/populationSlice';
import useAppSelector from '@/lib/hooks/appSelector';
import useAppDispatch from '@/lib/hooks/appDispatch';

const PopulationTable = () => {
  const dispatch = useAppDispatch();
  const {
    countryData,
    historicalData,
    currentPage,
    totalPages,
    populationIncrease,
    lifeExpentancyValue,
    selectedYear,
    isLoading,
    error,
  } = useAppSelector((state: RootState) => state.population);

  useEffect(() => {
    dispatch(fetchCountryDataAsync());
  }, [dispatch, selectedYear, currentPage]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedYear(Number(e.target.value)));
  };

  const handleShowMore = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const years = Array.from({ length: 60 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="mx-20 my-8 border border-gray-300 rounded-lg bg-[#F6F7F5] border-t-0">
      <div className="flex justify-end p-4">
        <select
          className="w-[136.64px]  h-[38.01px] p-[8.15px_16.74px] gap-[9.05px] rounded-[14.48px]  border-[0.91px] border-solid  bg-[#F6F7F5]"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <p className="text-center py-4">Loading...</p>
      ) : error ? (
        <p className="text-center py-4 text-red-500">{error}</p>
      ) : countryData && countryData.length > 0 ? (
        <>
          <table className="min-w-full table-fixed border-collapse text-center text-sm text-gray-600">
            <thead className="bg-[#F6F7F5]">
              <tr className='border-b-2 border-gray-300'>
                <th className="px-4 py-2 border-r border-gray-300">Country</th>
                <th className="px-4 py-2 border-r border-gray-300">Population</th>
                <th className="px-4 py-2 border-r border-gray-300">Density</th>
                <th className="px-4 py-2 border-r border-gray-300">Growth Rate</th>
                <th className="px-4 py-2 border-r border-gray-300">Life Exp. at Birth</th>
                <th className="px-4 py-2 border-r border-gray-300">Birth Rate</th>
                <th className="px-4 py-2 border-r border-gray-300">Death Rate</th>
                <th className="px-4 py-2">Fertility Rate</th>
              </tr>
            </thead>
            <tbody>
            <tr >
                  <td className="px-4 py-2 border-r border-gray-300">World</td>
                  <td className="px-4 py-2 border-r border-gray-300">{historicalData[0]?.value}</td>
                  <td className="px-4 py-2 border-r border-gray-300">{(populationIncrease / 1000000).toFixed(1)}</td>
                  <td className="px-4 py-2 border-r border-gray-300"> {lifeExpentancyValue.toFixed(1)}</td>
                  <td className="px-4 py-2 border-r border-gray-300">{'-'}</td>
                  <td className="px-4 py-2 border-r border-gray-300">{ '-'}</td>
                  <td className="px-4 py-2 border-r border-gray-300">{ '-'}</td>
                  <td className="px-4 py-2">{ '-'}</td>
                </tr>
              {countryData.map((country, index) => (
                <tr key={country.id || index} >
                  <td className="px-4 py-2 border-r border-gray-300">{country.name || '-'}</td>
                  <td className="px-4 py-2 border-r border-gray-300">{country.population || '-'}</td>
                  <td className="px-4 py-2 border-r border-gray-300">{country.populationDensity || '-'}</td>
                  <td className="px-4 py-2 border-r border-gray-300">{country.growthRate || '-'}</td>
                  <td className="px-4 py-2 border-r border-gray-300">{country.lifeExpAtBirth || '-'}</td>
                  <td className="px-4 py-2 border-r border-gray-300">{country.birthRate || '-'}</td>
                  <td className="px-4 py-2 border-r border-gray-300">{country.deathRate || '-'}</td>
                  <td className="px-4 py-2">{country.fertilityRate || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {currentPage < totalPages && (
            <div className="text-center py-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleShowMore}
              >
                Show More
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center py-4">No data available</p>
      )}
    </div>
  );
};

export default PopulationTable;