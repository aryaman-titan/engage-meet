import React, { ChangeEvent, FormEvent } from 'react';
import { Typography, makeStyles, TextField, Grid, Button, InputLabel, Theme } from '@material-ui/core';
import { useAppState } from '../../../state';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme: Theme) => ({
    gutterBottom: {
        marginBottom: '1em',
    },
    inputContainer: {
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '1.5em 0 3.5em',
        '& div:not(:last-child)': {
            marginRight: '1em',
        },
        [theme.breakpoints.down('sm')]: {
            margin: '1.5em 0 2em',
        },
    },
    textFieldContainer: {
        width: '100%',
    },
    continueButton: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
}));

interface RoomNameScreenProps {
    name: string;
    roomName: string;
    setName: (name: string) => void;
    setRoomName: (roomName: string) => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function RoomNameScreen({ name, roomName, setName, setRoomName, handleSubmit }: RoomNameScreenProps) {
    const classes = useStyles();
    const { user } = useAppState();

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRoomName(event.target.value);
    };

    const hasUsername = !window.location.search.includes('customIdentity=true') && user?.displayName;

    return (
        <>
            <Typography variant="h5" className={classes.gutterBottom}>
                Join a Room
      </Typography>
            <form onSubmit={handleSubmit}>
                <div className={classes.inputContainer}>
                    {!hasUsername && (
                        <div className={classes.textFieldContainer}>
                            <InputLabel shrink htmlFor="input-user-name">
                                Your Name
              </InputLabel>
                            <TextField
                                id="input-user-name"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                    )}
                    <div className={classes.textFieldContainer}>
                        <InputLabel shrink htmlFor="input-room-name">
                            Room Name
            </InputLabel>
                        <TextField
                            autoCapitalize="false"
                            id="input-room-name"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={roomName}
                            onChange={handleRoomNameChange}
                        />
                    </div>
                </div>
                <Grid container justify="center">
                    <Button
                        type="submit"
                        disabled={!name || !roomName}
                    >
                        <Fab color="primary" aria-label="add">
                            <ArrowForwardIcon />
                        </Fab>
                    </Button>
                </Grid>
            </form>
        </>
    );
}
