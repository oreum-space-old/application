import empty from '@/assets/icons/empty.svg'

const defaultIcon = {
  default: empty
}

let icons: Record<string, () => Promise<typeof defaultIcon> | undefined> = {}

function emptyIcon (icon: string): typeof defaultIcon {
  console.warn(`Icon "${icon} not found!"`)
  return defaultIcon
}

export default {
  async useIcon (icon: string): Promise<typeof defaultIcon> {
    const promise = icons[`/src/assets/icons/${icon}.svg`]
    if (promise) {
      const result = await promise()

      if (result) {
        return result
      }
    }
    return emptyIcon(icon)
  },
  install () {
    icons = import.meta.glob('/src/assets/icons/*.svg') as typeof icons
  }
}
