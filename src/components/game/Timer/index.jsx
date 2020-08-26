import React from 'react'

//Material UI
import {
    Typography,
    Box
} from '@material-ui/core'

const Timer = ({ timer  }) => (
    
        <Typography variant='h2' >
            {timer}
        </Typography>
    
)

export default Timer