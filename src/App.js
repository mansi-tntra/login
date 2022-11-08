import logo from './logo.svg';
import './App.css';
import Login from "./Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {routeConfig} from "./routeConfig";
import {PrivateRoute} from "./privateRoute";
import loginPage from "./LoginPage";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<PrivateRoute/>}/>
            <Route path={routeConfig[0].path} element={routeConfig[0].component}/>
            <Route path={routeConfig[1].path} element={routeConfig[1].component}/>
            <Route path={routeConfig[2].path} element={routeConfig[2].component}/>
        </Routes>

    </BrowserRouter>




    </div>
  );
}

export default App;
