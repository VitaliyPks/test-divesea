import { ReactComponent as LoadingIcon } from "assets/icons/loading-icon.svg";

const Loading = ({ height = null }) => {
  const base = "loading";

  return (
    <div className={base} style={{ height: height ? `${height}px` : "100%" }}>
      <LoadingIcon className={`${base}__icon`} />
    </div>
  );
};

export default Loading;
