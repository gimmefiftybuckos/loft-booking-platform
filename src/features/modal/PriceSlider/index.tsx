import React, { useEffect, useReducer, useState } from 'react';
import Slider from 'rc-slider';
import clsx from 'clsx';

import 'rc-slider/assets/index.css';
import styles from './index.module.sass';

import { useDispatch } from '../../../store';
import { setPrice } from '../../../store/slices/cardCatalog';
import { MAX_PRICE } from '../../../services/constants';
import { useModalControl } from '../../../hooks/useModalControl';

import { Text } from '../../../components/ui/Text';
import { Button, ButtonVariant } from '../../../components/Button';

interface IPriceState {
   min: number;
   max: number;
}

type ActionType = { type: 'min' | 'max' | 'reset'; payload: number };

const reducer = (state: IPriceState, action: ActionType): IPriceState => {
   switch (action.type) {
      case 'min':
         return { ...state, min: action.payload };
      case 'max':
         return { ...state, max: action.payload };
      case 'reset':
         return initialState;
      default:
         return state;
   }
};

const initialState: IPriceState = { min: 0, max: MAX_PRICE };

export const PriceSlider = () => {
   const [currentPrice, setCurrentPrice] = useState<number[]>([0, MAX_PRICE]);
   const [price, dispatch] = useReducer(reducer, initialState);
   const storeDispatch = useDispatch();

   const { closeModal } = useModalControl();

   const handleChange = (value: number | number[]) => {
      if (Array.isArray(value)) {
         const newValue = [...value];

         newValue.forEach((item, index) => {
            newValue[index] = Math.round(item / 100) * 100;
         });

         dispatch({ type: 'min', payload: newValue[0] });
         dispatch({ type: 'max', payload: newValue[1] });
      }
   };

   const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      type: 'min' | 'max'
   ) => {
      const newValue = parseInt(event.target.value);

      newValue > MAX_PRICE
         ? dispatch({ type, payload: MAX_PRICE })
         : dispatch({ type, payload: newValue });
   };

   const confirmHandler = () => {
      const value = [price.min, price.max];
      setCurrentPrice(value);
      closeModal();
   };

   const resetHandler = () => {
      dispatch({ type: 'reset', payload: 0 });
      setCurrentPrice([0, MAX_PRICE]);
   };

   useEffect(() => {
      storeDispatch(setPrice(`${currentPrice[0]}:${currentPrice[1]}`));
   }, [currentPrice]);

   return (
      <>
         <div className={clsx(styles.container)}>
            <input
               className={clsx(styles.input)}
               type='number'
               value={price.min}
               onChange={(event) => handleInputChange(event, 'min')}
            />
            <Text className={styles.text} as={'p'} color='gray' size='16'>
               От
            </Text>
            <input
               className={clsx(styles.input)}
               type='number'
               value={price.max}
               onChange={(event) => handleInputChange(event, 'max')}
            />
            <Text className={styles.text} as={'p'} color='gray' size='16'>
               До
            </Text>
         </div>
         <Slider
            defaultValue={[0, MAX_PRICE]}
            value={[price.min, price.max]}
            onChange={handleChange}
            min={0}
            max={MAX_PRICE}
            allowCross={false}
            range
            className={clsx(styles.slider)}
         />
         <div className={styles['button-container']}>
            <Button className={clsx(styles.button)} onClick={resetHandler}>
               Очистить
            </Button>
            <Button variant={ButtonVariant.ACCENT} onClick={confirmHandler}>
               Принять
            </Button>
         </div>
      </>
   );
};
