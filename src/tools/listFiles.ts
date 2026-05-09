import fs from 'fs/promises'

export async function listFiles(
  path: string
) {
  return fs.readdir(path)
}