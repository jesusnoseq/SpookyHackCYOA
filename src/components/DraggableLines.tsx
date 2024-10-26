'use client'

import React, { useState, useEffect } from 'react'
import { GripVertical } from 'lucide-react'

type Line = {
    id: string
    content: string
    correctPosition: number
}

type DraggableLinesProps = {
    initialLines: Line[]
    onSuccess: () => void
}

export default function DraggableLines({ initialLines, onSuccess }: DraggableLinesProps) {
    const [lines, setLines] = useState<Line[]>(initialLines)
    const [draggedItem, setDraggedItem] = useState<number | null>(null)

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
        e.dataTransfer.setData('text/plain', index.toString())
        setDraggedItem(index)
    }

    const handleDragOver = (e: React.DragEvent<HTMLLIElement>, index: number) => {
        e.preventDefault()
        const draggedOverItem = lines[index]
        const draggedItemContent = lines[draggedItem!]

        if (draggedOverItem === draggedItemContent) return

        const newLines = [...lines]
        newLines[index] = draggedItemContent
        newLines[draggedItem!] = draggedOverItem
        setLines(newLines)
        setDraggedItem(index)
    }

    const handleDragEnd = () => {
        setDraggedItem(null)
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
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`p-4 bg-background border border-input rounded-lg shadow-sm hover:bg-accent transition-colors cursor-move flex items-center gap-4 ${draggedItem === index ? 'opacity-50' : ''
                        }`}
                >
                    <GripVertical className="text-muted-foreground" />
                    <pre className="flex-grow">{line.content}</pre>
                </li>
            ))}
        </ul>
    )
}