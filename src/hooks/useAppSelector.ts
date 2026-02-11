import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { AppDispatch, TypeRootState } from "redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

const useAppSelector: TypedUseSelectorHook<TypeRootState> = useSelector;

export default useAppSelector;
