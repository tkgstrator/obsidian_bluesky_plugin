import React, { useState } from 'react'

type TextInputProps = {
  inputMessage: string
  setInputMessage: (message: string) => void
  handleKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void
  handleSendMessage: () => void
}

const TextInput: React.FC<TextInputProps> = ({ inputMessage, setInputMessage, handleKeyDown, handleSendMessage }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue: string = event.target.value
    setInputMessage(inputValue)
  }

  return (
    <div className='text-input-container'>
      <textarea
        className='w-full p-4 mt-2'
        placeholder="What's up?"
        value={inputMessage}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default TextInput
