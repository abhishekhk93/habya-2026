"use client";
import React from 'react';
import { ordersListStyles as s } from './OrdersList.styles';
import type { Order, RegistrationItem, ShirtItem } from '@/app/api/orders/types';
import { getConfigValue } from '@/lib/getConfigValue';
import { useAppSelector } from '@/store/hooks';
import RegistrationOrderItem from '../OrderItem/RegistrationItem';
import ShirtOrderItem from '../OrderItem/ShirtItem';
import SponsorshipItem from '../OrderItem/SponsorshipItem';
import { OrderListProps } from './OrdersList.types';

export default function OrderList({ order }: OrderListProps) {

  return (
    <div className={s.orderCard}>
      <div className={s.sectionContainer}>
        {order.sponsorships && order.sponsorships.length > 0 && (
          <SponsorshipItem order={order} />
        )}
      </div>
      <div className={s.sectionContainer}>
        {order.registrations && order.registrations.length > 0 && (
          <div className={s.section}>
            <h4 className={s.sectionTitle}>Event Registrations</h4>
            <ul className={s.itemListReg}>
              {order.registrations.map((item) => (
                <RegistrationOrderItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
        )}

        {order.shirts && order.shirts.length > 0 && (
          <div className={s.section}>
            <h4 className={s.sectionTitle}>Merchandise</h4>
            <ul className={s.itemListShirt}>
              {order.shirts.map((item) => (
                <ShirtOrderItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
