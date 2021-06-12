import '../../App.css'
import Lottie from "react-lottie";
import * as animationData from "../../Assets/Json/dragon-loader.json";
const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="loader-container">
      <Lottie options={defaultOptions} height={300} width={300} />
      <h2 className="text-poppins">Fetching details from server...</h2>
    </div>
  );
};

export default Loader;
