import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { transliterate } from '@/utils';
import { serverApi } from '@/utils';

import { GroupManagerFormProps, IFormInput } from './types';

import {
  ButtonGroup,
  CancelButton,
  ErrorText,
  FieldRow,
  FieldWrapper,
  FormContainer,
  Label,
  PrimaryButton,
  StyledInput,
  StyledSelect,
  ToggleWrapper,
  SwitchContainer,
  HiddenCheckbox,
  Slider,
  ToggleLabel,
} from './GroupManagerForm.styled';

export const GroupManagerForm: React.FC<GroupManagerFormProps> = ({
  groups,
  onClose,
  editingGroup,
  onGroupAdded,
  onUpdateGroup,
}) => {
  const isEditing = Boolean(editingGroup);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    defaultValues: {
      name: '',
      description: '',
      slug: '',
      margin: 16,
      parent: '',
      img: '',
      isVisible: false,
    },
  });

  useEffect(() => {
    if (editingGroup) {
      reset({
        name: editingGroup.name,
        description: editingGroup.description,
        slug: editingGroup.slug,
        margin: editingGroup.margin,
        parent: editingGroup.parent ? editingGroup.parent.toString() : '',
        img: editingGroup.img || '',
        isVisible:
          editingGroup.isVisible !== undefined ? editingGroup.isVisible : false,
      });
    } else {
      reset({
        name: '',
        description: '',
        slug: '',
        margin: 16,
        parent: '',
        img: '',
        isVisible: false,
      });
    }
  }, [editingGroup, reset]);

  const watchedName = watch('name');

  useEffect(() => {
    if (!isEditing && watchedName) {
      setValue('slug', transliterate(watchedName), { shouldValidate: true });
    }
  }, [watchedName, isEditing, setValue]);

  const onSubmit = async (data: IFormInput) => {
    const payload = {
      ...data,
      margin: Number(data.margin),
      parent: data.parent === '' ? null : data.parent,
      description: data.description || null,
    };

    try {
      if (isEditing && editingGroup?._id) {
        const { data } = await serverApi.put(
          `/cms-catalog/groups/${editingGroup._id}`,
          payload
        );

        onUpdateGroup(data.group);

        toast.success('Группа успешно обновлена', {
          autoClose: 700,
        });
      } else {
        const { data } = await serverApi.post('/cms-catalog/groups', payload);

        onGroupAdded(data.group);

        toast.success('Группа успешно создана', {
          autoClose: 700,
        });
      }
    } catch (e) {
      toast.error('Ошибка сохранения');
    }

    onClose();
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldWrapper style={{ marginBottom: '20px' }}>
          <Label htmlFor="name">Название группы</Label>
          <StyledInput
            id="name"
            placeholder="Введите название..."
            {...register('name', { required: 'Это поле обязательно' })}
            aria-invalid={!!errors.name}
          />
          {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
        </FieldWrapper>

        <FieldWrapper style={{ marginBottom: '20px' }}>
          <Label htmlFor="name">Описание</Label>
          <StyledInput
            id="description"
            placeholder="Введите описание..."
            {...register('description')}
            aria-invalid={!!errors.description}
          />
          {errors.description && (
            <ErrorText>{errors.description.message}</ErrorText>
          )}
        </FieldWrapper>

        <FieldRow columns={2} style={{ marginBottom: '20px' }}>
          <FieldWrapper>
            <Label htmlFor="slug">URL Slug</Label>
            <StyledInput
              id="slug"
              placeholder="url-адрес"
              {...register('slug', { required: 'Slug обязателен' })}
              aria-invalid={!!errors.slug}
            />
            {errors.slug && <ErrorText>{errors.slug.message}</ErrorText>}
          </FieldWrapper>

          <FieldWrapper>
            <Label htmlFor="margin">Маржа (%)</Label>
            <StyledInput
              id="margin"
              type="number"
              {...register('margin', { required: 'Укажите маржу' })}
              aria-invalid={!!errors.margin}
            />
            {errors.margin && <ErrorText>{errors.margin.message}</ErrorText>}
          </FieldWrapper>
        </FieldRow>

        <FieldWrapper style={{ marginBottom: '20px' }}>
          <Label htmlFor="parent">Родительская группа</Label>
          <StyledSelect id="parent" {...register('parent')}>
            <option value="">-- Без родителя (Корневая) --</option>
            {groups.map(g => (
              <option
                key={g._id}
                value={g._id}
                disabled={isEditing && g._id === editingGroup?._id}
              >
                {'\u00A0\u00A0'.repeat(g.ancestors?.length || 0)}
                {g.ancestors?.length > 0 ? '└ ' : ''}
                {g.name}
              </option>
            ))}
          </StyledSelect>
        </FieldWrapper>

        <ToggleWrapper style={{ marginBottom: '24px' }}>
          <SwitchContainer>
            <HiddenCheckbox
              type="checkbox"
              id="isVisible"
              {...register('isVisible')}
            />
            <Slider />
          </SwitchContainer>
          <ToggleLabel htmlFor="isVisible">
            Отображать группу на сайте
          </ToggleLabel>
        </ToggleWrapper>

        <ButtonGroup>
          <CancelButton type="button" onClick={onClose}>
            Отмена
          </CancelButton>
          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isEditing ? 'Сохранить изменения' : 'Создать группу'}
          </PrimaryButton>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};
