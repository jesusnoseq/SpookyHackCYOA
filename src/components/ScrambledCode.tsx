import React from 'react'
import DraggableLines from './DraggableLines'

interface Line {
    id: string;
    content: string;
    correctPosition: number;
}

const initialLines: Line[] = shuffleArray([
    { id: '1', content: 'function is_prime(n):', correctPosition: 1 },
    { id: '2', content: '    if n < 2:', correctPosition: 2 },
    { id: '3', content: '        return False', correctPosition: 3 },
    { id: '4', content: '    for i in range(2, int(n ** 0.5) + 1):', correctPosition: 4 },
    { id: '5', content: '        if n % i == 0:', correctPosition: 5 },
    { id: '6', content: '            return False', correctPosition: 6 },
    { id: '7', content: '    return True', correctPosition: 7 },
])

function shuffleArray(al: Line[]) {
    for (let i = al.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [al[i], al[j]] = [al[j], al[i]];
    }

    return al;
}


type ScrambledCodeProps = {
    onSuccess: () => void
}

const ScrambledCode: React.FC<ScrambledCodeProps> = ({ onSuccess }) => {
    const handleSuccess = () => {
        onSuccess();
    }

    return (
        <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-90 p-6">
            <div className="max-w-md mx-auto">
                <div className="max-w-md mx-auto mt-10 p-6 bg-gray-700 rounded-xl shadow-md">
                    <h1 className="text-2xl font-bold mb-4 text-center">Reorder the Lines of code</h1>
                    <p className="mb-4 text-gray-100 text-center">Drag and drop the lines to put them in the correct order.</p>
                    <DraggableLines initialLines={initialLines} onSuccess={handleSuccess} />
                </div>
            </div>
        </div>
    )
}

export default ScrambledCode;