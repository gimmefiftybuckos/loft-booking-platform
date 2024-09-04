import React, { useContext, useEffect, useReducer, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { ModalButton } from '../ModalButton';
import { ModalContext } from '../../../context';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { setPrice } from '../../../store/cardCatalogSlice';
import { MAX_PRICE } from '../../../constants';

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
   const storeDispatch = useDispatch<AppDispatch>();

   const toggleModal = useContext(ModalContext);

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

      toggleModal ? toggleModal(-1) : null;
   };

   const resetHandler = () => {
      dispatch({ type: 'reset', payload: 0 });
      setCurrentPrice([0, MAX_PRICE]);
   };

   useEffect(() => {
      console.log(currentPrice);

      storeDispatch(setPrice(`${currentPrice[0]}:${currentPrice[1]}`));
   }, [currentPrice]);

   return (
      <>
         <input
            type='number'
            value={price.min}
            onChange={(event) => handleInputChange(event, 'min')}
         />
         <input
            type='number'
            value={price.max}
            onChange={(event) => handleInputChange(event, 'max')}
         />
         <Slider
            defaultValue={[0, MAX_PRICE]}
            value={[price.min, price.max] || currentPrice}
            onChange={handleChange}
            min={0}
            max={MAX_PRICE}
            allowCross={false}
            range
         />
         <ModalButton primary onClick={resetHandler}>
            Очистить
         </ModalButton>
         <ModalButton onClick={confirmHandler}>Принять</ModalButton>
      </>
   );
};
