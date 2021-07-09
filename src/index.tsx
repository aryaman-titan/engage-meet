import React from 'react';
import ReactDOM from 'react-dom';

import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';

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

const styles = makeStyles(() => ({
    success: { backgroundColor: '#43a047' },
    error: { backgroundColor: '#d32f2f' },
    warning: { backgroundColor: '#ffa000' },
    info: { backgroundColor: '#2979ff' }
}));

const VideoApp = () => {
    const { error, setError } = useAppState();
    const connectionOptions = useConnectionOptions();

    const classes = styles();

    return (
        <SnackbarProvider
            hideIconVariant
            maxSnack={4}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            autoHideDuration={10000}
            classes={{
                variantSuccess: classes.success,
                variantError: classes.error,
                variantWarning: classes.warning,
                variantInfo: classes.info,
            }}
        >
            <VideoProvider options={connectionOptions} onError={setError}>
                <ErrorDialog dismissError={() => setError(null)} error={error} />
                <ChatProvider>
                    <App />
                </ChatProvider>
            </VideoProvider>
        </SnackbarProvider>
    );
};

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
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
    </MuiThemeProvider>,
    document.getElementById('root')
);
