'use babel'

import { CompositeDisposable } from 'atom'

const SNIPPET = 'рыба'

const getText = (number = 1, type = 'sentence', format = 'json') => {
  let url = `http://fish-text.ru/get?type=${type}&number=${number}&format=${format}`
  atom.notifications.addInfo(url, options)
  return new Promise((resolve, reject) =>
    fetch()
      .then(r => r.json())
      .then(({ status, text }) =>
        status === 'success'
        ? resolve(text)
        : reject(new Error('Unknown error!'))))
}

export default {
  subscriptions: null,

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
    console.log(`[FISH TEXT] Toggling...`)
    let editor = atom.workspace.getActivePaneItem()
    let keyword = editor.getWordUnderCursor({
      wordRegex: new RegExp(`${SNIPPET}(\\d+)?`, 'i')
    }).toLowerCase()

    let count = keyword !== SNIPPET
      ? parseInt(keyword.replace(SNIPPET, ''))
      : 1

    if (isNaN(count)) count = 1

    if (count > 100)
      return atom.notifications.addError('No! You can\'t request more than 100 sentences or paragraphs!')

    let condition = keyword.includes(SNIPPET)
    console.log(`[FISH TEXT] Keyword is: ${keyword}. Count is: ${count}. Condition is ${condition}`)
    if (condition) {
      try {
        console.log(`[FISH TEXT] Fetching text...`)
        let text = await getText(count).catch(console.error)
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
