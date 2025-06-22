import Header from "./components/Header";
import FoodMain from "./components/FoodMain";
import CartSidebar from "./components/CartSidebar";

function App() {
  return (
    <main className="bg-gray-200 min-h-screen p-5 flex flex-col">
      <Header />
      
      {/* Perubahan: Container utama menggunakan flex-grow dan min-h-0 */}
      <div className="flex gap-6 flex-grow min-h-0">
        {/* Main Content */}
        <div className="flex-1 mt-6 min-h-0">
          <FoodMain />
        </div>

        {/* Cart Sidebar - Tambahkan self-start untuk alignment */}
        <div className="self-start">
          <CartSidebar />
        </div>
      </div>
    </main>
  );
}

export default App;