'use client'

import { useForm } from 'react-hook-form'
import { Button, TextField, Card, CardContent, Typography } from '@mui/material'
import FormInput from '@/components/forms/FormInput'

const Page = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      age: ''
    }
  })

  const onSubmit = (data) => {
    console.log("Form Submitted ✅", data)
    reset()
  }

  return (
    <Card className="max-w-lg mx-auto mt-6">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          New User Form
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormInput
            name="name"
            control={control}
            label="Name"
            rules={{ required: 'Name is required' }}
          />

          <FormInput
            name="email"
            control={control}
            label="Email"
            type="email"
            rules={{
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
            }}
          />

          <FormInput
            name="age"
            control={control}
            label="Age"
            type="number"
            rules={{
              required: 'Age is required',
              min: { value: 18, message: 'Must be at least 18' }
            }}
          />

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default Page
