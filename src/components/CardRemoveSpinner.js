import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function CardRemoveSpinner(props) {
  return (
    <Loader
      className='card__remove-spinner' 
      type="TailSpin"
      color="#fff"
      height={25}
      width={25}
    />
  );
}