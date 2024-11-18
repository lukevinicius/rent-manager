module.exports = {
  plugins: [
    require('prettier-plugin-tailwindcss'),
    '@trivago/prettier-plugin-sort-imports',
  ],
  importOrder: [
    '^(.*).css$',
    '^react$',
    '<THIRD_PARTY_MODULES>',
    '^@/lib/(.*)$',
    '^@/components/(.*)$',
    '^@/actions/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
