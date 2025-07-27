import { Outlet } from "react-router";
import Header from "../components/Header";
import { Toaster } from "sonner";

const RootLayout = () => {
  return (
    <main className="font-[manrope] bg-gray-100 min-h-screen p-4 sm:p-6 flex flex-col">
      <Header />
      <Outlet />
      <Toaster richColors position="top-center" />
    </main>
  );
};

export default RootLayout;
