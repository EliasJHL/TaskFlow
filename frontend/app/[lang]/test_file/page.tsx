'use client';

import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone';
import { useState } from 'react';
import { useStore } from '@/lib/store';

const Example = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const { uploadFile: uploadFileToServer } = useStore();

  const handleDrop = (droppedFiles: File[]) => {
    console.log(droppedFiles);
    if (droppedFiles.length === 0) return;

    const previewsUrls = droppedFiles.map(file => URL.createObjectURL(file));
    setPreviews(previewsUrls);
    setFiles(droppedFiles);

    uploadFileToServer(droppedFiles[0])
      .then(() => {
        console.log('Upload réussi');
      })
      .catch(err => {
        console.error('Erreur d\'upload :', err);
      });
  };

  return (
    <Dropzone
      accept={{ 'image/*': [] }}
      maxFiles={10}
      maxSize={1024 * 1024 * 10}
      minSize={1024}
      onDrop={handleDrop}
      onError={console.error}
      src={files}
    >
      <DropzoneEmptyState />
      <DropzoneContent />
    </Dropzone>
  );
};

export default Example;
