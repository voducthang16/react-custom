import { createFileRoute } from '@tanstack/react-router'
import ZipPuzzleGame from '../components/zip/main';

export const Route = createFileRoute('/zip')({
    component: RouteComponent,
    staticData: {
        title: 'Zip Puzzle Game',
    },
})


interface Cell {
    id: string;
    row: number;
    col: number;
    number?: number;
    isPath: boolean;
    isStart: boolean;
    isEnd: boolean;
    pathOrder?: number;
    isHint?: boolean;
}

interface LevelData {
    level: number;
    matrixSize: number;
    connectNumbers: number[];
    numberedCells: {
        row: number;
        col: number;
        number: number;
    }[];
    hints?: {
        row: number;
        col: number;
        direction?: 'up' | 'down' | 'left' | 'right';
    }[];
    title?: string;
    description?: string;
}

interface GameState {
    grid: Cell[][];
    currentPath: Cell[];
    isComplete: boolean;
    nextNumber: number;
    maxNumber: number;
    currentLevel: number;
}


function RouteComponent() {
    return <div><ZipPuzzleGame /></div>
}
