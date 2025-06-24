import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export type AudioPlayerTemplate = 'minimal' | 'vinyl' | 'waveform' | 'neon' | 'neumorphism' | 'glassmorphism';

interface AudioPlayerProps {
    template: AudioPlayerTemplate;
    audioSrc: string;
    title: string;
    artist: string;
    coverImage?: string;
    className?: string;
}

interface Track {
    id: string;
    title: string;
    artist: string;
    src: string;
    cover?: string;
    duration: number;
}

const sampleTracks: Track[] = [
    {
        id: '1',
        title: 'Ambient Dreams',
        artist: 'Synthwave Artist',
        src: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        cover: 'https://via.placeholder.com/300x300/667eea/ffffff?text=AD',
        duration: 180
    },
    {
        id: '2',
        title: 'Electronic Pulse',
        artist: 'Digital Composer',
        src: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        cover: 'https://via.placeholder.com/300x300/f093fb/ffffff?text=EP',
        duration: 240
    },
    {
        id: '3',
        title: 'Cosmic Journey',
        artist: 'Space Sound',
        src: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        cover: 'https://via.placeholder.com/300x300/4ade80/ffffff?text=CJ',
        duration: 195
    }
];

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
    template,
    audioSrc,
    title,
    artist,
    coverImage,
    className = ''
}) => {
    const playerRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const vinylRef = useRef<HTMLDivElement>(null);
    const waveformRef = useRef<HTMLDivElement>(null);
    const visualizerRef = useRef<HTMLDivElement>(null);
    const playButtonRef = useRef<HTMLButtonElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    // Play/Pause animation
    const togglePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            gsap.to(playButtonRef.current, {
                scale: 0.9,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        } else {
            audioRef.current.play();
            gsap.to(playButtonRef.current, {
                scale: 1.1,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        }
        setIsPlaying(!isPlaying);
    };

    // Vinyl rotation animation
    useGSAP(() => {
        if (template === 'vinyl' && vinylRef.current) {
            gsap.to(vinylRef.current, {
                rotation: 360,
                duration: 3,
                repeat: -1,
                ease: "none",
                paused: !isPlaying
            });
        }
    }, [isPlaying, template]);

    // Waveform animation
    useGSAP(() => {
        if (template === 'waveform' && waveformRef.current) {
            const bars = waveformRef.current.querySelectorAll('.wave-bar');

            if (isPlaying) {
                gsap.to(bars, {
                    scaleY: () => 0.3 + Math.random() * 0.7,
                    duration: 0.1,
                    repeat: -1,
                    yoyo: true,
                    stagger: 0.05
                });
            } else {
                gsap.to(bars, {
                    scaleY: 0.1,
                    duration: 0.3
                });
            }
        }
    }, [isPlaying, template]);

    // Neon glow animation
    useGSAP(() => {
        if (template === 'neon' && playerRef.current) {
            if (isPlaying) {
                gsap.to(playerRef.current, {
                    boxShadow: "0 0 30px #00ffff, 0 0 60px #00ffff, 0 0 90px #00ffff",
                    duration: 1,
                    yoyo: true,
                    repeat: -1
                });
            } else {
                gsap.to(playerRef.current, {
                    boxShadow: "0 0 10px #00ffff",
                    duration: 0.5
                });
            }
        }
    }, [isPlaying, template]);

    // Visualizer animation
    useGSAP(() => {
        if (visualizerRef.current && isPlaying) {
            const circles = visualizerRef.current.querySelectorAll('.visualizer-circle');

            gsap.to(circles, {
                scale: () => 0.5 + Math.random() * 0.5,
                opacity: () => 0.3 + Math.random() * 0.7,
                duration: 0.2,
                repeat: -1,
                yoyo: true,
                stagger: 0.1
            });
        }
    }, [isPlaying]);

    // Progress animation
    useEffect(() => {
        if (progressRef.current && duration > 0) {
            const progressPercent = (currentTime / duration) * 100;
            gsap.to(progressRef.current, {
                width: `${progressPercent}%`,
                duration: 0.1
            });
        }
    }, [currentTime, duration]);

    // Audio event handlers
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const renderMinimalTemplate = () => (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
            <div className="flex items-center space-x-4">
                <button
                    ref={playButtonRef}
                    onClick={togglePlayPause}
                    className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition-colors"
                >
                    {isPlaying ? '⏸️' : '▶️'}
                </button>
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{title}</h3>
                    <p className="text-gray-600 text-sm">{artist}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div ref={progressRef} className="h-full bg-blue-500 rounded-full w-0"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
        </div>
    );

    const renderVinylTemplate = () => (
        <div className="bg-gradient-to-br from-amber-100 to-orange-200 rounded-xl shadow-xl p-8 max-w-md">
            <div className="flex flex-col items-center">
                <div className="relative mb-6">
                    <div
                        ref={vinylRef}
                        className="w-32 h-32 bg-black rounded-full relative shadow-lg"
                        style={{
                            background: 'radial-gradient(circle, #1a1a1a 20%, #000 40%, #1a1a1a 60%, #000 80%)'
                        }}
                    >
                        <div className="absolute inset-4 bg-red-600 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 bg-black rounded-full"></div>
                        </div>
                    </div>
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-6 h-1 bg-amber-600 rounded"></div>
                </div>
                <h3 className="font-bold text-xl text-gray-800 text-center">{title}</h3>
                <p className="text-gray-600 mb-4">{artist}</p>
                <button
                    ref={playButtonRef}
                    onClick={togglePlayPause}
                    className="w-16 h-16 bg-amber-500 hover:bg-amber-600 rounded-full flex items-center justify-center text-white text-2xl transition-colors shadow-lg"
                >
                    {isPlaying ? '⏸️' : '▶️'}
                </button>
            </div>
        </div>
    );

    const renderWaveformTemplate = () => (
        <div className="bg-gray-900 rounded-lg shadow-2xl p-6 max-w-lg">
            <div className="flex items-center space-x-4 mb-4">
                <img
                    src={coverImage || 'https://via.placeholder.com/60x60/4ade80/ffffff?text=♪'}
                    alt={title}
                    className="w-15 h-15 rounded-lg"
                />
                <div className="flex-1">
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="text-gray-400 text-sm">{artist}</p>
                </div>
                <button
                    ref={playButtonRef}
                    onClick={togglePlayPause}
                    className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-colors"
                >
                    {isPlaying ? '⏸️' : '▶️'}
                </button>
            </div>

            <div ref={waveformRef} className="flex items-center justify-center space-x-1 h-20 mb-4">
                {[...Array(40)].map((_, i) => (
                    <div
                        key={i}
                        className="wave-bar bg-green-400 w-1 rounded-full"
                        style={{ height: `${20 + (i % 5) * 10}px`, transformOrigin: 'bottom' }}
                    ></div>
                ))}
            </div>

            <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                <div ref={progressRef} className="h-full bg-green-500 rounded-full w-0"></div>
            </div>
        </div>
    );

    const renderNeonTemplate = () => (
        <div
            ref={playerRef}
            className="bg-black rounded-lg border border-cyan-500 p-6 max-w-md"
            style={{ boxShadow: '0 0 10px #00ffff' }}
        >
            <div className="text-center mb-6">
                <h3 className="font-bold text-2xl text-cyan-400 font-mono">{title}</h3>
                <p className="text-purple-400 font-mono">{artist}</p>
            </div>

            <div className="flex justify-center mb-6">
                <button
                    ref={playButtonRef}
                    onClick={togglePlayPause}
                    className="w-20 h-20 border-2 border-cyan-400 rounded-full flex items-center justify-center text-cyan-400 text-3xl transition-all hover:bg-cyan-400 hover:text-black"
                    style={{ boxShadow: '0 0 20px #00ffff' }}
                >
                    {isPlaying ? '⏸️' : '▶️'}
                </button>
            </div>

            <div ref={visualizerRef} className="flex justify-center space-x-2 mb-4">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="visualizer-circle w-3 h-3 bg-purple-400 rounded-full"
                    ></div>
                ))}
            </div>

            <div className="bg-gray-800 rounded-full h-3 overflow-hidden border border-cyan-500">
                <div ref={progressRef} className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full w-0"></div>
            </div>
        </div>
    );

    const renderNeumorphismTemplate = () => (
        <div
            className="rounded-3xl p-8 max-w-md"
            style={{
                background: '#e0e5ec',
                boxShadow: '20px 20px 40px #bebebe, -20px -20px 40px #ffffff'
            }}
        >
            <div className="text-center mb-6">
                <div
                    className="w-24 h-24 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                    style={{
                        background: '#e0e5ec',
                        boxShadow: 'inset 8px 8px 16px #bebebe, inset -8px -8px 16px #ffffff'
                    }}
                >
                    <span className="text-4xl">🎵</span>
                </div>
                <h3 className="font-semibold text-gray-700">{title}</h3>
                <p className="text-gray-500 text-sm">{artist}</p>
            </div>

            <div className="flex justify-center mb-6">
                <button
                    ref={playButtonRef}
                    onClick={togglePlayPause}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-gray-600 text-2xl transition-all"
                    style={{
                        background: '#e0e5ec',
                        boxShadow: isPlaying
                            ? 'inset 8px 8px 16px #bebebe, inset -8px -8px 16px #ffffff'
                            : '8px 8px 16px #bebebe, -8px -8px 16px #ffffff'
                    }}
                >
                    {isPlaying ? '⏸️' : '▶️'}
                </button>
            </div>

            <div
                className="rounded-full h-3 overflow-hidden"
                style={{
                    background: '#e0e5ec',
                    boxShadow: 'inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff'
                }}
            >
                <div ref={progressRef} className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full w-0"></div>
            </div>
        </div>
    );

    const renderGlassmorphismTemplate = () => (
        <div
            className="rounded-2xl p-6 max-w-md backdrop-blur-lg border border-white/20"
            style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)'
            }}
        >
            <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-2xl">🎵</span>
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="text-white/70 text-sm">{artist}</p>
                </div>
            </div>

            <div className="flex justify-center mb-6">
                <button
                    ref={playButtonRef}
                    onClick={togglePlayPause}
                    className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white text-xl transition-all hover:bg-white/30"
                >
                    {isPlaying ? '⏸️' : '▶️'}
                </button>
            </div>

            <div className="bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                <div ref={progressRef} className="h-full bg-white/70 rounded-full w-0"></div>
            </div>

            <div className="flex justify-between text-xs text-white/70 mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>
        </div>
    );

    const renderTemplate = () => {
        switch (template) {
            case 'minimal':
                return renderMinimalTemplate();
            case 'vinyl':
                return renderVinylTemplate();
            case 'waveform':
                return renderWaveformTemplate();
            case 'neon':
                return renderNeonTemplate();
            case 'neumorphism':
                return renderNeumorphismTemplate();
            case 'glassmorphism':
                return renderGlassmorphismTemplate();
            default:
                return renderMinimalTemplate();
        }
    };

    return (
        <div className={className}>
            <audio
                ref={audioRef}
                src={audioSrc}
                preload="metadata"
                onVolumeChange={() => setVolume(audioRef.current?.volume || 1)}
            />
            {renderTemplate()}
        </div>
    );
};

