import plugin from '../plugin.json';

class ZigPlugin {
  baseUrl = ''
  client = null
  
  async init($page, cacheFile, cacheFileUrl) {
    let languageClient = acode.require("acode-language-client")
    
    if (!languageClient) {
      window.addEventListener("plugin.install", event => {
        if (event.detail.name === "acode-language-client") {
          languageClient = acode.require("acode-language-client")
          this.startZigServer(languageClient)
        }
      })
      return
    }

    await this.startZigServer(languageClient)
  }

  async startZigServer(languageClient) {
    try {
      const socket = languageClient.getSocketForCommand("zls", [])

      const settings = {
        type: "socket",
        socket,
        clientCapabilities: {
          textDocument: {
            semanticTokens: false,
            synchronization: {
              didChange: false
            },
            documentHighlight: false
          },
          workspace: {
            semanticTokens: false,
            didChangeConfiguration: false
          }
        }
      }

      this.client = new languageClient.LanguageClient(settings)
      languageClient.registerService("zig", this.client)

    } catch (err) {
      console.error('ZLS error:', err)
      
      if (err.message?.includes('ENOENT')) {
        acode.alert('ZLS Not Found', 'Please install ZLS with: pkg install zls')
        return
      }
      
      if (err.code === 'EPIPE' || err.message?.includes('write EPIPE')) {
        return
      }
    }
  }

  async destroy() {
    if (this.client) {
      try {
        await this.client.stop()
      } catch {}
      this.client = null
    }
  }
}

if (window.acode) {
  const zigPlugin = new ZigPlugin()
  
  acode.setPluginInit(plugin.id, async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
    if (!baseUrl.endsWith('/')) baseUrl += '/'
    zigPlugin.baseUrl = baseUrl
    await zigPlugin.init($page, cacheFile, cacheFileUrl)
  })

  acode.setPluginUnmount(plugin.id, () => {
    zigPlugin.destroy()
  })
}
