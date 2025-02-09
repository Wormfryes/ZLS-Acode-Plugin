# Zig Language Server

## WARNING! The plugin is on its very new stages and may have errors, please makena issue if this happens.
To use this, you need to download termux, you can get the apk by clicking [Here](https://github.com/termux/termux-app/releases/download/v0.118.1/termux-app_v0.118.1+github-debug_arm64-v8a.apk)
Then you need to download the plugin, you can download it opening releases and downloading the lastest zip version.
Open Acode app >> 3 dots >> Settings >> Plugins >> 3 Dots >> Local >> Select Document >> Click the file you download.
After this you should have the plugin.

# Starting the language  server

After downloading and setting up termux, open it and run 
```
pkg update && pkg upgrade
pkg install zls nodejs zig
npm install acode-lsp
```
After this you should be able to get your code errors inside Acode.
That is it.
# Have Fun!
