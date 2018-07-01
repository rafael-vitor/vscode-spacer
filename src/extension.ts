'use strict';
import * as vscode from 'vscode';
import {workspace, window, Range, Position} from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  console.log('Congratulations, your extension "spacer" is now active!');
  const editor = window.activeTextEditor;

  const document = editor.document;
  // console.log({ document });
  parse(document.getText());
  // const packageInfo = {
  //   line: 3,
  //   fileName: document.fileName,
  // };

  // decorate('msg', packageInfo, '#7cc36e');
}

function parse(text) {
  // console.log(text);
  const lines = text.split('\n');
  const numLines = lines.length;

  const m = lines.map((l, i) => {
    if (l.includes('px')) {
      console.log(l);
      const re = /(\d+)px/g;
      let matches = [];
      let regArr;

      while ((regArr = re.exec(l)) !== null) {
        matches.push({
          value: regArr[1],
          index: regArr.index,
        });
      }
      console.log({ matches });

      return {
        line: i,
        matches,
      };
    }
  }).filter(i => i);

  console.log({
    numLines,
    lines,
    m,
  });
}

export function deactivate() {
}