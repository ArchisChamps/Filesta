import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { Container, Grid, Stack, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/router";
import { AddFile } from "../sections/manage-files/add-file";
import { FileTable } from "../sections/manage-files/file-table";
import { AddFileModal } from "src/components/add-file-modal";
import { UniversalSnackbar } from "src/components/universal-snackbar";

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [openSnck, setOpenSnck] = useState(false);


  useEffect(() => {
    fetchFiles();
  }, []);


  const fetchFiles = () =>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`http://localhost:8080/file/all/${sessionStorage.getItem('id')}?order=ASC&offset=${page*rowsPerPage}&limit=${rowsPerPage}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setFiles(result);})
      .catch(error => console.log('error', error));
  }

  // useEffect(() => {
  //   var requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow'
  //   };
    
  //   fetch(`http://localhost:8080/file/all/${sessionStorage.getItem('id')}?order=ASC&offset=${page*rowsPerPage}&limit=${rowsPerPage}`, requestOptions)
  //     .then(response => response.json())
  //     .then(result => {
  //       console.log(result)
  //       setFiles(result);})
  //     .catch(error => console.log('error', error));
  // }, [page, rowsPerPage]);

  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - files.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Head>
        <title>Files | Filesta</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid paddingLeft={10}>
            <AddFile open={open} setOpen={setOpen}/>
            {open && <AddFileModal open={open} setOpen={setOpen} setMessage={setMessage} setSeverity={setSeverity} setOpenSnck={setOpenSnck} fetchFiles={fetchFiles}/>}
          </Grid>
        </Container>
        <Container maxWidth="xl">
          <Grid spacing={5} padding={10} paddingTop={5}>
            <FileTable
              count={files.length}
              files={files}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              emptyRows={emptyRows}
            />
          </Grid>
          {openSnck && <UniversalSnackbar open={openSnck} setOpen={setOpenSnck} severity={severity} message={message}/>}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
