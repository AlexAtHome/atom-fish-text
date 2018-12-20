'use babel'

import { CompositeDisposable } from 'atom'
import { getParagraph, getText } from 'speech-code'

const SNIPPET = 'рыба'
const getKeyword = editor => editor.getWordUnderCursor({
wordRegex: new RegExp(`${SNIPPET}(\\d+)?`, 'i')
}).toLowerCase()

export default {
  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'fish-text:toggle': this.toggle,
      'fish-text:toggle-html': () => this.toggle('html'),
      'fish-text:add': this.add,
      'fish-text:add-html': () => this.add('html'),
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  toggle(format = null) {
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
      let text = getParagraph(count)
      if (format === 'html') {
        text = '<p>' + text + '</p>'
      }

      editor.selectLeft(keyword.length)
      editor.insertText(text)
    }
  },

  add(format = null) {
    let editor = atom.workspace.getActivePaneItem()
    let text = getParagraph(count)
    if (format === 'html') {
      text = '<p>' + text + '</p>'
    }
    editor.insertText(text)
  }
}
