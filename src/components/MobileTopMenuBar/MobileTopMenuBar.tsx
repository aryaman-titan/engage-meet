import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import EndCallButton from '../Buttons/EndCallButton/EndCallButton';
import Menu from '../MenuBar/Menu/Menu';
import Snackbar from '../Snackbar/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ShareIcon from '@material-ui/icons/Share';


const useStyles = makeStyles((theme: Theme) => ({
    container: {
        background: 'white',
        paddingLeft: '1em',
        display: 'none',
        height: `${theme.mobileTopBarHeight}px`,
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
        },
    },
    endCallButton: {
        height: '28px',
        fontSize: '0.85rem',
        padding: '0 0.6em',
    },
    settingsButton: {
        [theme.breakpoints.down('sm')]: {
            height: '28px',
            minWidth: '28px',
            border: '1px solid rgb(136, 140, 142)',
            padding: 0,
            margin: '0 1em',
        },
    },
}));

export default function MobileTopMenuBar() {
    const classes = useStyles();

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
            <Grid container alignItems="center" justify="space-between" className={classes.container}>
                <Typography variant="subtitle1">
                    <Tooltip title="Copy to clipboard">
                        <IconButton
                            aria-label="delete"
                            onClick={copyToClipboard}>
                            <ShareIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                                Share this Meeting!
                </Typography>
                <div>
                    <EndCallButton className={classes.endCallButton} />
                    <Menu buttonClassName={classes.settingsButton} />
                </div>
            </Grid>
        </>
    );
}
