import { Track, VideoBandwidthProfileOptions } from 'twilio-video';

export interface Settings {
  trackSwitchOffMode: VideoBandwidthProfileOptions['trackSwitchOffMode'];
  dominantSpeakerPriority?: Track.Priority;
  bandwidthProfileMode: VideoBandwidthProfileOptions['mode'];
  maxAudioBitrate: string;
  contentPreferencesMode?: 'auto' | 'manual';
  clientTrackSwitchOffControl?: 'auto' | 'manual';
}

type SettingsKeys = keyof Settings;

export interface SettingsAction {
  name: SettingsKeys;
  value: string;
}

export const initialSettings: Settings = {
  trackSwitchOffMode: undefined,
  dominantSpeakerPriority: 'standard',
  bandwidthProfileMode: 'collaboration',
  maxAudioBitrate: '16000',
  contentPreferencesMode: 'auto',
  clientTrackSwitchOffControl: 'auto',
};

export const inputLabels = (() => {
  const target: any = {};
  for (const setting in initialSettings) {
    target[setting] = setting as SettingsKeys;
  }
  return target as { [key in SettingsKeys]: string };
})();

export function settingsReducer(state: Settings, action: SettingsAction) {
  return {
    ...state,
    [action.name]: action.value === 'default' ? undefined : action.value,
  };
}
