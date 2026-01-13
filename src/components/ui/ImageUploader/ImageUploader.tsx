import React, { ChangeEvent, useState, useEffect, useRef } from 'react';

import { toast } from 'react-toastify';
import { RiCloseLargeLine } from 'react-icons/ri';

import { Loader } from '@components/ui';

import { serverApi } from '@/utils';

import { GroupImageUploaderProps } from './types';

import {
  CameraIcon,
  EditIcon,
  HiddenInput,
  IconOverlay,
  PreviewImage,
  RemoveButton,
  UploaderLabel,
} from './ImageUploader.styled';

export const ImageUploader: React.FC<GroupImageUploaderProps> = ({
  initialImage,
  groupId,
  onImageChange,
  loading,
  handleClearImg,
}) => {
  const [preview, setPreview] = useState<string | null>(initialImage || null);

  // Реф для очистки value у инпута (чтобы не было багов при выборе того же файла)
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ЖЕЛЕЗОБЕТОННЫЙ СБРОС:
  // Следим не только за картинкой, но и за groupId.
  // Если сменилась группа — жестко ставим то, что пришло с сервера (или null).
  useEffect(() => {
    setPreview(initialImage || null);

    // Очищаем инпут файла, чтобы при смене группы там не висел старый файл
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [initialImage, groupId]); // <--- groupId здесь ключевой момент

  //  ОЧИСТКА ПАМЯТИ
  useEffect(() => {
    return () => {
      // Если это локальный blob (загруженный вручную), чистим память
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onImageChange(file);
    }
  };

  const handleRemoveImage = async (e: React.MouseEvent) => {
    // ВАЖНО: Останавливаем всплытие, чтобы не сработал label и не открылся инпут
    e.preventDefault();
    e.stopPropagation();

    // 1. Очищаем превью
    setPreview(null);

    // 2. Сбрасываем значение инпута (чтобы можно было выбрать тот же файл снова при желании)
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    try {
      await serverApi.delete(`/catalog/group-del-img/${groupId}`);

      handleClearImg();

      toast.success('Картинка  удалена!');
    } catch (e) {
      toast.error('ERROR - картинка не удалена!');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <UploaderLabel
        hasImage={!!preview}
        aria-label="Загрузить изображение группы"
      >
        {/* Если есть превью — показываем */}
        {preview && <PreviewImage src={preview} alt="Group Preview" />}

        {/* Оверлей с иконкой (Camera/Edit) */}
        <IconOverlay visible={!preview}>
          {loading ? (
            <Loader />
          ) : (
            <>{preview ? <EditIcon /> : <CameraIcon />}</>
          )}
        </IconOverlay>

        {/* Скрытый инпут */}
        <HiddenInput
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
        />
      </UploaderLabel>

      {/* Кнопка удаления рендерится ТОЛЬКО если есть картинка */}
      {preview && !loading && (
        <RemoveButton
          onClick={handleRemoveImage}
          title="Удалить фото"
          type="button" // Важно указать type="button"
        >
          <RiCloseLargeLine size={22} />
        </RemoveButton>
      )}
    </div>
  );
};
