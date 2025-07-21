import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";
import FoodsPage from "./pages/foods/FoodsPage";
import FoodLayout from "./layouts/FoodLayout";
import FoodDetailPage from "./pages/foods/FoodDetailPage";
import CreateOrderPage from "./pages/orders/CreateOrderPage";
import MyOrderPage from "./pages/orders/MyOrderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route element={<FoodLayout />}>
            <Route index element={<FoodsPage />} />
            <Route path="/foods/:foodId" element={<FoodDetailPage />} />
          </Route>
          <Route path="orders">
            <Route index element={<MyOrderPage />} />
            <Route path="add" element={<CreateOrderPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
