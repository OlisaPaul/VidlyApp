import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import Customers from "./components/customers";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoutes";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;

    return (
      <div>
        <ToastContainer />
        <NavBar user={user} />
        <Switch>
          <Redirect from="/" exact to="/movies" />
          <Route path="/notfound" component={NotFound} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/customers" component={Customers} />
          <Route
            path="/movies"
            exact
            render={(props) => <Movies {...props} user={user} />}
          />
          <ProtectedRoute path={`/movies/:id`} component={MovieForm} />

          <Redirect to="/notfound" />
        </Switch>
      </div>
    );
  }
}

export default App;
