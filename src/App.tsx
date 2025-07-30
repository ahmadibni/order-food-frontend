import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./layouts/RootLayout";
import FoodsPage from "./pages/foods/FoodsPage";
import FoodLayout from "./layouts/FoodLayout";
import FoodDetailPage from "./pages/foods/FoodDetailPage";
import CreateOrderPage from "./pages/orders/CreateOrderPage";
import MyOrderPage from "./pages/orders/MyOrderPage";
import DashboardLayout from "./layouts/DashboardLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <FoodLayout />,
        children: [
          {
            index: true,
            element: <FoodsPage />,
          },
          {
            path: "foods/:foodId",
            element: <FoodDetailPage />,
          },
        ],
      },
      // Path Order
      {
        path: "orders",
        children: [
          { index: true, element: <MyOrderPage /> },
          { path: "add", element: <CreateOrderPage /> },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
