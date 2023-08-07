import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
  Card,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { Layout as PDFLayout } from "src/layouts/dashboard/layout";
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Loader from "src/components/loader";
import ControlPanel from "src/components/control-panel";
import { Container } from "@mui/system";
import Divider from "@mui/material/Divider";
import { CommentSection } from "src/sections/comment-section";
import { axiosInstance } from "src/utils/network-utils";
import { useRouter } from "next/router";
// import { blob } from "stream/consumers";
import { Blob } from "buffer";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const style = {
  position: "absolute",
  top: "55%",
  left: "40%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  border: "5px solid #051940",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
  maxHeight: "90%",
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

const style2 = {
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

const PDFViewer = () => {
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [pdfString, setPdfString] = useState();
  const [openError, setOpenError] = useState(false);
  const router = useRouter();
  const {
    query: { data },
  } = router;

  const [link, setLink] = useState("");
  
  useEffect(() => {
    async function getPDF(link) {
      try {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        fetch(`http://localhost:8080/file/${link}`, requestOptions)
          .then((response) => response.blob())
          .then((blob) => {
            let base64String;
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              base64String = reader.result;
              setPdfString(base64String.substr(base64String.indexOf(",") + 1));
            };
          })
          .catch((error) => {
            console.log("error", error);
            // setIsLoading(false);
            setOpenError(true);
          })
      } catch (err) {
        console.log(err);
      }
    }
    getPDF(data);
    setLink(data);
  });

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [link]);
  
  const fetchComments = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      fileLink: link,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/comment", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setComments(result);
      })
      .catch((error) => console.log("error", error));
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  return (
    <Grid container spacing={2} direction="row">
      <Card sx={style}>
        <Grid sx={style2}>
          <ControlPanel
            scale={scale}
            setScale={setScale}
            numPages={numPages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            file={file}
          />
          <Divider />
          <Loader isLoading={isLoading} />
          <Document
            file={pdfString ? `data:application/pdf;base64,${pdfString}` : file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Box padding={3} sx={{ border: "1px solid #000 " }} justifyContent="center">
              <Page
                size="A4"
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Box>
          </Document>
        </Grid>
      </Card>
      <CommentSection
        comments={comments}
        link={link}
        setComments={setComments}
        fetchComments={fetchComments}
      />
    </Grid>
  );
};

PDFViewer.getLayout = (page) => <PDFLayout>{page}</PDFLayout>;

export default PDFViewer;
