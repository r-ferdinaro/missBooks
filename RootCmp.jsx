const { Routes, Route, HashRouter: Router } = ReactRouterDOM;

import { AppHeader } from "./cmps/AppHeader.jsx";
import { Home } from "./pages/Home.jsx";
import { About } from "./pages/About.jsx";
import { BookIndex } from "./pages/BookIndex.jsx";

export function RootCmp() {
  // const [page, setPage] = useState("BookIndex");

  return (
    <Router>
      <section className="app main-layout">
        <AppHeader />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<BookIndex />} />
          </Routes>
        </main>
      </section>
    </Router>
  );
}
