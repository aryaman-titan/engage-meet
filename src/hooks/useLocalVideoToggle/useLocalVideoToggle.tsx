import { LocalVideoTrack } from 'twilio-video';

import { useCallback, useState } from 'react';
import useVideoContext from '../useVideoContext/useVideoContext';


export default function useLocalVideoToggle() {
    const {
        room,
        localTracks,
        getLocalVideoTrack,
        removeLocalVideoTrack,
        onError,
        backgroundSettings,
        updateBackgroundSettings,
    } = useVideoContext();

    const localParticipant = room?.localParticipant;
    const videoTrack = localTracks.find(track => track.name.includes('camera')) as LocalVideoTrack;
    const [isPublishing, setIspublishing] = useState(false);

    const toggleVideoEnabled = useCallback(() => {
        if (!isPublishing) {
            if (videoTrack) {
                const localTrackPublication = localParticipant?.unpublishTrack(videoTrack);
                localParticipant?.emit('trackUnpublished', localTrackPublication);
                removeLocalVideoTrack();
            } else {
                setIspublishing(true);
                getLocalVideoTrack()
                    .then(async (track: LocalVideoTrack) => {
                        localParticipant?.publishTrack(track, { priority: 'low' })
                    })
                    .catch(onError)
                    .finally(() => {
                        updateBackgroundSettings(backgroundSettings, false, true);
                        setIspublishing(false);
                    });
            }
        }
    }, [videoTrack, 
        localParticipant, 
        getLocalVideoTrack, 
        isPublishing, 
        onError, 
        removeLocalVideoTrack, 
        backgroundSettings,
        updateBackgroundSettings,]);

    return [!!videoTrack, toggleVideoEnabled] as const;
}
