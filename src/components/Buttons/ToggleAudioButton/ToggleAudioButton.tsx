import React from 'react';

import Button from '@material-ui/core/Button';
import MicIcon from '../../../icons/MicIcon';
import MicOffIcon from '../../../icons/MicOffIcon';

import useLocalAudioToggle from '../../../hooks/useLocalAudioToggle/useLocalAudioToggle';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

import { useHotkeys } from 'react-hotkeys-hook';

export default function ToggleAudioButton(props: { disabled?: boolean; className?: string }) {
    const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();
    const { localTracks } = useVideoContext();
    const hasAudioTrack = localTracks.some(track => track.kind === 'audio');

    useHotkeys('ctrl+d', toggleAudioEnabled);

    return (
        <Button
            className={props.className}
            onClick={toggleAudioEnabled}
            disabled={!hasAudioTrack || props.disabled}
            startIcon={isAudioEnabled ? <MicIcon /> : <MicOffIcon />}
        >
            {!hasAudioTrack ? 'No Audio' : isAudioEnabled ? 'Mute' : 'Unmute'}
        </Button>
    );
}
