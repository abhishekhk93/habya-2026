export type ConfigData = {
  price_event_singles: string;
  price_event_doubles: string;

  price_shirt_round_neck_half_sleeves: string;
  price_shirt_round_neck_sleeveless: string;
  price_shirt_collared_half_sleeves: string;

  is_registration_open: boolean | string;
  is_shirt_orders_open: boolean | string;
  is_sponsorships_open: boolean | string;
  is_captcha_enabled: boolean | string;
};