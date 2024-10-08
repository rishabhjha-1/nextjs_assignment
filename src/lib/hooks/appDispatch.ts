// hooks/useAppDispatch.ts
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store'; // Adjust the path based on your directory structure

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
