import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Btn } from '@/components/ui';

import { useGroups } from '@/hooks/useGroups';
import { serverApi } from '@/utils';

import { GroupForm, StyledSelect } from './GroupSelectProduct.styled';

export type IFormInput = {
  groupId: string;
};

interface GroupSelectProductProps {
  currentGroupId: string | null;
  productId?: string; // Скорее всего, тебе нужен ID продукта для запроса
  setProducts: Dispatch<SetStateAction<IProductASG[]>>;
}

export const GroupSelectProduct: React.FC<GroupSelectProductProps> = ({
  currentGroupId,
  productId,
  setProducts,
}) => {
  const { groups } = useGroups();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<IFormInput>({
    defaultValues: {
      groupId: currentGroupId || '',
    },
    mode: 'onChange', // Чтобы валидация и isDirty работали сразу
  });

  // 1. Синхронизация: Если currentGroup пришел с сервера позже или изменился, обновляем форму
  useEffect(() => {
    reset({ groupId: currentGroupId || '' });
  }, [currentGroupId, reset]);

  // 2. Оптимизация: Мемоизируем список опций, чтобы не пересчитывать отступы при каждом рендере
  const groupOptions = useMemo(() => {
    return groups.map(g => {
      const level = g.ancestors?.length || 0;
      // Используем неразрывные пробелы для визуальной иерархии
      const prefix = '\u00A0\u00A0'.repeat(level) + (level > 0 ? '└ ' : '');

      return (
        <option key={g._id} value={g._id}>
          {prefix}
          {g.name}
        </option>
      );
    });
  }, [groups]);

  const onSubmit = async (data: IFormInput) => {
    // Проверка на то, что группа реально изменилась (дополнительная защита)
    if (data.groupId === currentGroupId) return;

    try {
      const submitData = {
        id: data.groupId ? data.groupId : null,
      };

      await serverApi.put(`/catalog/change-group/${productId}`, submitData);

      toast.success('Товар перемещен в новую группу');

      setProducts((prev: IProductASG[]) =>
        prev.filter(({ _id }: { _id: string }) => {
          return _id !== productId;
        })
      );

      // Важно: после успешного сохранения обновляем "начальное" состояние формы
      // чтобы кнопка "Сохранить" снова стала неактивной
      reset(data);
    } catch (e) {
      console.error(e);
      toast.error('Не удалось переместить товар');
    }
  };

  // Следим за текущим выбором для UI логики (если нужно что-то специфичное)
  const selectedGroupId = watch('groupId');

  // Кнопка активна, если:
  // 1. Значение в форме отличается от исходного (isDirty или ручное сравнение)
  // 2. Значение отличается от currentGroup (на случай рассинхрона)
  // 3. Не идет отправка
  const isBtnDisabled =
    !isDirty || selectedGroupId === currentGroupId || isSubmitting;

  return (
    <GroupForm onSubmit={handleSubmit(onSubmit)}>
      {/* register передаем прямо в Select */}
      <StyledSelect
        id="groupId"
        {...register('groupId')}
        disabled={isSubmitting}
      >
        <option value={''}>-- Без группы (Не определено) --</option>
        {groupOptions}
      </StyledSelect>

      <Btn type="submit" disabled={isBtnDisabled} onClick={() => {}}>
        {isSubmitting ? 'Сохранение...' : 'Сохранить'}
      </Btn>
    </GroupForm>
  );
};
