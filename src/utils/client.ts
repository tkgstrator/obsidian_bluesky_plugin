import { CitrusSettings } from '@/settings'
import { BskyAgent } from '@atproto/api'
import { FeedViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs'

export class BTClient {
  private readonly agent: BskyAgent
  private settings: CitrusSettings

  constructor() {
    this.agent = new BskyAgent({
      service: 'https://bsky.social'
    })
  }

  // Login
  async login(settings: CitrusSettings): Promise<boolean> {
    const result = await this.agent.login({
      identifier: settings.identifier,
      password: settings.password
    })
    return result.success
  }

  // Get Timeline
  async getTimeline(): Promise<FeedViewPost[]> {
    return (await this.agent.getTimeline()).data.feed
  }

  // Post
  async post(message: string): Promise<void> {
    await this.agent.post({
      text: message,
      langs: ['ja-JP', 'en-US']
    })
  }
}
