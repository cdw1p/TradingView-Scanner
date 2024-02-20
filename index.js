const axios = require('axios')
const fs = require('fs-extra')

/**
 * Array containing the names of groups of indicators
 * @type {string[]}
 */
const listRecomendation = ['Rec.Stoch.RSI', 'Rec.WR', 'Rec.BBPower', 'Rec.UO', 'Rec.Ichimoku', 'Rec.RSI', 'Rec.HullMA9']
const listPivotClassic = ['Pivot.M.Classic.S3', 'Pivot.M.Classic.S2', 'Pivot.M.Classic.S1', 'Pivot.M.Classic.Middle', 'Pivot.M.Classic.R1', 'Pivot.M.Classic.R2', 'Pivot.M.Classic.R3']
const listPivotFibonacci = ['Pivot.M.Fibonacci.S3', 'Pivot.M.Fibonacci.S2', 'Pivot.M.Fibonacci.S1', 'Pivot.M.Fibonacci.Middle', 'Pivot.M.Fibonacci.R1', 'Pivot.M.Fibonacci.R2', 'Pivot.M.Fibonacci.R3']
const listPivotCamarilla = ['Pivot.M.Camarilla.S3', 'Pivot.M.Camarilla.S2', 'Pivot.M.Camarilla.S1', 'Pivot.M.Camarilla.Middle', 'Pivot.M.Camarilla.R1', 'Pivot.M.Camarilla.R2', 'Pivot.M.Camarilla.R3']
const listPivotWoodie = ['Pivot.M.Woodie.S3', 'Pivot.M.Woodie.S2', 'Pivot.M.Woodie.S1', 'Pivot.M.Woodie.Middle', 'Pivot.M.Woodie.R1', 'Pivot.M.Woodie.R2', 'Pivot.M.Woodie.R3']
const listPivotDemark = ['Pivot.M.Demark.S1', 'Pivot.M.Demark.Middle', 'Pivot.M.Demark.R1']
const listIndicators = ['RSI', 'Stoch.K', 'Stoch.D', 'CCI20', 'ADX', 'ADX-DI', 'AO', 'Mom', 'MACD.macd', 'MACD.signal', 'W.R', 'HullMA9']
const listEMASMA = ['EMA10', 'SMA10', 'EMA20', 'SMA20', 'EMA30', 'SMA30', 'EMA50', 'SMA50', 'EMA100', 'SMA100', 'EMA200', 'SMA200']

/**
 * Formats the readme content based on the provided data.
 * @param {object} data - The data used to format the readme.
 * @returns {string[]} - The formatted readme content as an array of strings.
 */
const formatReadme = (data) => {
  const formattedReadme = []
  formattedReadme.push('# TradingView Scanner')
  formattedReadme.push('This data is retrieved from TradingView Scanner API, Last updated at ' + new Date().toISOString())
  formattedReadme.push('\n## Recomendation')
  formattedReadme.push(`| ${listRecomendation.map((item) => `${item.split('.')[1]} |`).join(' ')}`)
  formattedReadme.push(`| ${listRecomendation.map((item) => `:---: |`).join(' ')}`)
  formattedReadme.push(`| ${listRecomendation.map((item) => `${data[item + '|240'] === 1 ? 'Buy' : data[item + '|240'] === 0 ? 'Neutral' : 'Sell'} |`).join(' ')}`)
  formattedReadme.push('\n## Pivot Points Classic')
  formattedReadme.push(`| ${listPivotClassic.map((item) => `${item.split('.')[3]} |`).join(' ')}`)
  formattedReadme.push(`| ${listPivotClassic.map((item) => `:---: |`).join(' ')}`)
  formattedReadme.push(`| ${listPivotClassic.map((item) => `${data[item + '|240'].toFixed(2)} |`).join(' ')}`)
  formattedReadme.push('\n## Pivot Points Fibonacci')
  formattedReadme.push(`| ${listPivotFibonacci.map((item) => `${item.split('.')[3]} |`).join(' ')}`)
  formattedReadme.push(`| ${listPivotFibonacci.map((item) => `:---: |`).join(' ')}`)
  formattedReadme.push(`| ${listPivotFibonacci.map((item) => `${data[item + '|240'].toFixed(2)} |`).join(' ')}`)
  formattedReadme.push('\n## Pivot Points Camarilla')
  formattedReadme.push(`| ${listPivotCamarilla.map((item) => `${item.split('.')[3]} |`).join(' ')}`)
  formattedReadme.push(`| ${listPivotCamarilla.map((item) => `:---: |`).join(' ')}`)
  formattedReadme.push(`| ${listPivotCamarilla.map((item) => `${data[item + '|240'].toFixed(2)} |`).join(' ')}`)
  formattedReadme.push('\n## Pivot Points Woodie')
  formattedReadme.push(`| ${listPivotWoodie.map((item) => `${item.split('.')[3]} |`).join(' ')}`)
  formattedReadme.push(`| ${listPivotWoodie.map((item) => `:---: |`).join(' ')}`)
  formattedReadme.push(`| ${listPivotWoodie.map((item) => `${data[item + '|240'].toFixed(2)} |`).join(' ')}`)
  formattedReadme.push('\n## Pivot Points Demark')
  formattedReadme.push(`| ${listPivotDemark.map((item) => `${item.split('.')[3]} |`).join(' ')}`)
  formattedReadme.push(`| ${listPivotDemark.map((item) => `:---: |`).join(' ')}`)
  formattedReadme.push(`| ${listPivotDemark.map((item) => `${data[item + '|240'].toFixed(2)} |`).join(' ')}`)
  formattedReadme.push('\n## Technical Indicators')
  formattedReadme.push(`| ${listIndicators.map((item) => `${item.split('|')[0].replace(/.macd|.signal/, '')} |`).join(' ')}`)
  formattedReadme.push(`| ${listIndicators.map((item) => `:---: |`).join(' ')}`)
  formattedReadme.push(`| ${listIndicators.map((item) => `${data[item + '|240'].toFixed(2)} |`).join(' ')}`)
  formattedReadme.push('\n## EMA & SMA')
  formattedReadme.push(`| ${listEMASMA.map((item) => `${item.split('|')[0]} |`).join(' ')}`)
  formattedReadme.push(`| ${listEMASMA.map((item) => `:---: |`).join(' ')}`)
  formattedReadme.push(`| ${listEMASMA.map((item) => `${data[item + '|240'].toFixed(2)} |`).join(' ')}`)
  return formattedReadme
}

