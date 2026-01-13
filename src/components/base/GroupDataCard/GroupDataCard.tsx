import React, { useState, useEffect } from 'react';

import { FaArrowRight } from 'react-icons/fa6';

import {
  BreadcrumbsRow,
  CardContainer,
  GroupTitle,
  LabelIcon,
  MarginBlock,
  MarginLabel,
  MarginValue,
  ParentName,
  ParentRow,
  PathSegment,
  Separator,
  InfoColumn,
  MainInfo,
  RightBox,
  VisibleValue,
  VisibleBlock,
  VisibleLabel,
} from './GroupDataCard.styled';

export const GroupDataCard: React.FC<{
  group: IGroup;
  parentGroupData: IGroup | undefined;
}> = ({ group, parentGroupData }) => {
  const [fontSizeName, setFontSizeName] = useState(24);
  const [fontSizeParentName, setFontSizeParentName] = useState(16);

  useEffect(() => {
    const nameLength = group.name.length;
    if (nameLength > 40) setFontSizeName(18);
    else if (nameLength > 25) setFontSizeName(20);
    else setFontSizeName(24);
  }, [group.name]);

  useEffect(() => {
    if (!parentGroupData?.name) return;
    const nameLength = parentGroupData.name.length;
    if (nameLength > 40) setFontSizeParentName(12);
    else if (nameLength > 25) setFontSizeParentName(14);
    else setFontSizeParentName(16);
  }, [parentGroupData?.name]);

  const breadcrumbs =
    group.ancestors && group.ancestors.length > 0
      ? group.ancestors.map(a => a.name)
      : ['root'];

  const pathItems = breadcrumbs;

  return (
    <CardContainer>
      <InfoColumn>
        <MainInfo>
          <GroupTitle
            style={{ fontSize: `${fontSizeName}px` }}
            title={group.name}
          >
            {group.name}
          </GroupTitle>

          <ParentRow>
            <LabelIcon>Родительская группа</LabelIcon>
            <FaArrowRight />
            {parentGroupData ? (
              <ParentName
                style={{ fontSize: `${fontSizeParentName}px` }}
                title={parentGroupData.name}
              >
                {parentGroupData.name}
              </ParentName>
            ) : (
              'Корневая группа'
            )}
          </ParentRow>
        </MainInfo>

        <BreadcrumbsRow>
          <span style={{ marginRight: 6, fontSize: '14px', flexShrink: 0 }}>
            📂
          </span>

          {pathItems.map((item, index) => (
            <div
              key={index}
              style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
            >
              {index > 0 && <Separator>/</Separator>}
              <PathSegment title={item}>{item}</PathSegment>
            </div>
          ))}

          <Separator>/</Separator>

          <PathSegment style={{ fontWeight: 600, color: '#6b7280' }}>
            {group.name}
          </PathSegment>
        </BreadcrumbsRow>
      </InfoColumn>

      <RightBox>
        <MarginBlock>
          <MarginLabel>Наценка</MarginLabel>
          <MarginValue>{group.margin}%</MarginValue>
        </MarginBlock>

        <VisibleBlock>
          <VisibleLabel>Видима?</VisibleLabel>
          <VisibleValue isVisible={group.isVisible}>
            {group.isVisible ? 'ДА' : 'НЕТ'}
          </VisibleValue>
        </VisibleBlock>
      </RightBox>
    </CardContainer>
  );
};
