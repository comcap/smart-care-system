const path = require('node:path')
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // extraNodeModules can't express a bare "@/xxx" prefix (its package-name
    // parser treats the whole "@/xxx" as one package when there's no second
    // slash), so intercept it here and resolve straight to src/.
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName.startsWith('@/')) {
        const filePath = path.resolve(__dirname, 'src', moduleName.slice(2))
        return context.resolveRequest(context, filePath, platform)
      }
      return context.resolveRequest(context, moduleName, platform)
    },
  },
}

module.exports = mergeConfig(getDefaultConfig(__dirname), config)
