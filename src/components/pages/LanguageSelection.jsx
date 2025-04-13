import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const LanguageSelection = () => {
  return (
    <div
      className="flex justify-center items-center bg-[#F7F7F7] text-white h-[calc(100vh-147px)] gap-10
"
    >
      <Link to="/table">
        <Button className="py-[0.8em] px-[2.2em] text-lg md:text-2xl ">
          العربية
        </Button>
      </Link>
      <Link to="/table">
        <Button className="py-[0.8em] px-[1.2em] text-lg  md:text-2xl ">
          English
        </Button>
      </Link>
    </div>
  );
};

export default LanguageSelection;
