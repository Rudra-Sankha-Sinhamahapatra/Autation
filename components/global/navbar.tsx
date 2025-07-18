import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MenuIcon } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { ModeToggle } from '@/components/ui/toggle-theme'

type Props = {}

const Navbar = async (props: Props) => {
    const user = await currentUser()

  return (
    <header className="fixed right-0 left-0 top-0 py-4 px-4 bg-black/40 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900">
        <div className='flex items-center gap-[2px]'>
             <p className='text-3xl font-bold'>Au</p>
             <Image
                src="/autationLogo.png"
                alt="autation logo"
                width={15}
                height={15}
                className='shadow-sm'
             />
             <p className='text-3xl font-bold'>tation</p>
        </div>

        <nav className="mx-auto hidden md:block">
        <ul className="flex items-center gap-4 list-none">
            <li><Link href="#">Products</Link></li>
            <li><Link href="#">Pricing</Link></li>
            <li><Link href="#">Clients</Link></li>
            <li><Link href="#">Resources</Link></li>
            <li><Link href="#">Documentation</Link></li>
            <li><Link href="#">Enterprise</Link></li>
        </ul>
      </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
        <Link
          href="/dashboard"
          className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {user ? 'Dashboard' : 'Get Started'}
          </span>
        </Link>
        {user ? <UserButton afterSignOutUrl="/" /> : null}
        <MenuIcon className="md:hidden" />
        </div>
   </header>
  )
}

export default Navbar