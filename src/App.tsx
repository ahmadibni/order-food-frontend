import Header from "./components/Header";
import FoodMain from "./components/FoodMain";

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
        <div className="w-80 bg-gray-100 mt-6 p-6 h-screen rounded-2xl overflow-y-auto">
          <h1 className="text-xl font-semibold mb-6">My Order</h1>
        </div>
      </div>
    </main>
  );
}

export default App;
