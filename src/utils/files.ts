import { Directory, File, Paths } from 'expo-file-system'
import { Logger } from '~/services'

export async function saveBase64ToFile(base64Audio: string): Promise<string> {
  try {
    const fileName = `audio_${Date.now()}.mp3` // or .wav depending on format
    const file = new File(Paths.cache, fileName)

    const base64Data = base64Audio.includes(',') ? base64Audio.split(',')[1] : base64Audio

    file.write(base64Data, {
      encoding: 'base64',
    })

    Logger.logInfo('[audio] Saved audio file', { fileUri: file.uri })

    return file.uri
  } catch (error) {
    Logger.logError('[audio] Failed to save base64 audio:', error)
    throw error
  }
}

export async function deleteAllAudioFiles(): Promise<void> {
  try {
    const cacheDir = new Directory(Paths.cache)

    if (!cacheDir) {
      Logger.logWarn('[audio] Cache directory not available')
      return
    }

    // Read all files in cache directory
    const files = cacheDir.list()

    // Filter files that start with 'audio_'
    const audioFiles = files.filter((file) => file.name.startsWith('audio_'))

    audioFiles.forEach((file) => {
      return file.delete()
    })

    Logger.logInfo(`[audio] Deleted ${audioFiles.length} audio file(s)`)
  } catch (error) {
    Logger.logError('[audio] Failed to delete audio files:', error)
    throw error
  }
}
