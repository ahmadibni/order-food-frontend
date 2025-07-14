import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";
import FoodsPage from "./pages/foods/FoodsPage";
import FoodLayout from "./layouts/FoodLayout";
import FoodDetailPage from "./pages/foods/FoodDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route element={<FoodLayout />}>
            <Route index element={<FoodsPage />} />
            <Route path="/foods/:foodId" element={<FoodDetailPage />} />
          </Route>
          <Route path="orders" element={<div>Orders Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
