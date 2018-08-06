'use babel';

import { CompositeDisposable } from 'atom'

export default {

  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'fibonacci-indent:indent': () => this.indent()
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  fib(n) {
    curr_fib = 0
    next_fib = 1
    for (var i = 0; i < n; i++) {
      prev_fib = curr_fib
      curr_fib = next_fib
      next_fib = prev_fib + curr_fib
    }
    return curr_fib
  },

  indent() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      // Get Selection by Lines
      let selection = editor.getSelectedText()
      other = []
      lines = selection.split('\n')
      // Only Fibonacci Indent the First 20 Lines
      if (lines.length > 20) {
        console.log("Fibonacci Indenting just the first 20 lines")
        other = lines.slice(20)
        lines = lines.slice(0, 20)
      }
      // Prepend Gutter to First 50 Lines
      for (i = 0; i < lines.length; i++) {
        gutter = " ".repeat(this.fib(i))
        lines[i] = gutter + lines[i]
      }
      // Append Remaining Lines and Convert to Text
      lines = lines.concat(other).join("\n")
      editor.insertText(lines)
    }
  },
};
