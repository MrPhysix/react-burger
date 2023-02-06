/* eslint-disable no-eval */
import { useStore } from 'react-redux';

export enum IngredientType {
  bun = 'bun',
  sauce ='sauce',
  main = 'main',
}

export type TIngredient = {
  _id: string;
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
  ingredients: Array<string>,
  status: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  number: number,
}
