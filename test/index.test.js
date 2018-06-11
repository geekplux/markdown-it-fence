import markdownIt from 'markdown-it'
import mdFence from '../src'

const md = markdownIt()

const res = 'I\'m testing'

test('main', () => {
  expect(typeof mdFence).toBe('function')
})

test('name unmatched', () => {
  const testStr = `
\`\`\`test
I'm testing
\`\`\`
  `

  const plugin = () => mdFence(md, 'mytest', {
    render: () => res
  })
  expect(md.use(plugin).render(testStr)).toBe(`<pre><code class="language-test">I'm testing\n</code></pre>\n`)
})

test('custom marker', () => {
  const testStr = `
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

  expect(md.use(plugin).render(testStr)).toBe(res)
})

test('default render test', () => {
  const testStr = `
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
    mdFence(md, 'test')
  }

  expect(md.use(plugin).render(testStr)).toBe(text)
})

test('custom render', () => {
  const testStr = `
***customrender
world
***
`

  const plugin = () => {
    mdFence(md, 'customrender', {
      marker: '*',
      render: (tokens, idx) => ('hello ' + tokens[idx].content).trim()
    })
  }

  expect(md.use(plugin).render(testStr)).toBe('hello world')
})
