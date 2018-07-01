'use strict';
import * as vscode from 'vscode';
import { workspace, window, Range, Position } from 'vscode';
import { decorate } from './decorators';

const configuration = workspace.getConfiguration('sassSpacer');

const {
  spacer,
  inadequateValueColor,
  adequateValueColor,
  neutralColor,
  enableSensitiveColors,
} = configuration;

export function activate(context: vscode.ExtensionContext) {
  const editor = window.activeTextEditor;

  const document = editor.document;

  workspace.onDidChangeTextDocument(ev => processActiveFile(ev.document));
  window.onDidChangeActiveTextEditor(ev => ev && processActiveFile(ev.document));
  if (window.activeTextEditor) {
    processActiveFile(window.activeTextEditor.document);
  }
}

function processActiveFile(document) {
  if (document && document.languageId === 'scss') {
    const parsedDoc = parse(document.getText());
    parsedDoc.map(i => {
      let msg = '', color = adequateValueColor;

      const values = i.matches.map(m => {
        const value = m.value/spacer;
        msg += ` $spacer*${String(value)}`;
        if (m.value % spacer !== 0 && enableSensitiveColors) { color = inadequateValueColor; }
      });

      decorate(
        msg,
        { line: i.line, fileName: document.fileName },
        configuration.enableSensitiveColors ? color : neutralColor,
      );
    });
  }
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