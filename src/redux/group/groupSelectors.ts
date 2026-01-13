import { ReduxState } from '../reduxStore';

export const selectGroupList = (state: ReduxState) => state.groups.groups;
export const selectGroupIsLoading = (state: ReduxState) =>
  state.groups.isLoading;
