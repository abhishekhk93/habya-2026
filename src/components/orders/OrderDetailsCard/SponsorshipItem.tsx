import { orderDetailsCardStyles as s } from './OrderDetailsCard.styles';

export default function SponsorshipItem() {
  
  return (
    <div className={s.sponserSection}>
        <h4 className={s.sponsorshipTitle}>Thank you!</h4>
        <span className={s.sponsorshipIconWrapper}>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
        </span>
        
        <p className={s.sponsorshipText}>
          We appreciate your generous sponsorship. <br />Your support makes a huge difference!
        </p>
    </div>
  );
}
