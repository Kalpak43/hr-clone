import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <main className="flex divide-x divide-gray-300 h-screen">
      <Sidebar />
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 h-full flex flex-col">
        <Header />
        <Hero />
      </div>
    </main>
  );
}

export default App;
