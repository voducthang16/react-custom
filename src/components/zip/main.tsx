import { useEffect, useState } from "react";
import { Cell, GameState, LevelData } from "./types";
import { LevelInfo } from "./level-info";
import { ControlPanel } from "./control-panel";
import { GameGrid } from "./grid";
import { GameActions } from "./game-actions";
import { Instructions } from "./instructions";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const useGameAnimations = () => {
    const { contextSafe } = useGSAP();

    const animateCell = contextSafe((cellId: string, type: 'connect' | 'disconnect' | 'complete' | 'hint') => {
        const cellElement = document.querySelector(`[data-cell-id="${cellId}"]`);
        if (!cellElement) return;

        switch (type) {
            case 'connect':
                gsap.fromTo(cellElement,
                    { scale: 1 },
                    { scale: 1.15, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.inOut" }
                );
                break;
            case 'disconnect':
                gsap.to(cellElement, { scale: 1, duration: 0.3, ease: "power2.out" });
                break;
            case 'complete':
                gsap.fromTo(cellElement,
                    { scale: 1, rotateZ: 0 },
                    { scale: 1.3, rotateZ: 360, duration: 0.6, yoyo: true, repeat: 1, ease: "power2.inOut" }
                );
                break;
            case 'hint':
                gsap.fromTo(cellElement,
                    { scale: 1, opacity: 0.7 },
                    { scale: 1.1, opacity: 1, duration: 1, yoyo: true, repeat: -1, ease: "sine.inOut" }
                );
                break;
        }
    });

    const animateCompletion = contextSafe((cells: Cell[]) => {
        cells.forEach((cell, index) => {
            setTimeout(() => animateCell(cell.id, 'complete'), index * 30);
        });
    });

    return { animateCell, animateCompletion };
};

// Sample Levels Data
const getSampleLevels = (): LevelData[] => [
    {
        level: 1,
        matrixSize: 4,
        connectNumbers: [1, 2, 3, 4],
        numberedCells: [
            { row: 0, col: 0, number: 1 },
            { row: 1, col: 2, number: 2 },
            { row: 2, col: 3, number: 3 },
            { row: 3, col: 1, number: 4 }
        ],
        hints: [
            { row: 0, col: 1, direction: 'right' },
            { row: 1, col: 1, direction: 'down' }
        ],
        title: "Easy Start",
        description: "Connect numbers 1-4 to fill the grid"
    },
    {
        level: 2,
        matrixSize: 5,
        connectNumbers: [1, 2, 3, 4, 5],
        numberedCells: [
            { row: 0, col: 2, number: 1 },
            { row: 2, col: 0, number: 2 },
            { row: 4, col: 2, number: 3 },
            { row: 2, col: 4, number: 4 },
            { row: 1, col: 1, number: 5 }
        ],
        hints: [
            { row: 0, col: 1, direction: 'down' },
            { row: 1, col: 0, direction: 'right' },
            { row: 3, col: 2, direction: 'up' }
        ],
        title: "Cross Pattern",
        description: "Navigate the cross-shaped challenge"
    },
    {
        level: 3,
        matrixSize: 6,
        connectNumbers: [1, 2, 3, 4, 5, 6],
        numberedCells: [
            { row: 0, col: 0, number: 1 },
            { row: 0, col: 5, number: 2 },
            { row: 5, col: 5, number: 3 },
            { row: 5, col: 0, number: 4 },
            { row: 2, col: 2, number: 5 },
            { row: 3, col: 3, number: 6 }
        ],
        hints: [
            { row: 0, col: 2, direction: 'right' },
            { row: 2, col: 5, direction: 'down' },
            { row: 3, col: 2, direction: 'left' }
        ],
        title: "Border Challenge",
        description: "Connect the corners and center"
    }
];

const ZipPuzzleGame: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>({
        grid: [],
        currentPath: [],
        isComplete: false,
        nextNumber: 1,
        maxNumber: 0,
        currentLevel: 1
    });
    const [isDrawing, setIsDrawing] = useState(false);
    const [levelData, setLevelData] = useState<LevelData | null>(null);
    const [availableLevels, setAvailableLevels] = useState<LevelData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { animateCell, animateCompletion } = useGameAnimations();

    // Initialize with sample levels
    useEffect(() => {
        const sampleLevels = getSampleLevels();
        setAvailableLevels(sampleLevels);
        loadLevel(sampleLevels[0]);
    }, []);

    // Load level from JSON data
    const loadLevel = (data: LevelData) => {
        setLevelData(data);

        const grid: Cell[][] = [];

        // Create empty grid
        for (let row = 0; row < data.matrixSize; row++) {
            grid[row] = [];
            for (let col = 0; col < data.matrixSize; col++) {
                grid[row][col] = {
                    id: `${row}-${col}`,
                    row,
                    col,
                    isPath: false,
                    isStart: false,
                    isEnd: false,
                    isHint: false
                };
            }
        }

        // Place numbered cells
        data.numberedCells.forEach(cell => {
            if (grid[cell.row] && grid[cell.row][cell.col]) {
                grid[cell.row][cell.col].number = cell.number;
                if (cell.number === 1) grid[cell.row][cell.col].isStart = true;
                if (cell.number === Math.max(...data.connectNumbers)) {
                    grid[cell.row][cell.col].isEnd = true;
                }
            }
        });

        // Place hints
        if (data.hints) {
            data.hints.forEach(hint => {
                if (grid[hint.row] && grid[hint.row][hint.col]) {
                    grid[hint.row][hint.col].isHint = true;
                }
            });
        }

        setGameState({
            grid,
            currentPath: [],
            isComplete: false,
            nextNumber: 1,
            maxNumber: Math.max(...data.connectNumbers),
            currentLevel: data.level
        });
    };

    // Handle JSON file upload
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target?.result as string);

                if (Array.isArray(jsonData)) {
                    setAvailableLevels(jsonData);
                    if (jsonData.length > 0) {
                        loadLevel(jsonData[0]);
                    }
                } else {
                    setAvailableLevels([jsonData]);
                    loadLevel(jsonData);
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                alert('Invalid JSON file format');
                setIsLoading(false);
            }
        };

        reader.readAsText(file);
    };

    // Check if two cells are adjacent
    const areAdjacent = (cell1: Cell, cell2: Cell): boolean => {
        const rowDiff = Math.abs(cell1.row - cell2.row);
        const colDiff = Math.abs(cell1.col - cell2.col);
        return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    };

    // Handle cell interaction
    const handleCellInteraction = (cell: Cell) => {
        if (gameState.isComplete) return;

        const newGameState = { ...gameState };
        const newGrid = newGameState.grid.map(row =>
            row.map(c => ({ ...c, isPath: false }))
        );

        // If starting a new path - MUST start from number 1
        if (newGameState.currentPath.length === 0) {
            if (cell.number === 1) {
                newGameState.currentPath = [cell];
                newGameState.nextNumber = 2;
                animateCell(cell.id, 'connect');
                
                // Update path visualization
                newGrid[cell.row][cell.col].isPath = true;
                setGameState({ ...newGameState, grid: newGrid });
            }
            return;
        }

        const lastCell = newGameState.currentPath[newGameState.currentPath.length - 1];

        // If clicking on the same cell, do nothing
        if (cell.id === lastCell.id) return;

        // If cell is already in path, truncate path to that point
        const existingIndex = newGameState.currentPath.findIndex(c => c.id === cell.id);
        if (existingIndex !== -1) {
            const removedCells = newGameState.currentPath.slice(existingIndex + 1);
            newGameState.currentPath = newGameState.currentPath.slice(0, existingIndex + 1);

            // Animate removed cells
            removedCells.forEach(c => animateCell(c.id, 'disconnect'));

            // Update next number based on the last numbered cell in remaining path
            let lastNumberInPath = 1; // Default to 1 since we start from 1
            for (let i = newGameState.currentPath.length - 1; i >= 0; i--) {
                if (newGameState.currentPath[i].number) {
                    lastNumberInPath = newGameState.currentPath[i].number!;
                    break;
                }
            }
            newGameState.nextNumber = lastNumberInPath + 1;

            // Update path visualization
            newGameState.currentPath.forEach(pathCell => {
                newGrid[pathCell.row][pathCell.col].isPath = true;
            });

            setGameState({ ...newGameState, grid: newGrid });
            return;
        }

        // Check if move is valid (must be adjacent and not already in path)
        if (!areAdjacent(cell, lastCell)) return;

        // CRITICAL: If cell has a number, it MUST be the next expected number
        if (cell.number) {
            if (cell.number !== newGameState.nextNumber) return;
            // If it's the correct number, update nextNumber
            newGameState.nextNumber = cell.number + 1;
        }

        // Add cell to path
        newGameState.currentPath.push(cell);
        
        // Set path order for visualization (chỉ cho ô không có số)
        if (!cell.number) {
            cell.pathOrder = newGameState.currentPath.length;
        }
        
        animateCell(cell.id, 'connect');

        // Check if puzzle is complete: 
        // 1. Must reach the final number
        // 2. Must fill entire grid
        const totalCells = newGameState.grid.length * newGameState.grid[0].length;
        const reachedFinalNumber = cell.number === newGameState.maxNumber;
        const filledEntireGrid = newGameState.currentPath.length === totalCells;
        
        if (reachedFinalNumber && filledEntireGrid) {
            newGameState.isComplete = true;
            setIsDrawing(false);

            setTimeout(() => {
                animateCompletion(newGameState.currentPath);
            }, 300);
        }

        // Update path visualization
        newGameState.currentPath.forEach(pathCell => {
            newGrid[pathCell.row][pathCell.col].isPath = true;
        });

        setGameState({ ...newGameState, grid: newGrid });
    };

    // Mouse event handlers
    const handleMouseDown = (cell: Cell) => {
        // Bắt đầu dragging - chỉ cho phép bắt đầu từ số 1 nếu chưa có path
        if (gameState.currentPath.length === 0) {
            if (cell.number === 1) {
                setIsDrawing(true);
                handleCellInteraction(cell);
            }
        } else {
            // Nếu đã có path, cho phép click vào bất kỳ ô nào trong path để truncate
            // hoặc tiếp tục từ ô cuối
            setIsDrawing(true);
            handleCellInteraction(cell);
        }
    };

    const handleMouseEnter = (cell: Cell) => {
        if (!isDrawing || gameState.currentPath.length === 0) return;
        
        const lastCell = gameState.currentPath[gameState.currentPath.length - 1];
        
        // Chỉ xử lý nếu:
        // 1. Ô kề cạnh với ô cuối cùng trong path
        // 2. Hoặc ô đã có trong path (để truncate)
        const isAdjacent = areAdjacent(cell, lastCell);
        const isInPath = gameState.currentPath.some(c => c.id === cell.id);
        
        if (isAdjacent || isInPath) {
            handleCellInteraction(cell);
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    // Reset game
    const resetGame = () => {
        const newGrid = gameState.grid.map(row =>
            row.map(cell => ({ ...cell, isPath: false }))
        );

        setGameState(prev => ({
            ...prev,
            grid: newGrid,
            currentPath: [],
            nextNumber: 1,
            isComplete: false
        }));
        setIsDrawing(false);
    };

    // Load next level
    const loadNextLevel = () => {
        const currentIndex = availableLevels.findIndex(l => l.level === gameState.currentLevel);
        const nextIndex = (currentIndex + 1) % availableLevels.length;
        loadLevel(availableLevels[nextIndex]);
    };

    // Show hints
    const showHints = () => {
        if (!levelData?.hints) return;

        levelData.hints.forEach(hint => {
            const cell = gameState.grid[hint.row]?.[hint.col];
            if (cell) {
                animateCell(cell.id, 'hint');
            }
        });
    };

    // Export current level as JSON
    const exportLevel = () => {
        if (!levelData) return;

        const dataStr = JSON.stringify(levelData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `level_${levelData.level}.json`;
        link.click();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
                <LevelInfo
                    levelData={levelData}
                    currentLevel={gameState.currentLevel}
                    nextNumber={gameState.nextNumber}
                    maxNumber={gameState.maxNumber}
                />

                <ControlPanel
                    onFileUpload={handleFileUpload}
                    onExportLevel={exportLevel}
                    onShowHints={showHints}
                    onLoadLevel={loadLevel}
                    availableLevels={availableLevels}
                    currentLevel={gameState.currentLevel}
                    isLoading={isLoading}
                />

                <GameGrid
                    grid={gameState.grid}
                    onCellMouseDown={handleMouseDown}
                    onCellMouseEnter={handleMouseEnter}
                    onMouseUp={handleMouseUp}
                />

                <GameActions
                    onReset={resetGame}
                    onNextLevel={loadNextLevel}
                    isComplete={gameState.isComplete}
                />

                <Instructions />
            </div>
        </div>
    );
};

export default ZipPuzzleGame;