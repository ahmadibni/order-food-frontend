import { Outlet } from "react-router";
import Header from "../components/Header";

const RootLayout = () => {
  return (
    <main className="bg-gray-100 min-h-screen p-4 sm:p-6 flex flex-col">
      <Header />
      <Outlet />
    </main>
  );
};

export default RootLayout;
