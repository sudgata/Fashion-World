import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
);

export const selectUserLoaded = createSelector(
    [selectUser],
    user => user.isUserLoaded
);