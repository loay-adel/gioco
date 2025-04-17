import { Button } from "@material-tailwind/react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const LanguageSelection = () => {
  const { setLanguage } = useCart();
  const navigate = useNavigate();

  const handleArabicSelection = () => {
    setLanguage("ar");
    navigate("/table");
  };

  const handleEnglishSelection = () => {
    setLanguage("en");
    navigate("/table");
  };

  return (
    <div className="relative flex flex-col justify-center items-center text-white h-[calc(100vh-147px)] overflow-hidden">
      <div className="absolute inset-0 bg-[url('logo-cuted-header.png')] bg-cover bg-center blur-sm -z-10"></div>

      <div className="">
        <img src="tefo.png" alt="our tefo" className="h-80" />
      </div>

      <div className="flex flex-row gap-10">
        <Button
          onClick={handleEnglishSelection}
          className="py-[0.8em] px-[1.2em] text-lg md:text-2xl"
        >
          English
        </Button>

        <Button
          onClick={handleArabicSelection}
          className="py-[0.8em] px-[2.2em] text-lg md:text-2xl"
        >
          العربية
        </Button>
      </div>
    </div>
  );
};

export default LanguageSelection;
