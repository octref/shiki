const fs = require('fs')
const shiki = require('shiki')
const { getSVGRenderer } = require('shiki-renderer-svg')

;(async () => {
  const highlighter = await shiki.getHighlighter({
    theme: 'nord'
  })

  const svgRenderer = await getSVGRenderer({
    bg: '#2E3440',
    fontFamily: {
      name: 'IBM Plex Mono',
      cssURL:
        'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap'
    },
    fontSize: 14
  })

  const code = fs.readFileSync('gen-svg-sample.js', 'utf-8')

  const tokens = highlighter.codeToThemedTokens(code, 'js')
  const out = svgRenderer.renderToSVG(tokens)

  fs.writeFileSync('svg.svg', out)

  console.log('done: svg.svg')
})()
