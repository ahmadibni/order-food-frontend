import CartSidebar from "@/components/CartSidebar";
import FloatButton from "@/components/FloatButton";

import { Outlet } from "react-router";

const FoodLayout = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-screen-xl mx-auto w-full relative">
      <div className="flex flex-col md:flex-row gap-6 flex-grow min-h-0">
        {/* Main Content */}
        <div className="flex-1 w-full md:w-2/3 mt-4 md:mt-6 min-h-0">
          <Outlet />
        </div>

        {/* Cart Sidebar */}
        <div className="w-full md:w-80 self-stretch">
          <CartSidebar />
        </div>
      </div>

      {/* Floating UI di bawah */}
      <FloatButton />
    </div>
  );
};

export default FoodLayout;
