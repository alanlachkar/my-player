import { Slider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import RxPlayer from 'rx-player';
import { IPositionUpdate } from 'rx-player/dist/_esm5.processed/public_types';

interface TimeBarProperties {
  duration: number;
  player: RxPlayer;
}

const TimeBar = (props: TimeBarProperties): JSX.Element => {
  const { duration, player } = props;
  const [position, setPosition] = useState(0);
  useEffect(() => {
    player.addEventListener('positionUpdate', (evt: IPositionUpdate) => {
      setPosition(evt.position);
    });

    return () => {
      player.removeEventListener('positionUpdate', (evt: IPositionUpdate) =>
        console.log('remove listener of the positionUpdate content ', evt)
      );
    };
  }, []);

  return (
    <>
      <Typography
        style={{
          fontSize: '0.75rem',
          opacity: 0.8,
          fontWeight: 500,
          letterSpacing: 0.2,
          color: '#ddd',
          padding: '0px 8px'
        }}
      >
        {formatDuration(position)}
      </Typography>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={position}
        min={0}
        step={1}
        max={duration ? duration : 0}
        onChange={(_: Event, value: number | number[]) => setPosition(value as number)}
      />
      <Typography
        style={{
          fontSize: '0.75rem',
          opacity: 0.8,
          fontWeight: 500,
          letterSpacing: 0.2,
          color: '#ddd',
          padding: '0px 8px'
        }}
      >
        -{formatDuration(duration - position)}
      </Typography>
    </>
  );
};

function formatDuration(value: number) {
  const minute = Math.floor(value / 60);
  const secondLeft = Math.round(value - minute * 60);
  return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
}

export default TimeBar;
