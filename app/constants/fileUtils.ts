export const suggestedTags = [
  "software",
  "ebook",
  "template",
  "plugin",
  "audio",
  "video",
  "graphics",
  "wallpaper",
  "3d-model",
  "animation",
] as const

const FILE_EXTENSIONS = {
  images: ["jpg", "jpeg", "png", "gif", "svg", "webp"],
  documents: ["doc", "docx"],
  pdf: ["pdf"],
  text: ["txt"],
  spreadsheets: ["xls", "xlsx"],
  presentations: ["ppt", "pptx"],
  code: ["js", "jsx", "ts", "tsx"],
  web: ["html", "css"],
  python: ["py"],
  data: ["json"],
  archives: ["zip", "rar", "7z"],
  audio: ["mp3", "wav", "ogg"],
  video: ["mp4", "mov", "avi"],
  design: ["ai", "psd", "sketch"],
} as const

export const getFileIcon = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase() || ""

  if (
    FILE_EXTENSIONS.images.includes(
      extension as (typeof FILE_EXTENSIONS.images)[number],
    )
  )
    return "🖼️"
  if (
    FILE_EXTENSIONS.documents.includes(
      extension as (typeof FILE_EXTENSIONS.documents)[number],
    )
  )
    return "📝"
  if (
    FILE_EXTENSIONS.pdf.includes(
      extension as (typeof FILE_EXTENSIONS.pdf)[number],
    )
  )
    return "📕"
  if (
    FILE_EXTENSIONS.text.includes(
      extension as (typeof FILE_EXTENSIONS.text)[number],
    )
  )
    return "📄"
  if (
    FILE_EXTENSIONS.spreadsheets.includes(
      extension as (typeof FILE_EXTENSIONS.spreadsheets)[number],
    )
  )
    return "📊"
  if (
    FILE_EXTENSIONS.presentations.includes(
      extension as (typeof FILE_EXTENSIONS.presentations)[number],
    )
  )
    return "📽️"
  if (
    FILE_EXTENSIONS.code.includes(
      extension as (typeof FILE_EXTENSIONS.code)[number],
    )
  )
    return "⚛️"
  if (
    FILE_EXTENSIONS.web.includes(
      extension as (typeof FILE_EXTENSIONS.web)[number],
    )
  )
    return "🌐"
  if (
    FILE_EXTENSIONS.python.includes(
      extension as (typeof FILE_EXTENSIONS.python)[number],
    )
  )
    return "🐍"
  if (
    FILE_EXTENSIONS.data.includes(
      extension as (typeof FILE_EXTENSIONS.data)[number],
    )
  )
    return "{ }"
  if (
    FILE_EXTENSIONS.archives.includes(
      extension as (typeof FILE_EXTENSIONS.archives)[number],
    )
  )
    return "🗜️"
  if (
    FILE_EXTENSIONS.audio.includes(
      extension as (typeof FILE_EXTENSIONS.audio)[number],
    )
  )
    return "🎵"
  if (
    FILE_EXTENSIONS.video.includes(
      extension as (typeof FILE_EXTENSIONS.video)[number],
    )
  )
    return "🎬"
  if (
    FILE_EXTENSIONS.design.includes(
      extension as (typeof FILE_EXTENSIONS.design)[number],
    )
  )
    return "🎨"

  return "📄"
}

export const formatFileSize = (size: number): string => {
  const BYTE = 1024
  const UNITS = ["bytes", "KB", "MB", "GB"] as const

  let unitIndex = 0
  let convertedSize = size

  while (convertedSize >= BYTE && unitIndex < UNITS.length - 1) {
    convertedSize /= BYTE
    unitIndex++
  }

  return `${unitIndex === 0 ? convertedSize : convertedSize.toFixed(2)} ${UNITS[unitIndex]}`
}
