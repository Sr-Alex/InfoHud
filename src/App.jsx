import { BrowserRouter, Routes, Route } from "react-router-dom";

import MenuSuperior from "./layout/menuSuperior";
import LoginPage from "./pages/LoginPage/LoginPage";
import PostagensPage from "./pages/PostagensPage/PostagensPage";
import CriacaoPage from "./pages/CriacaoPage/CriacaoPage";

function App() {
  return (
    <BrowserRouter>
      <MenuSuperior />
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="postagens" element={<PostagensPage />} />
        <Route path="criarPost" element={<CriacaoPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
