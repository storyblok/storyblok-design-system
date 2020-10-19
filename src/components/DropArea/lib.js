
const typeMapping = {
  images: 'image/x-png, image/png, image/gif, image/jpeg, image/svg+xml, image/webp',
  videos: 'video/*, application/mp4, application/x-mpegurl, application/vnd.apple.mpegurl, audio/webm',
  audios: 'audio/*',
  texts: 'application/msword, text/plain, application/pdf'
}

/**
 * @method   acceptedFiles
 * @param   {string} filetypes name of files extension
 * @returns {String}
 */
export const acceptedFiles = (filetypes) => {
  if (!filetypes) {
    return '*'
  }

  const accepts = []

  filetypes.forEach((ft) => {
    accepts.push(typeMapping[ft])
  })

  return accepts.join(', ')
}
