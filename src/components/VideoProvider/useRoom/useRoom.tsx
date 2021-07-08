import { Callback } from '../../../types';
import { isMobile } from '../../../utils';
import Video, { ConnectOptions, LocalDataTrack, LocalTrack, Room } from 'twilio-video';
import { useCallback, useEffect, useRef, useState } from 'react';

// @ts-ignore
window.TwilioVideo = Video;

export default function useRoom(localTracks: LocalTrack[], onError: Callback, options?: ConnectOptions) {
    const [room, setRoom] = useState<Room | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const optionsRef = useRef(options);

    useEffect(() => {
        optionsRef.current = options;
    }, [options]);

    const connect = useCallback(
        token => {
            setIsConnecting(true);
            return Video.connect(token, { ...optionsRef.current, tracks: [...localTracks, 
                new LocalDataTrack()] }).then(
                newRoom => {
                    setRoom(newRoom);
                    const disconnect = () => newRoom.disconnect();

                    newRoom.setMaxListeners(15);

                    newRoom.once('disconnected', () => {
                        // Reset the room only after all other `disconnected` listeners have been called.
                        setTimeout(() => setRoom(null));
                        window.removeEventListener('beforeunload', disconnect);

                        if (isMobile) {
                            window.removeEventListener('pagehide', disconnect);
                        }
                    });

                    // @ts-ignore
                    window.twilioRoom = newRoom;

                    newRoom.localParticipant.videoTracks.forEach(publication =>
                        publication.setPriority('low')
                    );

                    setIsConnecting(false);

                    // Add a listener to disconnect from the room when a user closes their browser
                    window.addEventListener('beforeunload', disconnect);

                    if (isMobile) {
                        // Add a listener to disconnect from the room when a mobile user closes their browser
                        window.addEventListener('pagehide', disconnect);
                    }
                },
                error => {
                    onError(error);
                    setIsConnecting(false);
                }
            );
        },
        [localTracks, onError]
    );

    return { room, isConnecting, connect };
}
