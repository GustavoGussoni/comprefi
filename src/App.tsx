import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import PageTransition from "./components/PageTransition";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import Captura from "./pages/Captura";
import Economia from "./pages/Economia";
import Agradecimento from "./pages/Agradecimento";

// Componente para detectar mudanças de rota e rolar para o topo
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideHeaderRoutes = ["/economia", "/teste-infalivel", "/agradecimento"];
  const shouldHideHeader =
    hideHeaderRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/produto/");

  return (
    <div className="app bg-black text-white min-h-screen flex flex-col">
      {!shouldHideHeader && <Header />}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

function App() {
  const isMobile = window.innerWidth <= 768;

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home isMobile={isMobile} />
              </PageTransition>
            }
          />

          {/* Rotas de categoria — todas usam CategoryPage genérica */}
          <Route
            path="/iphones-novos"
            element={
              <PageTransition>
                <CategoryPage />
              </PageTransition>
            }
          />
          <Route
            path="/iphones-seminovos"
            element={
              <PageTransition>
                <CategoryPage />
              </PageTransition>
            }
          />
          <Route
            path="/macbooks"
            element={
              <PageTransition>
                <CategoryPage />
              </PageTransition>
            }
          />
          <Route
            path="/ipads"
            element={
              <PageTransition>
                <CategoryPage />
              </PageTransition>
            }
          />
          <Route
            path="/apple-watch"
            element={
              <PageTransition>
                <CategoryPage />
              </PageTransition>
            }
          />
          <Route
            path="/acessorios"
            element={
              <PageTransition>
                <CategoryPage />
              </PageTransition>
            }
          />

          {/* Rota de produto individual */}
          <Route
            path="/produto/:category/:id"
            element={
              <PageTransition>
                <ProductPage />
              </PageTransition>
            }
          />

          {/* Rotas especiais (funil, captura, etc.) */}
          <Route
            path="/teste-infalivel"
            element={
              <PageTransition>
                <Captura />
              </PageTransition>
            }
          />
          <Route
            path="/economia"
            element={
              <PageTransition>
                <Economia />
              </PageTransition>
            }
          />
          <Route
            path="/agradecimento"
            element={
              <PageTransition>
                <Agradecimento />
              </PageTransition>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
