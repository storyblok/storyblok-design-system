import axios from 'axios'
import FormData from 'form-data'

const typeMapping = {
  images: 'image/x-png, image/png, image/gif, image/jpeg, image/svg+xml, image/webp',
  videos: 'video/*, application/mp4, application/x-mpegurl, application/vnd.apple.mpegurl, audio/webm',
  audios: 'audio/*',
  texts: 'application/msword, text/plain, application/pdf'
}

const accessToken = 'IuhSKLFSFVPjm7QcIKVd3Qtt-55834-Wh1__tS7WRd2osBpxRxx'
const spaceId = '75070'

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

/**
 * @method   uploadFilesToStoryblok
 * @param   {string} files array with files to upload
 * @returns {Promise}
 */
export const uploadFilesToStoryblok = (file) => {
  if (!file) {
    return
  }

  try {
    axios.post(`https://api.storyblok.com/v1/spaces/${spaceId}/assets`, {
      filename: file.name,
      asset_folder_id: null
    }, {
      headers: { Authorization: accessToken }
    })
      .then(res => {
        return uploadFileToS3(res.data, file)
      })
  } catch (e) {
    return Promise.reject(e)
  }
}

async function uploadFileToS3 (fileResponse, file) {
  try {
    return new Promise((resolve, reject) => {
      const form = new FormData()

      for (const key in fileResponse.fields) {
        form.append(key, fileResponse.fields[key])
      }

      form.append('file', file)

      axios.post(fileResponse.post_url,
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(() => {
        return resolve(fileResponse.pretty_url)
      })
        .catch((e) => {
          return reject(e)
        })
    })
  } catch (e) {
    console.error('An error occurred while uploading the image ' + e.message)
  }
}
