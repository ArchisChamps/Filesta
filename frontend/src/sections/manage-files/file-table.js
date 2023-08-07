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
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import { useRouter } from "next/navigation";
import { useState } from "react";
import moment from "moment";
import { ShareModal } from "src/components/share-pdf-modal";
import { UniversalSnackbar } from "src/components/universal-snackbar";

export const FileTable = (props) => {
  const router = useRouter();
  const {
    count = 0,
    files = [],
    onPageChange = () => {},
    onRowsPerPageChange = () => {},
    page = 0,
    rowsPerPage = 0,
    emptyRows = 0,
  } = props;

  const [link, setLink] = useState("");
  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openSnck, setOpenSnck] = useState(false);

  const openPDFfile = (link) => {
    router.push({
      pathname: "/view-pdf",
      query: { data: link },
    });
  };

  const openShareModal = (file) => {
    setOpen(true);
    setLink(file.uniqueLink);
  };

  return (
    <Card sx={{ flexGrow: 1 }}>
      <CardHeader title="All Files" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">File ID</TableCell>
                <TableCell align="center">File Name</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? files.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : files
              ).map((file) => {
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
                      <Fab
                        variant="outlined"
                        color="success"
                        size="small"
                        sx={{ m: 1 }}
                        onClick={() => {
                          openPDFfile(file.uniqueLink);
                        }}
                      >
                        <VisibilityIcon />
                      </Fab>
                      <Fab
                        variant="outlined"
                        color="warning"
                        size="small"
                        sx={{ m: 1 }}
                        onClick={() => {
                          openShareModal(file);
                        }}
                      >
                        <ShareIcon />
                      </Fab>
                      <Fab variant="outlined" color="error" size="small" sx={{ m: 1 }}>
                        <DeleteIcon />
                      </Fab>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 87 * emptyRows }}>
                  <TableCell />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ShareModal
            link={link}
            open={open}
            setOpen={setOpen}
            setMessage={setMessage}
            setSeverity={setSeverity}
            setOpenSnck={setOpenSnck}
          />
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
      />
      <Divider />
      {openSnck && (
        <UniversalSnackbar
          open={openSnck}
          setOpen={setOpenSnck}
          severity={severity}
          message={message}
        />
      )}
    </Card>
  );
};

FileTable.prototype = {
  count: PropTypes.number,
  files: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  emptyRows: PropTypes.number,
};
