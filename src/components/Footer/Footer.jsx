import React from 'react'
import Style from './Footer.module.css'
import SocialMedia from '../SocialMedia/SocialMedia'
function Footer() {
    return (
        <>
        <footer className='bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400 border-t border-zinc-200 z-50'>
            <div className='container mx-auto p-6'>
                <div className="pb-4 border-b border-zinc-300 dark:border-zinc-600 mb-4">
                    <h2 className="text-lg md:text-xl font-bold pb-4">Get the FreshCart App</h2>
                    <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300">
                        We will send you a link, open it on your phone to download the app
                    </p>
                </div>
                <form>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
                    <input className='input' type="email" placeholder='Email' />
                    <button className='btn-green'>Share App Link</button>
                    </div>
                </form>
                <SocialMedia />
            </div>
        </footer>
        </>
    )
}

export default Footer

