import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Vimeo } from 'react-native-vimeo-iframe';

const VimeoPlayer = ({playId}) => {

    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [played, setPlayed] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [volume, setVolume] = useState(1);
    const [error, setError] = useState(null);


    const handleReady = () => {
        console.log('Player is ready');
    };

    const handlePlay = () => {
        console.log('Video started playing');
        setIsPlaying(true);
    };

    const handlePause = () => {
        console.log('Video paused');
        setIsPlaying(false);
    };

    const handleEnded = () => {
        console.log('Video ended');
        setIsPlaying(false);
    };

    const handleTimeUpdate = ({ currentTime, duration }) => {
        console.log('Current time:', currentTime);
        setCurrentTime(currentTime);
    };

    const handleProgress = ({ played, loaded }) => {
        console.log('Played:', played, 'Loaded:', loaded);
        setPlayed(played);
        setLoaded(loaded);
    };

    const handleSeeked = () => {
        console.log('Seeked to new position');
    };

    const handleVolumeChange = (newVolume) => {
        console.log('Volume changed to:', newVolume);
        setVolume(newVolume);
    };

    const handleError = (error) => {
        console.log('Error:', error);
        setError(error);
    };
    return (
        <Vimeo
            videoId={playId}
            autoplay={true}
            loop={true}
            controls={false}
            onReady={handleReady}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
            onTimeUpdate={handleTimeUpdate}
            onProgress={handleProgress}
            onSeeked={handleSeeked}
            onVolumeChange={handleVolumeChange}
            onError={handleError}
        />
    )
}

export default VimeoPlayer

const styles = StyleSheet.create({})