import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import MainPage from "./Sections/MainPage/MainPage";
import SnglePage from "./Sections/SinglePage/SnglePage";

function App() {
  const [isLight , setIsLight] = useState(true)
  return (
    <>
      <Header setIsLight={setIsLight} isLight={isLight} />

      <Routes>
      <Route path="/" element={<MainPage setIsLight={setIsLight} isLight={isLight} />} />
        <Route path="posts" element={<MainPage setIsLight={setIsLight} isLight={isLight} />} />
      <Route path="posts/:id/:name" element={<SnglePage setIsLight={setIsLight} isLight={isLight}  />} />
      </Routes>
    </>
  );
}

export default App;
