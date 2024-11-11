"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaForward,
  FaPlay,
  FaPause,
  FaBackward,
  FaUpload,
} from "react-icons/fa";
import Image from "next/image";

interface Track {
  title: string;
  artist: string;
  src: string;
}

const AudioPlayer = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newTracks: Track[] = Array.from(files).map((file) => ({
        title: file.name,
        artist: "Unknown Artist",
        src: URL.createObjectURL(file),
      }));
      setTracks((prevTracks) => [...prevTracks, ...newTracks]);
    }
  };

  // Handle Play/Pause Toggle
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (audioRef.current && tracks[currentTrackIndex]) {
      audioRef.current.src = tracks[currentTrackIndex].src;
      audioRef.current.load();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setProgress(0);
    }
  }, [currentTrackIndex, tracks]);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="max-w-md w-full space-y-4 p-5 bg-opacity-60 backdrop-blur-lg rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Audio Player</h1>
          <label className="flex items-center cursor-pointer text-white">
            <FaUpload className="w-5 h-5 mr-2" />
            <span>Upload</span>
            <input
              type="file"
              accept="audio/*"
              multiple
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>
        <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md text-black">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/music.svg"
              alt="Album Cover"
              width={100}
              height={100}
              className="rounded-full w-32 h-32 object-cover mb-4"
            />
            <div className="text-center">
              <h2 className="text-xl font-semibold">
                {tracks[currentTrackIndex]?.title || "Audio Title"}
              </h2>
              <p className="text-sm text-gray-700">
                {tracks[currentTrackIndex]?.artist || "Artist Name"}
              </p>
            </div>
            <div className="w-full mt-4">
              <div className="flex justify-between text-xs text-gray-600">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="relative h-2 rounded-full overflow-hidden bg-gray-200 mt-2">
                <div
                  className="absolute h-full bg-blue-600"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center gap-6 mt-6">
              <button
                onClick={handlePrevTrack}
                className="text-blue-700 hover:text-blue-900"
              >
                <FaBackward className="w-6 h-6" />
              </button>
              <button
                onClick={handlePlayPause}
                className="text-blue-700 hover:text-blue-900"
              >
                {isPlaying ? (
                  <FaPause className="w-8 h-8" />
                ) : (
                  <FaPlay className="w-8 h-8" />
                )}
              </button>
              <button
                onClick={handleNextTrack}
                className="text-blue-700 hover:text-blue-900"
              >
                <FaForward className="w-6 h-6" />
              </button>
            </div>
            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
