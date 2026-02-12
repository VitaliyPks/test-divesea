import { useEffect } from "react";
import { fetchNFTs } from "@redux/nftSlice/nftSlice";

import useAppSelector, { useAppDispatch } from "hooks/useAppSelector";

import { Header } from "components/Header";
import { Slider } from "components/Slider";
import { Footer } from "components/Footer";

export const App = () => {
  const base = "app";
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.nft);

  useEffect(() => {
    dispatch(fetchNFTs());
  }, []);

  return (
    <div className={base}>
      <Header />
      {!!items?.length && <Slider nfts={items} />}
      <Footer />
    </div>
  );
};
