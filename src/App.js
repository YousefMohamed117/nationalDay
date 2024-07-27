import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormPage from './pages/FormPage';
import Home from './pages/Home'; // Assuming you create this page

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/display" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
