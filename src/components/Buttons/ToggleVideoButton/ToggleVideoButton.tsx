import React, { useCallback, useRef } from 'react';

import Button from '@material-ui/core/Button';
import VideoOffIcon from '../../../icons/VideoOffIcon';
import VideoOnIcon from '../../../icons/VideoOnIcon';

import useDevices from '../../../hooks/useDevices/useDevices';
import useLocalVideoToggle from '../../../hooks/useLocalVideoToggle/useLocalVideoToggle';

import { useHotkeys } from 'react-hotkeys-hook';
import Tooltip from '@material-ui/core/Tooltip';

export default function ToggleVideoButton(props: { disabled?: boolean; className?: string }) {
    const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();
    const lastClickTimeRef = useRef(0);
    const { hasVideoInputDevices } = useDevices();
    const toggleVideoButtonRef = useRef<HTMLButtonElement>(null);

    const toggleVideo = useCallback(() => {
        // rate limiting the video toggle from client side as 
        // it turned out to be expensive in this case emitting 
        // series of signals
        if (Date.now() - lastClickTimeRef.current > 500) {
            lastClickTimeRef.current = Date.now();
            toggleVideoEnabled();
        }
    }, [toggleVideoEnabled]);

    useHotkeys('ctrl+e', (e) => {
        e.preventDefault();
        toggleVideoButtonRef.current?.click()
    });

    return (
        <Tooltip title="Toggle Video (Ctrl+E)">
            <Button
                className={props.className}
                onClick={toggleVideo}
                ref={toggleVideoButtonRef}
                disabled={!hasVideoInputDevices || props.disabled}
                startIcon={isVideoEnabled ? <VideoOnIcon /> : <VideoOffIcon />}
            >
                {!hasVideoInputDevices ? 'No Video' : isVideoEnabled ? 'Stop Video' : 'Start Video'}
            </Button>
        </Tooltip>
    );
}
