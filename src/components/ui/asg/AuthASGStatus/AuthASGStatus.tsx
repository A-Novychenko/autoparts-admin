import logoASG from '@assets/logoASG.png';

import {
  ContactBox,
  DataWrap,
  ImgWrap,
  NameBox,
  NameText,
  Wrap,
} from './AuthASGStatus.styled';

const checkAuth = !true;

const ASG_DATA_TEST = {
  id: 111,
  login: '1111',
  name: 'Test test',
  email: 'test@asg.ua',
  phone: '+38 (067) 111-11-11',
};

const { login, name, email, phone } = ASG_DATA_TEST;

export const AuthASGStatus: React.FC = () => {
  return (
    <Wrap>
      <ImgWrap>
        <img src={logoASG} />
      </ImgWrap>
      <DataWrap color={checkAuth ? 'rgba(44, 255, 48, 0.5)' : '#c30000;'}>
        {checkAuth ? (
          <>
            <NameBox>
              <NameText>{login}</NameText>
              <NameText>{name}</NameText>
            </NameBox>
            <ContactBox>
              <NameText>{email}</NameText>
              <NameText>{phone}</NameText>
            </ContactBox>
          </>
        ) : (
          <p>Не авторизовано!</p>
        )}
      </DataWrap>
    </Wrap>
  );
};
