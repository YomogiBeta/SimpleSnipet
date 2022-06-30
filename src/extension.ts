import * as vscode from "vscode"
import { Snipet } from "./@types/SnipetType"
import Completion from "./completion"

const loadSnipets = (context: vscode.ExtensionContext) => {
  const snipets: Snipet = {}
  if (vscode.workspace.workspaceFolders !== undefined) {
    const vscsnipetsPattern = new vscode.RelativePattern(
      vscode.workspace.workspaceFolders?.[0].uri.path + "/.vscsnipets",
      "*"
    )
    vscode.workspace
      .findFiles(vscsnipetsPattern, null, 100)
      .then(async (uris: vscode.Uri[]) => {
        await Promise.all(
          uris.map(async (uri: vscode.Uri) => {
            await vscode.workspace
              .openTextDocument(uri)
              .then(async (textDocument: vscode.TextDocument) => {
                if (snipets[textDocument.languageId] === undefined) {
                  snipets[textDocument.languageId] = []
                }
                let fileName = textDocument.fileName
                snipets[textDocument.languageId].push({
                  keyword: fileName.substring(
                    fileName.lastIndexOf("/") + 1,
                    fileName.lastIndexOf(".")
                  ),
                  document: textDocument,
                })
              })
          })
        )
        Object.keys(snipets).forEach(async language => {
          let provider = vscode.languages.registerCompletionItemProvider(
            language,
            new Completion(snipets[language])
          )
          context.subscriptions.push(provider)
        })
      })
  }
}
export function activate(context: vscode.ExtensionContext) {
  loadSnipets(context)

  vscode.workspace.onDidCreateFiles((event: vscode.FileCreateEvent) => {
    event.files.map((file: vscode.Uri) => {
      let fileName = file.path.substring(
        file.path.lastIndexOf("/") + 1,
        file.path.length
      )
      console.log(fileName)
      if (
        vscode.workspace.workspaceFolders?.[0].uri.path +
          "/.vscsnipets/" +
          fileName ===
        file.path
      ) {
        vscode.workspace
          .openTextDocument(file)
          .then(async (textDocument: vscode.TextDocument) => {
            let provider = vscode.languages.registerCompletionItemProvider(
              textDocument.languageId,
              new Completion([
                {
                  keyword: fileName.substring(
                    fileName.lastIndexOf("/") + 1,
                    fileName.lastIndexOf(".")
                  ),
                  document: textDocument,
                },
              ])
            )
            context.subscriptions.push(provider)
          })
      }
    })
  })
}

export function deactivate() {}
