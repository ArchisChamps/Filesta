/* eslint-disable react/jsx-key */
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  Card,
  Divider,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { Comment } from "src/components/comment";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "55%",
  left: "80%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  height: "90%",
  border: "5px solid #051940",
  boxShadow: 24,
  p: 4,
};

const style2 = {
  overflow: "auto",
  height: "90%",
  borderRadius: "10px",
  "&::-webkit-scrollbar": {
    width: "8px",
    borderRadius: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "8px",
  },
};

export const CommentSection = (props) => {
  const { link, comments = [], fetchComments, setComments} = props;
  const [commentBody, setCommentBody] = useState("");
  const { handleSubmit } = useForm();

  
  const onSubmit = (data) => {
    if (commentBody === "") return;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      userId: sessionStorage.getItem("id"),
      commentBody: commentBody,
      fileLink: link,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/comment/add", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        fetchComments();
        setCommentBody("");
        setComments([...comments, result]);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Card sx={style}>
      <Box spacing={2}>
        <Typography variant="h6">Comment Section</Typography>
        <Divider />
      </Box>
      <Box sx={style2}>
        <Stack>
          {comments.map((comment) => {
            return <Comment data={comment} />;
          })}
        </Stack>
      </Box>
      <Divider />

      <Grid item spacing={2} fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            spacing={2}
            name="comment"
            variant="filled"
            value={commentBody}
            fullWidth
            onChange={(e) => {
              setCommentBody(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button type="submit" variant="contained" size="small">
                    <SendRoundedIcon />
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Grid>
    </Card>
  );
};
