'use client'

import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

const FormInput = ({ name, control, label, rules, type = "text" }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    label={label}
                    type={type}
                    fullWidth        // ✅ input 100% width lega
                    error={!!error}
                    helperText={error ? error.message : ""}
                />
            )}
        />
    )
}

export default FormInput