/**
 * Main function that fetches data from TradingView API and writes formatted data to README.md file.
 * @returns {Promise<void>} A promise that resolves when the data is fetched and written to the file.
 */
const main = async () => {
  try {
    const symbol = 'CRYPTO:BTCUSD'
    const { data } = await axios.get(`https://scanner.tradingview.com/symbol?symbol=${symbol}&fields=240,RSI|240,RSI[1]|240,Stoch.K|240,Stoch.D|240,Stoch.K[1]|240,Stoch.D[1]|240,CCI20|240,CCI20[1]|240,ADX|240,ADX+DI|240,ADX-DI|240,ADX+DI[1]|240,ADX-DI[1]|240,AO|240,AO[1]|240,AO[2]|240,Mom|240,Mom[1]|240,MACD.macd|240,MACD.signal|240,Rec.Stoch.RSI|240,Stoch.RSI.K|240,Rec.WR|240,W.R|240,Rec.BBPower|240,BBPower|240,Rec.UO|240,UO|240,EMA10|240,close|240,SMA10|240,EMA20|240,SMA20|240,EMA30|240,SMA30|240,EMA50|240,SMA50|240,EMA100|240,SMA100|240,EMA200|240,SMA200|240,Rec.Ichimoku|240,Ichimoku.BLine|240,Rec.VWMA|240,VWMA|240,Rec.HullMA9|240,HullMA9|240,Pivot.M.Classic.S3|240,Pivot.M.Classic.S2|240,Pivot.M.Classic.S1|240,Pivot.M.Classic.Middle|240,Pivot.M.Classic.R1|240,Pivot.M.Classic.R2|240,Pivot.M.Classic.R3|240,Pivot.M.Fibonacci.S3|240,Pivot.M.Fibonacci.S2|240,Pivot.M.Fibonacci.S1|240,Pivot.M.Fibonacci.Middle|240,Pivot.M.Fibonacci.R1|240,Pivot.M.Fibonacci.R2|240,Pivot.M.Fibonacci.R3|240,Pivot.M.Camarilla.S3|240,Pivot.M.Camarilla.S2|240,Pivot.M.Camarilla.S1|240,Pivot.M.Camarilla.Middle|240,Pivot.M.Camarilla.R1|240,Pivot.M.Camarilla.R2|240,Pivot.M.Camarilla.R3|240,Pivot.M.Woodie.S3|240,Pivot.M.Woodie.S2|240,Pivot.M.Woodie.S1|240,Pivot.M.Woodie.Middle|240,Pivot.M.Woodie.R1|240,Pivot.M.Woodie.R2|240,Pivot.M.Woodie.R3|240,Pivot.M.Demark.S1|240,Pivot.M.Demark.Middle|240,Pivot.M.Demark.R1|240&no_404=true`)
    const formattedReadme = formatReadme(data)
    await fs.writeFileSync('README.md', formattedReadme.join('\n'))
  } catch (err) {
    console.error(err)
    throw new Error('Failed to fetch data from TradingView API')
  }
}

/**
 * Calls the main function.
 */
main()