import React from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import VideoLogo from './VideoLogo';
import './stars.css';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme: Theme) => ({
    background: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgb(85, 43, 106)',
        height: '100%',
    },
    container: {
        position: 'relative',
        flex: '1',
    },
    innerContainer: {
        display: 'flex',
        width: '888px',
        height: '379px',
        borderRadius: '38px',
        boxShadow: '0px 2px 4px 0px rgba(40, 42, 43, 0.3)',
        overflow: 'hidden',
        position: 'relative',
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            height: 'auto',
            width: 'calc(100% - 40px)',
            margin: 'auto',
            maxWidth: '400px',
        },
    },
    swooshContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        background: 'rgba(0, 0, 0, 0.4)',
        width: '296px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '100px',
            backgroundPositionY: '140px',
        },
    },
    logoContainer: {
        position: 'absolute',
        width: '210px',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            alignItems: 'center',
            width: '90%',
            textAlign: 'initial',
            '& svg': {
                height: '64px',
            },
        },
    },
    content: {
        background: 'white',
        width: '100%',
        padding: '4em',
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            padding: '2em',
        },
    },
    title: {
        color: 'white',
        margin: '1em 0 0',
        [theme.breakpoints.down('sm')]: {
            margin: 0,
            fontSize: '1.1rem',
        },
    },
}));

interface IntroContainerProps {
    children: React.ReactNode;
}

const IntroContainer = (props: IntroContainerProps) => {
    const classes = useStyles();

    return (
        <div className={classes.background}>
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <Grid 
                container 
                direction="column"
                justify="center" 
                alignItems="center"
                spacing={10}
            >
                <div className={classes.container}>
                    <div className={classes.innerContainer}>
                        <div className={classes.swooshContainer}>
                            <div className={classes.logoContainer}>
                                <VideoLogo />
                                <Typography variant="h4" className={classes.title}>
                                    Engage Meet
                            </Typography>
                            </div>
                        </div>
                        <div className={classes.content}>{props.children}</div>
                    </div>
                </div>
                <Grid item style={{marginTop: '4em'}}>
                    <Typography variant="h5" className={classes.title}>
                        Made with  ❤️  by &nbsp;
                        <a 
                            href="https://github.com/aryaman-titan" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={classes.title}>
                             Aryaman
                        </a>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default IntroContainer;
