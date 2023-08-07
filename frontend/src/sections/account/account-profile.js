import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

export const AccountProfile = ({ values, setValues }) => {
  const handleFileSelect = () => {
    var formdata = new FormData();
    formdata.append(
      "file",
      fileInput.files[0],
      "/C:/Users/archi/Downloads/c4611_sample_explain.pdf"
    );
    formdata.append("fileInfo", '{"fileName" : "Test2", "description":"test2","userId":2}');

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:8080/file/upload", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={values.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
            onChange={handleFileSelect}
          />
          <Typography gutterBottom variant="h5">
            {sessionStorage.getItem("userName")}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="contained" component="label">
          Upload picture
          <input type="file" hidden accept="image/*" />
        </Button>
      </CardActions>
    </Card>
  );
};
