const { Routes, Route, HashRouter: Router } = ReactRouterDOM;

import { AppHeader } from "./cmps/AppHeader.jsx";
import { Home } from "./pages/Home.jsx";
import { About } from "./pages/About.jsx";
import { BookAdd } from "./pages/BookAdd.jsx";
import { BookDetails } from "./pages/BookDetails.jsx";
import { BookEdit } from "./pages/BookEdit.jsx";
import { BookIndex } from "./pages/BookIndex.jsx";

export function RootCmp() {
  return (
    <Router>
      <section className="app main-layout">
        <AppHeader />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<BookIndex />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/books/add/" element={<BookAdd />} />
            <Route path="/books/edit/" element={<BookEdit />} />
            <Route path="/books/edit/:id" element={<BookEdit />} />
          </Routes>
        </main>
      </section>
    </Router>
  );
}
