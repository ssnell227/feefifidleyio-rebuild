import React from 'react'


//material UI
import { 
    Typography, 
    Accordion,
    AccordionSummary
} from '@material-ui/core'

const InfoButton = ({ children, title }) => (
        <Accordion>
            <AccordionSummary>
                <Typography>
                    {title}
                </Typography>
            </AccordionSummary>
                <Typography>
                    {children}
                </Typography>
        </Accordion>
    )

export default InfoButton