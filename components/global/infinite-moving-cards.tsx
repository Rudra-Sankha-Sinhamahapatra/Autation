'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}: {
  items: {
    href: string
  }[]
  direction?: 'left' | 'right'
  speed?: 'fast' | 'normal' | 'slow'
  pauseOnHover?: boolean
  className?: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)

  useEffect(() => {
    addAnimation()
  }, [])
  
  const [start, setStart] = useState(false)
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getSpeed()
      setStart(true)
    }
  }
  
  const getSpeed = () => {
    if (scrollerRef.current) {
      if (speed === 'fast') {
        scrollerRef.current.style.setProperty('--animation-duration', '20s')
      } else if (speed === 'normal') {
        scrollerRef.current.style.setProperty('--animation-duration', '40s')
      } else {
        scrollerRef.current.style.setProperty('--animation-duration', '80s')
      }
    }
  }
  
  const animationClass = direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'
  
  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex min-w-full shrink-0 gap-10 py-4 w-max flex-nowrap',
          start && animationClass,
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item, idx) => (
          <Image
            width={170}
            height={1}
            src={item.href}
            alt={item.href}
            className="relative rounded-2xl object-contain opacity-50"
            key={item.href}
          />
        ))}
      </ul>
    </div>
  )
}