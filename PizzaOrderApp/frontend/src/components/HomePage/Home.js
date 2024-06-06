import React from 'react';
import { Box, Stack } from '@mui/material';



import WelcomeHead from './WelcomeHead';
import HomeButton from './HomeButton';


/**
 * Renders the Home component.
 *
 * @param {Object} props - The component props.

 * @returns {JSX.Element} The rendered Home component.
 */
 //this.id = id;
 //this.firstName = firstName;
// this.lastName = lastName;
 // this.address = address;
//  this.phoneNumber = phoneNumber;
function Home({}) {

    return (
        <Box sx={{ flexGrow: 1 }}>

        <WelcomeHead />
       
        <Stack direction="row" spacing={2} justifyContent="center">
            <Box>
                { <HomeButton text="Order Pizza" to="/order/new" /> }
            </Box>
            <Box>
                { <HomeButton text="View Orders" to="/order/:orderId" /> }
            </Box>
        </Stack>
        </Box>
    );
}

export default Home;
