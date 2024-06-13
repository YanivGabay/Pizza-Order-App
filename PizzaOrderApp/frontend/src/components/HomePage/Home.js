import React from 'react';
import { Box, Stack } from '@mui/material';
import WelcomeHead from './WelcomeHead';
import HomeButton from './HomeButton';

/**
 * Renders the Home component.
 * 
 * @component
 * @returns {JSX.Element} The rendered Home component.
 */
function Home() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <WelcomeHead />
            <Stack direction="row" spacing={2} justifyContent="center">
                <Box>
                    <HomeButton text="Order Pizza" to="/order/new" />
                </Box>
                <Box>
                    <HomeButton text="View Orders" to="/order/view" />
                </Box>
            </Stack>
        </Box>
    );
}

export default Home;
