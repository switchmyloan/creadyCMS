'use client'

import { useForm } from 'react-hook-form'
import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import FormInput from '@/components/forms/FormInput'
import SubmitBtn from '@/components/forms/SubmitBtn'
import { useEffect, useState } from 'react'
import ValidatedTextField from '@/components/forms/ValidatedTextField'
import ValidatedSearchableSelectField from '@/components/forms/ValidatedSearchableSelectField'
import ValidatedLabel from '@/components/forms/ValidatedLabel'
import { getTags } from '@/api-services/cms-service'
import ToastNotification from '@/components/forms/ToastNotification'

const Page = ({ params }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]); // Example tags, replace with actual data
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
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

  const fetchLanguages = async () => {
    // debugger
    try {
      // setLoadingData(true);
      const response = await getTags(1, 100, '');
      console.log(response, "Tags")
      if (response?.data?.success) {
        // setLoadingData(false);

        const languages = response?.data?.data?.map(country => {
          return {
            label: country.Name.toUpperCase(),
            value: country.ID
          };
        });

        setTags(languages)
      } else {
        // setLoadingData(false);
        ToastNotification.error("Error")
      }
    } catch (error) {
      ToastNotification.error('Failed to fetch Language data !');
      // router.push('/login')

    } finally {
      // setLoadingData(false);
    }
  };

  console.log(tags, "tags>>>>>>>>>>>>>>>>>>>>>")


  useEffect(() => {
    fetchLanguages()
  }, [])

  return (
    <Card>
      <CardHeader title={params.blogs == "create" ? `Create Blog` : `Update Blog`} />
      <CardContent>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <ValidatedTextField
                name='title'
                control={control}
                rules={{ required: false }}
                label='Title'
                placeholder='Title'
                errors={errors}
                helperText='Title'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ValidatedTextField
                name='name'
                control={control}
                rules={{ required: false }}
                label='Name'
                placeholder='Name'
                errors={errors}
                helperText='Name'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ValidatedTextField
                name='description'
                control={control}
                rules={{ required: false }}
                label='Description'
                placeholder='Description'
                errors={errors}
                helperText='Description'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ValidatedTextField
                name='content'
                control={control}
                rules={{ required: false }}
                label='Content'
                placeholder='Content'
                errors={errors}
                helperText='Content'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ValidatedLabel label='Select Tags' />
              <ValidatedSearchableSelectField
                name='tags'
                control={control}
                rules={{ required: "" }}
                // label='Subtitle Language'
                options={tags}
                errors={errors}
                disabled={false}
                setGlobalFilter={setGlobalFilter}
                globalFilter={globalFilter}
              />
            </Grid>

            <Grid item xs={12} className='flex gap-4 justify-end mt-4'>
              <SubmitBtn loading={loading} label='Submit' />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default Page
