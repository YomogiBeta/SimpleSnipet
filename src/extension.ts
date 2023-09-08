import * as vscode from "vscode"
import { Snipets} from "./@types/SnipetType"
import Completion from "./completion"

const loadSnipets = async (context: vscode.ExtensionContext) => {
  const snipets: Snipets = {}
  if (vscode.workspace.workspaceFolders !== undefined) {
    const vscsnipetsPattern = new vscode.RelativePattern(
      vscode.workspace.workspaceFolders?.[0].uri.path + "/.vscsnipets",
      "*"
    )
    const resultUris: vscode.Uri[] = await vscode.workspace.findFiles(vscsnipetsPattern, null, 100)

    const createSnipetDataTasks = resultUris.map((uri: vscode.Uri) => {
      const task = async () => {
        const textDocument: vscode.TextDocument = await vscode.workspace.openTextDocument(uri)
        if (snipets[textDocument.languageId] === undefined) {
          snipets[textDocument.languageId] = []
        }
        const fileName = textDocument.fileName
        snipets[textDocument.languageId].push({
          keyword: fileName.substring(
            fileName.lastIndexOf("\\") + 1,
            fileName.lastIndexOf(".")
          ),
          document: textDocument,
        })
      }
      return task()
    })

    await Promise.all(createSnipetDataTasks).then(() => {
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
    event.files.map(async (file: vscode.Uri) => {
      let fileName = file.path.substring(
        file.path.lastIndexOf("/") + 1,
        file.path.length
      )
      // console.log(fileName)
      if (vscode.workspace.workspaceFolders?.[0].uri.path + "/.vscsnipets/" + fileName === file.path) {
        const textDocument: vscode.TextDocument = await vscode.workspace.openTextDocument(file)
        let provider = vscode.languages.registerCompletionItemProvider(
          textDocument.languageId,
          new Completion([
            {
              keyword: fileName.substring(
                fileName.lastIndexOf("\\") + 1,
                fileName.lastIndexOf(".")
              ),
              document: textDocument,
            },
          ])
        )
        context.subscriptions.push(provider)
      }
    })
  })
}

export function deactivate() { }