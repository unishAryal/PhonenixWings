import Link from 'next/link'
import Head from 'next/head'
import './globals.css';

function HomePage() {
   return (
      <>
         <Head>
            <title>Welcome to Next.js!</title>
         </Head>
         <div>Welcome to Next.js!</div>
         <Link href="/chat"><div>
          dochat</div></Link>
         <br/>
         <img src="/logo.png" alt="TutorialsPoint Logo" />
      </>	    
   )
}

export default HomePage