import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import About from "./pages/About";
import Store from "./pages/Store";
import { ShoppingBasketProvider } from "./context/ShoppingBasketContext";

function App() {
	return (
		<div className="App">
			<ShoppingBasketProvider>
				<Navbar />
				<Container>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/store" element={<Store />} />
					</Routes>
				</Container>
			</ShoppingBasketProvider>
		</div>
	);
}

export default App;
