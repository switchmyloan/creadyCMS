import React from 'react'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { Grid } from '@mui/material'

function SubmitBtn({ loading, label }) {
    return (
        <>
            <Grid item xs={12} sm={12}>
                <div className='text-right'>
                    <Button
                        variant='contained'
                        type='submit'
                        disabled={loading}
                        // onClick={onClick}
                        size='small'
                        endIcon={loading ? <CircularProgress size={20} color='inherit' /> : null} // Show spinner on the right
                    >
                        {loading ? 'Loading...' : label}
                    </Button>
                </div>
            </Grid>
        </>
    )
}

export default SubmitBtn
