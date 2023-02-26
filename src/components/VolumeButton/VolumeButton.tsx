import { VolumeUp, VolumeOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import RxPlayer from 'rx-player';
interface VolumeButtonProperties {
  player: RxPlayer;
}

const VolumeButton = (props: VolumeButtonProperties): JSX.Element => {
  const { player } = props;
  const [isVolumeOn, setIsVolumeOn] = useState(true);

  return (
    <>
      <IconButton
        onClick={() => {
          player.isMute() ? player.unMute() : player.mute();
          setIsVolumeOn((old) => !old);
          console.log('click on Volume button');
        }}
      >
        {isVolumeOn ? (
          <VolumeUp style={{ color: '#ddd' }} />
        ) : (
          <VolumeOff style={{ color: '#ddd' }} />
        )}
      </IconButton>
    </>
  );
};
export default VolumeButton;
