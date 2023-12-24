const axios = require("axios")
const defaultRate = 4.68

/**
 *
 */
const ratesExchange = async (myr) => {
  try {
    const res = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/USD"
    )
    if (res.data.rates.MYR) {
      const rate = res.data.rates.MYR
      const price_usd = (myr / rate).toFixed(2)
      const price_myr = myr
      const rate_myr = rate
      return { price_usd, price_myr, rate_myr }
    }
  } catch (error) {
    const rate = defaultRate
    const price_usd = (myr / rate).toFixed(2)
    const price_myr = myr
    const rate_myr = rate
    return { price_usd, price_myr, rate_myr }
  }
}

module.exports = { ratesExchange }
