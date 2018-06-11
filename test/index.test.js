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
  const plugin = () => mdFence(md, 'mytest', {
    render: () => res
  })
  expect(md.use(plugin).render(testStr)).toBe(`<pre><code class="language-test">I'm testing\n</code></pre>\n`)
})

test('custom marker', () => {
  const tStr =
  `
:::test
I'm testing
:::
  `
  const plugin = () => {
    mdFence(md, 'test', {
      marker: ':',
      render: () => res
    })
  }

  expect(md.use(plugin).render(tStr)).toBe(res)
})

test('parse test', () => {
  const tStr = `
  \`\`\`
  # Header1
  \`\`\`

  ### Header3
  `

  const text = `<pre><code># Header1
</code></pre>
<h3>Header3</h3>
`

  const plugin = () => {
    mdFence(md, 'test', {
      marker: '`',
      render: () => res
    })
  }

  expect(md.use(plugin).render(tStr)).toBe(text)
})
