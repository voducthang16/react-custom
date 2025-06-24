# 🎵 GSAP Audio Player Components

A collection of beautiful, animated audio player components built with React, TypeScript, and GSAP animations.

## Features

- **6 Different Templates**: Minimal, Vinyl, Waveform, Neon, Neumorphism, and Glassmorphism
- **GSAP Animations**: Smooth, performant animations for all interactions
- **Fully Functional**: Play/pause, progress tracking, time display
- **Responsive Design**: Works on all screen sizes
- **TypeScript Support**: Full type safety
- **Customizable**: Easy to extend and modify

## Templates

### 1. Minimal
- Clean, simple design
- Basic play/pause with progress bar
- Perfect for minimalist interfaces

### 2. Vinyl
- Retro vinyl record design
- Rotating disc animation when playing
- Vintage aesthetic with warm colors

### 3. Waveform
- Modern dark theme
- Animated waveform visualization
- Professional studio look

### 4. Neon
- Cyberpunk-inspired design
- Glowing neon effects
- Animated visualizer circles
- Sci-fi aesthetic

### 5. Neumorphism
- Soft, tactile design
- Subtle shadows and highlights
- Modern minimalist approach

### 6. Glassmorphism
- Translucent glass effect
- Backdrop blur
- Contemporary trendy design

## Usage

```tsx
import { AudioPlayer } from './components/audio-player';

function MyComponent() {
  return (
    <AudioPlayer
      template="vinyl"
      audioSrc="path/to/your/audio.mp3"
      title="Song Title"
      artist="Artist Name"
      coverImage="path/to/cover.jpg"
    />
  );
}
```

## Props

| Prop | Type | Description | Required |
|------|------|-------------|----------|
| `template` | `AudioPlayerTemplate` | The visual template to use | ✅ |
| `audioSrc` | `string` | URL to the audio file | ✅ |
| `title` | `string` | Song title | ✅ |
| `artist` | `string` | Artist name | ✅ |
| `coverImage` | `string` | Cover image URL | ❌ |
| `className` | `string` | Additional CSS classes | ❌ |

## Template Types

```tsx
type AudioPlayerTemplate = 
  | 'minimal' 
  | 'vinyl' 
  | 'waveform' 
  | 'neon' 
  | 'neumorphism' 
  | 'glassmorphism';
```

## GSAP Animations

Each template includes specific GSAP animations:

- **Play/Pause Button**: Scale animation on interaction
- **Progress Bar**: Smooth width animation
- **Vinyl**: Continuous rotation when playing
- **Waveform**: Dynamic bar scaling based on playback
- **Neon**: Glowing box-shadow pulse effect
- **Visualizers**: Staggered scale and opacity animations

## Installation

1. Make sure you have the required dependencies:
```bash
npm install gsap @gsap/react
```

2. Copy the `AudioPlayer.tsx` component to your project

3. Import and use in your components

## Customization

Each template can be easily customized by modifying the render functions within the component. The GSAP animations are modular and can be adjusted or extended.

### Example: Custom Colors

```tsx
// Modify the neon template colors
const renderNeonTemplate = () => (
  <div
    className="bg-black rounded-lg border border-purple-500 p-6"
    style={{ boxShadow: '0 0 10px #8b5cf6' }}
  >
    {/* ... rest of template */}
  </div>
);
```

## Browser Support

- Modern browsers with Web Audio API support
- Requires GSAP 3.0+
- React 16.8+ (hooks support)

## Performance

- Uses GSAP for hardware-accelerated animations
- Optimized re-renders with refs
- Cleanup on component unmount
- Efficient audio event handling

## Examples

Check out the `AudioPlayerShowcase` component for a complete demo of all templates with switching functionality.

## License

This component is part of a React component library. Feel free to use and modify according to your project's license.
