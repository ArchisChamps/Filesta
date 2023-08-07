import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, Card } from "@mui/material";

export const Comment = (props) => {
  const { data } = props;

  return (
    <Box padding={3}>
      <Typography variant="h6">{data.username}</Typography>
      <Box>
        <Typography>{data.commentBody}</Typography>
      </Box>
    </Box>
  );
};
