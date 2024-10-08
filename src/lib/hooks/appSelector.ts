// hooks/useAppSelector.ts
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store/store'; // Adjust the path based on your directory structure

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
