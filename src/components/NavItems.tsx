import type { FC } from "react";

interface NavItemProps {
  icon: FC; // Functional Component tanpa props
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label }) => {
  return (
    <li>
      <a
        href="#"
        className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-white hover:text-orange-500 transition-colors text-gray-700"
      >
        <Icon />
        <span>{label}</span>
      </a>
    </li>
  );
};

export default NavItem;
