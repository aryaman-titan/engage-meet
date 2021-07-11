import { Room } from 'twilio-video';
import { useCallback, useState } from 'react';
import { GaussianBlurBackgroundProcessor, VirtualBackgroundProcessor } from '@twilio/video-processors';

import SanFranciscoThumb from '../../../images/thumb/SanFrancisco.jpg';

import { Thumbnail } from '../../BackgroundSelectionDialog/BackgroundThumbnail/BackgroundThumbnail';

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

const bgLibSettings = {
    assetsPath: '/virtualbackground',
};

const BG_SETTINGS_KEY = 'bgsettings5';

let blurProcessor: GaussianBlurBackgroundProcessor;
let virtualBackgroundProcessor: VirtualBackgroundProcessor;

export default function useBackgroundSettings(room: Room | undefined | null) {

    //store the background settings in LocalStorage
    let currentSettings: BackgroundSettings;
    const localStorageSetting = window.localStorage.getItem(BG_SETTINGS_KEY);
    currentSettings = localStorageSetting ? JSON.parse(localStorageSetting!) : { type: 'none', index: 0 };

    const [backgroundSettings, setBackgroundSettings] = useState<BackgroundSettings>(currentSettings);

    const updateSettings = (settings: BackgroundSettings): void => {
        setBackgroundSettings(settings);
        window.localStorage.setItem(BG_SETTINGS_KEY, JSON.stringify(settings));
    };

    const updateBackgroundSettings = useCallback(
        async (settings: BackgroundSettings, reset?: boolean, force?: boolean, newRoom?: Room) => {
            // reset, used for resetting background settings when camera is off/no video tracks
            let currentRoom = room;
            if (reset) {
                updateSettings({ type: 'none' });
                return;
            }
            currentRoom = currentRoom || newRoom;
            if (!currentRoom) {
                return;
            }

            const videoTrackValue = Array.from(currentRoom.localParticipant.videoTracks.values())[0];
            if (!videoTrackValue) {
                return;
            }
            const videoTrack = videoTrackValue.track;
            const { type } = settings;
            if (type !== backgroundSettings.type || force) {
                if (type === 'none' && videoTrack.processor) {
                    videoTrack.removeProcessor(videoTrack.processor);
                } else if (type === 'blur') {
                    if (!blurProcessor) {
                        blurProcessor = new GaussianBlurBackgroundProcessor({ ...bgLibSettings });
                        await blurProcessor.loadModel();
                    }
                    if (videoTrack.processor) {
                        videoTrack.removeProcessor(videoTrack.processor);
                    }
                    videoTrack.addProcessor(blurProcessor);
                } else {
                    let bgImage = new Image();
                    bgImage.src = SanFranciscoThumb;
                    virtualBackgroundProcessor = new VirtualBackgroundProcessor({ ...bgLibSettings, backgroundImage: bgImage })
                    await virtualBackgroundProcessor.loadModel();
                    if (videoTrack.processor) {
                        videoTrack.removeProcessor(videoTrack.processor);
                    }
                    videoTrack.addProcessor(virtualBackgroundProcessor);
                }
            }
            updateSettings(settings);
        },
        [backgroundSettings, room]
    );

    return [backgroundSettings, updateBackgroundSettings] as const;
}