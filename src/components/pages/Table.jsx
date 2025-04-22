import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "react-i18next";

const Table = () => {
  const { tableNum, settableNum } = useCart();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const numbers = Array.from({ length: 75 }, (_, i) => i + 1);

  const handleClick = (number) => {
    settableNum(number.toString());

    Swal.fire({
      title: t("selected_title"),
      text: t("selected_message", { number }),
      icon: "success",
      showConfirmButton: false, // Hide the confirm button
      background: "#f3f4f6",
      timer: 2000, // The modal will automatically close after 2 seconds (2000ms)
      timerProgressBar: true, // Optional: show a progress bar
    });

    // Navigate after a delay to allow SweetAlert to finish
    setTimeout(() => {
      navigate("/home", { state: { selectedNumber: number } });
    }, 2000); // Same delay as the timer
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {t("select_prompt")}
      </h1>

      {/* tableNum area for the selected number */}
      {tableNum && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-lg font-semibold">
            {t("selected_number")}:{" "}
            <span className="text-green-600">{tableNum}</span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-items-center">
        {numbers.map((number) => (
          <button
            key={number}
            onClick={() => handleClick(number)}
            className={`w-28 h-28 text-4xl md:w-24 md:h-24 rounded-full text-white font-medium flex items-center justify-center
                      hover:bg-[#3C9893] transition-colors duration-200 shadow-md 
                      focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50
                      ${
                        tableNum === number.toString()
                          ? "bg-green-700 "
                          : "bg-[#4BBEB8]"
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
