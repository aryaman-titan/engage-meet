import React from 'react';
import clsx from 'clsx';

import { Button } from '@material-ui/core';
import CallRoundedIcon from '@material-ui/icons/CallRounded';

import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import Tooltip from '@material-ui/core/Tooltip';

export default function EndCallButton(props: { className?: string }) {
    const { room, updateBackgroundSettings } = useVideoContext();

    const handleDisconnect = () => {
        updateBackgroundSettings({ type: 'none', index: 0 }, true);
        room!.disconnect();
    }
    return (
        <Tooltip title="Say bye bye!">
            <Button
                onClick={handleDisconnect}
                className={clsx(props.className)}
                style={{ backgroundColor: 'red', color: 'white' }}
            >
                <CallRoundedIcon />
            </Button>
        </Tooltip>
    );
}

