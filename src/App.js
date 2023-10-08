import Home from "./components/Home_testv2.0";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ErrorBoundary from "./components/error-boundary/ErrorBoundary";
import NavbarTest from "./components/navbar/Navbar_test";
import SearchParent from "./components/searchPage/SearchParent";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import NavbarStart from "./components/navbar/NavbarStart";
import { useState } from "react";

function App() {
  const [token, settoken] = useState("")


  const [storeData, setstoreData] = useState("");

  const getSearchedData = (data) => {
    console.log(data);
    setstoreData(data);
  };

  return (
    <Router>
      <div className="App">
        <ErrorBoundary>
          <Switch>
            <Route exact path="/">
              <NavbarStart />
              <Login settoken={settoken} />
            </Route>
            <Route exact path="/register">
              <NavbarStart />
              <Register />
            </Route>

            {token && (
              <Route exact path="/home">
                <NavbarTest getSearchedData={getSearchedData} />
                <Home />
              </Route>
            )}

            {token && (
              <Route exact path="/search">
                <NavbarTest getSearchedData={getSearchedData} />
                <SearchParent storeData={storeData} />
              </Route>
            )}

            <Route path="*" component={PageNotFound} />
          </Switch>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
