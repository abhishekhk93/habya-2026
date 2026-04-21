import React from 'react';
import { ordersItemStyles as s } from './OrdersItem.styles';
import type { RegistrationItem as RegistrationItemType } from '@/app/api/orders/types';

interface RegistrationItemProps {
  item: RegistrationItemType;
}

export default function RegistrationItem({ item }: RegistrationItemProps) {
  let price = item.amount;
  const isDoubles = !!item.additionalAttributes.partnerDetails;

  const registrationIcon = (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
    </svg>
  );
  
  return (
    <li className={s.itemRowReg}>
      <div className={s.itemContent}>
        <div className={s.iconWrapperReg}>{registrationIcon}</div>
        <div className={s.itemTitleContainer}>
          <p className={s.itemTitle}>{item.additionalAttributes.categoryName}</p>
          <div className={s.itemDetailsList}>
            {isDoubles && (
               <p>Partner: {item.additionalAttributes.partnerDetails?.fullName}</p>
            )}
          </div>
        </div>
      </div>
      <div className={s.itemPrice}>₹{price}</div>
    </li>
  );
}
