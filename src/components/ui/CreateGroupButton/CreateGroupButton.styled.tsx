import styled from '@emotion/styled';

export const StyledFloatingButton = styled.button`
  /* --- Позиционирование (Абсолютное/Фиксированное) --- */
  position: fixed; /* Обычно такие кнопки фиксируют на экране */
  bottom: 32px;
  left: 32px;
  z-index: 1000; /* Чтобы быть поверх остального контента */

  /* --- Форма и Размер --- */
  padding: 16px 36px;
  border-radius: 999px; /* Делает кнопку идеально круглой "таблеткой" */
  border: none;
  box-sizing: border-box;

  font-weight: 700;
  letter-spacing: 0.5px;
  color: #ffffff;
  /* Добавляем иконку плюса с помощью CSS (чтобы не тянуть библиотеки иконок) */
  display: flex;
  align-items: center;
  gap: 10px;

  /* --- Современный Визуал (Градиент и Тени) --- */
  /* Трендовый сине-фиолетовый градиент. Можно заменить на свои цвета */
  /* background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); */

  background: linear-gradient(135deg, #101340 0%, #268be3 100%);
  background-size: 200% auto; /* Нужно для анимации градиента при ховере */

  /* Мягкая, глубокая тень для эффекта левитации */
  /* box-shadow: 0 8px 20px -5px rgba(79, 70, 229, 0.5); */
  box-shadow: 0 8px 20px -5px rgba(38, 139, 227, 0.5);

  /* --- Интерактивность и Анимации --- */
  cursor: pointer;
  outline: none;
  /* Используем физическую кривую Безье для плавности */
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Состояние наведения (Hover) */
  &:hover {
    /* Кнопка немного "взлетает" и увеличивается */
    transform: translateY(-5px) scale(1.03);
    /* Тень становится больше и мягче */
    box-shadow: 0 20px 35px -10px rgba(38, 139, 227, 0.7);
    /* Градиент немного смещается, создавая перелив */
    background-position: right center;
  }

  /* Состояние нажатия (Active) */
  &:active {
    /* Кнопка "вдавливается" */
    transform: translateY(2px) scale(0.98);
    box-shadow: 0 4px 10px -2px rgba(79, 70, 229, 0.4);
    transition: all 0.1s ease; /* Более быстрый отклик на нажатие */
  }

  /* Опционально: псевдоэлемент для плюсика перед текстом */
  &::before {
    content: '+';
    display: inline-block;
    font-size: 1.4rem;
    font-weight: 400;
    margin-top: -2px; /* Небольшая коррекция вертикали */
  }
`;
