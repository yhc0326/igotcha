import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'typeface-roboto';
import CircularProgress from '@material-ui/core/CircularProgress';

const drawerWidth = 240;
const sm = 600;

const GameSessions = lazy(() => import("./page/GameSessions"));
const RatingsChart = lazy(() => import("./page/RatingsChart"));
const GameReviews = lazy(() => import("./page/GameReviews"));
const Signin = lazy(() => import("./page/Signin"));

const styles = {
  suspense: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  body: {
    marginTop: "50px",
    flexGrow: 1
  }
}

class App extends Component {
  state = {
      width: window.innerWidth,
  }

  componentWillMount() {
      window.addEventListener('resize', this.handleWindowSizeChange);
  }
  
  componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
      this.setState({ width: window.innerWidth });
  };

  render() {
     return (
        <BrowserRouter basename="/">
           <Switch>
             <Route exact path="/" render={() => (
              <Suspense fallback={<div style={styles.suspense}>
                  <CircularProgress disableShrink /></div>}>
                  <GameSessions styles={{...styles.body, marginLeft: this.state.width<=sm?0:drawerWidth}}/>
              </Suspense>
             )}/>
             <Route path="/ratings" render={() => (
              <Suspense fallback={<div style={styles.suspense}>
                  <CircularProgress disableShrink /></div>}>
                  <RatingsChart styles={{...styles.body, marginLeft: this.state.width<=sm?0:drawerWidth}}/>
              </Suspense>
             )}/>
             <Route path="/game-reviews" render={() => (
              <Suspense fallback={<div style={styles.suspense}>
                  <CircularProgress disableShrink /></div>}>
                  <GameReviews styles={{...styles.body, marginLeft: this.state.width<=sm?0:drawerWidth}}/>
              </Suspense>
             )}/>
             <Route path="/login" render={() => (
              <Suspense fallback={<div style={styles.suspense}>
                  <CircularProgress disableShrink /></div>}>
                  <Signin styles={{...styles.body, marginLeft: this.state.width<=sm?0:drawerWidth}}/>
              </Suspense>
             )}/>
           </Switch>
        </BrowserRouter>
     );
  }
}

export default App;
