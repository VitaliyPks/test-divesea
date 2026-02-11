import { fetchNFTs } from "@redux/nftSlice/nftSlice";
import { Slider } from "components/Slider";
import useAppSelector, { useAppDispatch } from "hooks/useAppSelector";
import { useEffect } from "react";

export const App = () => {
  const base = "";
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.nft);

  useEffect(() => {
    dispatch(fetchNFTs());
  }, []);

  return (
    <div className={base}>{!!items?.length && <Slider nfts={items} />}</div>
  );
};
