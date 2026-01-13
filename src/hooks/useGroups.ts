import { useAppSelector } from '@/redux/hooks';

import {
  selectGroupList,
  selectGroupIsLoading,
} from '@/redux/group/groupSelectors';

export const useGroups = () => {
  const groups = useAppSelector(selectGroupList);
  const isLoading = useAppSelector(selectGroupIsLoading);

  return {
    groups,
    isLoading,
  };
};
