'use client'

import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

const FormInput = ({ name, control, label, rules = {}, type = 'text', ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...rest}
          type={type}
          label={label}
          error={!!error}
          helperText={error ? error.message : ''}
          fullWidth
        />
      )}
    />
  )
}

export default FormInput
