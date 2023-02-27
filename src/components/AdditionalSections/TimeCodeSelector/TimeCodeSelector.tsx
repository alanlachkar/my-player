// React imports
import { useState } from 'react';
// Component imports
import { Button, CircularProgress, TextField } from '@mui/material';
// Css imports
import styles from './TimeCodeSelector.css';

/**
 * Interface for TimeCodeSelector component
 * onClick    - Function trigger on clicking on the button
 * isLoading  - True if the service requested
 */
interface TimeCodeSelectorProperties {
  onClick: (timeCode: string) => void;
  isLoading: boolean;
}

/**
 * Display textfield with one button
 * @param props Properties of the component
 * @returns TimeCodeSelector component
 */
const TimeCodeSelector = (props: TimeCodeSelectorProperties) => {
  const { isLoading } = props;
  const [timeCode, setTimeCode] = useState<string>('');
  const [errorText, setErrorText] = useState<boolean>(false);

  return (
    <div className={styles.container}>
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
          disabled={isLoading || timeCode.trim().length === 0 || errorText}
          onClick={() => props.onClick(timeCode)}
        >
          Click on me !
        </Button>
      </div>
      {isLoading && <CircularProgress />}
    </div>
  );
};

export default TimeCodeSelector;
