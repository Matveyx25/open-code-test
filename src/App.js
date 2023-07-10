import { connect } from "react-redux";
import { Route, Routes} from "react-router-dom"
import { compose } from "redux";
import ManualsContainer from "./pages/Manuals/ManualsContainer";
import BankInfoContainer from './pages/BankInfo/BankInfoContainer';
import MessagesContainer from './pages/Messages/MessagesContainer';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { HomePage } from "./pages/Home/HomePage";
import BICPage from "./pages/Messages/BICPage";

function App() {
  return (
    <div>
			<ToastContainer/>
				<div className="container">
					<Routes>
						<Route path="/" element={<HomePage/>}/>
						<Route path="/bank-info" element={<BankInfoContainer/>}/>
						<Route path='/manuals/:id' element={<ManualsContainer/>}/>
						<Route path='/messages/' element={<MessagesContainer/>}/>
						<Route path='/messages/:id' element={<BICPage/>}/>
						<Route path="*" element={<div className="error__not-found">404 NOT FOUND</div>} />
					</Routes>
				</div>
      </div>
  );
}

export const AppContainer = compose(connect(null))(App)

