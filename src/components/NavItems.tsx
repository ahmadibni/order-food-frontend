import clsx from "clsx";
import type { FC } from "react";
import { NavLink } from "react-router";

interface NavItemProps {
  icon: FC;
  label: string;
  link: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, link }) => {
  return (
    <li>
      <NavLink
        to={link}
        className={({ isActive }) =>
          clsx(
            "flex items-center space-x-2 justify-center sm:justify-start p-1 lg:px-3 lg:py-2 rounded-full hover:bg-gray-100 hover:text-orange-500 transition-colors text-gray-700",
            isActive
              ? "bg-gray-100 text-orange-500 font-semibold"
              : "",
          )
        }
      >
        <Icon />
        <span className="text-sm lg:text-base">{label}</span>
      </NavLink>
    </li>
  );
};

export default NavItem;
