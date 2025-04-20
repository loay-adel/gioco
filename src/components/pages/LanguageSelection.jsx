import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LanguageSelection = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const handleArabicSelection = () => {
    i18n.changeLanguage("ar");
    navigate("/table");
  };

  const handleEnglishSelection = () => {
    i18n.changeLanguage("en");
    navigate("/table");
  };

  return (
    <div className="relative flex flex-col justify-center items-center text-white h-[calc(100vh-147px)] overflow-hidden">
      <div className="absolute inset-0 bg-[url('logo-cuted-header.png')] bg-cover bg-center blur-sm -z-10"></div>

      <div>
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
