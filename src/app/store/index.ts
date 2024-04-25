import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { productsReducer, ProductState } from './reducers/product.reducer';

export interface AppState {
  products: ProductState;
}

export const reducers: ActionReducerMap<AppState> = {
  products: productsReducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
