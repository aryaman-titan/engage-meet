import React, { useState, useRef } from 'react';
import AboutDialog from '../../AboutDialog/AboutDialog';
import BackgroundIcon from '../../../icons/BackgroundIcon';
import DeviceSelectionDialog from '../../DeviceSelectionDialog/DeviceSelectionDialog';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoIconOutlined from '../../../icons/InfoIconOutlined';
import MoreIcon from '@material-ui/icons/MoreVert';
import StartRecordingIcon from '../../../icons/StartRecordingIcon';
import StopRecordingIcon from '../../../icons/StopRecordingIcon';
import SettingsIcon from '../../../icons/SettingsIcon';
import { Button, styled, Theme, useMediaQuery, Menu as MenuContainer, MenuItem, Typography } from '@material-ui/core';
import { isSupported } from '@twilio/video-processors';

import { useAppState } from '../../../state';
import useIsRecording from '../../../hooks/useIsRecording/useIsRecording';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import useChatContext from '../../../hooks/useChatContext/useChatContext';
import useLocalVideoToggle from '../../../hooks/useLocalVideoToggle/useLocalVideoToggle';

export const IconContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  width: '1.5em',
  marginRight: '0.3em',
});

export default function Menu(props: { buttonClassName?: string }) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [aboutOpen, setAboutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { isFetching, updateRecordingRules, roomType } = useAppState();
  const [isVideoEnabled] = useLocalVideoToggle();
  const { room, setIsBackgroundSelectionOpen} = useVideoContext();
  const { setIsChatWindowOpen } = useChatContext();
  const isRecording = useIsRecording();

  const anchorRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        onClick={() => setMenuOpen(isOpen => !isOpen)}
        ref={anchorRef}
        className={props.buttonClassName}
      >
        {isMobile ? (
          <MoreIcon />
        ) : (
          <>
            More
            <ExpandMoreIcon />
          </>
        )}
      </Button>
      <MenuContainer
        open={menuOpen}
        onClose={() => setMenuOpen(isOpen => !isOpen)}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: isMobile ? -55 : 'bottom',
          horizontal: 'center',
        }}
      >
        {roomType !== 'peer-to-peer' && roomType !== 'go' && (
          <MenuItem
            disabled={isFetching}
            onClick={() => {
              setMenuOpen(false);
              if (isRecording) {
                updateRecordingRules(room!.sid, [{ type: 'exclude', all: true }]);
              } else {
                updateRecordingRules(room!.sid, [{ type: 'include', all: true }]);
              }
            }}
          >
            <IconContainer>{isRecording ? <StopRecordingIcon /> : <StartRecordingIcon />}</IconContainer>
            <Typography variant="body1">{isRecording ? 'Stop' : 'Start'} Recording</Typography>
          </MenuItem>
        )}

        <MenuItem onClick={() => setSettingsOpen(true)}>
          <IconContainer>
            <SettingsIcon />
          </IconContainer>
          <Typography variant="body1">Audio and Video Settings</Typography>
        </MenuItem>

        {isSupported && (
          <MenuItem
            onClick={() => {
              setIsBackgroundSelectionOpen(true);
              setIsChatWindowOpen(false);
              setMenuOpen(false);
            }}
            disabled={!isVideoEnabled}
          >
            <IconContainer>
              <BackgroundIcon />
            </IconContainer>
            <Typography variant="body1">Backgrounds</Typography>
          </MenuItem>
        )}

        <MenuItem onClick={() => setAboutOpen(true)}>
          <IconContainer>
            <InfoIconOutlined />
          </IconContainer>
          <Typography variant="body1">About</Typography>
        </MenuItem>
      </MenuContainer>
      <AboutDialog
        open={aboutOpen}
        onClose={() => {
          setAboutOpen(false);
          setMenuOpen(false);
        }}
      />
      <DeviceSelectionDialog
        open={settingsOpen}
        onClose={() => {
          setSettingsOpen(false);
          setMenuOpen(false);
        }}
      />
    </>
  );
}
