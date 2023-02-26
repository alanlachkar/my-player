// React imports
import { useState } from 'react';
// Component imports
import { Button, TextField } from '@mui/material';
// Css imports
import styles from './TimeCodeSelector.css';

/**
 * Interface for TimeCodeSelector component
 * onClick -
 */
interface TimeCodeSelectorProperties {
  onClick: (timeCode: string) => void;
}

/**
 * Display textfield with one button
 * @param props Properties of the component
 * @returns TimeCodeSelector component
 */
const TimeCodeSelector = (props: TimeCodeSelectorProperties) => {
  const [timeCode, setTimeCode] = useState<string>('');
  const [errorText, setErrorText] = useState<boolean>(false);

  return (
    <div className={styles.timeCodeSelector}>
      <TextField
        label="Write a timecode"
        variant="standard"
        value={timeCode}
        error={errorText}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = event.target.value;
          setErrorText(isNaN(Number(newValue)));
          setTimeCode(newValue);
        }}
      />
      <Button
        variant="contained"
        disabled={timeCode.trim().length === 0 || errorText}
        onClick={() => props.onClick(timeCode)}
      >
        Click on me !
      </Button>
    </div>
  );
};

export default TimeCodeSelector;
