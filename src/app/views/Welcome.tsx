import { Route, Switch } from "react-router";

const Welcome: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/dashboard">
          <h1>dashboard</h1>
        </Route>
        <Route exact path="/subscribe">
          <h1>subscribe</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default Welcome;
