import CitrusPlugin from '@/main'
import { CitrusSettings } from '@/settings'
import { FeedViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs'
import React, { useEffect, useState } from 'react'
import ReactPullToRefresh from 'react-simple-pull-to-refresh'
import Note from './Note'
import TextInput from './TextInput'

export type TimelineProps = {
  settings: CitrusSettings
  plugin: CitrusPlugin
}

const Timeline: React.FC<TimelineProps> = ({ settings, plugin }) => {
  const [inputMessage, setInputMessage] = useState('')
  const [noteList, setNoteList] = useState<FeedViewPost[]>([])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleSendMessage = async () => {
    if (inputMessage.length === 0) return

    // 二重送信を防ぐために内容をコピーして初期化する
    const message: string = inputMessage
    setInputMessage('')
    await plugin.client.post(message)
    setNoteList(await plugin.client.getTimeline())
    scrollToTop()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Composing
    if (event.nativeEvent.isComposing) return
    // Cmd/Ctrl + Enter
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  const handleRefresh = async () => {
    setNoteList(await plugin.client.getTimeline())
    scrollToTop()
  }

  useEffect(() => {
    const fetch = async () => {
      const result: boolean = await plugin.client.login(settings)
      if (result) {
        setNoteList(await plugin.client.getTimeline())
      }
    }
    fetch()
  }, [])

  return (
    <div className='flex h-full flex-col'>
      <ReactPullToRefresh onRefresh={handleRefresh}>
        <div className='flex-1 overflow-y-auto'>
          {noteList.map((note) => (
            <Note key={note.post.cid} post={note.post} />
          ))}
        </div>
      </ReactPullToRefresh>
      <div>
        <TextInput
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
          handleKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}

export default Timeline
