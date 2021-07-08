import React from 'react';
import ReactDOM from 'react-dom';

import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import App from './App';
import AppStateProvider, { useAppState } from './state';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import ErrorDialog from './components/ErrorDialog/ErrorDialog';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import theme from './theme';
import './types';
import { ChatProvider } from './components/ChatProvider';
import { VideoProvider } from './components/VideoProvider';
import { SnackbarProvider } from 'notistack';
import useConnectionOptions from './utils/useConnectionOptions/useConnectionOptions';
import UnsupportedBrowserWarning from './components/UnsupportedBrowserWarning/UnsupportedBrowserWarning';

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
        <SnackbarProvider
            maxSnack={8}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            autoHideDuration={10000}
            variant="info"
        >
            <UnsupportedBrowserWarning>
                <Router>
                    <AppStateProvider>
                        <Switch>
                            <PrivateRoute exact path="/">
                                <VideoApp />
                            </PrivateRoute>
                            <PrivateRoute path="/room/:URLRoomName">
                                <VideoApp />
                            </PrivateRoute>
                            <Redirect to="/" />
                        </Switch>
                    </AppStateProvider>
                </Router>
            </UnsupportedBrowserWarning>
        </SnackbarProvider>
    </MuiThemeProvider>,
    document.getElementById('root')
);
