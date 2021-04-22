import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function CardLikeSpinner(props) {
  return (
    <Loader
      type="TailSpin"
      color="#000"
      height={14}
      width={20}
    />
  );
}