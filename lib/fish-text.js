'use babel'

import { CompositeDisposable } from 'atom'

const SNIPPET = 'рыба'

const getText = (number = 3, type = 'sentence', format = 'json') =>
  new Promise((resolve, reject) =>
    fetch(`http://fish-text.ru/get?type=${type}&number=${number}&format=${format}`)
      .then(r => format === 'json' ? r.json() : r.text())
      .then(result => {
        if (format === 'html') return resolve(result)
        return result.status === 'success'
          ? resolve(result.text)
          : reject(new Error('Unknown error!'))
      }))

export default {
  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'fish-text:toggle': this.toggle,
      'fish-text:toggle-html': () => this.toggle('sentence', 'html')
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  async toggle(type = 'sentence', format = 'json') {
    console.log(`[FISH TEXT] Toggling...`)
    let editor = atom.workspace.getActivePaneItem()
    let keyword = editor.getWordUnderCursor({
      wordRegex: new RegExp(`${SNIPPET}(\\d+)?`, 'i')
    }).toLowerCase()

    let count = keyword !== SNIPPET
      ? parseInt(keyword.replace(SNIPPET, ''))
      : 3

    if (isNaN(count)) count = 3

    if (count > 100)
      return atom.notifications.addError('No! You can\'t request more than 100 sentences or paragraphs!')

    let condition = keyword.includes(SNIPPET)
    console.log(`[FISH TEXT] Keyword is: ${keyword}. Count is: ${count}. Condition is ${condition}`)
    if (condition) {
      try {
        console.log(`[FISH TEXT] Fetching text...`)
        let text = await getText(count, type, format).catch(console.error)
        console.log(`[FISH TEXT] Putting text inside...`)
        editor.selectLeft(keyword.length)
        editor.insertText(text)
      }
      catch (err) {
        console.error(`[FISH TEXT] Got an exception: ${err}`)
      }
    }
  }
}
