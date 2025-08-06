import React, { useState, useRef } from 'react';
import './FileUpload.css';

const FileUpload = ({ 
  onFileSelect, 
  accept = 'image/*', 
  maxSize = 10 * 1024 * 1024, // 10MB
  multiple = false,
  placeholder = 'Перетащите файлы сюда или нажмите для выбора'
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    // Проверка размера
    if (file.size > maxSize) {
      setError(`Файл слишком большой. Максимальный размер: ${maxSize / (1024 * 1024)}MB`);
      return false;
    }

    // Проверка типа файла
    if (accept !== '*/*') {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const fileType = file.type;
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileExtension === type;
        }
        return fileType.match(new RegExp(type.replace('*', '.*')));
      });

      if (!isAccepted) {
        setError('Неподдерживаемый тип файла');
        return false;
      }
    }

    setError('');
    return true;
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    
    if (!multiple && fileArray.length > 1) {
      setError('Можно загрузить только один файл');
      return;
    }

    const validFiles = fileArray.filter(file => validateFile(file));
    
    if (validFiles.length > 0) {
      onFileSelect(multiple ? validFiles : validFiles[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="file-upload">
      <div
        className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="file-input"
        />
        
        <div className="upload-content">
          <div className="upload-icon">📁</div>
          <p className="upload-text">{placeholder}</p>
          <p className="upload-hint">
            Поддерживаемые форматы: {accept === 'image/*' ? 'JPG, PNG, GIF, WebP' : 
                                   accept === 'application/pdf' ? 'PDF' :
                                   accept.includes('doc') ? 'DOC, DOCX' : 'Все файлы'}
          </p>
          <p className="upload-hint">
            Максимальный размер: {formatFileSize(maxSize)}
          </p>
        </div>
      </div>

      {error && (
        <div className="upload-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload; 