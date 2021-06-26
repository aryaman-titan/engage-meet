import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './types'
import theme from './theme'

import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import NotSupportedWarning from './components/NotSupportedWarning/NotSupportedWarning';

const VideoApp = () => {
    const { error, setError } = useAppState();
    const connectionOptions = useConnectionOptions();
  
    return (
      <VideoProvider options={connectionOptions} onError={setError}>
        <ErrorDialog dismissError={() => setError(null)} error={error} />
        <ChatProvider>
          <App />
        </ChatProvider>
      </VideoProvider>
    );
  };

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <NotSupportedWarning>
      <Router>
        <AppStateProvider>
          <Switch>
            <PrivateRoute exact path="/">
              <VideoApp />
            </PrivateRoute>
            <PrivateRoute path="/room/:URLRoomName">
              <VideoApp />
            </PrivateRoute>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Redirect to="/" />
          </Switch>
        </AppStateProvider>
      </Router>
    </NotSupportedWarning>
  </MuiThemeProvider>,
  document.getElementById('root')
);
