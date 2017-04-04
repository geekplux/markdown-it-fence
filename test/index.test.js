import markdownIt from 'markdown-it'
import mdFence from '../src'
const md = markdownIt()

const testStr = `
  \`\`\`test
  I'm testing
  \`\`\`
`
const res = 'I\'m testing'

test('main', () => {
  expect(typeof mdFence).toBe('function')
})

test('name unmatched', () => {
  const plugin1 = () => mdFence(md, 'mytest', {
    render: () => res
  })
  expect(md.use(plugin1).render(testStr)).toBe(`<pre><code>\`\`\`test\nI'm testing\n\`\`\`\n</code></pre>\n`)
})

test('custom render', () => {
  const plugin2 = () => {
    mdFence(md, 'test', {
      render: () => res
    })
  }
  expect(md.use(plugin2).render(testStr)).toBe(res)
})
