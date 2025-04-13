import { useState } from "react";
import { FaBackspace } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const [display, setDisplay] = useState("");
  const navigate = useNavigate();

  const handleNumberClick = (num) => {
    if (num === "Enter") {
      const trimmed = display.trim();

      // ⛔️ Reject if empty or 0 or starts with 0
      if (trimmed === "" || trimmed === "0" || /^0\d+/.test(trimmed)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Table Number",
          text: "Please enter a valid table number (not 0 or starting with 0).",
        });
      } else {
        Swal.fire({
          title: "Success!",
          text: `Table ${display} selected. You will be redirected soon.`,
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/home");
          }
        });
      }
    } else {
      if (display.length < 12) {
        setDisplay((prev) => prev + num);
      }
    }
  };

  const handleClear = () => {
    setDisplay("");
  };

  const handleBackspace = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  const buttons = [
    "7",
    "8",
    "9",
    "4",
    "5",
    "6",
    "1",
    "2",
    "3",
    "Enter",
    "0",
    "⌫",
  ];

  return (
    <div className="flex flex-col justify-center items-center bg-[#F7F7F7] text-black h-[calc(100vh-147px)] gap-10">
      <h1 className="text-2xl font-bold capitalize">
        pick your table Number :
      </h1>
      <div className="w-80">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
          <div className="bg-gray-100 rounded-2xl shadow-2xl w-full max-w-xs p-6">
            {/* Display */}
            <div className="relative mb-6">
              <div className="bg-white h-16 rounded-lg shadow-inner flex items-center justify-end px-4 overflow-hidden">
                <button
                  onClick={handleClear}
                  className="absolute left-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <MdClose size={20} />
                </button>
                <span className="text-3xl font-mono tracking-wider">
                  {display || "0"}
                </span>
              </div>
            </div>

            {/* Numpad Grid */}
            <div className="grid grid-cols-3 gap-3">
              {buttons.map((btn) => (
                <button
                  key={btn}
                  onClick={() =>
                    btn === "⌫" ? handleBackspace() : handleNumberClick(btn)
                  }
                  className={`
                    h-14 rounded-lg text-xl font-semibold
                    ${
                      btn === "⌫"
                        ? "bg-red-100 text-red-600 hover:bg-red-200 active:bg-red-300"
                        : "bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                    }
                    shadow-sm transition-all duration-150
                    transform active:scale-95
                    flex items-center justify-center
                  `}
                >
                  {btn === "⌫" ? <FaBackspace size={24} /> : btn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
