'use client'

import { useForm } from 'react-hook-form'
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import ValidatedTextField from '@/components/forms/ValidatedTextField'
import ValidatedSearchableSelectField from '@/components/forms/ValidatedSearchableSelectField'
import ValidatedLabel from '@/components/forms/ValidatedLabel'
import { AddAuthor, AddTag, getTags } from '@/api-services/cms-service'
import ToastNotification from '@/components/forms/ToastNotification'
import SubmitBtn from '@/components/forms/SubmitBtn'
import ValidatedSearchMultiSelect from '@/components/forms/ValidatedSearchMultiSelect';
import { useRouter } from 'next/navigation'
import CreateAuthorTagModal from '@/components/forms/CreateAuthorTagModal'

const Page = ({ params }) => {
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("author");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      content: '',
      status: 'draft',
      readTime: '',
      isFeatured: false,
      metaTitle: '',
      metaDescription: '',
      metaImage: '',
      metaKeywords: '',
      metadata: {
        category: '',
        level: ''
      },
      author_xid: '',
      tags: []
    }
  });

  // Open modal
  const handleOpen = (type) => {
    setModalType(type);
    setOpenModal(true);
  };

  // Close modal
  const handleClose = () => setOpenModal(false);

  const onSubmit = (data) => {
    console.log("Form Submitted ✅", data)
    reset()
  };

  const fetchTags = async () => {
    try {
      const response = await getTags(1, 100, '');
      if (response?.data?.success) {
        const languages = response?.data?.data?.map(country => {
          return {
            label: country.Name.toUpperCase(),
            value: country.ID
          };
        });
        setTags(languages)
      } else {
        ToastNotification.error("Error")
      }
    } catch (error) {
      ToastNotification.error('Failed to fetch Language data !');
    }
  };

  const handleTagSubmit = async (data) => {
    console.log("Tag Data", data)
    // try {
    //   const response = await AddTag({
    //     name: data.name,
    //     description: data.description,
    //   });

    //   if (response) {
    //     ToastNotification.success("Tag added successfully!");
    //     fetchTags();   // ✅ naya tag reload karega
    //     handleClose();
    //   } else {
    //     ToastNotification.error("Failed to add tag.");
    //   }
    // } catch (err) {
    //   ToastNotification.error("Something went wrong!");
    // }
  };

  // Author create API
  const handleAuthorSubmit = async (data) => {
    console.log("Author Data", data)
    try {
      const response = await AddAuthor({
        name: data.name,
        profileImageUrl: data.profileImageUrl,
        description: data.description,
        designation: data.designation,
        socialLink: data.socialLink
      });

      if (response) {
        ToastNotification.success("Author added successfully!");
        // ✅ yaha fetchAuthors() likhna hoga agar author API se aate hain
        handleClose();
      } else {
        ToastNotification.error("Failed to add author.");
      }
    } catch (err) {
      ToastNotification.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchTags()
  }, [])



  return (
    <>
      {/* <Card> */}

      <CardHeader title={params.blogs == "create" ? `Create Blog` : `Update Blog`} />
      {/* <CardContent> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>

          {/* LEFT COLUMN */}
          <Grid item xs={12} md={6}

          >
            <Card variant="outlined" sx={{ borderRadius: 1, p: 2 }}>
              <Grid container spacing={2}>
                {/* Title */}
                <Grid item xs={12} md={12}>
                  <ValidatedTextField
                    name="title"
                    control={control}
                    label="Title"
                    errors={errors}
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12} md={12}>
                  <ValidatedTextField
                    name="description"
                    control={control}
                    label="Description"
                    errors={errors}
                  />
                </Grid>

                {/* Content */}
                <Grid item xs={12}>
                  <ValidatedTextField
                    name="content"
                    control={control}
                    label="Content"
                    errors={errors}
                  />
                </Grid>

                {/* Status */}
                <Grid item xs={12} md={12}>
                  <ValidatedLabel label="Select Status" />
                  <ValidatedSearchableSelectField
                    name="status"
                    control={control}
                    options={[
                      { label: "Draft", value: "draft" },
                      { label: "Published", value: "published" },
                      { label: "Archived", value: "archived" },
                      { label: "Reviewed", value: "reviewed" },
                    ]}
                    errors={errors}
                    disabled={false}
                    setGlobalFilter={setGlobalFilter}
                    globalFilter={globalFilter}
                  />
                </Grid>

                {/* Meta Title */}
                <Grid item xs={12} md={12}>
                  <ValidatedTextField
                    name="metaTitle"
                    control={control}
                    label="Meta Title"
                    errors={errors}
                  />
                </Grid>

                {/* Level */}
                <Grid item xs={12} md={12}>
                  <ValidatedTextField
                    name="metadata.level"
                    control={control}
                    label="Level"
                    errors={errors}
                  />
                </Grid>

                {/* Meta Image */}
                <Grid item xs={12} md={12}>
                  <ValidatedTextField
                    name="metaImage"
                    control={control}
                    label="Meta Image URL"
                    errors={errors}
                  />
                </Grid>

                {/* Category */}
                <Grid item xs={12} md={6}>
                  <ValidatedTextField
                    name="metadata.category"
                    control={control}
                    label="Category"
                    errors={errors}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* RIGHT COLUMN */}
          <Grid item xs={12} md={6}
            sx={{
              position: "sticky",
              top: 165,       // distance from top navbar
              alignSelf: "flex-start",
              height: "fit-content",
            }}
          >

            <Grid container spacing={2}>
              {/* Submit Button Top Right */}
              {/* Author Card */}
              <Grid item xs={12}>
                <Card variant="outlined" sx={{ borderRadius: 1 }}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Select Author
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleOpen("author")}
                      >
                        Add
                      </Button>
                    </Box>

                    <ValidatedSearchableSelectField
                      name="author_xid"
                      control={control}
                      options={[
                        { label: 'Deepak', value: '1' },
                        { label: 'Swapnil', value: '2' },
                        { label: 'Akash', value: '3' },
                        { label: 'Pratham', value: '4' }
                      ]}
                      errors={errors}
                      disabled={false}
                      setGlobalFilter={setGlobalFilter}
                      globalFilter={globalFilter}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Tags Card */}
              <Grid item xs={12}>
                <Card variant="outlined" sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Select Tags
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleOpen("tag")}
                      >
                        Create
                      </Button>
                    </Box>

                    <ValidatedSearchMultiSelect
                      name="tags"
                      control={control}
                      rules={{ required: 'Tags selection is required.' }}
                      label="Tags"
                      options={tags}
                      errors={errors}
                      setGlobalFilter={setGlobalFilter}
                      globalFilter={globalFilter}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} className="flex justify-end">
                <SubmitBtn loading={loading} label="Submit" />
              </Grid>
            </Grid>
          </Grid>


        </Grid>
      </form >
      {/* </CardContent> */}
      {/* </Card> */}


      {/* Modal */}
      <CreateAuthorTagModal
        open={openModal}
        handleClose={handleClose}
        type={modalType}
        onSubmit={modalType === "tag" ? handleTagSubmit : handleAuthorSubmit}
      />
    </>
  )
}

export default Page
