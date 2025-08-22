import React from 'react';
import { Controller } from 'react-hook-form';
import CustomTextField from '@core/components/mui/TextField';
import { Box } from '@mui/material';

const ValidatedTextField = ({ name, control, rules, label, placeholder, errors, helperText, disable = false, value }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
                <CustomTextField
                    {...field}
                    fullWidth
                    // label={label}
                    label={
                        <Box sx={{ fontWeight: '500', fontSize: '14px' }} className='text-[#000000]'>
                            {label}
                        </Box>
                    }
                    placeholder={placeholder}
                    // onChange={(e) => handleChange(e)}
                    disabled={disable}
                    type={name === 'user_password' ? 'password' : 'text'}
                    {...(errors[name] && { error: true, helperText: errors[name]?.message || helperText })}
                />
            )}
        />
    );
};

export default ValidatedTextField;
