import { useRef } from "react";
import { LevelData } from "./types";

export const ControlPanel: React.FC<{
    onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onExportLevel: () => void;
    onShowHints: () => void;
    onLoadLevel: (level: LevelData) => void;
    availableLevels: LevelData[];
    currentLevel: number;
    isLoading: boolean;
}> = ({
    onFileUpload,
    onExportLevel,
    onShowHints,
    onLoadLevel,
    availableLevels,
    currentLevel,
    isLoading
}) => {
        const fileInputRef = useRef<HTMLInputElement>(null);

        return (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <input
                        type="file"
                        accept=".json"
                        onChange={onFileUpload}
                        ref={fileInputRef}
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        {isLoading ? 'Loading...' : 'Load JSON Level'}
                    </button>
                    <button
                        onClick={onExportLevel}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Export Level
                    </button>
                    <button
                        onClick={onShowHints}
                        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Show Hints
                    </button>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                    {availableLevels.map((level) => (
                        <button
                            key={level.level}
                            onClick={() => onLoadLevel(level)}
                            className={`py-1 px-3 rounded-lg font-semibold transition-colors duration-200 ${level.level === currentLevel
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {level.level}
                        </button>
                    ))}
                </div>
            </div>
        );
    };