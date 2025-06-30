import React, { useEffect, useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  Button,
} from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import axios from "axios";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import "./ContentModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxHeight: "90%",
  bgcolor: "#39445a",
  border: "2px solid #282c34",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
  overflowY: "auto",
};

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div onClick={handleOpen} style={{ cursor: "pointer" }}>
        {children}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {content && (
              <div className="ContentModal">
                <img
                  src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable}
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape}
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <Typography variant="h5" className="ContentModal__title">
                    {content.name || content.title} (
                    {(content.first_air_date || content.release_date || "----").substring(0, 4)})
                  </Typography>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}
                  <Typography className="ContentModal__description">
                    {content.overview}
                  </Typography>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="error"
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                    sx={{ mt: 2 }}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
