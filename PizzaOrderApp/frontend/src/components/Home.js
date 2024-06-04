import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Typography from '@mui/material/Typography';


/**
 * Renders the Home component.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to render.
 * @returns {JSX.Element} The rendered Home component.
 */

function Home({children}) {

    return (
        <Box sx={{ flexGrow: 1 }}>

            <Box m={2}>
              <Typography> "hello world"</Typography>
            </Box>

        </Box>
    );
}

export default Home;
