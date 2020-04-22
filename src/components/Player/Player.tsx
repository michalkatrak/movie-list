import React, {useRef, useEffect} from 'react';
import {FaTimes} from 'react-icons/fa';
import {useParams, useHistory} from 'react-router';
import {IconContext} from 'react-icons';
import 'shaka-player/dist/controls.css';
// @ts-ignore
import shakaPlayer from 'shaka-player/dist/shaka-player.ui';
import styles from './Player.styles';

interface RouteParams {
    showType: string,
    id: string,
}

const Player = () => {
    const classes = styles();

    const videoComponentRef = useRef(null);
    const videoContainerRef = useRef(null);

    const {id, showType} = useParams<RouteParams>();
    const history = useHistory();

    const handleClose = () => {
        history.push(`/${showType}/${id}`);
    };

    useEffect(() => {
        const videoUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
        shakaPlayer.polyfill.installAll();
        const video = videoComponentRef.current;
        const videoContainer = videoContainerRef.current;
        const player = new shakaPlayer.Player(video);
        const ui = new shakaPlayer.ui.Overlay(player, videoContainer, video);
        const config = {
            'controlPanelElements': ['volume', 'fullscreen']
        };
        ui.configure(config);
        player.load(videoUrl);
    }, []);
    return (
        <>
            <div
                className={classes.videoContainer}
                ref={videoContainerRef}
            >
                <video
                    className={classes.video}
                    ref={videoComponentRef}
                    autoPlay
                />
            </div>
            <button className={classes.button} onClick={handleClose}>
                <IconContext.Provider value={{className: classes.closeIcon}}>
                    <FaTimes />
                </IconContext.Provider>
            </button>
        </>
    )
};

export default Player;