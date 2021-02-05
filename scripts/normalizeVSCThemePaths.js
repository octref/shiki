const fs = require('fs')
const path = require('path')
const json5 = require('json5')
const { THEME_FOLDER_PATH, normalizeThemeFile } = require('./normalizeThemeFile')

const VSCODE_THEME_FOLDER_PATH = path.join(THEME_FOLDER_PATH, 'vscode')

/**
 * Handle dark/light plus
 *
 * - Merge dark_vs into dark_plus
 * - Merge light_vs into light_plus
 * - Unshift `editor.foreground` and `editor.background` to beginning of `tokenColors`.
 */

function readJson5(f) {
  const p = path.resolve(VSCODE_THEME_FOLDER_PATH, f)
  if (!fs.existsSync(p)) {
    return undefined
  }

  return json5.parse(fs.readFileSync(p, 'utf-8'))
}
const darkVSContent = readJson5('dark_vs.json')
const darkPlusContent = readJson5('dark_plus.json')

if (darkVSContent && darkPlusContent) {
  delete darkPlusContent['include']
  const darkDefaultFgBgTokenColor = {
    settings: {
      foreground: darkVSContent['colors']['editor.foreground']
    }
  }
  darkPlusContent.name = 'dark-plus'
  darkPlusContent.colors = { ...darkVSContent.colors }
  darkPlusContent.tokenColors = [
    darkDefaultFgBgTokenColor,
    ...darkVSContent.tokenColors,
    ...darkPlusContent.tokenColors
  ]
  darkPlusContent.semanticTokenColors = {
    ...darkVSContent.semanticTokenColors,
    ...darkPlusContent.semanticTokenColors
  }

  fs.writeFileSync(
    path.resolve(VSCODE_THEME_FOLDER_PATH, 'dark_plus.json'),
    JSON.stringify(darkPlusContent, null, 2)
  )
  fs.unlinkSync(path.resolve(VSCODE_THEME_FOLDER_PATH, 'dark_vs.json'))
}

const lightVSContent = readJson5('light_vs.json')
const lightPlusContent = readJson5('light_plus.json')

if (lightVSContent && lightPlusContent) {
  delete lightPlusContent['include']
  const lightDefaultFgBgTokenColor = {
    settings: {
      foreground: lightVSContent['colors']['editor.foreground']
    }
  }
  lightPlusContent.name = 'light-plus'
  lightPlusContent.colors = { ...lightVSContent.colors }
  lightPlusContent.tokenColors = [
    lightDefaultFgBgTokenColor,
    ...lightVSContent.tokenColors,
    ...lightPlusContent.tokenColors
  ]
  lightPlusContent.semanticTokenColors = {
    ...lightVSContent.semanticTokenColors,
    ...lightPlusContent.semanticTokenColors
  }

  fs.writeFileSync(
    path.resolve(VSCODE_THEME_FOLDER_PATH, 'light_plus.json'),
    JSON.stringify(lightPlusContent, null, 2)
  )
  fs.unlinkSync(path.resolve(VSCODE_THEME_FOLDER_PATH, 'light_vs.json'))
}

normalizeThemeFile('vscode/dark_plus.json')
normalizeThemeFile('vscode/light_plus.json')
normalizeThemeFile('vscode/monokai-color-theme.json', 'monokai')
normalizeThemeFile('vscode/solarized-dark-color-theme.json', 'solarized-dark')
normalizeThemeFile('vscode/solarized-light-color-theme.json', 'solarized-light')
