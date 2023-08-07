import { useState } from "react";

const { Button, TextField, Typography, Card, Modal, Grid, CardActions } = require("@mui/material");
const { Stack, Container } = require("@mui/system");
const { MuiFileInput } = require("mui-file-input");
const { Controller, useForm } = require("react-hook-form");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "38%",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const style2 = {
  backgroundColor: "transparent",
};

export const ShareModal = ({ link, open, setOpen, setSeverity, setMessage, setOpenSnck }) => {
  const { handleSubmit } = useForm({
    defaultValues: {
      uniqueLink: "",
      email: "",
    },
  });

  const [email, setEmail] = useState("");
  const uniqueLink = "http://localhost:3000/view-pdf?data=" + link;
  const [error, setError] = useState(false);

  const handleCopyText = () => {
    navigator.clipboard
      .writeText(uniqueLink)
      .then(() => {
        setSeverity("success");
        setMessage("URL copied to clipboard");
        setOpenSnck(true);
      })
      .catch((error) => {
        console.error(error);
        setSeverity("error");
        setMessage("Couldn't copy to clipboard");
        setOpenSnck(true);
      });
  };

  const onSubmit = (data) => {
    if(email.length === 0) {
      setError(true);
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      sender: sessionStorage.getItem("userName"),
      receiver: email,
      link: "http://localhost:3000/view-pdf?data=" + link,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/email", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setSeverity("success");
        setMessage("Email sent successfully to " + email);
        setOpenSnck(true);
        setEmail("")
        setOpen(false);
      })
      .catch((error) => {
        console.error(error);
        setSeverity("error");
        setMessage("Couldn't send email");
        setOpenSnck(true);
      });
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)} sx={style2}>
      <Card sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Share file
        </Typography>
        <br />
        <Container component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField
              label="Share URL"
              name="uniqueLink"
              value={uniqueLink}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              onChange={(e) => {
                setError(false);
                setEmail(e.target.value);
              }}
              value={email}
              error={error}
              helperText={error ? 'Please enter email to proceed' : ''}
              variant="filled"
            />
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button variant="contained" onClick={handleCopyText}>
                Copy URL
              </Button>
              <Button type="submit" variant="contained">
                Send
              </Button>
            </CardActions>
          </Stack>
        </Container>
      </Card>
    </Modal>
  );
};
