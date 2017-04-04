import markdownIt from 'markdown-it'
import mdFence from '../src'
const md = markdownIt()

test('main', () => {
  expect(typeof mdFence).toBe('function')
})

test('render', () => {
  const testStr = `
    \`\`\`test
    I'm testing
    \`\`\`
  `
  const plugin = () => mdFence(md, 'test')
  console.log(plugin)
  expect(md.use(plugin).render(testStr)).toBe(`<pre><code>\`\`\`test\nI'm testing\n\`\`\`\n</code></pre>\n`)
})
