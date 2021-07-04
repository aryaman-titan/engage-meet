import { ConnectOptions } from 'twilio-video';
import { isMobile, removeUndefineds } from '..';
import { useAppState } from '../../state';

export default function useConnectionOptions() {
  const { roomType, settings } = useAppState();

  const connectionOptions: ConnectOptions = {
   
    bandwidthProfile: {
      video: {
        mode: settings.bandwidthProfileMode,
        dominantSpeakerPriority: settings.dominantSpeakerPriority,
        trackSwitchOffMode: settings.trackSwitchOffMode,
        contentPreferencesMode: settings.contentPreferencesMode,
        clientTrackSwitchOffControl: settings.clientTrackSwitchOffControl,
      },
    },
    dominantSpeaker: true,
    networkQuality: { local: 1, remote: 1 },
    preferredVideoCodecs: [{ codec: 'VP8', simulcast: roomType !== 'peer-to-peer' && roomType !== 'go' }],
  };

  // For mobile browsers, limit the maximum incoming video bitrate to 2.5 Mbps.
  if (isMobile && connectionOptions?.bandwidthProfile?.video) {
    connectionOptions!.bandwidthProfile!.video!.maxSubscriptionBitrate = 2500000;
  }

  if (process.env.REACT_APP_TWILIO_ENVIRONMENT === 'dev') {
    //@ts-ignore - Internal use only. This property is not exposed in type definitions.
    connectionOptions!.wsServer = 'wss://us2.vss.dev.twilio.com/signaling';
  }

  // Here we remove any 'undefined' values. The twilio-video SDK will only use defaults
  // when no value is passed for an option. It will throw an error when 'undefined' is passed.
  return removeUndefineds(connectionOptions);
}
