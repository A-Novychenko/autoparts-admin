'use client';

import { AppStore, makeStore } from '@/lib/store';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    // Створює екземпляр сховища вперше при рендерингу.
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

// 'use client';
// import { useRef } from 'react';
// import { Provider } from 'react-redux';
// import { makeStore, AppStore } from '../lib/store';
// import { initializeCount } from '../lib/features/counter/counterSlice'; // якщо потрібно ініціювати стор даними із батьківського компонента

// export default function StoreProvider({
//   count, //прокидаємо дані пропсами
//   children,
// }: {
//   count: number;
//   children: React.ReactNode;
// }) {
//   const storeRef = useRef<AppStore | null>(null);
//   if (!storeRef.current) {
//     storeRef.current = makeStore();
//     storeRef.current.dispatch(initializeCount(count)); // та записуємо ці дані як властивість
//   }

//   return <Provider store={storeRef.current}>{children}</Provider>;
// }
