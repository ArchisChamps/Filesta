import * as React from "react";
import { Button, Card, Container, Grid, Link, Modal, Snackbar, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { MuiFileInput } from "mui-file-input";
import { Controller, useForm } from "react-hook-form";
import { SnackbarProvider, useSnackbar } from 'notistack';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "60%",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const AddFileModal = ({ open, setOpen, setSeverity, setMessage, setOpenSnck, fetchFiles}) => {
  const { control, handleSubmit} = useForm({
    defaultValues: {
      file: null,
      name: "",
      description: "",
    },
  });
  
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [descError, setDescError] = React.useState(false);

  const onSubmit = (data) => {
    setNameError(false);
    if(name === ''){
      setNameError(true);
    }
    if(description.length > 255){
      setSeverity('warning');
      setMessage('File name must be less 50 characters');
      setOpenSnck(true);
      setDescError(true);
    }
    if(name.length > 50){
      setSeverity('warning');
      setMessage('File name must be less 50 characters');
      setOpenSnck(true);
      setNameError(true);
    }

    if(data.file === undefined || data.file === null){
      setSeverity('error')
      setMessage('Please select a file');
      setOpenSnck(true);
      return;
    }
    if(nameError || descError) return;

    var formdata = new FormData();
    formdata.append("file", data.file, data.file?.name);
    formdata.append("fileInfo", `{\"fileName\" : \"${name}\", \"description\":\"${description}\",\"userId\":${sessionStorage.getItem("id")}}`);
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    try {
        fetch("http://localhost:8080/file/upload", requestOptions)
        .then(response => response.text())
        .then(result => {
          setSeverity('success');
          setMessage('File uploaded successfully');
          setOpenSnck(true);
          fetchFiles();
          setOpen(false);
        })
        .catch(error => {
          setSeverity('error')
          setMessage('Couldn\'t upload file');
          setOpenSnck(true);
        });
    } catch (err) {
      helpers.setStatus({ success: false });
      helpers.setErrors({ submit: err.message });
      helpers.setSubmitting(false);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add file
          </Typography>
          <br />
          <Container component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Controller
                control={control}
                render={({ field, fieldState }) => (
                  <MuiFileInput
                    {...field}
                    variant="outlined"
                    fullWidth
                    placeholder="Insert a file"
                    inputProps={{ accept: "application/pdf" }}
                    helperText={fieldState.invalid ? "File is invalid" : ""}
                    error={fieldState.invalid}
                  />
                )}
                name="file"
              />
              <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={(e) => {setName(e.target.value)}}
                value={name}
                error={nameError}
                required
              />
              <TextField
                id="filled-multiline-static"
                multiline
                rows={5}
                fullWidth
                label="Description"
                name="description"
                onChange={(e) => {setDescription(e.target.value)}}
                value={description}
                error={descError}
                variant="filled"
              />
              <Button size="large" sx={{ mt: 1 }} type="submit" variant="contained">
                Upload
              </Button>
            </Stack>
          </Container>
        </Card>
      </Modal>
    </div>
  );
};
