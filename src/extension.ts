'use strict';
import * as vscode from 'vscode';
import {workspace, window, Range, Position} from 'vscode';

const decorationType = window.createTextEditorDecorationType({after: {margin: '0 0 0 1rem'}});
const decorations = {
  "/Users/ravi/workspace/online-office/web/components/about/style.scss": {3: null},
};


export function activate(context: vscode.ExtensionContext) {

  console.log('Congratulations, your extension "spacer" is now active!');
  const editor = window.activeTextEditor;

  const document = editor.document;
  // console.log({ document });
  const packageInfo = {
    line: 3,
    fileName: document.fileName,
  };

  decorate('AQUI PORRA', packageInfo, '#7cc36e');
}

function decorate(text, packageInfo, color) {
  const { fileName, line } = packageInfo;
  console.log(`Setting Decoration: ${text}, ${JSON.stringify(packageInfo, null, 2)}`);
  console.log(decorations['/Users/ravi/workspace/online-office/web/components/about/style.scss']);
  console.log(fileName);

  console.log(decorations[fileName]);
  decorations[fileName][line] = {
    renderOptions: { after: { contentText: text, color } },
    range: new Range(new Position(line - 1, 1024), new Position(line - 1, 1024))
  };
  refreshDecorations(fileName);
}

let decorationsDebounce;
function refreshDecorations(fileName, delay = 10) {
  clearTimeout(decorationsDebounce);
  decorationsDebounce = setTimeout(
    () =>
      getEditors(fileName).forEach(editor => {
        editor.setDecorations(
          decorationType,
          Object.keys(decorations[fileName]).map(x => decorations[fileName][x])
        );
      }),
    delay
  );
}

function getEditors(fileName) {
  return window.visibleTextEditors.filter(editor => editor.document.fileName === fileName);
}

export function deactivate() {
}