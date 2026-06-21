import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, File, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function FileUploader({ onUpload, maxFiles = 5, maxSize = 5 * 1024 * 1024, accept = { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }, className }) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => (
      Object.assign(file, { preview: URL.createObjectURL(file) })
    ));
    setFiles((prev) => [...prev, ...newFiles].slice(0, maxFiles));
    onUpload?.(acceptedFiles);
  }, [maxFiles, onUpload]);

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept,
  });

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-200',
          isDragActive
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
            : 'border-secondary-300 dark:border-secondary-600 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-secondary-50 dark:hover:bg-secondary-800/50'
        )}
      >
        <input {...getInputProps()} />
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-100 dark:bg-secondary-700">
          <Upload className="h-6 w-6 text-secondary-400 dark:text-secondary-500" />
        </div>
        {isDragActive ? (
          <p className="text-sm font-medium text-primary-600 dark:text-primary-400">Drop files here</p>
        ) : (
          <>
            <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
              Drag & drop files or <span className="text-primary-600 dark:text-primary-400">browse</span>
            </p>
            <p className="mt-1 text-xs text-secondary-400">
              PNG, JPG, WebP up to {Math.round(maxSize / 1024 / 1024)}MB
            </p>
          </>
        )}
      </div>
      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file, index) => (
            <li key={index} className="flex items-center gap-3 rounded-lg border border-secondary-200 bg-white p-3 dark:bg-secondary-800 dark:border-secondary-700">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-secondary-100 dark:bg-secondary-700 overflow-hidden">
                {file.preview ? (
                  <img src={file.preview} alt={file.name} className="h-full w-full object-cover" />
                ) : (
                  <File className="h-5 w-5 text-secondary-400" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100 truncate">{file.name}</p>
                <p className="text-xs text-secondary-400">{Math.round(file.size / 1024)} KB</p>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="flex-shrink-0 rounded-lg p-1.5 text-secondary-400 hover:text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-900/20 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
