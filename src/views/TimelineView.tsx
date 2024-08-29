import { AppContext } from '@/context'
import type CitrusPlugin from '@/main'
import type { CitrusSettings } from '@/settings'
import { VIEWTYPE } from '@/utils/contants'
import { ItemView, type WorkspaceLeaf } from 'obsidian'
import React from 'react'
import { createRoot } from 'react-dom/client'
import Timeline from '../components/Timeline'

export default class TimelineView extends ItemView {
  private settings: CitrusSettings

  constructor(
    leaf: WorkspaceLeaf,
    private plugin: CitrusPlugin
  ) {
    super(leaf)
    this.settings = plugin.settings
  }

  getViewType(): string {
    return VIEWTYPE
  }

  getIcon(): string {
    return 'message-square'
  }

  getTitle(): string {
    return 'Timeline'
  }

  getDisplayText(): string {
    return 'Citrus'
  }

  async getVisibility(): Promise<boolean> {
    if (this.plugin.activateViewPromise) {
      await this.plugin.activateViewPromise
    }
    return this.plugin.visible
  }

  async onload(): Promise<void> {
    this.plugin.client.login({
      identifier: this.settings.identifier,
      password: this.settings.password
    })
  }

  async onClose(): Promise<void> {}

  async onOpen(): Promise<void> {
    const root = createRoot(this.containerEl.children[1])
    root.render(
      <AppContext.Provider value={this.app}>
        <React.StrictMode>
          <Timeline settings={this.settings} plugin={this.plugin} />
        </React.StrictMode>
      </AppContext.Provider>
    )
  }
}
