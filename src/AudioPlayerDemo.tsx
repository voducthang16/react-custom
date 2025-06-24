import { AudioPlayer, AudioPlayerTemplate } from '@/components/audio-player';
import { useState } from 'react';

export const AudioPlayerDemo = () => {
    const sampleTrack = {
        title: "Sample Track",
        artist: "Demo Artist",
        src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
        cover: "https://via.placeholder.com/300x300/667eea/ffffff?text=ST"
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Audio Player Templates Demo</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* Minimal Template */}
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4">Minimal</h2>
                    <AudioPlayer
                        template="minimal"
                        audioSrc={sampleTrack.src}
                        title={sampleTrack.title}
                        artist={sampleTrack.artist}
                        coverImage={sampleTrack.cover}
                    />
                </div>

                {/* Vinyl Template */}
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4">Vinyl</h2>
                    <AudioPlayer
                        template="vinyl"
                        audioSrc={sampleTrack.src}
                        title={sampleTrack.title}
                        artist={sampleTrack.artist}
                        coverImage={sampleTrack.cover}
                    />
                </div>

                {/* Waveform Template */}
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4">Waveform</h2>
                    <AudioPlayer
                        template="waveform"
                        audioSrc={sampleTrack.src}
                        title={sampleTrack.title}
                        artist={sampleTrack.artist}
                        coverImage={sampleTrack.cover}
                    />
                </div>

                {/* Neon Template */}
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4">Neon</h2>
                    <AudioPlayer
                        template="neon"
                        audioSrc={sampleTrack.src}
                        title={sampleTrack.title}
                        artist={sampleTrack.artist}
                        coverImage={sampleTrack.cover}
                    />
                </div>

                {/* Neumorphism Template */}
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4">Neumorphism</h2>
                    <AudioPlayer
                        template="neumorphism"
                        audioSrc={sampleTrack.src}
                        title={sampleTrack.title}
                        artist={sampleTrack.artist}
                        coverImage={sampleTrack.cover}
                    />
                </div>

                {/* Glassmorphism Template */}
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4">Glassmorphism</h2>
                    <div className="bg-gradient-to-br from-purple-400 to-pink-400 p-6 rounded-2xl">
                        <AudioPlayer
                            template="glassmorphism"
                            audioSrc={sampleTrack.src}
                            title={sampleTrack.title}
                            artist={sampleTrack.artist}
                            coverImage={sampleTrack.cover}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Usage Example</h2>
                <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                    {`import { AudioPlayer } from './components/audio-player';

<AudioPlayer
  template="vinyl"
  audioSrc="path/to/your/audio.mp3"
  title="Your Song Title"
  artist="Artist Name"
  coverImage="path/to/cover-image.jpg"
/>`}
                </pre>
            </div>
        </div>
    );
};
