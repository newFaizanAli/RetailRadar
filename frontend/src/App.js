import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";
import HuntingPage from "./pages/Hunting";
import MainLayout from "./layout/MainLayout";
import HuntProducts from "./pages/HuntProducts";
import ProductRecomand from "./pages/ProductRecomand";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/hunting" element={<HuntingPage />} />
          <Route path="/hunting/products" element={<HuntProducts />} />
          <Route path="/hunting/products/recomand" element={<ProductRecomand />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
