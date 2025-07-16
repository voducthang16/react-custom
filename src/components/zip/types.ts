export interface Cell {
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

export interface LevelData {
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

export interface GameState {
    grid: Cell[][];
    currentPath: Cell[];
    isComplete: boolean;
    nextNumber: number;
    maxNumber: number;
    currentLevel: number;
}