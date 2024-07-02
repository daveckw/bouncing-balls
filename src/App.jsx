import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BouncingBalls from "./pages/BouncingBalls";
import Home from "./pages/Home";
import WhatsappBlast from "./pages/WhatsappBlast";

const App = () => {
    return (
        <Router>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/bouncing-balls">Bouncing Balls</Link>
                        </li>
                        <li>
                            <Link to="/whatsapp-blast">Whatsapp Blast</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bouncing-balls" element={<BouncingBalls />} />
                <Route path="/whatsapp-blast" element={<WhatsappBlast />} />
            </Routes>
        </Router>
    );
};

export default App;
