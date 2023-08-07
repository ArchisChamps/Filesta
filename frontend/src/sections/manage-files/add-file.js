import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Button, Card, CardContent, Fab, Stack, SvgIcon, Typography } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';

export const AddFile = (props) => {
  const { difference, positive = false, sx, value, open, setOpen} = props;

  return (
    <Fab variant="extended" color="primary" aria-label="add"  onClick={() => { setOpen(true) }}> 
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
              Add File
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          <PostAddIcon sx={{ mr: 1 }} />
        </Stack>
    </Fab>
  );
};
