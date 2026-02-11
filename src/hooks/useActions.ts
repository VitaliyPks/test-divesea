import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { nftActions } from "@redux/nftSlice/nftSlice";

const allAction = { ...nftActions };

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allAction, dispatch);
};

export default useActions;
