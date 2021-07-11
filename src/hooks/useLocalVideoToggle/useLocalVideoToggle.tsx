import { LocalVideoTrack, VideoProcessor } from 'twilio-video';
import { useCallback, useState } from 'react';
import useVideoContext from '../useVideoContext/useVideoContext';


export default function useLocalVideoToggle() {
    const { room, localTracks, getLocalVideoTrack, removeLocalVideoTrack, onError } = useVideoContext();
    const localParticipant = room?.localParticipant;
    const videoTrack = localTracks.find(track => track.name.includes('camera')) as LocalVideoTrack;
    const [isPublishing, setIspublishing] = useState(false);

    const setProcessor = (processor: VideoProcessor, track: LocalVideoTrack) => {
        if (track.processor) {
            track.removeProcessor(track.processor);
        }
        if (processor) {
            track.addProcessor(processor);
        }
    };

    const toggleVideoEnabled = useCallback((processor?: VideoProcessor ) => {
        if (!isPublishing) {
            if (videoTrack) {
                const localTrackPublication = localParticipant?.unpublishTrack(videoTrack);
                localParticipant?.emit('trackUnpublished', localTrackPublication);
                removeLocalVideoTrack();
            } else {
                setIspublishing(true);
                getLocalVideoTrack()
                    .then((track: LocalVideoTrack) => {
                        if(processor){

                            setProcessor(processor, track);
                        }
                        localParticipant?.publishTrack(track, { priority: 'low' })
                    })
                    .catch(onError)
                    .finally(() => setIspublishing(false));
            }
        }
    }, [videoTrack, localParticipant, getLocalVideoTrack, isPublishing, onError, removeLocalVideoTrack]);

    return [!!videoTrack, toggleVideoEnabled] as const;
}
