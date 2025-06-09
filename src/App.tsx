import { Button } from "./components/button"

function App() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-5">
            <Button>Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="danger" size="lg">Danger Large</Button>
        </div>
    )
}

export default App;
