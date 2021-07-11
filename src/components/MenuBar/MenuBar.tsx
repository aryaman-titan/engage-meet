import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import EndCallButton from '../Buttons/EndCallButton/EndCallButton';
import { isMobile } from '../../utils';
import Menu from './Menu/Menu';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { Typography, Grid, Hidden } from '@material-ui/core';
import ToggleAudioButton from '../Buttons/ToggleAudioButton/ToggleAudioButton';
import ChatSnackButton from '../Buttons/ChatSnackButton/ChatSnackButton';
import ToggleChatButton from '../Buttons/ToggleChatButton/ToggleChatButton';
import ToggleVideoButton from '../Buttons/ToggleVideoButton/ToggleVideoButton';
import ToggleScreenShareButton from '../Buttons/ToogleScreenShareButton/ToggleScreenShareButton';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '../Snackbar/Snackbar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            backgroundColor: theme.palette.background.default,
            bottom: 0,
            left: 0,
            right: 0,
            height: `${theme.footerHeight}px`,
            position: 'fixed',
            display: 'flex',
            padding: '0 1.43em',
            zIndex: 10,
            [theme.breakpoints.down('sm')]: {
                height: `${theme.mobileFooterHeight}px`,
                padding: 0,
            },
        },
        screenShareBanner: {
            position: 'fixed',
            zIndex: 8,
            bottom: `${theme.footerHeight}px`,
            left: 0,
            right: 0,
            height: '104px',
            background: 'rgba(0, 0, 0, 0.5)',
            '& h6': {
                color: 'white',
            },
            '& button': {
                background: 'white',
                color: theme.brand,
                border: `2px solid ${theme.brand}`,
                margin: '0 2em',
                '&:hover': {
                    color: '#080808',
                    border: `2px solid #600101`,
                    background: '#080808',
                },
            },
        },
        hideMobile: {
            display: 'initial',
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
    })
);

export default function MenuBar() {
    const classes = useStyles();
    const { isSharingScreen, toggleScreenShare } = useVideoContext();
    const roomState = useRoomState();
    const isReconnecting = roomState === 'reconnecting';

    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
    }

    return (
        <>
            <Snackbar
                open={isCopied}
                headline="Message"
                message={"Meeting URL copied to clipboard"}
                variant="info"
                handleClose={() => setIsCopied(false)}
            />
            {isSharingScreen && (
                <Grid container justify="center" alignItems="center" className={classes.screenShareBanner}>
                    <Typography variant="h6">You are sharing your screen</Typography>
                    <Button onClick={() => toggleScreenShare()}>Stop Sharing</Button>
                </Grid>
            )}
            <footer className={classes.container}>
                <Grid container justify="space-around" alignItems="center">
                    <Hidden smDown>
                        <Grid style={{ flex: 1 }}>
                            <Typography variant="body1">
                                <Tooltip title="Copy to clipboard">
                                    <IconButton
                                        aria-label="delete"
                                        onClick={copyToClipboard}>
                                        <ShareIcon color="primary" />
                                    </IconButton>
                                </Tooltip>
                                Share this Meeting!
                            </Typography>
                        </Grid>
                    </Hidden>
                    <Grid item>
                        <Grid container justify="center">
                            <ToggleAudioButton disabled={isReconnecting} />
                            <ToggleVideoButton disabled={isReconnecting} />
                            {!isSharingScreen && !isMobile && <ToggleScreenShareButton disabled={isReconnecting} />}
                            <ChatSnackButton />
                            <ToggleChatButton />
                            <Menu />
                        </Grid>
                    </Grid>
                    <Hidden smDown>
                        <Grid style={{ flex: 1 }}>
                            <Grid container justify="flex-end">
                                <EndCallButton />
                            </Grid>
                        </Grid>
                    </Hidden>
                </Grid>
            </footer>
        </>
    );
}
