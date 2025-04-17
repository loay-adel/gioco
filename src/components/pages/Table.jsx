import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Table = () => {
  const { tableNum, settableNum } = useCart();
  const navigate = useNavigate();
  const numbers = Array.from({ length: 75 }, (_, i) => i + 1);

  const handleClick = (number) => {
    settableNum(number.toString());

    Swal.fire({
      title: "Number Selected",
      text: `You clicked number: ${number}`,
      icon: "success",
      confirmButtonText: "OK",
      background: "#f3f4f6",
      confirmButtonColor: "#4CAF50",
    }).then((result) => {
      if (result.isConfirmed) {
        // Example: Navigate to another route with the number as state
        navigate("/home", { state: { selectedNumber: number } });
      }
    });

    console.log(`Clicked number: ${number}`);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">
        CLick on your table Number :
      </h1>

      {/* tableNum area for the selected number */}
      {tableNum && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-lg font-semibold">
            Selected Number: <span className="text-green-600">{tableNum}</span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-items-center">
        {numbers.map((number) => (
          <button
            key={number}
            onClick={() => handleClick(number)}
            className={`w-24 h-24 rounded-full text-white font-medium flex items-center justify-center
                      hover:bg-green-600 transition-colors duration-200 shadow-md
                      focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50
                      ${
                        tableNum === number.toString()
                          ? "bg-black"
                          : "bg-green-500"
                      }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table;
