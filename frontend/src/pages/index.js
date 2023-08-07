import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewFiles } from "src/sections/overview/overview-files";
import { OverviewLatestFiles } from "src/sections/overview/overview-latest-files";
import { OverviewTotalConnections } from "src/sections/overview/overview-total-connections";
import { useEffect, useState } from "react";
import { useAuth } from 'src/hooks/use-auth';
import { axiosInstance } from "src/utils/network-utils";
const now = new Date();


const Page = () => {
  const [files, setFiles] = useState([]);
  const auth = useAuth();

  const [totalFiles, setTotalFiles] = useState(0);

  useEffect(() => {
      async function getFiles(id, order){
        try {
          const res = await axiosInstance
          .get(`http://localhost:8080/file/all/${id}?offset=0&limit=5&order=${order}`)
          setFiles(res.data);
        }
        catch (err){
          console.log(err);
        }
      }
      getFiles(sessionStorage.getItem('id'), "DESC");
  }, []);

  useEffect(() => {
    async function getFilesCount(id){
      try {
        const res = await axiosInstance
        .get(`http://localhost:8080/file/count/${id}`)
        setTotalFiles(res.data);
      }
      catch (err){
        console.log(err);
      }
    }
    getFilesCount(sessionStorage.getItem('id'));
}, []);

  return (
    <>
      <Head>
        <title>Overview | Filesta</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={6} sm={6}>
              <OverviewFiles  positive sx={{ height: "100%" }} count={totalFiles} />
            </Grid>
            <Grid xs={6} sm={6}>
              <OverviewTotalConnections
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value="Coming Soon ..."
              />
            </Grid>
            <Grid xs={12} md={12}>
              <OverviewLatestFiles
                files={files}
                sx={{ height: "100%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
