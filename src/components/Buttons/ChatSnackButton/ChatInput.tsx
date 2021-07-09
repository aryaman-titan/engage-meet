import React, { useState } from 'react';
import { Button, FormControl, TextField } from '@material-ui/core';
import { useSnackbar, VariantType } from 'notistack';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import { Twemoji } from "react-emoji-render";
import SendMessageIcon from '../../../icons/SendMessageIcon';


export const getRandomVariant = (): VariantType => {
    let list = ['success', 'error', 'info', 'warning'];
    return list[Math.floor(Math.random() * list.length)] as VariantType
}

export default function ChatInput() {
    const [message, setMessage] = useState('');
    const { room } = useVideoContext();
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (message) {
            // Get the LocalDataTrack that we published to the room.
            const [localDataTrackPublication] = [...room!.localParticipant.dataTracks.values()];

            // Construct a message to send
            const fullMessage = `${room!.localParticipant.identity} says: ${message}`;

            // Send the message
            localDataTrackPublication.track.send(fullMessage);

            // Render the message locally so the local participant can see that their message was sent.
            enqueueSnackbar(
                <Twemoji
                    svg
                    onlyEmojiClassName="make-emojis-large"
                    text={fullMessage}
                />, {
                preventDuplicate: true,
                variant: getRandomVariant()
            });

            //Reset the text field
            setMessage('');
        }
    };

    return (
        <form autoComplete="off" style={{ display: 'flex', alignItems: 'center' }} onSubmit={handleSubmit}>
            <FormControl>
                <label htmlFor="chat-snack-input" style={{ color: 'black' }}>
                    Say something!
                </label>
                <TextField value={message} autoFocus={true} onChange={handleChange} id="chat-snack-input" size="small" />
            </FormControl>
            <Button type="submit" color="primary" variant="contained" style={{ marginLeft: '0.8em' }}>
                <SendMessageIcon />
            </Button>
        </form>
    );
}