import { useRef } from "react";
import { Cell } from "./types";

export const GameCell: React.FC<{
    cell: Cell;
    onMouseDown: (cell: Cell) => void;
    onMouseEnter: (cell: Cell) => void;
}> = ({ cell, onMouseDown, onMouseEnter }) => {
    const cellRef = useRef<HTMLDivElement>(null);

    const getCellStyle = () => {
        let baseClasses = "w-14 h-14 border-2 flex items-center justify-center text-lg font-bold cursor-pointer transition-all duration-200 rounded-lg ";

        if (cell.number) {
            // Numbered cells - màu vàng nổi bật
            baseClasses += "bg-gradient-to-br from-yellow-300 to-yellow-400 text-yellow-900 border-yellow-500 shadow-lg ";
            if (cell.isStart) baseClasses += "ring-4 ring-green-400 "; // Điểm bắt đầu - viền xanh lá
            if (cell.isEnd) baseClasses += "ring-4 ring-red-400 "; // Điểm kết thúc - viền đỏ
        } else if (cell.isPath) {
            // Path cells - màu xanh dương
            baseClasses += "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-700 shadow-md ";
            baseClasses += "ring-2 ring-blue-300 "; // Ring effect cho path
        } else if (cell.isHint) {
            // Hint cells - màu tím
            baseClasses += "bg-gradient-to-br from-purple-200 to-purple-300 border-purple-400 ";
        } else {
            // Empty cells - màu xám, hover effect
            baseClasses += "bg-gray-100 hover:bg-gray-200 border-gray-300 ";
        }

        return baseClasses;
    };

    return (
        <div
            ref={cellRef}
            data-cell-id={cell.id}
            className={getCellStyle()}
            onMouseDown={(e) => {
                e.preventDefault(); // Ngăn chặn default drag behavior
                onMouseDown(cell);
            }}
            onMouseEnter={(e) => {
                e.preventDefault();
                onMouseEnter(cell);
            }}
            style={{ 
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
            }}
        >
            {cell.number || (cell.isPath && cell.pathOrder ? cell.pathOrder : '')}
        </div>
    );
};