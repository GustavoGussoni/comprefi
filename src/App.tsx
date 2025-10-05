import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import PageTransition from "./components/PageTransition";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import IphonesNovos from "./pages/IphonesNovos";
import IphonesSeminovos from "./pages/IphonesSeminovos";
import Macbooks from "./pages/Macbooks";
import Ipads from "./pages/Ipads";
import AppleWatch from "./pages/AppleWatch";
import Acessorios from "./pages/Acessorios";
import ProductPage from "./pages/ProductPage";
import Captura from "./pages/Captura";
import Economia from "./pages/Economia";
import Agradecimento from "./pages/Agradecimento";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import TradeFunnel from "./pages/TradeFunnel";
import CalculationPage from "./pages/CalculationPage";
import ResultPage from "./pages/ResultPage";

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
  const hideHeaderRoutes = [
    "/economia",
    "/teste-infalivel",
    "/agradecimento",
    "/admin",
    "/trocar-de-iphone",
    "/calculo-troca",
    "/resultado-troca",
  ];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <div className="app bg-black text-white min-h-screen flex flex-col">
      {!shouldHideHeader && <Header />}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
// ... (imports e outros componentes permanecem os mesmos)

function App() {
  const isMobile = window.innerWidth <= 768;

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Rota da Home e Admin (sem alterações) */}
          <Route
            path="/"
            element={
              <PageTransition>
                <Home isMobile={isMobile} />
              </PageTransition>
            }
          />
          <Route
            path="/admin"
            element={
              <PageTransition>
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              </PageTransition>
            }
          />

          {/* --- INÍCIO DAS ROTAS DO FUNIL (ALTERAÇÃO AQUI) --- */}
          {/* Removido o PageTransition para um fluxo mais rápido e direto */}
          <Route path="/trocar-de-iphone" element={<TradeFunnel />} />
          <Route path="/calculo-troca" element={<CalculationPage />} />
          <Route path="/resultado-troca" element={<ResultPage />} />
          {/* --- FIM DAS ROTAS DO FUNIL --- */}

          {/* Outras rotas do site (mantêm a transição) */}
          <Route
            path="/iphones-novos"
            element={
              <PageTransition>
                <IphonesNovos />
              </PageTransition>
            }
          />
          {/* ... (restante das rotas sem alteração) ... */}
          <Route
            path="/iphones-seminovos"
            element={
              <PageTransition>
                <IphonesSeminovos />
              </PageTransition>
            }
          />
          <Route
            path="/macbooks"
            element={
              <PageTransition>
                <Macbooks />
              </PageTransition>
            }
          />
          <Route
            path="/ipads"
            element={
              <PageTransition>
                <Ipads />
              </PageTransition>
            }
          />
          <Route
            path="/apple-watch"
            element={
              <PageTransition>
                <AppleWatch />
              </PageTransition>
            }
          />
          <Route
            path="/acessorios"
            element={
              <PageTransition>
                <Acessorios />
              </PageTransition>
            }
          />
          <Route
            path="/produto/:category/:id"
            element={
              <PageTransition>
                <ProductPage />
              </PageTransition>
            }
          />
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
