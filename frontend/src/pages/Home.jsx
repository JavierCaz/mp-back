import React from 'react'

import { Typography } from '@mui/material'
import { Box } from '@mui/system'
// import { Passwords } from 'pages'
import UserPasses from './UserPasses/UserPasses'

const Home = () => {
    return (
        <Box
            sx={{
                display: 'grid',
                maxWidth: '80%',
                margin: 'auto',
                justifyItems: 'center',
                gap: '1rem',
            }}
        >
            <Typography variant='h4'>Home Page</Typography>
            {/* <Passwords /> */}
            <UserPasses />
        </Box>
    )
}

export default Home
