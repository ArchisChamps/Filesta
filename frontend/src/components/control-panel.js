import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import ZoomOutRoundedIcon from "@mui/icons-material/ZoomOutRounded";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import { Stack } from "@mui/system";

const ControlPanel = (props) => {
  const { pageNumber, numPages, setPageNumber, scale, setScale } = props;

  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;

  const goToFirstPage = () => {
    if (!isFirstPage) setPageNumber(1);
  };
  const goToPreviousPage = () => {
    if (!isFirstPage) setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    if (!isLastPage) setPageNumber(pageNumber + 1);
  };
  const goToLastPage = () => {
    if (!isLastPage) setPageNumber(numPages);
  };

  const onPageChange = (e) => {
    const { value } = e.target;
    setPageNumber(Number(value));
  };

  const isMinZoom = scale < 0.6;
  const isMaxZoom = scale >= 2.0;

  const zoomOut = () => {
    if (!isMinZoom) setScale(scale - 0.1);
  };

  const zoomIn = () => {
    if (!isMaxZoom) setScale(scale + 0.1);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack container spacing={2} direction="row" alignItems="center" justifyContent="center">
          <IconButton color="primary" onClick={goToFirstPage} disabled={isFirstPage}>
            <FirstPageRoundedIcon />
          </IconButton>
          <IconButton color="primary" onClick={goToPreviousPage} disabled={isFirstPage}>
            <KeyboardArrowLeftRoundedIcon />
          </IconButton>
          <Typography>
            Page{" "}
            <input
              name="pageNumber"
              type="number"
              min={1}
              max={numPages || 1}
              value={pageNumber}
              onChange={onPageChange}
            />{" "}
            of {numPages}
          </Typography>
          <IconButton color="primary" onClick={goToNextPage} disabled={isLastPage}>
            <KeyboardArrowRightRoundedIcon />
          </IconButton>
          <IconButton color="primary" onClick={goToLastPage} disabled={isLastPage}>
            <LastPageRoundedIcon />
          </IconButton>
        <IconButton color="primary" onClick={zoomOut} disabled={isMinZoom}>
          <ZoomOutRoundedIcon />
        </IconButton>
        <span>{(scale * 100).toFixed()}%</span>
        <IconButton color="primary" onClick={zoomIn} disabled={isMaxZoom}>
          <ZoomInRoundedIcon />
        </IconButton>
        {/* <IconButton color="primary" onClick={zoomIn}>
          <FileDownloadRoundedIcon />
          <a href="/assets/docs/file-sample.pdf" download title="download" />
        </IconButton> */}
      </Stack>
    </Box>
  );
};

export default ControlPanel;
