export const GameActions: React.FC<{
    onReset: () => void;
    onNextLevel: () => void;
    isComplete: boolean;
}> = ({ onReset, onNextLevel, isComplete }) => {
    return (
        <div className="text-center">
            {isComplete && (
                <div className="mb-6">
                    <div className="text-2xl font-bold text-green-600 mb-4">🎉 Level Complete! 🎉</div>
                    <button
                        onClick={onNextLevel}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 mr-4"
                    >
                        Next Level
                    </button>
                </div>
            )}

            <div className="flex justify-center gap-4">
                <button
                    onClick={onReset}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    Reset Path
                </button>
            </div>
        </div>
    );
};