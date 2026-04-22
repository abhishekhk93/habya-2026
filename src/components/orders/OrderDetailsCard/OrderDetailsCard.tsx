import { orderDetailsCardStyles as s } from './OrderDetailsCard.styles';
import * as CONSTANTS from '@/components/constants';
import type { OrderDetailsCardProps } from './OrderDetailsCard.types';

export default function OrderDetailsCard({ order }: OrderDetailsCardProps) {
  const items: any[] = [];

  if (order.registrations) {
    order.registrations.forEach(reg => {
      items.push({ 
        id: reg.id, 
        title: reg.additionalAttributes.categoryName, 
        price: reg.amount,
        type: 'event',
        partner: reg.additionalAttributes.partnerDetails 
      });
    });
  }

  if (order.shirts) {
    order.shirts.forEach(shirt => {
      items.push({ 
        id: shirt.id, 
        title: `Shirt - ${shirt.additionalAttributes.type}`, 
        price: shirt.amount,
        type: 'shirt',
        size: shirt.additionalAttributes.size,
        displayName: shirt.additionalAttributes.displayName
      });
    });
  }

  // Handle any orphan sponsorships inside pending/failed orders
  if (order.sponsorships && order.paymentStatus !== CONSTANTS.success) {
    order.sponsorships.forEach(spon => {
      items.push({ 
        id: spon.id, 
        title: 'Sponsorship', 
        price: spon.amount, 
        type: 'sponsorship' 
      });
    });
  }

  const totalCart = order.totalOrderAmount?.orderAmount || items.reduce((acc, item) => acc + item.price, 0);

  // Status mappings
  const leftColumnColor = 
    order.paymentStatus === CONSTANTS.success ? s.leftColumnSuccess :
    order.paymentStatus === CONSTANTS.pending ? s.leftColumnPending :
    order.paymentStatus === CONSTANTS.cancelled ? s.leftColumnCancelled :
    order.paymentStatus === 'FAILED' ? s.leftColumnFailed : s.leftColumnDefault;

  const rightColumnColor = 
    order.paymentStatus === CONSTANTS.success ? s.rightColumnSuccess :
    order.paymentStatus === CONSTANTS.pending ? s.rightColumnPending :
    order.paymentStatus === CONSTANTS.cancelled ? s.rightColumnCancelled :
    order.paymentStatus === 'FAILED' ? s.rightColumnFailed : s.rightColumnDefault;

  return (
    <div className={s.container}>
      <div className={`${s.leftColumnBase} ${leftColumnColor}`}>
        <div>
          <span className={s.orderIdValue}>#{order.orderId.substring(0, 8).toUpperCase()}</span>
        </div>
        
        <div>
          <span className={`${s.statusBadge} ${
            order.paymentStatus === CONSTANTS.success ? s.statusSuccess :
            order.paymentStatus === CONSTANTS.pending ? s.statusPending :
            order.paymentStatus === CONSTANTS.cancelled ? s.statusCancelled :
            order.paymentStatus === 'FAILED' ? s.statusFailed : s.statusDefault
          }`}>
            {order.paymentStatus}
          </span>
        </div>
      </div>

      <div className={`${s.rightColumnBase} ${rightColumnColor}`}>
        <div className={s.itemsSection}>
          <ul className={s.itemsList}>
            {items.map((item, i) => (
              <li key={`${item.id}-${i}`} className={s.itemRow}>
                <div className={s.itemTitleContainer}>
                  <span className={s.itemTitle}>{item.title}</span>
                  {item.type === 'event' && item.partner && (
                     <span className={s.itemMeta}>
                       <span className="font-medium mr-1">Partner:</span> 
                       {item.partner.fullName}
                     </span>
                  )}
                  {item.type === 'shirt' && (
                     <span className={s.itemMeta}>
                       <span className="font-medium mr-1">Size:</span> {item.size} 
                       {item.displayName ? <><span className="mx-1.5 opacity-50">|</span><span className="font-medium mr-1">Name:</span> {item.displayName}</> : ''}
                     </span>
                  )}
                </div>
                <span className={s.itemPrice}>₹{item.price.toLocaleString('en-IN')}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={s.totalSection}>
          <span className={s.totalLabel}>Grand Total</span>
          <span className={s.totalValue}>₹{totalCart.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
}
