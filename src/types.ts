/* eslint-disable no-eval */
import { useStore } from 'react-redux';

export enum IngredientType {
  bun = 'bun',
  sauce = 'sauce',
  main = 'main',
}

export type TIngredient = {
  _id: string;
  _key?: string,
  name: string;
  type: IngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export type TUser = {
  email: string;
  name: string;
  success: boolean;
}

export type TAdditionalActions = Array<{
  text: string;
  link: {
    path: string;
    text: string;
  },
}>

export type TOrder = {
  _id: string,
  ingredients: Array<TIngredient>,
  status: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  number: number,
}

export type TCurrentOrderState = {
  name: string,
  order: {
    number: number | null,
  },
  success: boolean,
  isOpen: boolean,
}

export type TModal = {
  item?: any,
  isOpen: boolean,
}

export type TConstructorIngredients = {
  constructorIngredients: Array<TIngredient>,
  bun?: TIngredient,
};
