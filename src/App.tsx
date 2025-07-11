import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Main } from "./pages/Main/Main";
import { Favorites } from "./pages/Favorites/Favorites";
import { FilmPage } from "./pages/FilmPage/FilmPage";

export function App() {
  return (
    <div className="container">
      <Header />

      <div className="container-wrapper">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/film/:id" element={<FilmPage />} />
        </Routes>
      </div>

    </div>
  );
}