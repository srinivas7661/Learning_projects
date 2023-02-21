import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./components/loginPage";
import Main from "./components/main";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/main" component={Main} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
