import React from 'react'
import {
    Typography,
    Container,
    Box
} from '@material-ui/core'

const BannerComp = () => (
    <Container >
        <Typography align='center' variant='h1'>
            FeeFiFidley.io
        </Typography>
        <Box>
            <Typography align='center' variant='h3'>
                A real-time, multiplayer music guessing game
            </Typography>
        </Box>
    </Container>
)

export default BannerComp