import { Action } from '@ngrx/store';
import { User } from '../user.model';

import * as AuthActions from './auth.actions';

export interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export function authReducer(
  state: State = initialState,
  action: AuthActions.shoppingActions
): State {
  switch (action.type) {
    case AuthActions.LOGIN:
      const { email, userId, token, expirationDate } = (
        action as AuthActions.Login
      ).payload;
      const user = new User(email, userId, token, expirationDate);
      return {
        ...state,
        user,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
