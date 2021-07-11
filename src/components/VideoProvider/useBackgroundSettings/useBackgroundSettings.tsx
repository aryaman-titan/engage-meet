import { useState } from 'react';
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

// TODO : Add video processing logic after backgroundSettings change
// useEffect hooks, etc ...

export default function useBackgroundSettings() {
  const [backgroundSettings, setBackgroundSettings] = useState({
    type: 'none',
    index: 0,
  } as BackgroundSettings);
  return [backgroundSettings, setBackgroundSettings] as const;
}