import React, { useState, useRef, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface LogoEditorProps {
  imageUrl: string;
  onSave: (croppedImageUrl: string) => void;
  onCancel: () => void;
  aspectRatio?: number;
}

export function LogoEditor({ imageUrl, onSave, onCancel, aspectRatio }: LogoEditorProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 80,
    height: 80,
    x: 10,
    y: 10,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getCroppedImage = useCallback(async () => {
    if (!completedCrop || !imgRef.current || !canvasRef.current) {
      console.warn('Missing required elements for cropping');
      return null;
    }

    try {
      const image = imgRef.current;
      const canvas = canvasRef.current;
      const crop = completedCrop;

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        console.error('Could not get canvas context');
        return null;
      }

      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      return new Promise<string>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to create image blob'));
              return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
            reader.onerror = () => {
              reject(new Error('Failed to read image blob'));
            };
          },
          'image/png',
          0.95 // Slight compression to reduce file size
        );
      });
    } catch (error) {
      console.error('Error in getCroppedImage:', error);
      return null;
    }
  }, [completedCrop]);

  const handleSave = async () => {
    try {
      const croppedImageUrl = await getCroppedImage();
      if (croppedImageUrl) {
        onSave(croppedImageUrl);
      } else {
        alert('Failed to process image. Please try again.');
      }
    } catch (error) {
      console.error('Error saving cropped image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Edit Logo</h3>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Instructions */}
          <div className="mb-4 text-center">
            <p className="text-sm text-gray-600">
              Drag to select the area you want to crop, then resize by dragging the corners
            </p>
          </div>

          {/* Image Crop Area */}
          <div className="flex justify-center overflow-auto max-h-[60vh] relative bg-gray-50 rounded-lg p-4">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatio}
              className="max-w-full"
            >
              <img
                ref={imgRef}
                src={imageUrl}
                alt="Logo to crop"
                className="max-h-96 w-auto block"
                onLoad={() => {
                  // Set initial crop to cover most of the image
                  const initialCrop: Crop = {
                    unit: '%',
                    width: 80,
                    height: 80,
                    x: 10,
                    y: 10,
                  };
                  setCrop(initialCrop);
                }}
              />
            </ReactCrop>
          </div>

          {/* Hidden canvas for image generation */}
          <canvas
            ref={canvasRef}
            style={{ display: 'none' }}
          />

          {/* Tips */}
          <div className="mt-4 text-sm text-gray-500 text-center">
            Drag the crop area to reposition • Drag the corners to resize • Click Save when ready
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Save Logo
          </button>
        </div>
      </div>
    </div>
  );
}