export function normalizeCurrencyNumber(value: string) {
  const number = Number(value.replace(/[^0-9]/g, ''))

  const currency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(number / 100)

  return currency
}
