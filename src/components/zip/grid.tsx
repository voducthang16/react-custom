import { useRef } from "react";
import { Cell } from "./types";
import { GameCell } from "./cell";

export const GameGrid: React.FC<{
    grid: Cell[][];
    onCellMouseDown: (cell: Cell) => void;
    onCellMouseEnter: (cell: Cell) => void;
    onMouseUp: () => void;
}> = ({ grid, onCellMouseDown, onCellMouseEnter, onMouseUp }) => {
    const gridRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={gridRef}
            className="grid gap-2 mx-auto mb-6 select-none p-4 bg-gray-50 rounded-xl"
            style={{
                gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))`,
                width: 'fit-content'
            }}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onContextMenu={(e) => e.preventDefault()} // Ngăn context menu
        >
            {grid.flat().map((cell) => (
                <GameCell
                    key={cell.id}
                    cell={cell}
                    onMouseDown={onCellMouseDown}
                    onMouseEnter={onCellMouseEnter}
                />
            ))}
        </div>
    );
};
