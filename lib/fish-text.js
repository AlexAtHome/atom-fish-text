'use babel'

import { CompositeDisposable } from 'atom'

const SNIPPET = 'рыба'
const getKeyword = editor => editor.getWordUnderCursor({
wordRegex: new RegExp(`${SNIPPET}(\\d+)?`, 'i')
}).toLowerCase()

const getText = (number = 3, type = 'sentence', format = 'json') =>
  new Promise((resolve, reject) =>
    fetch(`http://fish-text.ru/get?type=${type}&number=${number}&format=${format}`)
      .then(r => format === 'html' ? r.text() : r.json())
      .then(result =>
        format === 'html'
          ? resolve(result)
          : result.status == 'success'
            ? resolve(result.text)
            : (console.error(result), reject(new Error('Unknown error!')))
      ))

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
    let editor = atom.workspace.getActivePaneItem()
    let keyword = getKeyword(editor)

    let count = keyword === SNIPPET
      ? 3
      : isNaN(parseInt(keyword.replace(SNIPPET, '')))
        ? parseInt(keyword.replace(SNIPPET, ''))
        : 3

    if (count > 100)
      return atom.notifications.addError('No! You can\'t request more than 100 sentences or paragraphs!')

    let condition = keyword.startsWith(SNIPPET)
    if (condition) {
      console.log(`[FISH TEXT] Fetching text...`)
      let text = await getText(count, type, format).catch(err => {
        console.error(err)
        atom.notifications.addError('Произошла непредвиденная ошибка! Подробности в консоли в Dev Tools.')
      })
      console.log(`[FISH TEXT] Putting text inside...`)
      editor.selectLeft(keyword.length)
      editor.insertText(text)
    }
  }
}
