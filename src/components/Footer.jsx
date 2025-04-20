import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer
      className="flex w-full  flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 px-2 text-center md:justify-between"
      dir="ltr"
    >
      <Typography color="blue-gray" className="font-normal">
        &copy; Gioco
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            as={Link}
            to="/signin"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Admin Panel
          </Typography>
        </li>

        <li>
          <Typography
            as="a"
            href="mailto:loay-adel@outlook.com"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            done by loay-adel
          </Typography>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
