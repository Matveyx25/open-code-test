import { connect } from "react-redux";
import {Route, Routes} from "react-router-dom"
import { compose } from "redux";
import ManualsContainer from "./pages/Manuals/ManualsContainer";
import BankInfoContainer from './pages/BankInfo/BankInfoContainer';
import MessagesContainer from './pages/Messages/MessagesContainer';
import { Provider, teamsTheme } from "@fluentui/react-northstar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
			<ToastContainer/>
			<Provider theme={teamsTheme}>
							<div className="container">
								<Routes>
									<Route exact path='/' element={<h1>Home</h1>}/>
									<Route exact path='/manuals/:id' element={<ManualsContainer/>}/>
									<Route exact path='/bank-info' element={<BankInfoContainer/>}/>
									<Route exact path='/messages' element={<MessagesContainer/>}/>
									<Route path="*" element={<div className="error__not-found">404 NOT FOUND</div>} />
								</Routes>
							</div>
				</Provider>
      </div>
  );
}

export const AppContainer = compose(connect(null))(App)

