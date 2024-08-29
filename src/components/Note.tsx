import { PostView } from '@atproto/api/dist/client/types/app/bsky/feed/defs'
import React from 'react'

type NoteProps = {
  post: PostView
}

const Avatar: React.FC<{ src: string | undefined }> = ({ src }) => {
  return <img src={src} alt='avatar' className='w-12 rounded-full' />
}

const Text: React.FC<{ text: string; displayName: string | undefined; handle: string }> = ({
  text,
  displayName,
  handle
}) => {
  return (
    <div className='flex-1'>
      <div className='flex items-center gap-2'>
        <p className='text-sm font-bold'>{displayName}</p>
        <p className='text-sm text-gray-500'>{`@${handle}`}</p>
      </div>
      <p className='text-sm whitespace-pre-wrap'>{text}</p>
    </div>
  )
}

const Note: React.FC<NoteProps> = ({ post }) => {
  return (
    <div className='flex items-start gap-2.5 mt-3 border-t pt-2 px-4 border-[#253342]'>
      <Avatar src={post.author.avatar} />
      <div>
        {/* @ts-ignore */}
        <Text text={post.record.text} handle={post.author.handle} displayName={post.author.displayName} />
      </div>
    </div>
  )
}

export default Note
