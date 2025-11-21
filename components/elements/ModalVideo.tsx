"use client";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

const VideoModalDemo = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      {/* The modal */}
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="L61p2uyiMSo"
        onClose={() => setOpen(false)}
      />

      {/* The trigger button */}
      <button className="btn-primary" onClick={() => setOpen(true)}>
        VIEW DEMO
      </button>
    </div>
  );
};

export default VideoModalDemo;
