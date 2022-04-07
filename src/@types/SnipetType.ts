export type SnipetData = {
  keyword: string
  body: string
}
export type Snipet = {
  [language: string]: Array<SnipetData>
}