import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import { HiOutlineBars4, HiMiniXMark } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [openNav, setOpenNav] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({
    code: "en",
    name: "English",
    flag: "🇺🇸",
  });

  // Separate state for desktop and mobile menus
  const [openDesktopMenu, setOpenDesktopMenu] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ];

  const changeLanguage = (lng) => {
    const selectedLang = languages.find((lang) => lang.code === lng);
    setCurrentLanguage(selectedLang);
    i18n.changeLanguage(lng);
    setOpenDesktopMenu(false);
    setOpenMobileMenu(false);
  };

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as={Link}
        to="/home"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        {t("home")}
      </Typography>
      <Typography
        as={Link}
        to="/cart"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        {t("cart")}
      </Typography>
      <Typography
        as={Link}
        to="/table"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        {t("change_table")}
      </Typography>
    </ul>
  );

  return (
    <Navbar fullWidth className="w-full px-4 py-2 lg:px-8 lg:py-4 border-none">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer font-medium h-10 border-0"
        >
          <div className="flex justify-start items-center pt-2 h-10">
            <img
              src={
                currentLanguage.code === "ar" ? "logo-ar.png" : "logo-en.png"
              }
              alt="Our Logo"
              className="h-full w-auto max-h-[60px] object-contain"
            />
          </div>
        </Typography>
        <div className="mr-4 hidden lg:block">{navList}</div>
        <div className="hidden flex-wrap items-center gap-2 lg:flex">
          <Menu open={openDesktopMenu} handler={setOpenDesktopMenu}>
            <MenuHandler>
              <Button
                size="sm"
                variant="outlined"
                className="flex items-center gap-2"
              >
                <span className="h-min text-base leading-none">
                  {currentLanguage.flag}
                </span>
                {currentLanguage.name}
                <MdArrowDropDown
                  className={`h-3.5 w-3.5 transition-transform ${
                    openDesktopMenu ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </MenuHandler>
            <MenuList className="max-h-72 w-40">
              {languages.map(({ name, flag, code }) => (
                <MenuItem
                  key={code}
                  className="flex items-center gap-2"
                  onClick={() => changeLanguage(code)}
                >
                  {flag} {name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </div>
        <IconButton
          variant="text"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <HiMiniXMark className="h-6 w-6" strokeWidth={2} />
          ) : (
            <HiOutlineBars4 className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        {navList}
        <div className="flex w-full flex-nowrap items-center gap-x-4 lg:hidden">
          <Menu open={openMobileMenu} handler={setOpenMobileMenu}>
            <MenuHandler>
              <Button
                fullWidth
                size="sm"
                variant="outlined"
                className="flex items-center justify-center gap-2"
              >
                {currentLanguage.flag} {currentLanguage.name}
                <MdArrowDropDown
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform ${
                    openMobileMenu ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </MenuHandler>
            <MenuList className="w-40">
              {languages.map(({ name, flag, code }) => (
                <MenuItem
                  key={code}
                  className="flex items-center gap-2"
                  onClick={() => changeLanguage(code)}
                >
                  {flag} {name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </div>
      </Collapse>
    </Navbar>
  );
};

export default Header;
