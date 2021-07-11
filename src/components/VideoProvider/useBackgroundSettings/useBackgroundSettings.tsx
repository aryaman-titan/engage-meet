import { useEffect, useState } from 'react';

import SanFranciscoThumb from '../../../images/thumb/SanFrancisco.jpg';

import { Thumbnail } from '../../BackgroundSelectionDialog/BackgroundThumbnail/BackgroundThumbnail';

import { VirtualBackgroundProcessor } from '@twilio/video-processors';

import useLocalVideoToggle from "../../../hooks/useLocalVideoToggle/useLocalVideoToggle";
export interface BackgroundSettings {
    type: Thumbnail;
    index?: number;
}

const imageNames: string[] = [
    'San Francisco',
];

const images = [
    SanFranciscoThumb,
];

export const backgroundConfig = {
    imageNames,
    images,
};

// TODO : Add video processing logic after backgroundSettings change
// useEffect hooks, etc ...
const assetsPath = '/virtualbackground'

export default function useBackgroundSettings() {

    const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();

    const [backgroundSettings, setBackgroundSettings] = useState({
        type: 'none',
        index: 0,
    } as BackgroundSettings);

    useEffect(() => {
        if (backgroundSettings.type !== 'none') {
            const virtualBackgroundProcessor = new VirtualBackgroundProcessor({
                assetsPath,
                backgroundImage,
                fitType,
              });
        }
    }, [backgroundSettings])

    return [backgroundSettings, setBackgroundSettings] as const;
}