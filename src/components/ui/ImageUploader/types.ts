export type GroupImageUploaderProps = {
  initialImage?: string; // URL текущей картинки (с сервера)
  groupId: string | number; // ВАЖНО: Уникальный ID группы для принудительного сброса
  onImageChange: (file: File) => void;
  loading?: boolean;
  handleClearImg: () => void;
};
