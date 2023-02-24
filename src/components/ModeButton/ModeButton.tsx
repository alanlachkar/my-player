// React imports
import { useState } from 'react';
// Component imports
import IconButton from '@mui/material/IconButton';
// Icon imports
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const ModeButton = (): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <IconButton
      aria-label="Dark/Light mode button"
      onClick={() => setIsDarkMode((oldIsDarkMode) => !oldIsDarkMode)}
    >
      {isDarkMode ? <NightsStayIcon /> : <WbSunnyIcon />}
    </IconButton>
  );
};

export default ModeButton;
