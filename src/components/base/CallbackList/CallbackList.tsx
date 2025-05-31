import { CallbackCard } from '@/components/ui';

import { CallbackListProps } from './types';

import { Container, Header, List } from './CallbackList.styled';

export const CallbackList: React.FC<CallbackListProps> = ({
  items,
  setItems,
}) => {
  return (
    <Container>
      <Header>
        <div>№</div>
        <div>Дата</div>
        <div>Статус</div>
        <div></div>
        <div>Телефон</div>
        <div>Сообщение</div>
        <div>Сохранить</div>
      </Header>

      <List>
        {items.map(item => {
          return (
            <CallbackCard key={item._id} item={item} setItems={setItems} />
          );
        })}
      </List>
    </Container>
  );
};
