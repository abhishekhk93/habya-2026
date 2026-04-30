import { orderDetailsCardStyles as s } from './OrderDetailsCard.styles';
import * as CONSTANTS from '@/components/constants';
import type { OrderDetailsCardProps } from './OrderDetailsCard.types';
import { sizeChart } from "@/components/shop/Shop.data";

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
        title: `${shirt.additionalAttributes.name}`,
        price: shirt.amount,
        type: 'shirt',
        size: shirt.additionalAttributes.size,
        displayName: shirt.additionalAttributes.displayName
      });
    });
  }

  // Handle sponsorships
  const sponsorshipsList = order.sponsorships || (order as any).sponshorships;
  if (sponsorshipsList) {
    sponsorshipsList.forEach((spon: any) => {
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

  const totalsBgColor =
    order.paymentStatus === CONSTANTS.success ? 'bg-green-50' :
      order.paymentStatus === CONSTANTS.pending ? 'bg-yellow-50' :
        order.paymentStatus === CONSTANTS.cancelled ? 'bg-orange-50' :
          order.paymentStatus === 'FAILED' ? 'bg-red-50' : 'bg-gray-50';

  return (
    <div className={s.container}>
      <div className={`${s.leftColumnBase} ${leftColumnColor}`}>
        <div>
          <span className={s.orderIdValue}>#{order.orderId.substring(0, 8).toUpperCase()}</span>
        </div>

        <div>
          <span className={`${s.statusBadge} ${order.paymentStatus === CONSTANTS.success ? s.statusSuccess :
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
                      <span className="font-medium mr-1">Size:</span> <strong>{item.size}</strong>
                      {(() => {
                        const sizeInfo = sizeChart.find(row => row.size === item.size);
                        return sizeInfo ? (
                          <span className="text-xs italic text-black/50 ml-1 font-normal">
                            (Chest: {sizeInfo.width}in - Length: {sizeInfo.length}in)
                          </span>
                        ) : null;
                      })()}
                      {item.displayName ? <><span className="mx-1.5 opacity-50">|</span><span className="font-medium mr-1">Name:</span> {item.displayName}</> : ''}
                    </span>
                  )}
                </div>
                <span className={s.itemPrice}>₹{(item.price || 0).toLocaleString('en-IN')}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`border-t border-gray-200 flex flex-col gap-1 mt-2 pt-3 pb-3 px-5 -mx-5 -mb-2 ${totalsBgColor}`}>
          <div className="flex justify-between items-center w-full">
            <span className={s.totalLabel}>Order Amount</span>
            <span className={s.itemPrice}>₹{(order.totalOrderAmount?.orderAmount || totalCart || 0).toLocaleString('en-IN')}</span>
          </div>
          {order.totalOrderAmount?.platformFee ? (
            <div className="flex justify-between items-center w-full">
              <span className={s.totalLabel}>Platform Fee</span>
              <span className={s.itemPrice}>₹{order.totalOrderAmount.platformFee.toLocaleString('en-IN')}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
