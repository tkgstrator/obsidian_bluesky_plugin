import { type App, PluginSettingTab, Setting, TextComponent } from 'obsidian'
import type Citrus from './main'

export interface CitrusSettings {
  identifier: string
  password: string
}

export const DEFAULT_SETTINGS: CitrusSettings = {
  identifier: '',
  password: ''
}

export class CitrusSettingTab extends PluginSettingTab {
  plugin: Citrus

  constructor(app: App, plugin: Citrus) {
    super(app, plugin)
    this.plugin = plugin
  }

  display(): void {
    const { containerEl } = this
    containerEl.empty()

    containerEl.createEl('h2', { text: 'Citrus Settings' })

    this.addUsernameSetting()
    this.addTokenSetting()
  }

  private addUsernameSetting() {
    new Setting(this.containerEl)
      .setName('ID')
      .setDesc('Bluesky Identifier')
      .addText((text) => {
        text
          .setPlaceholder('Enter username')
          .setValue(this.plugin.settings.identifier)
          .onChange(async (value) => {
            this.plugin.settings.identifier = value
            await this.plugin.saveSettings()
          })
      })
  }

  private addTokenSetting() {
    new Setting(this.containerEl)
      .setName('Password')
      .setDesc('Bluesky App Password')
      .addText((text) => {
        text.inputEl.addEventListener('focus', () => {
          text.inputEl.type = 'text'
        })
        text.inputEl.addEventListener('blur', () => {
          text.inputEl.type = 'password'
        })
        text.inputEl.type = 'password'
        text
          .setPlaceholder('Enter app password')
          .setValue(this.plugin.settings.password)
          .onChange(async (value) => {
            this.plugin.settings.password = value
            await this.plugin.saveSettings()
          })
      })
  }
}
