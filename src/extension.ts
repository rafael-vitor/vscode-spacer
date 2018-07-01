'use strict';
import * as vscode from 'vscode';
import { workspace, window, Range, Position } from 'vscode';
import { decorate } from './decorators';

const RED = '#d44e40';
const GREEN = '#7cc36e';

export function activate(context: vscode.ExtensionContext) {

  console.log('Congratulations, your extension "spacer" is now active!');
  const editor = window.activeTextEditor;

  const document = editor.document;
  const parsedDoc = parse(document.getText());

  parsedDoc.map(i => {
    let msg = '', color = GREEN;
    const values = i.matches.map(m => {
      const value = m.value/8;
      msg += ` ${String(value)}`;
      if (m.value % 8 !== 0) { color = RED; }
    });

    decorate(
      msg,
      { line: i.line, fileName: document.fileName },
      color,
    );
  });
}

function parse(text) {
  const lines = text.split('\n');
  const numLines = lines.length;

  return lines.map((l, i) => {
    if (l.includes('px')) {
      const re = /(\d+)px/g;
      let matches = [];
      let regArr;

      while ((regArr = re.exec(l)) !== null) {
        matches.push({
          value: regArr[1],
          index: regArr.index,
        });
      }

      return {
        line: i + 1,
        matches,
      };
    }
  }).filter(i => i);
}

export function deactivate() {
}