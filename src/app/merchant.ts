export interface Merchant {
  _id?: string,
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  phoneNumber?: string,
  companyDesc?: string,
  status?: string,
  isFirstLogin?: boolean,
}

export interface getTopProduct {
  _id: string
  name: string
  price: number
  product_sold: number
  total_sold: number
}
