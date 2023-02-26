import Pause from '@mui/icons-material/Pause';
import PlayArrow from '@mui/icons-material/PlayArrow';
import { IconButton } from '@mui/material';
import { useState } from 'react';

interface PlayButtonProperties {
  onPlay: () => void;
}

const PlayButton = (props: PlayButtonProperties): JSX.Element => {
  const [isPlayed, setIsPlayed] = useState(false);

  return (
    <IconButton
      onClick={() => {
        props.onPlay();
        setIsPlayed((old) => !old);
      }}
    >
      {isPlayed ? (
        <Pause style={{ color: '#ddd' }} />
      ) : (
        <PlayArrow style={{ color: '#ddd' }} />
      )}
    </IconButton>
  );
};

export default PlayButton;
