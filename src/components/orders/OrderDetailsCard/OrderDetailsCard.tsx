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

  if (order.bags) {
    order.bags.forEach((bag: any) => {
      items.push({
        id: bag.id,
        title: `Premium Bags`,
        price: bag.amount * (bag.quantity || 1),
        type: 'bag',
        quantity: bag.quantity || 1
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
    order.orderStatus === CONSTANTS.success ? s.leftColumnSuccess :
      order.orderStatus === CONSTANTS.pending ? s.leftColumnPending :
        order.orderStatus === CONSTANTS.cancelled ? s.leftColumnCancelled :
          order.orderStatus === 'FAILED' ? s.leftColumnFailed : s.leftColumnDefault;

  const rightColumnColor =
    order.orderStatus === CONSTANTS.success ? s.rightColumnSuccess :
      order.orderStatus === CONSTANTS.pending ? s.rightColumnPending :
        order.orderStatus === CONSTANTS.cancelled ? s.rightColumnCancelled :
          order.orderStatus === 'FAILED' ? s.rightColumnFailed : s.rightColumnDefault;

  const totalsBgColor =
    order.orderStatus === CONSTANTS.success ? 'bg-green-50' :
      order.orderStatus === CONSTANTS.pending ? 'bg-yellow-50' :
        order.orderStatus === CONSTANTS.cancelled ? 'bg-orange-50' :
          order.orderStatus === 'FAILED' ? 'bg-red-50' : 'bg-gray-50';

  return (
    <div className={s.container}>
      <div className={`${s.leftColumnBase} ${leftColumnColor}`}>
        <div>
          <span className={s.orderIdValue}>#{order.orderId.substring(0, 8).toUpperCase()}</span>
        </div>

        <div>
          <span className={`${s.statusBadge} ${order.orderStatus === CONSTANTS.success ? s.statusSuccess :
            order.orderStatus === CONSTANTS.pending ? s.statusPending :
              order.orderStatus === CONSTANTS.cancelled ? s.statusCancelled :
                order.orderStatus === 'FAILED' ? s.statusFailed : s.statusDefault
            }`}>
            {order.orderStatus}
          </span>
        </div>
      </div>

      <div className={`${s.rightColumnBase} ${rightColumnColor}`}>
        <div className={s.itemsSection}>
          <ul className={s.itemsList}>
            {items.map((item, i) => (
              <li key={`${item.id}-${i}`} className={s.itemRow}>
                <div className={s.itemTitleContainer}>
                  <span className={s.itemTitle}>
                    {item.title} {item.type === 'bag' && ` * ${item.quantity}`}
                  </span>
                  {item.type === 'event' && item.partner && (
                    <span className={s.itemMeta}>
                      <span className="font-medium mr-1">Partner:</span>
                      {item.partner.fullName}
                    </span>
                  )}
                  {item.type === 'shirt' && (
                    <div className="flex flex-col gap-0.5 mt-1">
                      <span className={s.itemMeta}>
                        <span className="font-medium mr-1">Size:</span> <strong>{item.size}</strong>
                        {(() => {
                          const sizeInfo = sizeChart.find(row => row.size === item.size);
                          return sizeInfo ? (
                            <span className="text-black/40 ml-1 font-normal">
                              | (Chest: {sizeInfo.width}in - Length: {sizeInfo.length}in)
                            </span>
                          ) : null;
                        })()}
                      </span>
                      {item.displayName && (
                        <span className={s.itemMeta}>
                          <span className="font-medium mr-1">Name to Print:</span> <strong>{item.displayName}</strong>
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <span className={s.itemPrice}>₹{(item.price || 0).toLocaleString('en-IN')}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`border-t border-gray-200 flex flex-col gap-1.5 mt-2 pt-3 pb-3 px-5 -mx-5 -mb-2 ${totalsBgColor}`}>
          <div className="flex justify-between items-center w-full">
            <span className={s.totalLabel}>Order Amount</span>
            <span className={s.itemPrice}>₹{(order.totalOrderAmount?.orderAmount || 0).toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between items-center w-full">
            <span className={s.totalLabel}>Platform Fee</span>
            <span className={s.itemPrice}>₹{(order.totalOrderAmount?.platformFee || 0).toLocaleString('en-IN')}</span>
          </div>

          <div className="border-t border-gray-300/40 my-1"></div>

          <div className="flex justify-between items-center w-full">
            <span className={s.totalLabel} style={{ color: '#111827', fontWeight: 700 }}>Total Amount</span>
            <span className={s.totalValue}>
              ₹{((order.totalOrderAmount?.orderAmount || 0) + (order.totalOrderAmount?.platformFee || 0)).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
