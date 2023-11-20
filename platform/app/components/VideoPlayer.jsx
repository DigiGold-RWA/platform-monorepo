
import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

// Sea
import "@videojs/themes/dist/sea/index.css";
import styles from "./VideoPlayer.module.css";

const VideoPlayer = () => {
    const themeName = "sea";
    const options = {
        controls: true,
        // responsive: true,
        fluid: true,
        sources: [
            {
                src: "https://digicask.s3.ap-south-1.amazonaws.com/How+DCask+Works+-+720.mp4",
                type: "video/mp4",
            },
        ],
        preload: "auto",
        poster: "/images/videoposterlight.png",
    };

    const videoRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        const player = playerRef.current;

        if (!player) {
            const videoElement = videoRef.current;
            if (!videoElement) return;

            playerRef.current = videojs(videoElement, options);
        }

        // return () => {
        //     //   const player = playerRef.current;
        //     if (player) {
        //         player.dispose();
        //         playerRef.current = null;
        //     }
        // };
    }, [options, videoRef, playerRef]);

    return (
        <div data-vjs-player>
            <video
                ref={videoRef}
                className={`video-js vjs-big-play-centered vjs-theme-sea h-52`}
            />
        </div>
    );
};

export default VideoPlayer;
