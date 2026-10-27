import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LazyMotion, domMax, MotionConfig, AnimatePresence, motion } from 'motion/react';
import Navbar from './components/common/nav-bar/Navbar';
import Home from './pages/Home';
import Loader from './components/common/loader/Loader.jsx';
import GlobalParticles from './components/common/particles/GlobalParticles';
import GlobalGrid from './components/common/grid/GlobalGrid';
import { useLoading } from './hooks/useLoading';
import { AppReadyContext } from './context/AppReadyContext';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';
import ProjectCaseStudy from './pages/ProjectCaseStudy';
import NotFound from './pages/NotFound';
import { EASE } from './utils/motionVariants';
import RouteEffects from './components/common/RouteEffects';

function App() {
    const isLoading = useLoading();

    useEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
    }, []);

    return (
        <ThemeProvider>
        <LazyMotion features={domMax} strict>
            <MotionConfig reducedMotion="user" transition={{duration: 0.24, ease: EASE}}>
                <Router>
                    <div className="App">
                        <GlobalGrid />
                        <GlobalParticles />
                        <AnimatePresence>
                            {isLoading && <Loader />}
                        </AnimatePresence>

                        <AppReadyContext.Provider value={!isLoading}>
                        <RouteEffects />
                        <motion.main
                            className={`app-content ${isLoading ? 'is-loading' : 'is-ready'}`}
                            initial={false}
                            animate={isLoading ? {opacity: 0} : {opacity: 1}}
                            transition={{duration: 0.24, ease: 'easeOut'}}
                        >
                            <Navbar />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/proyectos/:slug" element={<ProjectCaseStudy />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </motion.main>
                    </AppReadyContext.Provider>
                    </div>
                </Router>
            </MotionConfig>
        </LazyMotion>
        </ThemeProvider>
    );
}

export default App;