export const AudioPlayerShowcase: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
    const [currentTemplate, setCurrentTemplate] = useState<AudioPlayerTemplate>('minimal');
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    const templates: AudioPlayerTemplate[] = ['minimal', 'vinyl', 'waveform', 'neon', 'neumorphism', 'glassmorphism'];
    const currentTrack = sampleTracks[currentTrackIndex];

    const nextTemplate = () => {
        const currentIndex = templates.indexOf(currentTemplate);
        const nextIndex = (currentIndex + 1) % templates.length;
        setCurrentTemplate(templates[nextIndex]);
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % sampleTracks.length);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex flex-col items-center justify-center p-8">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-white mb-4">🎵 Audio Player Templates</h1>
                <p className="text-gray-300">Animated with GSAP</p>
                {onBack && (
                    <button
                        onClick={onBack}
                        className="mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                        ← Back to Main
                    </button>
                )}
            </div>

            <div className="mb-6">
                <AudioPlayer
                    template={currentTemplate}
                    audioSrc={currentTrack.src}
                    title={currentTrack.title}
                    artist={currentTrack.artist}
                    coverImage={currentTrack.cover}
                />
            </div>

            <div className="flex space-x-4 mb-6">
                <button
                    onClick={nextTemplate}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold"
                >
                    Next Template: {templates[(templates.indexOf(currentTemplate) + 1) % templates.length]}
                </button>
                <button
                    onClick={nextTrack}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-semibold"
                >
                    Next Track
                </button>
            </div>

            <div className="text-center text-white">
                <p className="mb-2">Current: <span className="font-bold capitalize">{currentTemplate}</span></p>
                <p className="text-sm text-gray-300">
                    Templates: {templates.map(t => t).join(' • ')}
                </p>
            </div>
        </div>
    );
};
