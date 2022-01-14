import { Goods } from "./components/Goods/Goods";
import { DataState } from "./context/data/dataState";

function App() {
  return (
    <DataState>
      <Goods />
    </DataState>
    
  );
}

export default App;
