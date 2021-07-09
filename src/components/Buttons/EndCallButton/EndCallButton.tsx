import React from 'react';
import clsx from 'clsx';

import { Button } from '@material-ui/core';
import CallRoundedIcon from '@material-ui/icons/CallRounded';

import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

export default function EndCallButton(props: { className?: string }) {
    const { room } = useVideoContext();

    return (
        <Button 
            onClick={() => room!.disconnect()}
            className={clsx(props.className)}
            style={{backgroundColor:'red', color: 'white'}}
        >
            <CallRoundedIcon />
        </Button>
    );
}
