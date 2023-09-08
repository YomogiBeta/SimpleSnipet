import {TextDocument} from "vscode"
export type SnipetData = {
  keyword: string,
  document: TextDocument
}
export type Snipets = {
  [language: string]: Array<SnipetData>
}