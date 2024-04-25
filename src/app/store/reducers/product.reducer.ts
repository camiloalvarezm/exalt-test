import { createReducer, on } from '@ngrx/store';
import {
  addNewProduct,
  deleteProduct,
  updateProduct,
} from '../actions/product.actions';
import { Product } from '../../core/models/product.model';

export interface ProductState {
  products: Product[];
}
export const initialState: ProductState = {
  products: [],
};

export const productsReducer = createReducer(
  initialState,
  on(addNewProduct, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
  })),
  on(deleteProduct, (state, { productId }) => ({
    ...state,
    products: state.products.filter((product) => product.id !== productId),
  })),
  on(updateProduct, (state, { product }) => ({
    ...state,
    products: state.products.map((p) => {
      if (p.id === product.id) {
        return { ...product };
      }
      return p;
    }),
  }))
);
