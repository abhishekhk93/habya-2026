"use client";
import React from 'react';
import { ordersStyles as s } from './Orders.styles';
import type { Order, RegistrationItem, ShirtItem } from '@/app/_disabled_api/orders/types';
import { getConfigValue } from '@/lib/getConfigValue';
import { useAppSelector } from '@/store/hooks';
import { sizeChart } from '@/components/shop/Shop.data';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const config = useAppSelector((state) => state.config.data);

  const registrationIcon = (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
    </svg>
  );

  const shirtIcon = (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.5760 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  );

  const sponsorshipIcon = (
    <span className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center text-xs bg-green-100">★</span>
  );

  const renderRegistration = (item: RegistrationItem) => {
    let price = item.amount;
    const isDoubles = !!item.additionalAttributes.partnerDetails;

    return (
      <li key={item.id} className={s.itemRowReg}>
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
  };

  const renderShirt = (item: ShirtItem) => {
    const price = item.amount;

    return (
      <li key={item.id} className={s.itemRowShirt}>
        <div className={s.itemContent}>
          <div className={s.iconWrapperShirt}>{shirtIcon}</div>
          <div className={s.itemTitleContainer}>
            <p className={s.itemTitle}>Shirt</p>
            <div className={s.itemDetailsList}>
              <p><b>Type:</b> {item.additionalAttributes.type}</p>
              <p>
                <b>Size:</b> {item.additionalAttributes.size}
                {(() => {
                  const chest = item.additionalAttributes.chest;
                  const length = item.additionalAttributes.length;
                  const sizeInfo = (!chest || !length) ? sizeChart.find(row => row.size === item.additionalAttributes.size) : null;
                  const displayChest = chest || sizeInfo?.width;
                  const displayLength = length || sizeInfo?.length;

                  return (displayChest && displayLength) ? (
                    <span className="text-gray-500"> | (Chest: {displayChest}in - Length: {displayLength}in)</span>
                  ) : null;
                })()}
              </p>
              {item.additionalAttributes.displayName && (
                <p><b>Name to Print:</b> {item.additionalAttributes.displayName}</p>
              )}
            </div>
          </div>
        </div>
        <div className={s.itemPrice}>₹{price}</div>
      </li>
    );
  };

  return (
    <div className={s.orderCard}>
      <div className={s.sectionContainer}>
        {order.sponsorships && order.sponsorships.length > 0 && (
          <div className="mb-6 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 p-5 text-center shadow-sm">
            <h4 className="text-lg font-medium text-emerald-900 mb-2">Thank you!</h4>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>

            <p className="text-sm text-emerald-800 leading-relaxed">
              We deeply appreciate your generous sponsorship of <span className="font-semibold text-emerald-900">₹{order.sponsorships.reduce((acc, item) => acc + item.amount, 0)}</span>. Your support makes a huge difference!
            </p>
          </div>
        )}

        {order.registrations && order.registrations.length > 0 && (
          <div className={s.section}>
            <h4 className={s.sectionTitle}>Event Registrations</h4>
            <ul className={s.itemListReg}>
              {order.registrations.map(renderRegistration)}
            </ul>
          </div>
        )}

        {order.shirts && order.shirts.length > 0 && (
          <div className={s.section}>
            <h4 className={s.sectionTitle}>Merchandise</h4>
            <ul className={s.itemListShirt}>
              {order.shirts.map(renderShirt)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
