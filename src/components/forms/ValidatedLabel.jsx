import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
// import { useCountry } from "@/CountruContext";

function ValidatedLabel({ label, id }) {
    // const { mode } = useCountry();
    const mode = 'light'; // Placeholder for mode, replace with actual context or prop if needed
    return (

        // <Typography variant='h6' fontSize={"small"} id={id} className={mode != 'light' ? '#2f3349' : '#fff'}>
        //   {label}
        // </Typography>


        <Typography id={id} className={`${mode != 'light' ? 'text-[#ffffff] mb-1' : 'text-[#000000] mb-1'}`}>
            <Box sx={{ fontWeight: '500', fontSize: '14px' }}>
                {label}
            </Box>
        </Typography>
    )
}
ValidatedLabel.defaultProps = {
    label: 'Default Label',
    id: 'default-id'
};
export default ValidatedLabel
