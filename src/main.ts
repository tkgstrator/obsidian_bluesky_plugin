import { type Editor, MarkdownView, Plugin, TFile, type WorkspaceLeaf } from 'obsidian'
import { CitrusSettingTab, type CitrusSettings, DEFAULT_SETTINGS } from './settings'
import { BTClient } from './utils/client'
import { VIEWTYPE } from './utils/contants'
import TimelineView from './views/TimelineView'
import './styles.css'

export default class CitrusPlugin extends Plugin {
  settings: CitrusSettings
  readonly client: BTClient = new BTClient()

  activateViewPromise: Promise<void> | undefined = undefined
  visible = false

  async onload() {
    await this.loadSettings()

    this.addSettingTab(new CitrusSettingTab(this.app, this))

    this.addCommand({
      id: 'toggle-timeline-window',
      name: 'Toggle Bluesky Timeline',
      callback: async () => {
        await this.toggleView()
      }
    })
    this.registerView(VIEWTYPE, (leaf: WorkspaceLeaf) => new TimelineView(leaf, this))
  }

  async onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
    const result = await this.client.login(this.settings)
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }

  async toggleView() {
    const leaves = this.app.workspace.getLeavesOfType(VIEWTYPE)
    leaves.length > 0 ? this.deactivate() : this.activate()
  }

  async activate() {
    this.app.workspace.detachLeavesOfType(VIEWTYPE)
    this.activateViewPromise = this.app.workspace.getRightLeaf(false)?.setViewState({
      type: VIEWTYPE,
      active: true
    })
    await this.activateViewPromise
    this.app.workspace.revealLeaf(this.app.workspace.getLeavesOfType(VIEWTYPE)[0])
    this.visible = true
  }

  async deactivate() {
    this.app.workspace.detachLeavesOfType(VIEWTYPE)
    this.visible = false
  }
}
