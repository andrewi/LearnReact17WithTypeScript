import * as React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteComponentProps,
  Switch
} from "react-router-dom";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import AdminPage from "./AdminPage";
import Header from "./Header";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";
import ProductPage from "./ProductPage";
import ProductsPage from "./ProductsPage";

interface IState {
  loggedIn: boolean;
}

const RoutesWrap: React.SFC = () => {
  return (
    <Router>
      <Route component={Routes} />
    </Router>
  );
};

class Routes extends React.Component<RouteComponentProps, IState> {
  public constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      loggedIn: true
    };
  }
  public render() {
    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            timeout={500}
            classNames="animate"
          >
            <Switch>
              <Route exact={true} path="/">
                <Redirect to="/products" />
              </Route>
              <Route path="/products/:id" component={ProductPage} />
              <Route exact={true} path="/products" component={ProductsPage} />
              <Route path="/admin">
                {this.state.loggedIn ? <AdminPage /> : <Redirect to="/login" />}
              </Route>
              <Route path="/login" component={LoginPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default RoutesWrap;