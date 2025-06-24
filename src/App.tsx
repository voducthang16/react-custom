import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AudioPlayerShowcase } from "@/components/audio-player";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';

gsap.registerPlugin(useGSAP);

function App() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const floatingBoxRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const morphingShapeRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);
    const scrollTriggerRef = useRef<HTMLDivElement>(null);
    const textAnimationRef = useRef<HTMLDivElement>(null);
    const magneticButtonRef = useRef<HTMLButtonElement>(null);
    
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentShape, setCurrentShape] = useState(0);
    const [showAudioPlayer, setShowAudioPlayer] = useState(false);

    if (showAudioPlayer) {
        return <AudioPlayerShowcase onBack={() => setShowAudioPlayer(false)} />;
    }

    // Main entrance animation
    useGSAP(() => {
        const tl = gsap.timeline();

        // Animate the main title
        tl.from(textRef.current, {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "bounce.out"
        })
        // Animate the card entrance
        .from(cardRef.current, {
            scale: 0,
            rotation: 180,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)"
        }, "-=0.5")
        // Stagger animate buttons
        .from(buttonsRef.current?.children || [], {
            x: -100,
            opacity: 0,
            duration: 0.5,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.3")
        // Animate floating box
        .from(floatingBoxRef.current, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
        }, "-=0.5");
    }, { scope: containerRef });

    // Floating animation for the box
    useGSAP(() => {
        gsap.to(floatingBoxRef.current, {
            y: -20,
            duration: 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });
    }, { scope: containerRef });

    // Button hover animations
    const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
        gsap.to(e.currentTarget, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        gsap.to(e.currentTarget, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    // Card rotation animation
    const handleCardClick = () => {
        if (!isPlaying) {
            setIsPlaying(true);
            gsap.to(cardRef.current, {
                rotationY: 360,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => setIsPlaying(false)
            });
        }
    };

    // Timeline animation for buttons
    const animateButtons = () => {
        const tl = gsap.timeline();
        
        tl.to(buttonsRef.current?.children || [], {
            y: -10,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out"
        })
        .to(buttonsRef.current?.children || [], {
            y: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: "bounce.out"
        });
    };

    // Morphing shape animation
    const morphShape = () => {
        const shapes = ['50%', '20% 40%', '0%', '50%'];
        const nextShape = (currentShape + 1) % shapes.length;

        gsap.to(morphingShapeRef.current, {
            borderRadius: shapes[nextShape],
            rotation: nextShape * 90,
            scale: 1.2,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
            onComplete: () => {
                gsap.to(morphingShapeRef.current, {
                    scale: 1,
                    duration: 0.3
                });
            }
        });

        setCurrentShape(nextShape);
    };

    // Progress bar animation
    const animateProgress = () => {
        setProgress(0);
        gsap.to(progressBarRef.current, {
            width: "100%",
            duration: 3,
            ease: "power2.out",
            onUpdate: function() {
                setProgress(Math.round(this.progress() * 100));
            }
        });
    };

    // Text typing animation
    const typeText = () => {
        const text = "GSAP is amazing for animations!";
        const textEl = textAnimationRef.current;
        if (!textEl) return;
        
        textEl.textContent = "";
        
        gsap.fromTo(textEl, 
            { opacity: 0 },
            { 
                opacity: 1, 
                duration: 0.5,
                onComplete: () => {
                    gsap.to({}, {
                        duration: text.length * 0.05,
                        ease: "none",
                        onUpdate: function() {
                            const progress = Math.round(this.progress() * text.length);
                            textEl.textContent = text.slice(0, progress);
                        }
                    });
                }
            }
        );
    };

    // Magnetic effect for button
    const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = magneticButtonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleMagneticLeave = () => {
        gsap.to(magneticButtonRef.current, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
        });
    };

    // Particle explosion effect
    const createParticles = () => {
        const container = particlesRef.current;
        if (!container) return;
        
        // Clear existing particles
        container.innerHTML = '';
        
        // Create particles
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute w-3 h-3 bg-yellow-400 rounded-full';
            particle.style.left = '50%';
            particle.style.top = '50%';
            container.appendChild(particle);
            
            const angle = (i / 12) * Math.PI * 2;
            const distance = 100 + Math.random() * 50;
            
            gsap.to(particle, {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                scale: 0,
                opacity: 0,
                duration: 1 + Math.random() * 0.5,
                ease: "power2.out",
                onComplete: () => particle.remove()
            });
        }
    };

    // Continuous rotation animation
    useGSAP(() => {
        gsap.to(".rotating-element", {
            rotation: 360,
            duration: 8,
            ease: "none",
            repeat: -1
        });
    }, { scope: containerRef });

    // Wave animation
    useGSAP(() => {
        gsap.to(".wave", {
            y: -10,
            duration: 1,
            ease: "sine.inOut",
            stagger: 0.1,
            yoyo: true,
            repeat: -1
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 gap-8 p-4">
            <h1 ref={textRef} className="text-4xl font-bold text-gray-800 mb-4">
                GSAP + React Examples
            </h1>
            
            <Card ref={cardRef} className="cursor-pointer shadow-lg hover:shadow-xl transition-shadow" onClick={handleCardClick}>
                <CardHeader>
                    <h2 className="text-xl font-semibold">Interactive Card</h2>
                    <p className="text-gray-600">Click me to rotate!</p>
                </CardHeader>
                <CardContent>
                    <div ref={buttonsRef} className="flex flex-col gap-3">
                        <Button 
                            onMouseEnter={handleButtonHover}
                            onMouseLeave={handleButtonLeave}
                        >
                            Hover Effect
                        </Button>
                        <Button 
                            color="secondary"
                            onMouseEnter={handleButtonHover}
                            onMouseLeave={handleButtonLeave}
                        >
                            Secondary Hover
                        </Button>
                        <Button 
                            color="danger" 
                            size="lg"
                            onMouseEnter={handleButtonHover}
                            onMouseLeave={handleButtonLeave}
                        >
                            Danger Large
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Button 
                        size="sm" 
                        onClick={animateButtons}
                        className="flex-1"
                    >
                        Animate Buttons
                    </Button>
                    <Button 
                        size="sm"
                        color="secondary"
                        onClick={() => setShowAudioPlayer(true)}
                        className="flex-1"
                    >
                        🎵 Audio Player
                    </Button>
                </CardFooter>
            </Card>

            {/* Floating animated box */}
            <div 
                ref={floatingBoxRef} 
                className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg flex items-center justify-center"
            >
                <span className="text-white font-bold">Float</span>
            </div>

            {/* Additional animated elements */}
            <div className="grid grid-cols-3 gap-4 mt-8">
                {[1, 2, 3].map((num) => (
                    <div
                        key={num}
                        className="w-16 h-16 bg-blue-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold cursor-pointer"
                        onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, {
                                rotation: 180,
                                scale: 1.2,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, {
                                rotation: 0,
                                scale: 1,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        }}
                    >
                        {num}
                    </div>
                ))}
            </div>

            {/* Morphing Shape Section */}
            <div className="flex flex-col items-center gap-4 mt-12">
                <h2 className="text-2xl font-semibold text-gray-800">Morphing Shapes</h2>
                <div 
                    ref={morphingShapeRef}
                    className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 cursor-pointer shadow-lg"
                    onClick={morphShape}
                />
                <Button onClick={morphShape} size="sm">
                    Morph Shape
                </Button>
            </div>

            {/* Progress Bar Animation */}
            <div className="w-full max-w-md mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Progress Animation</h2>
                <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                        ref={progressBarRef}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-0"
                    />
                </div>
                <div className="text-center mt-2 text-gray-600">{progress}%</div>
                <Button onClick={animateProgress} className="w-full mt-2" size="sm">
                    Animate Progress
                </Button>
            </div>

            {/* Text Animation Section */}
            <div className="text-center mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Text Typing Effect</h2>
                <div 
                    ref={textAnimationRef}
                    className="text-lg font-mono text-blue-600 h-8 mb-4"
                />
                <Button onClick={typeText} size="sm">
                    Type Text
                </Button>
            </div>

            {/* Magnetic Button */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Magnetic Effect</h2>
                <Button
                    // ref={magneticButtonRef}
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                    color="danger"
                    size="lg"
                    className="magnetic-button"
                >
                    Magnetic Button
                </Button>
            </div>

            {/* Particle Explosion */}
            <div className="relative mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Particle Effect</h2>
                <div 
                    ref={particlesRef}
                    className="relative w-32 h-32 mx-auto"
                />
                <Button onClick={createParticles} className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    Explode!
                </Button>
            </div>

            {/* Rotating Elements */}
            <div className="mt-12">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Continuous Animations</h2>
                <div className="flex justify-center gap-6">
                    <div className="rotating-element w-16 h-16 bg-red-500 rounded-lg"></div>
                    <div className="rotating-element w-16 h-16 bg-green-500 rounded-full" style={{ animationDelay: '2s' }}></div>
                    <div className="rotating-element w-16 h-16 bg-purple-500" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animationDelay: '4s' }}></div>
                </div>
            </div>

            {/* Wave Animation */}
            <div className="mt-12 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Wave Effect</h2>
                <div className="flex justify-center gap-2">
                    {[...Array(8)].map((_, i) => (
                        <div 
                            key={i}
                            className="wave w-4 h-12 bg-blue-500 rounded-full"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        />
                    ))}
                </div>
            </div>

            {/* Interactive Grid with Complex Animations */}
            <div className="mt-12">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Interactive Grid</h2>
                <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
                    {[...Array(16)].map((_, i) => (
                        <div
                            key={i}
                            className="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded cursor-pointer flex items-center justify-center text-white text-xs font-bold"
                            onMouseEnter={(e) => {
                                gsap.to(e.currentTarget, {
                                    scale: 1.3,
                                    rotation: 45,
                                    borderRadius: "50%",
                                    backgroundColor: "#fbbf24",
                                    duration: 0.3,
                                    ease: "back.out(1.7)"
                                });
                            }}
                            onMouseLeave={(e) => {
                                gsap.to(e.currentTarget, {
                                    scale: 1,
                                    rotation: 0,
                                    borderRadius: "0.375rem",
                                    backgroundColor: "#ec4899",
                                    duration: 0.3,
                                    ease: "back.out(1.7)"
                                });
                            }}
                            onClick={(e) => {
                                gsap.to(e.currentTarget, {
                                    scale: 2,
                                    rotation: 720,
                                    duration: 1,
                                    ease: "elastic.out(1, 0.3)",
                                    yoyo: true,
                                    repeat: 1
                                });
                            }}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App;
