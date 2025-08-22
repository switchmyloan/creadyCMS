'use client'

import { useForm } from 'react-hook-form'
import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import FormInput from '@/components/forms/FormInput'
import SubmitBtn from '@/components/forms/SubmitBtn'
import { useEffect, useState } from 'react'
import { AddTag, DeleteTag, GetTagById } from '@/api-services/cms-service'
import ValidatedTextField from '@/components/forms/ValidatedTextField'
import ToastNotification from '@/components/forms/ToastNotification'

const Page = ({ params }) => {
    console.log(params, "Params")
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(params.tags)
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: '',
            description: ''
        }
    })

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await AddTag({
                name: data.name,
                description: data.description,
            });

            if (response) {
                // console.log(response, "res");
                ToastNotification.success('Tags Added Successfully');
                router.push('/tags');
                setLoading(false);
            } else {
                ToastNotification.error('Failed to add tag.');
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
            ToastNotification.error('An error occurred while adding the tag.');
        }

    }

    const fetchTagsData = async () => {
        // console.log(id, "movie -s")
        if (id && id !== "create") {
            try {
                const response = await GetTagById(id);
                console.log(response, "Response");
                if (response?.data?.success) {
                    const fetchedData = response?.data?.data;
                    reset({
                        name: response?.data?.data?.name,
                        description: response?.data?.data?.description
                    });
                }

            } catch (error) {
                ToastNotification.error('Failed to fetch movie data');
                console.error('Error fetching movie:', error);
            }
        }
    };

    const onUpdate = async (data) => {
        setLoading(true);
        try {
            const response = await DeleteTag({ id: id, ...data });
            if (response.status) {
                ToastNotification.success('Language Updated Successfully');
                router.push('/languages');
            } else {
                ToastNotification.error('Failed to update language');
            }
        } catch (error) {
            ToastNotification.error('An error occurred while updating language');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTagsData();

    }, [])


    return (
        <Card>
            <CardHeader title={params.tags == "create" ? `Create Tag` : `Update Tag`} />
            <CardContent>

                <form onSubmit={id == 'create' ? handleSubmit(onSubmit) : handleSubmit(onUpdate)}>
                    <Grid container spacing={6}>
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
