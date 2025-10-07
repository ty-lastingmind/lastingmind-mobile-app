import * as FileSystem from 'expo-file-system'
import { Logger } from '~/services'

export async function saveBase64ToFile(base64Audio: string): Promise<string> {
  try {
    const fileName = `audio_${Date.now()}.mp3` // or .wav depending on format
    const fileUri = `${FileSystem.cacheDirectory}${fileName}`

    const base64Data = base64Audio.includes(',') ? base64Audio.split(',')[1] : base64Audio

    await FileSystem.writeAsStringAsync(fileUri, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    })

    Logger.logInfo('[audio] Saved audio file', { fileUri })

    return fileUri
  } catch (error) {
    Logger.logError('[audio] Failed to save base64 audio:', error)
    throw error
  }
}

export async function deleteAllAudioFiles(): Promise<void> {
  try {
    const cacheDir = FileSystem.cacheDirectory
    if (!cacheDir) {
      Logger.logWarn('[audio] Cache directory not available')
      return
    }

    // Read all files in cache directory
    const files = await FileSystem.readDirectoryAsync(cacheDir)

    // Filter files that start with 'audio_'
    const audioFiles = files.filter((file) => file.startsWith('audio_'))

    // Delete each audio file
    const deletePromises = audioFiles.map((file) => {
      const fileUri = `${cacheDir}${file}`
      return FileSystem.deleteAsync(fileUri, { idempotent: true })
    })

    await Promise.all(deletePromises)

    Logger.logInfo(`[audio] Deleted ${audioFiles.length} audio file(s)`)
  } catch (error) {
    Logger.logError('[audio] Failed to delete audio files:', error)
    throw error
  }
}
