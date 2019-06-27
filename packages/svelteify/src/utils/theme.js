export function generateTheme(theme, color, background = true) {
  let style = ''
  let strColors = ''
  let parts = color.split(' ')

  parts.forEach(function(part, index, array) {
    if (part[0] === '#') {
      style += `${background ? 'background-' : ''}color: ${part};`
    } else if (Object.keys(theme).includes(part)) {
      style += `${background ? 'background-' : ''}color: ${theme[part]};`
    } else {
      strColors += `${part} `
    }
  })

  return {
    style,
    strColors
  }
}
