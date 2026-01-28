import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/nav-bar/Navbar';
import Home from './pages/Home';
import Loader from './components/common/loader/Loader.jsx';
import { useLoading } from './hooks/useLoading';
import './App.css';

function App() {
    const isLoading = useLoading();

    return (
        <Router>
            <div className="App">
                {isLoading && <Loader />}

                <div className={`app-content ${isLoading ? 'is-loading' : 'is-ready'}`}>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;