import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    TextareaAutosize,
    Grid,
    Avatar
} from "@mui/material";
import { useForm } from "react-hook-form";
import { CloudUpload } from "@mui/icons-material";

const CreateAuthorTagModal = ({ open, handleClose, type, onSubmit }) => {
    const { control, handleSubmit, reset, register } = useForm({
        defaultValues: {
            name: "",
            email: "",
            description: ""
        }
    });
    const [imagePreview, setImagePreview] = useState(null);
    const handleFormSubmit = (data) => {
        onSubmit({
            ...data,
            profileImageUrl: imagePreview, // filhal preview URL bhej raha hu, API me tu backend k hisaab se file bhejna
        });
        reset();
        setImagePreview(null);
        handleClose();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <DialogTitle>
                    {type === "author" ? "Create Author" : "Create Tag"}
                </DialogTitle>
                <DialogContent dividers>
                    {type === "author" ? (
                        <>
                            <Grid container spacing={2}>
                                {/* Name + Designation */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        label="Author Name"
                                        fullWidth
                                        {...register("name", { required: true })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        label="Designation"
                                        fullWidth
                                        {...register("designation", { required: true })}
                                    />
                                </Grid>

                                {/* Social Link + Image Upload */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        label="Social Link"
                                        fullWidth
                                        {...register("socialLink", { required: true })}
                                    />
                                </Grid>


                                {/* Description */}
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        label="Description"
                                        fullWidth
                                        multiline
                                        rows={3}
                                        {...register("description", { required: true })}
                                    />
                                </Grid>
                                {/* Image upload */}
                                <Grid item xs={12}>
                                    <Button variant="outlined" component="label" fullWidth>
                                        Upload Profile Image
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </Button>
                                </Grid>
                                {imagePreview && (
                                    <Grid item xs={12} className="flex justify-center mt-2">
                                        <Avatar
                                            src={imagePreview}
                                            alt="Preview"
                                            sx={{ width: 100, height: 100 }}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </>
                    ) : (
                        <>
                            <TextField
                                margin="dense"
                                label="Tag Name"
                                fullWidth
                                {...register("name", { required: true })}
                            />
                            <TextField
                                margin="dense"
                                label="Tag Description"
                                fullWidth
                                multiline
                                rows={3}
                                {...register("description")}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CreateAuthorTagModal;
