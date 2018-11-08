'use babel'

import { CompositeDisposable } from 'atom'

const SNIPPET = 'рыба'

const getText = () => new Promise((resolve, reject) =>
  fetch('http://fish-text.ru/get')
    .then(r => r.json())
    .then(({ status, text }) =>
      status === 'success'
      ? resolve(text)
      : reject(new Error('Unknown error!'))))

export default {
  subscriptions: null,
  snippet: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'fish-text:toggle': this.toggle
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  async toggle() {
    console.log`[FISH TEXT] Toggling...`
    let editor = atom.workspace.getActivePaneItem()
    let keyword = editor.getWordUnderCursor({
      wordRegex: new RegExp(`${SNIPPET}(\\d+)?`, 'gi')
    })
    let condition = keyword.toLowerCase().includes(SNIPPET.toLowerCase())
    console.log`[FISH TEXT] Keyword is: ${keyword}. Condition is ${condition}`
    if (condition) {
      try {
        console.log`[FISH TEXT] Fetching text...`
        let text = await getText()
        console.log`[FISH TEXT] Putting text inside...`
        editor.selectLeft(keyword.length)
        editor.insertText(text)
      }
      catch (err) {
        throw err
      }
    }
  }
}
