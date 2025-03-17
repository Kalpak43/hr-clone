import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <main className="flex divide-x divide-gray-300 h-screen">
      <Sidebar />
      <div className="w-4/5 h-full flex flex-col">
        <Header />
        <Hero />
      </div>
    </main>
  );
}

export default App;
