import logo from './logo.svg';
import './App.css';
import Dictionary from './pages/Dictionary';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from "react-redux";
import dictionaryReducer from "./reducers/redusers";
import CheckWords from "./pages/CheckWords"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AddWord from './pages/AddWord';

const store = createStore(dictionaryReducer);
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route exact path="/dictionary" element={<Dictionary/>} />
            <Route exact path="/check-words" element={<CheckWords/>} />
            <Route exact path="/add-word" element={<AddWord/>} />

          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
