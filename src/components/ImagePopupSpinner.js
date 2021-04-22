import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function ImagePopupSpinner(props) {
  return (
    <Loader
      type="TailSpin"
      color="#fff"
      height={50}
      width={50}
    />
  );
}