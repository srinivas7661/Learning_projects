import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./components/homePage";
import projectDetails from "./components/projectDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/projectDetails/:id" component={projectDetails} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
