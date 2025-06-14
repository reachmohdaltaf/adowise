import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Earth, Send } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom' // React Router

const SeekerAiSearch = () => {
  const [chatData, setChatData] = useState([])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const location = useLocation()

  // Focus input and greet on route match
  useEffect(() => {
    if (location.pathname === '/seeker/dashboard/aisearch') {
     setTimeout(() => {
      inputRef.current?.focus()
     }, 1500);

      // Add greeting only once on visit
      setChatData([
        { sender: 'ai', message: 'Hi there! How can I help you today?' }
      ])
    }
  }, [location.pathname])

  const handleSend = () => {
    if (input.trim() === '') return

    const newChat = [...chatData, { sender: 'user', message: input }]
    setChatData(newChat)
    setInput('')

    setTimeout(() => {
      setChatData(prev => [
        ...prev,
        { sender: 'ai', message: 'Thanks for your message!' }
      ])
    }, 1000)
  }

  return (
    <div className='md:px-4'>
      {/* Scrollable Chat Area */}
      <ScrollArea className='h-[500px] md:h-[360px] bg-accent md:mt-10 rounded'>
        <div className="flex flex-col gap-3 p-2">
          {chatData.map((chat, index) => (
            <div
              key={index}
              className={`${
                chat.sender === 'user'
                  ? 'self-end bg-blue-400 text-white'
                  : 'self-start bg-white text-black'
              } px-4 py-2 rounded-lg shadow max-w-[70%]`}
            >
              {chat.message}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Box */}
      <div className='inputcard relative bottom-0'>
        <Card className='px-0 md:px-2 rounded-4xl gap-2 py-2'>
          <CardHeader className='px-2 flex items-center gap-2'>
            <Input
              ref={inputRef}
              placeholder='Ask me anything'
              className='h-10 placeholder:text-destructive border-none shadow-none'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend()
              }}
            />
            <Button onClick={handleSend}><Send /></Button>
          </CardHeader>
          <CardContent className='px-2 flex gap-2 items-center'>
            <Button size='icon' variant='outline'>+</Button>
            <Button variant='outline'><Earth />Search</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SeekerAiSearch
