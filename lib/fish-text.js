'use babel'

import { CompositeDisposable } from 'atom'
import { getParagraph } from 'speech-code'

const SNIPPET = 'рыба'

export default {
  subscriptions: null,

  activate() {
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
    const editor = atom.workspace.getActivePaneItem()
    const keyword = editor.getWordUnderCursor({
        wordRegex: new RegExp(`(${SNIPPET}|${SNIPPET.toUpperCase()})([0-9]+)?`, 'gi'),
      })
      .toLowerCase()
    console.warn(`Got '${keyword}'`)
    if (!keyword.startsWith(SNIPPET)) {
      return
    }

    let count = parseInt(keyword.replace(SNIPPET, ''), 10)
    if (Number.isNaN(count)) {
      count = 3
    }
    if (count < 1) {
      return atom.notifications.addError('No! You can\'t request less than 1 sentence or paragraph! How would you even do that?')
    }
    if (count > 100) {
      return atom.notifications.addError('No! You can\'t request more than 100 sentences or paragraphs!')
    }

    let text = getParagraph(count)
    if (format === 'html') {
      text = `<p>${text}</p>`
    }
    editor.selectLeft(keyword.length)
    editor.insertText(text)
  },

  add(format = null) {
    const editor = atom.workspace.getActivePaneItem()
    let text = getParagraph()
    if (format === 'html') {
      text = `<p>${text}</p>`
    }
    editor.insertText(text)
  }
}
