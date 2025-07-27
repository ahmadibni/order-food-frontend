import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./layouts/RootLayout";
import FoodsPage from "./pages/foods/FoodsPage";
import FoodLayout from "./layouts/FoodLayout";
import FoodDetailPage from "./pages/foods/FoodDetailPage";
import CreateOrderPage from "./pages/orders/CreateOrderPage";
import MyOrderPage from "./pages/orders/MyOrderPage";
import { getFoodById, getFoods } from "./services/foodService";
import DashboardLayout from "./layouts/DashboardLayout";

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
            loader: async () => await getFoods(),
          },
          {
            path: "foods/:foodId",
            element: <FoodDetailPage />,
            loader: async ({ params }) => {
              if (!params.foodId) throw new Error("Food ID is required");
              return await getFoodById(params.foodId);
            },
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
