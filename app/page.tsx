"use client"

import { useEffect, useState } from "react"
import DynamicFrameLayout from "../components/DynamicFrameLayout"
import Loader from "../components/Loader/Loader"
import { ppEditorialNewUltralightItalic, inter } from "./fonts"
import Image from "next/image"
import Link from "next/link"
import { usePortfolioData } from "@/src/hooks/usePortfolioData"

export default function Home() {
  const { data, loading, error } = usePortfolioData()
  const [headerSize] = useState(1.2) // 120% is the default size
  const [textSize] = useState(0.8) // 80% is the default size
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false)
    }, 3000) // 3 seconds timer

    return () => clearTimeout(timer) // Cleanup timer on unmount
  }, [])

  if (loading || showLoader) {
    return (
       <div className="min-h-screen  flex items-center justify-center">
       <Loader /> 
       </div>  
  )
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!data) {
    return <div>No data available</div>
  }

  return (
    <div
      className={`min-h-screen bg-[#141414] flex items-center justify-center p-8 ${ppEditorialNewUltralightItalic.variable} ${inter.variable}`}
    >
      <div className="w-full h-full flex flex-col md:flex-row items-start gap-8 md:gap-8">
        {/* Left Content */}
        <div className="w-full md:w-[260px] flex-shrink-0 flex flex-col overflow-y-scroll h-[95vh] pr-4">
          <div className="flex flex-col gap-16">
            <h1
              className={`${ppEditorialNewUltralightItalic.className} text-4xl md:text-6xl font-light italic text-white/80 tracking-tighter leading-[90%] mt-2`}
              style={{ fontSize: `${4 * headerSize}rem` }}
            >
              {data.personalInfo.name} - <br/>
              <span className="text-[30px] tracking-tighter text-slate-500 font-thin">
                ({data.personalInfo.designation})
              </span>
            </h1>
            <div
              className={`${inter.className} flex flex-col gap-12 text-white/50 text-sm font-light max-w-[300px]`}
              style={{ fontSize: `${0.875 * textSize}rem` }}
            >
              <div className="space-y-6">
                <div className="h-px bg-white/10 w-full" />
                {data.personalInfo.about.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                <Link 
                  href={data.personalInfo.resumeLink}
                  className="inline-block px-6 py-3 text-white/70 border border-white/20 rounded-full font-medium hover:bg-white/5 transition-colors text-center w-full max-w-[260px] text-sm"
                  style={{ fontSize: `${0.975 * textSize}rem` }}
                >
                  Download Resume
                </Link>
                <div className="h-px bg-white/10 w-full" />
              </div>
            </div>
            <div className="space-y-6">
              <h2
                className={`${ppEditorialNewUltralightItalic.className} text-3xl font-light italic text-white/80 tracking-tighter`}
              >
                Education
              </h2>
              <div className="space-y-8" >
                {data.education.map((edu, index) => (
                  <div key={index} className={`${inter.className} text-white/50 text-sm font-light`}style={{ fontSize: `${0.875 * textSize}rem` }} >
                    <p className="text-white/70 font-medium">{edu.institution}</p>
                    <p>{edu.degree}</p>
                    <p className="text-white/70">{edu.score}</p>
                    <p className="text-white/30">{edu.duration}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2
                className={`${ppEditorialNewUltralightItalic.className} text-3xl font-light italic text-white/80 tracking-tighter`}
              >
                Contact Me
              </h2>
              <div className="space-y-4">
                <div className={`${inter.className} text-white/50 text-sm font-light`} style={{ fontSize: `${0.875 * textSize}rem` }}>
                  <p className="text-white/70 font-medium">Email</p>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p>{data.contact.email}</p>
                  </div>
                </div>

                <div className={`${inter.className} text-white/50 text-sm font-light`} style={{ fontSize: `${0.875 * textSize}rem` }}>
                  <p className="text-white/70 font-medium">Phone</p>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p>{data.contact.phone}</p>
                  </div>
                </div>

                <div className={`${inter.className} text-white/50 text-sm font-light`} style={{ fontSize: `${0.875 * textSize}rem` }}>
                  <p className="text-white/70 font-medium">Location</p>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p>{data.contact.location}</p>
                  </div>
                </div>

                <div className={`${inter.className} text-white/50 text-sm font-light`} style={{ fontSize: `${0.875 * textSize}rem` }}>
                  <p className="text-white/70 font-medium">Social</p>
                  <div className="flex gap-4 mt-1">
                    <Link href={data.contact.social.github} className="text-white/70 hover:text-white/90 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      GitHub
                    </Link>
                    <Link href={data.contact.social.linkedin} className="text-white/70 hover:text-white/90 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                      </svg>
                      LinkedIn
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="https://folio-lynkr-main.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 relative opacity-80 hover:opacity-100 transition-opacity"
            >
              <Image
                src="https://folio-lynkr-main.vercel.app/_next/image?url=%2FFolio%20white%20circle.png&w=96&q=75"
                alt="Luma Logo"
                fill
                className="object-contain"
              />
            </Link>
          </div>
          {/* <a
            href="https://folio-lynkr-main.vercel.app/"
            className="inline-block px-6 py-3 text-white/70 border border-white/20 rounded-full font-medium hover:bg-white/5 transition-colors text-center w-full max-w-[260px] text-sm mt-16"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Folio-Lynkr
          </a> */}
        </div>

        {/* Right Content */}
        <div className="w-full md:flex-grow h-[60vh] md:h-[80vh] overflow-hidden">
          <DynamicFrameLayout />
        </div>
      </div>
    </div>
  )
}

