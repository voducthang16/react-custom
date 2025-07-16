export const Instructions: React.FC = () => {
    return (
        <div className="mt-6 text-sm text-gray-600">
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <p className="font-semibold mb-2">How to play:</p>
                    <p>• Click and drag from number 1 to start</p>
                    <p>• Connect numbers in sequence</p>
                    <p>• Fill entire grid to complete level</p>
                    <p>• Click on path to truncate back to that point</p>
                </div>
                <div>
                    <p className="font-semibold mb-2">JSON Format:</p>
                    <pre className="text-xs bg-gray-100 p-2 rounded">
                        {`{
  "level": 1,
  "matrixSize": 4,
  "connectNumbers": [1,2,3,4],
  "numberedCells": [
    {"row": 0, "col": 0, "number": 1}
  ],
  "hints": [
    {"row": 0, "col": 1, "direction": "right"}
  ],
  "title": "Level Title",
  "description": "Level description"
}`}
                    </pre>
                </div>
            </div>
        </div>
    );
};
