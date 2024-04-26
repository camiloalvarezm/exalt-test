import { createAction, props } from '@ngrx/store';
import { Product } from '../../core/models/product.model';

export const addAllProducts = createAction(
  '[Products Component] AddNewProduct',
  props<{ products: Product[] }>()
);
export const addNewProduct = createAction(
  '[Products Component] AddNewProduct',
  props<{ product: Product }>()
);
export const updateProduct = createAction(
  '[Products Component] Updateproduct',
  props<{ product: Product }>()
);
export const deleteProduct = createAction(
  '[Products Component] DeleteProduct',
  props<{ productId: string }>()
);
