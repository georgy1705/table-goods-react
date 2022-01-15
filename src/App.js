import { Route, Routes } from "react-router-dom";
import { Goods } from "./components/Goods/Goods";
import { Drawer } from "./components/Navigation/Drawer";
import { DataState } from "./context/data/dataState";
import "./App.css"

function App() {
  const routes = (
    <Routes>
        <Route path="/:id" element={<Goods />} />
        <Route path="/" exact element={<Goods />} />
     </Routes>
  )

  return (
    <div className="App">
      <DataState>
        <Drawer />
        {routes}
      </DataState>
    </div>
    
    
  );
}

export default App;
