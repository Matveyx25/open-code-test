import { Provider, connect } from "react-redux";
import {Route, Routes, BrowserRouter} from "react-router-dom"
import { compose } from "redux";
import { initStore } from "./store/store";

function App() {
  return (
    <div>
        <div className="container">
          <span className="breadcrumps-line"></span>
          <Routes>
            <Route path='/collections' element={<h1>Collections</h1>}/>
            <Route path='/themes/:themeId?' element={<h1>Theme Id</h1>}/>
            <Route exact path='/' element={<h1>Home</h1>}/>
            <Route path="*" element={<div className="error__not-found">404 NOT FOUND</div>} />
          </Routes>
        </div>
      </div>
  );
}

const AppContainer = compose(connect(null))(App)

export const MainApp = () => {
  return <BrowserRouter>
    <Provider store={initStore()}>
      <AppContainer/>
    </Provider>
  </BrowserRouter>
} 

