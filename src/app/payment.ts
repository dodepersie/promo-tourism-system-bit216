import { User } from "./user"
import { Product } from "./product"
import { Merchant } from "./merchant"

export interface PostOrder {
  customer_id: string
  product_id: string
  travel_date: string
  total_purchase: number
}

export interface InvoiceDB {
  travel_date: string
  total_purchase: number
  price_usd: number
  price_myr: number
  rate: number
  response_code: string | null
  response_stringify: string | null
  customer_id: string
  merchant_id: string
  product_id: string
  _id: string
}

export interface Invoice {
  created_at: string
  id: string;
  intent: string;
  status: string;
  payment_source: {
    paypal: {
      email_address: string;
      account_id: string;
      account_status: string;
      name: {
        given_name: string;
        surname: string;
      };
      address: {
        country_code: string;
      };
    };
  };
  purchase_units: {
    reference_id: string;
    amount: {
      currency_code: string;
      value: string;
      breakdown: {
        item_total: {
          currency_code: string;
          value: string;
        };
      };
    };
    payee: {
      email_address: string;
      merchant_id: string;
      display_data: {
        brand_name: string;
      };
    };
    description: string;
    items: {
      name: string;
      unit_amount: {
        currency_code: string;
        value: string;
      };
      quantity: string;
      description: string;
    }[];
    payments: {
      captures: {
        id: string;
        status: string;
        amount: {
          currency_code: string;
          value: string;
        };
        final_capture: boolean;
        seller_protection: {
          status: string;
          dispute_categories: string[];
        };
        seller_receivable_breakdown: {
          gross_amount: {
            currency_code: string;
            value: string;
          };
          paypal_fee: {
            currency_code: string;
            value: string;
          };
          net_amount: {
            currency_code: string;
            value: string;
          };
        };
        links: {
          href: string;
          rel: string;
          method: string;
        }[];
        create_time: string;
        update_time: string;
      }[];
    };
  }[];
  payer: {
    name: {
      given_name: string;
      surname: string;
    };
    email_address: string;
    payer_id: string;
    address: {
      country_code: string;
    };
  };
  create_time: string;
  update_time: string;
  links: {
    href: string;
    rel: string;
    method: string;
  }[];
}

export interface getInvoice {
  message: string
  invoice: InvoiceDB
  payment: object | null
  payment_url: string | null
}

export interface getMerchantOrders {
  _id: string
  travel_date: string
  total_purchase: number
  note: string
  price_usd: number
  price_myr: number
  rate: number
  status: string
  response_code: string | null
  response_stringify: string | null
  customer_id: string
  merchant_id: string
  product_id: string
  created_at: string
  user: User[]
  product: Product[]
}

export interface getInvoiceOrders extends Invoice {
  product: Product[]
  payment_url: string | null
  user: User[] | null
  merchant: Merchant[] | null
}

export interface getInvoiceOrdersReview extends getInvoiceOrders {
  review: Review[]
}

export interface modalReview {
  invoice_id: string | null
  name: string | null
}

export interface postReview {
  rating: number
  comment: string
  is_recommend: boolean
}

export interface Review {
  _id: string
  rating: number
  comment: string
  is_recommend: boolean
  invoice_id: string
  customer_id: string
  merchant_id: string
  product_id: string
  created_at: string
}

export interface ReviewUser extends Review {
  user: User[]
}
