import React, { useState, useCallback } from 'react'
import { Upload, Ghost } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { uploadImage } from '../api';

interface SpookyUploadProps {
    onUpload: (id: string) => void
}

export default function Component({ onUpload }: SpookyUploadProps = { onUpload: () => { } }) {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
            setError(null)
        }
    }

    const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true)
        } else if (e.type === 'dragleave') {
            setIsDragging(false)
        }
    }, [])

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0])
            setError(null)
        }
    }, [])

    const uploadToCloudinary = async () => {
        if (!file) {
            setError('Please select an image')
            return
        }

        setUploading(true)
        setError(null)

        try {
            const respData = await uploadImage(file)
            setUploadedUrl(respData.secure_url)
            const filename = respData.secure_url.split('/').pop()
            onUpload(filename || '')
        } catch (err) {
            setError('Failed to upload image. Please try again.')
            console.error('Upload error:', err)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-gray-100 flex items-center justify-center">
                    <Ghost className="mr-2" />
                    Upload an image with a face
                </h2>
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center cursor-pointer ${isDragging ? 'border-red-500 bg-gray-700' : 'border-gray-600 bg-gray-700'
                        }`}
                >
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        disabled={uploading}
                        className="hidden"
                        id="fileInput"
                    />
                    <label htmlFor="fileInput" className="cursor-pointer text-gray-300 p-6">
                        {file ? file.name : 'Drag and drop an image here, or click to select'}
                    </label>
                </div>
                <button
                    onClick={uploadToCloudinary}
                    disabled={!file || uploading}
                    className="rounded p-2 w-full bg-red-800 hover:bg-red-700 disabled:bg-red-700 disabled:opacity-50 text-white"
                >
                    {uploading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center">
                            <Upload className="mr-2 h-4 w-4" /> Upload Image
                        </span>
                    )}
                </button>
                {error && <p className="mt-4 text-red-400 text-center">{error}</p>}
                {uploadedUrl && (
                    <div className="mt-6">
                        <p className="text-green-400 mb-2 text-center">Image uploaded successfully!</p>
                        <img src={uploadedUrl} alt="Uploaded image" className="w-full rounded-lg shadow-lg" />
                        <button
                            onClick={() => navigate('/story')}
                            className="w-full mt-4 p-4 rounded bg-green-900 hover:bg-green-700 text-white"
                        >
                            Start Your Spooky Journey
                        </button>
                    </div>
                )}
            </div>
        </div >
    )
}