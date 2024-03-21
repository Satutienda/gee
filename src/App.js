
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ContenedorReservas from "./Components/ContenedorReservas/ContenedorReservas";





function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<ContenedorReservas />} />
          <Route path="/seccion/:seccion?" element={<ContenedorReservas />} />
          <Route path="*" element={<h1>404 Not found</h1>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
