import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export const PopupSpinner = () => (
  <Loader
    className="popup__spinner"
    type="TailSpin"
    color="#fff"
    height={50}
    width={50}
  />
);