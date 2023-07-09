import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppContainer } from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Provider as Fluent, teamsTheme } from "@fluentui/react-northstar";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
		<BrowserRouter>
			<Fluent theme={teamsTheme}>
				<Provider store={store}>
					<AppContainer/>
				</Provider>
			</Fluent>
		</BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
