export function dataURLtoBlob(b64,filename) {
  const content =window.btoa(unescape(encodeURIComponent(b64)))
  const byteCharacters = atob(content)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray])
  return new File([blob], filename + '.yaml', {})
}