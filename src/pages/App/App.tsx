import { useEffect } from "react";
import { fetchNFTs } from "@redux/nftSlice/nftSlice";

import { useAppDispatch } from "hooks/useAppSelector";

import { Header } from "components/Header";
import { Slider } from "components/Slider";
import { Footer } from "components/Footer";

export const App = () => {
  const base = "app";
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNFTs());
  }, []);

  return (
    <div className={base}>
      <Header />
      <Slider />
      <Footer />
    </div>
  );
};
