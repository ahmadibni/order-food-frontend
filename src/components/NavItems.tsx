import type { FC } from "react";

interface NavItemProps {
  icon: FC;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label }) => {
  return (
    <li>
      <a
        href="#"
        className="flex items-center sm:space-x-2 justify-center sm:justify-start p-1 lg:px-3 lg:py-2 rounded-full hover:bg-white hover:text-orange-500 transition-colors text-gray-700"
      >
        <Icon />
        <span className="text-sm lg:text-base">{label}</span>
      </a>
    </li>
  );
};

export default NavItem;
