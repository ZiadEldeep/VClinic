import Link from "next/link";
import { Logo } from "react-mui-sidebar";
import { FaUser } from "react-icons/fa";
import { Fab, Tooltip } from "@mui/material";
import { IconBasket } from "@tabler/icons-react";
export const Navbar: React.FC = () => {
    return (
      <nav className="bg-[#7699ff] text-white p-4 flex justify-between items-center shadow-md">
        <div>
        <Link
            href="/">
          <img
            src="/images/logos/dark-logo.svg"
            className="w-60 h-12"
            alt="Logo"
          />
            </Link>
        </div>
        <div className="flex items-center">
          <Tooltip title="Cart">
          <Link
            href="/cart"
            className="flex items-center gap-3 mr-4 hover:text-gray-200 transition duration-200">
  
                <IconBasket size="20" />
                Cart
          </Link>
            </Tooltip>
          <Link
            href="/authentication/register"
            className="mr-4 hover:text-gray-200 transition duration-200">
            Register
          </Link>
          <FaUser className="mx-2" /> {/* Person icon added here */}
          <Link
            href="/authentication/login"
            className="hover:text-gray-200 transition duration-200">
            Login
          </Link>
        </div>
      </nav>
    );
  };