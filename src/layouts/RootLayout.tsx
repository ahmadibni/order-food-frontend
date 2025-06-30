import { Outlet } from "react-router";
import Header from "../components/Header";

const RootLayout = () => {
  return (
    <main className="bg-gray-200 min-h-screen p-5 flex flex-col">
      <Header />
      <Outlet />
    </main>
  );
};

export default RootLayout;
