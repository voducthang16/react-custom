import { LevelData } from "./types";

export const LevelInfo: React.FC<{
    levelData: LevelData | null;
    currentLevel: number;
    nextNumber: number;
    maxNumber: number;
}> = ({ levelData, currentLevel, nextNumber, maxNumber }) => {
    return (
        <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Dynamic Zip Puzzle</h1>
            <p className="text-gray-600">Load custom levels from JSON files!</p>

            {levelData && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h2 className="text-xl font-semibold text-blue-800">{levelData.title}</h2>
                    <p className="text-blue-600">{levelData.description}</p>
                </div>
            )}

            <div className="flex justify-center items-center gap-4 mt-4">
                <div className="text-lg font-semibold text-blue-600">
                    Level: {currentLevel}
                </div>
                <div className="text-lg font-semibold text-green-600">
                    Next: {nextNumber > maxNumber ? '✓' : nextNumber}
                </div>
                <div className="text-lg font-semibold text-purple-600">
                    Size: {levelData?.matrixSize}×{levelData?.matrixSize}
                </div>
            </div>
        </div>
    );
};
