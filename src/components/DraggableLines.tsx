import React, { useState, useEffect } from 'react'

type Line = {
    id: string
    content: string
    correctPosition: number
}

type DraggableLinesProps = {
    initialLines: Line[]
    onSuccess: () => void
}

const DraggableLines: React.FC<DraggableLinesProps> = ({ initialLines, onSuccess }) => {
    const [lines, setLines] = useState<Line[]>(initialLines)

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
        e.dataTransfer.setData('text/plain', index.toString())
    }

    const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
        e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent<HTMLLIElement>, dropIndex: number) => {
        e.preventDefault()
        const dragIndex = parseInt(e.dataTransfer.getData('text/plain'), 10)
        const newLines = [...lines]
        const [reorderedItem] = newLines.splice(dragIndex, 1)
        newLines.splice(dropIndex, 0, reorderedItem)
        setLines(newLines)
    }

    useEffect(() => {
        const isCorrectOrder = lines.every((line, index) => line.correctPosition === index + 1)
        if (isCorrectOrder) {
            onSuccess()
        }
    }, [lines, onSuccess])

    return (
        <ul className="space-y-2">
            {lines.map((line, index) => (
                <li
                    key={line.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    className="p-4 bg-600 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-800 transition-colors cursor-move"
                >
                    <pre>{line.content}</pre>
                </li>
            ))}
        </ul>
    )
}


export default DraggableLines;