import Header from "./components/Header";
import FoodMain from "./components/FoodMain";
import CartSidebar from "./components/CartSidebar";

function App() {
  return (
    <main className="bg-gray-200 min-h-screen p-5">
      <Header />
      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1 mt-6">
          {/* Food Main */}
          <FoodMain />
        </div>

        {/* Cart Sidebar */}
        <CartSidebar />
      </div>
    </main>
  );
}

export default App;
