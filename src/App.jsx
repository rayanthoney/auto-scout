import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import DetailsPage from './pages/DetailsPage';
import ComparisonPage from './pages/ComparisonPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<ResultsPage />} />
            <Route path="listing/:id" element={<DetailsPage />} />
            <Route path="compare" element={<ComparisonPage />} />
            <Route
              path="*"
              element={
                <div className="text-center mt-10">
                  <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
                </div>
              }
            />
          </Route>
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;
