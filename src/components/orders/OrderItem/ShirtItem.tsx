import React from 'react';
import { ordersItemStyles as s } from './OrdersItem.styles';
import type { ShirtItem as ShirtItemType } from '@/app/api/orders/types';
import { sizeChart } from '@/components/shop/Shop.data';

interface ShirtItemProps {
  item: ShirtItemType;
}

export default function ShirtItem({ item }: ShirtItemProps) {
  let price = item.amount;
  const sizeInfo = sizeChart.find(row => row.size === item.additionalAttributes.size);

  
  const shirtIcon = (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.5760 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  );
  
  return (
    <li className={s.itemRowShirt}>
      <div className={s.itemContent}>
        <div className={s.iconWrapperShirt}>{shirtIcon}</div>
        <div className={s.itemTitleContainer}>
          <p className={s.itemTitle}>Shirt</p>
          <div className={s.itemDetailsList}>
            <p><b>Type:</b> {item.additionalAttributes.type}</p>
            <p>
              <b>Size:</b> {item.additionalAttributes.size}
              {sizeInfo && <span style={{fontStyle: "italic"}}> ({sizeInfo.width}in x {sizeInfo.length}in)</span>}
            </p>
            {item.additionalAttributes.displayName && (
              <p><b>Name:</b> {item.additionalAttributes.displayName}</p>
            )}
          </div>
        </div>
      </div>
      <div className={s.itemPrice}>₹{price}</div>
    </li>
  );
}
