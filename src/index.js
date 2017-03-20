'use strict'

const defaults = {
  name: 'name',
  marker: '`'
}

export default function (md, opts) {
  const options = Object.assign({}, defaults, opts)

  function defaultValidate (params) {
    return params.trim().split(' ', 2)[0] === options.name
  }

  function defaultRender (tokens, idx, _options, env, self) {
    if (tokens[idx].nesting === 1) {
      tokens[idx].attrPush([ 'class', options.name ])
    }

    return self.renderToken(tokens, idx, _options, env, self)
  }

  function fence (state, startLine, endLine) {
    let marker, len, params, nextLine, mem, token, markup
    let haveEndMarker = false
    let pos = state.bMarks[startLine] + state.tShift[startLine]
    let max = state.eMarks[startLine]

    if (state.sCount[startLine] - state.blkIndent >= 4) return false
    if (pos + 3 > max) return false

    marker = state.src.charCodeAt(pos)

    if (marker !== options.marker.charCodeAt(0)) return false

    mem = pos
    pos = state.skipChars(pos, marker)
    len = pos - mem

    if (len < 3) return false

    markup = state.src.slice(mem, pos)
    params = state.src.slice(pos, max)

    if (params.indexOf(String.fromCharCode(marker)) >= 0) return false

    nextLine = startLine

    while (1) {
      nextLine++
      if (nextLine >= endLine) break

      pos = mem = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]

      if (pos < max && state.sCount[nextLine] < state.blkIndent) break
      if (state.src.charCodeAt(pos) !== marker) continue
      if (state.sCount[nextLine] - state.blkIndent >= 4) continue

      pos = state.skipChars(pos, marker)

      if (pos - mem < len) continue

      pos = state.skipSpaces(pos)

      if (pos < max) continue

      haveEndMarker = true

      break
    }

    len = state.sCount[startLine]
    state.line = nextLine + (haveEndMarker ? 1 : 0)

    if (defaultValidate(params)) token = state.push(options.name, 'div', 0)
    else token = state.push('fence', 'code', 0)
    token.info = params
    token.content = state.getLines(startLine + 1, nextLine, len, true)
    token.markup = markup
    token.map = [ startLine, state.line ]

    return true
  }

  md.block.ruler.before('fence', options.name, fence, {
    alt: [ 'paragraph', 'reference', 'blockquote', 'list' ]})
  md.renderer.rules[options.name] = defaultRender

}
