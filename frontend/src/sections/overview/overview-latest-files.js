import { format } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Fab,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import { useRouter } from "next/navigation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import moment from "moment/moment";
import PDFViewer from "src/pages/view-pdf";
import { useState } from "react";
import { ShareModal } from "src/components/share-pdf-modal";
import { UniversalSnackbar } from "src/components/universal-snackbar";

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

export const OverviewLatestFiles = (props) => {
  const { files = [], sx } = props;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState('');

  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [openSnck, setOpenSnck] = useState(false);

  const openPDFfile = (link) => {
    router.push({
      pathname: '/view-pdf',
      query: { data : link},
    })
  }

  const openShareModal = (file) =>{
    setOpen(true); 
    setLink(file.uniqueLink);
  }

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Files" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">File ID</TableCell>
                <TableCell align="center">File Name</TableCell>
                <TableCell sortDirection="desc" align="center">Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map((file) => {
                const createdAt = moment(file.uploadedDate).format("DD/MM/YYYY hh:mm A");

                return (
                  <TableRow hover key={file.id}>
                    <TableCell align="center">{file.id}</TableCell>
                    <TableCell
                      align="center"
                      style={{
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Tooltip title={file.filename}>
                        <span>{file.filename}</span>
                      </Tooltip>
                      </TableCell>
                    <TableCell align="center">{createdAt}</TableCell>
                    <TableCell align="center">
                    <Fab variant="outlined" color="success" size="small" sx={{ m: 1 }} onClick={()=>{openPDFfile(file.uniqueLink)}}>
                        <VisibilityIcon />
                      </Fab>
                      <Fab variant="outlined" color="warning" size="small" sx={{ m: 1 }} onClick={() => {openShareModal(file)}}>
                        <ShareIcon />
                      </Fab>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <ShareModal link={link} open={open} setOpen={setOpen} setMessage={setMessage} setSeverity={setSeverity} setOpenSnck={setOpenSnck}/>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
          onClick={() => {
            router.push("./files");
          }}
        >
          View all
        </Button>
        {openSnck && <UniversalSnackbar open={openSnck} setOpen={setOpenSnck} severity={severity} message={message}/>}
      </CardActions>
    </Card>
  );
};

OverviewLatestFiles.prototype = {
  files: PropTypes.array,
  sx: PropTypes.object,
};
