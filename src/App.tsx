import { useEffect, useState, useRef } from 'react'

const navLinks = [
  { label: 'Residence', href: '#residence' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Contact', href: '#contact' },
]

const amenities = [
  { title: 'Saltwater Pool', desc: 'A tranquil saltwater swimming pool surrounded by native landscaping, with a separate children\'s pool.', icon: 'M20 8c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12S26.6 8 20 8zm0 22c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80' },
  { title: 'Spa & Wellness', desc: 'Private sauna, jacuzzi, wellness shower, and a fitness suite designed for daily wellbeing.', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-8c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z', img: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80' },
  { title: 'Gated Community', desc: 'Secure access with video intercom, providing total privacy and peace of mind.', icon: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z', img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80' },
  { title: 'Parking & EV', desc: 'Underground parking for every residence with pre-installation for optional EV charging.', icon: 'M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16zM6 6h4v4H6V6zm8 0h4v4h-4V6zM6 14h4v4H6v-4zm8 0h4v4h-4v-4z', img: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80' },
]
const apartments = [
  { type: 'Ground + Basement', size: '178 — 202 m²', beds: '3', desc: 'Private basement, direct outdoor access and a dedicated lower level.' },
  { type: 'Ground Floor', size: '97 — 104 m²', beds: '2', desc: 'Step directly onto your terrace and into the communal gardens.' },
  { type: 'Penthouse Duplex', size: '124 — 243 m²', beds: '2-3', desc: 'Two floors crowned with panoramic views and a private rooftop solarium.' },
]

const aptImages = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
]

function useScrollReveal(threshold = 0.15) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? Math.min(window.scrollY / h * 100, 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return progress
}

function useParallax(speed = 0.3) {
  const [offset, setOffset] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const scrolledPast = -rect.top
        setOffset(Math.max(0, scrolledPast * speed))
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return { ref, offset }
}

function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div className="fixed bottom-8 left-8 z-40 hidden md:block pointer-events-none">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] text-[#8B8070] font-medium tracking-wider">
          {String(Math.round(progress)).padStart(2, '0')}
        </span>
        <div className="w-16 h-[1px] bg-[#D4CFC8] relative overflow-hidden">
          <div className="h-full bg-[#800040] transition-all duration-200 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <span className="font-mono text-[11px] text-[#D4CFC8] tracking-wider">100</span>
      </div>
    </div>
  )
}

function useHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [translatePx, setTranslatePx] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const compute = () => {
      const track = container.querySelector('[data-scroll-track]')
      if (!track) return 0
      const parentW = container.clientWidth
      const trackW = (track as HTMLElement).scrollWidth
      return Math.max(0, trackW - parentW)
    }

    const measure = () => { maxTranslate = compute() }
    let maxTranslate = compute()

    const onScroll = () => {
      const rect = container.getBoundingClientRect()
      const viewH = window.innerHeight
      const scrollable = rect.height - viewH
      if (scrollable <= 0) return
      const progress = Math.max(0, Math.min(1, (-rect.top) / scrollable))
      setTranslatePx(-progress * maxTranslate)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', () => { measure(); onScroll() })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
    }
  }, [])

  return { containerRef, translatePx }
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [exitEntry, setExitEntry] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [isNight, setIsNight] = useState(false)
  const [is404, setIs404] = useState(false)

  useEffect(() => {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    const t1 = setTimeout(() => setExitEntry(true), 2000)
    const t2 = setTimeout(() => setShowContent(true), 3000)

    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      setIs404(true)
    }

    return () => {
      history.scrollRestoration = 'auto'
      window.removeEventListener('scroll', onScroll)
      clearTimeout(t1); clearTimeout(t2)
    }
  }, [])

  if (is404) return <NotFoundPage />

  return (
    <>
      {!showContent && <EntryScreen exit={exitEntry} />}

      <ScrollProgress />
      <NavBar scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#800040] flex flex-col items-center justify-center gap-8">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className="font-display text-4xl no-underline text-white hover:text-[#FF80B0] transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      )}

      <div
        style={{
          opacity: exitEntry ? 1 : 0,
          transition: 'opacity 1s ease-out',
        }}
      >
        <HeroSection isNight={isNight} setNight={() => setIsNight(true)} setDay={() => setIsNight(false)} />
        <AboutSection />
        <ResidencesSection />
        <AmenitiesSection />
        <LocationSection />
        <ContactSection />
        <FooterSection />
      </div>
    </>
  )
}

/* ─── 404 ─── */
function NotFoundPage() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200)
    const t2 = setTimeout(() => setPhase(2), 600)
    const t3 = setTimeout(() => setPhase(3), 1000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div className="relative min-h-screen bg-[#1A1A1A] flex items-center justify-center overflow-hidden">
      <div className="absolute w-[60vmin] h-[60vmin] rounded-full bg-[#FF80B0]/5 blur-[120px] top-[5%] -left-[10%] pointer-events-none" />
      <div className="absolute w-[40vmin] h-[40vmin] rounded-full bg-[#C2185B]/8 blur-[100px] bottom-0 right-[5%] pointer-events-none" />
      <div className="absolute w-[80vmin] h-[30vmin] rounded-[50%] border border-[#FF80B0]/10 pointer-events-none"
        style={{ animation: 'spin 20s linear infinite', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }} />
      <div className="absolute w-[60vmin] h-[22vmin] rounded-[50%] border border-[#C2185B]/10 pointer-events-none"
        style={{ animation: 'spin 25s linear infinite reverse', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }} />

      <div className="relative z-10 text-center px-8">
        <div className={`transition-all duration-700 ${phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <LogoIcon size={48} className="text-[#FF80B0] mx-auto mb-8" />
        </div>
        <div className={`transition-all duration-700 delay-300 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h1 className="font-display text-[clamp(80px,20vw,140px)] font-bold leading-none mb-2 text-transparent bg-clip-text bg-gradient-to-br from-[#FF80B0] via-[#C2185B] to-[#FF80B0]">
            404
          </h1>
        </div>
        <div className={`transition-all duration-700 delay-500 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-sm text-white/50 max-w-sm mx-auto mb-10 leading-relaxed tracking-wide">
            The page you are looking for has drifted out to sea.
          </p>
        </div>
        <div className={`transition-all duration-700 delay-700 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <a href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF80B0] to-[#C2185B] text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.15em] no-underline rounded-sm hover:from-[#C2185B] hover:to-[#800040] transition-all duration-500 shadow-lg shadow-[#FF80B0]/20 hover:shadow-xl hover:gap-4">
            Back to shore
          </a>
        </div>
      </div>
    </div>
  )
}

/* ─── ENTRY SCREEN ─── */
function EntryScreen({ exit }: { exit: boolean }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200)
    const t2 = setTimeout(() => setPhase(2), 800)
    const t3 = setTimeout(() => setPhase(3), 1500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#800040] flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ease-out ${
        exit ? 'opacity-0 scale-105' : ''
      }`}
      style={{ transitionDelay: exit ? '0.4s' : '0s' }}
    >
      {/* Oval glow layers */}
      <div className="absolute w-[120vw] h-[30vw] -top-[5vw] left-1/2 -translate-x-1/2 rounded-[50%] bg-[#FF80B0]/10 blur-[120px] animate-pulse" />
      <div className="absolute w-[100vw] h-[25vw] bottom-0 -left-[10vw] rounded-[50%] bg-[#C2185B]/20 blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute w-[80vw] h-[20vw] top-1/3 -right-[10vw] rounded-[50%] bg-white/[0.04] blur-[80px] animate-bounce" style={{ animationDuration: '6s' }} />

      {/* Rotating oval rings */}
      <div className="absolute w-[90vw] h-[35vw] rounded-[50%] border border-[#FF80B0]/10 animate-spin pointer-events-none" style={{ animationDuration: '20s' }} />
      <div className="absolute w-[70vw] h-[28vw] rounded-[50%] border border-[#C2185B]/10 animate-spin pointer-events-none" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />

      {/* Oval particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-bounce"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${4 + (i % 5) * 2}px`,
              background: i % 3 === 0 ? '#FF80B0' : i % 3 === 1 ? '#C2185B' : '#fff',
              left: `${5 + (i * 7) % 90}%`,
              top: `${50 + (i * 11) % 40}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + (i % 4)}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className={`transition-all duration-700 ${phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <LogoIcon size={64} className="text-white mb-8" />
        </div>

        <div className={`transition-all duration-700 delay-200 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h1 className="font-display text-5xl md:text-7xl text-white font-semibold tracking-wide text-center leading-tight mb-4">
            Orca Enclave
          </h1>
        </div>

        <div className={`transition-all duration-700 delay-500 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-[#FF80B0] text-xs md:text-sm uppercase tracking-[0.25em] font-medium">
            A place to return to
          </p>
        </div>

        <div className={`mt-12 transition-all duration-700 delay-700 ${phase >= 2 ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#FF80B0] to-transparent" />
        </div>

        <div className={`mt-10 transition-all duration-700 delay-1000 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-6 h-6 border-2 border-[#FF80B0]/60 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    </div>
  )
}

/* ─── NAV ─── */
function NavBar({ scrolled, menuOpen, setMenuOpen }: { scrolled: boolean; menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  return (
    <nav className={`fixed top-0 w-full z-50 flex items-center justify-between px-10 md:px-20 lg:px-28 transition-all duration-500 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm text-[#1A1A1A]'
        : 'py-6 text-white'
    }`}>
      <a href="#" className="flex items-center gap-3 no-underline text-inherit ml-[67px]">
        <LogoIcon size={34} className="text-inherit" />
        <span className="font-display text-lg font-semibold tracking-wide text-inherit">ORCA</span>
      </a>
      <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
        {navLinks.map(link => (
          <a key={link.href} href={link.href}
            className={`text-xs uppercase tracking-[0.12em] no-underline transition-colors ${
              scrolled ? 'text-gray-500 hover:text-[#1A1A1A]' : 'text-white/70 hover:text-white'
            }`}>
            {link.label}
          </a>
        ))}
      </div>
      <button onClick={() => setMenuOpen(!menuOpen)}
        className={`md:hidden text-xs uppercase tracking-[0.12em] bg-transparent border-none cursor-pointer text-inherit mr-[67px]`}>
        {menuOpen ? 'Close' : 'Menu'}
      </button>
    </nav>
  )
}

/* ─── HERO ─── */
function HeroSection({ isNight, setNight, setDay }: { isNight: boolean; setNight: () => void; setDay: () => void }) {
  const { ref: imgRef, offset } = useParallax(0.25)
  return (
    <section className="relative h-dvh min-h-[600px] overflow-hidden bg-black">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 z-[5] opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      <div ref={imgRef} className="absolute inset-0" style={{ transform: `translateY(${offset}px)` }}>
        <div className={`absolute inset-0 z-10 transition-opacity duration-1000 ${isNight ? 'bg-gradient-to-t from-black/60 via-black/20 to-black/90' : 'bg-gradient-to-r from-black/50 via-black/10 to-transparent'}`} />
        <img
          src={isNight
            ? "https://images.unsplash.com/photo-1743439895141-20db90962997?auto=format&fit=crop&w=1920&q=80"
            : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80"
          }
          alt="Orca Enclave"
          className={`w-full h-full object-cover transition-all duration-1000 ${isNight ? 'brightness-75' : ''}`} />
      </div>

      <div className="relative z-20 w-full h-full grid place-items-center px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-10 h-[2px] bg-gradient-to-r from-transparent via-[#FF80B0] to-transparent" />
            <p className="text-xs uppercase tracking-[0.25em] text-white/80 font-medium drop-shadow-lg">Malibu · California</p>
            <span className="w-10 h-[2px] bg-gradient-to-r from-transparent via-[#FF80B0] to-transparent" />
          </div>
          <h1 className="font-display text-[clamp(44px,9vw,88px)] font-semibold leading-[1.08] tracking-tight mb-4 drop-shadow-2xl">
            <span className="text-white">A place</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF80B0] via-white to-[#FF80B0]">to return</span>
            <span className="text-[#FF80B0]"> to.</span>
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
            Contemporary Mediterranean residences on the New Golden Mile, where architectural precision meets timeless living.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <a href="#contact"
              className="bg-gradient-to-r from-[#FF80B0] to-[#C2185B] text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.15em] no-underline rounded-sm hover:from-[#C2185B] hover:to-[#800040] transition-all duration-500 shadow-lg shadow-[#FF80B0]/20 hover:shadow-xl hover:shadow-[#FF80B0]/30 hover:-translate-y-0.5">
              Inquire Now
            </a>
            <a href="#residence"
              className="border-2 border-white/40 text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.15em] no-underline rounded-sm hover:bg-white hover:text-[#1A1A1A] transition-all duration-500 backdrop-blur-sm hover:shadow-xl hover:-translate-y-0.5">
              Explore
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button onClick={setDay}
          className={`px-6 py-3 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-500 text-xs font-bold uppercase tracking-[0.15em] backdrop-blur-md ${
            isNight
              ? 'bg-white/5 border border-white/10 text-white/40'
              : 'bg-white/15 border-2 border-white/70 text-white shadow-xl shadow-white/10 hover:bg-white/25 hover:shadow-2xl hover:-translate-y-0.5'
          }`}>
          <svg className="w-3.5 h-3.5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1zm4.95 2.05a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM21 12a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-9 8a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-6.364-2.636a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM4 12a1 1 0 01-1 1H2a1 1 0 110-2h1a1 1 0 011 1zm.636-6.364a1 1 0 00-1.414 0l-.707.707a1 1 0 101.414 1.414l.707-.707a1 1 0 000-1.414zM12 7a5 5 0 100 10 5 5 0 000-10z"/></svg>
          Day
        </button>
        <button onClick={setNight}
          className={`px-6 py-3 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-500 text-xs font-bold uppercase tracking-[0.15em] backdrop-blur-md ${
            isNight
              ? 'bg-white/15 border-2 border-white/70 text-white shadow-xl shadow-white/10 hover:bg-white/25 hover:shadow-2xl hover:-translate-y-0.5'
              : 'bg-white/5 border border-white/10 text-white/40'
          }`}>
          <svg className="w-3.5 h-3.5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/></svg>
          Night
        </button>
      </div>
    </section>
  )
}

/* ─── ABOUT ─── */
function AboutSection() {
  const [revealed, setRevealed] = useState(false)
  const [phase, setPhase] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!revealed) return
    const t1 = setTimeout(() => setPhase(1), 100)
    const t2 = setTimeout(() => setPhase(2), 400)
    const t3 = setTimeout(() => setPhase(3), 800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [revealed])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle diagonal pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0z' stroke='%23800040' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")` }} />
      {/* Pink entry overlay (shrinks to reveal content) */}
      <div
        className={`absolute inset-0 z-30 transition-all duration-[0.8s] ease-out ${revealed ? 'opacity-0 scale-105' : ''}`}
        style={{ transitionDelay: revealed ? '0.3s' : '0s' }}
      >
        <div className="absolute inset-0 bg-[#800040]" />
        {/* Oval glow layers */}
        <div className="absolute w-[120vw] h-[30vw] -top-[5vw] left-1/2 -translate-x-1/2 rounded-[50%] bg-[#FF80B0]/10 blur-[120px] animate-pulse" />
        <div className="absolute w-[100vw] h-[25vw] bottom-0 -left-[10vw] rounded-[50%] bg-[#C2185B]/20 blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute w-[80vw] h-[20vw] top-1/3 -right-[10vw] rounded-[50%] bg-white/[0.04] blur-[80px]" style={{ animation: 'float 6s ease-in-out infinite' }} />

        {/* Rotating oval rings */}
        <div className="absolute w-[90vw] h-[35vw] rounded-[50%] border border-[#FF80B0]/10 animate-spin pointer-events-none" style={{ animationDuration: '20s' }} />
        <div className="absolute w-[70vw] h-[28vw] rounded-[50%] border border-[#C2185B]/10 animate-spin pointer-events-none" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />

        {/* Oval particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-bounce"
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${4 + (i % 5) * 2}px`,
                background: i % 3 === 0 ? '#FF80B0' : i % 3 === 1 ? '#C2185B' : '#fff',
                left: `${5 + (i * 7) % 90}%`,
                top: `${50 + (i * 11) % 40}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${3 + (i % 4)}s`,
                opacity: 0.3,
              }}
            />
          ))}
        </div>

        {/* Phase content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className={`transition-all duration-700 ${phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <LogoIcon size={48} className="text-white mb-6" />
          </div>
          <div className={`transition-all duration-700 delay-200 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <h3 className="font-display text-3xl md:text-5xl text-white font-semibold tracking-wide text-center leading-tight mb-3">
              The Concept
            </h3>
          </div>
          <div className={`transition-all duration-700 delay-500 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-[#FF80B0] text-xs md:text-sm uppercase tracking-[0.25em] font-medium">
              Designed as a community, not a complex
            </p>
          </div>
          <div className={`mt-8 transition-all duration-700 delay-700 ${phase >= 2 ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}>
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#FF80B0] to-transparent" />
          </div>
          <div className={`mt-8 transition-all duration-700 delay-1000 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-5 h-5 border-2 border-[#FF80B0]/60 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </div>

      {/* Content (shows after overlay fades) */}
      <div className={`relative z-10 w-full px-8 md:px-16 lg:px-24 transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '1.1s' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="max-w-lg">
              <div className="space-y-6">
                <p className="text-[#8B8070] leading-relaxed text-sm md:text-base">
                  A boutique gated community of 25 residences on Costa del Sol, designed around privacy, wellbeing and timeless Mediterranean living.
                </p>
                <p className="text-[#8B8070] leading-relaxed text-sm md:text-base">
                  Instead of corridors, walking paths connect the apartments — making Orca Enclave feel closer to a group of private homes than a standard apartment building.
                </p>
                <div className="w-16 h-[2px] bg-[#800040]/40" />
              </div>
            </div>
            <div className="aspect-[4/5] overflow-hidden relative group">
              <div className="absolute inset-0 bg-[#800040]/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-full h-full group-hover:scale-105 transition-transform duration-700">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" alt="Orca Enclave Architecture"
                  className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── RESIDENCES ─── */
function ResidencesSection() {
  const { ref, visible } = useScrollReveal()

  return (
    <section id="residence" ref={ref} className="relative py-32 md:py-44 px-8 md:px-16 lg:px-24 bg-gradient-to-b from-white to-[#FAF8F5]">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0z' stroke='%23800040' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")` }} />
      <div className="absolute top-0 left-1/4 w-[30vw] h-[30vw] rounded-full bg-[#800040]/[0.02] blur-[100px] pointer-events-none" />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#800040]/60 to-transparent" />
            <p className="text-xs uppercase tracking-[0.2em] text-[#800040]/60 font-medium">Residences</p>
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#800040]/60 to-transparent" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-[#800040]">Select an Apartment</h2>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#800040]/40 to-transparent mx-auto mt-5" />
        </div>
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {apartments.map((apt, i) => (
            <AptCard key={i} apt={apt} img={aptImages[i]} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function AptCard({ apt, img, index, visible }: { apt: typeof apartments[0]; img: string; index: number; visible: boolean }) {
  const delay = 200 + index * 200

  return (
    <div
      className="group cursor-pointer transition-all duration-700 hover:-translate-y-1"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F0EB] mb-8 rounded-sm shadow-sm group-hover:shadow-xl transition-shadow duration-700">
        <div className="absolute inset-0 bg-gradient-to-t from-[#800040]/40 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <img src={img} alt={apt.type}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 brightness-95 group-hover:brightness-100" />
        <div className="absolute inset-0 ring-1 ring-[#800040]/10 group-hover:ring-[#800040]/20 rounded-sm pointer-events-none transition-all duration-500" />
        <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
          <span className="bg-gradient-to-r from-[#FF80B0] to-[#C2185B] text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 shadow-lg">{apt.beds} Bedrooms</span>
        </div>
      </div>
      <p className="text-xs uppercase tracking-[0.12em] text-[#8B8070] mb-3">{apt.beds} Bedrooms</p>
      <h3 className="font-display text-xl font-semibold mb-3 text-[#800040] group-hover:text-[#C2185B] transition-colors duration-500">{apt.type}</h3>
      <div className="w-8 h-[1px] bg-gradient-to-r from-[#800040]/40 to-transparent mb-3" />
      <p className="text-sm text-[#8B8070] mb-2 font-medium">{apt.size}</p>
      <p className="text-sm text-[#8B8070] mb-6 leading-relaxed">{apt.desc}</p>
      <a href="#contact"
        className="text-xs uppercase tracking-[0.12em] text-[#800040] no-underline border-b border-[#800040]/40 pb-0.5 hover:text-[#C2185B] hover:border-[#C2185B] transition-all inline-flex items-center gap-1.5 group/link">
        Explore <span className="group-hover/link:translate-x-1 transition-transform">→</span>
      </a>
    </div>
  )
}

/* ─── AMENITIES ─── */
function AmenitiesSection() {
  const { containerRef, translatePx } = useHorizontalScroll()

  return (
    <section id="amenities" ref={containerRef} className="relative bg-[#1A1A1A]" style={{ height: `${amenities.length * 100}vh` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="absolute top-0 left-1/4 w-[40vw] h-[40vw] bg-[#FF80B0]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[30vw] h-[30vw] bg-[#C2185B]/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <div className="text-center mb-16 md:mb-20 px-8 md:px-16 lg:px-24">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-medium mb-5">Amenities</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-white">
              Everything you need
            </h2>
            <p className="text-white/40 text-sm mt-5 max-w-lg mx-auto">
              Every detail crafted for a seamless Mediterranean lifestyle
            </p>
          </div>

          <div
            data-scroll-track
            className="flex gap-6 md:gap-8 px-8 md:px-16 lg:px-24 transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `translateX(${translatePx}px)`,
            }}
          >
            {amenities.map((a, i) => (
              <div
                key={i}
                className="group relative bg-white/[0.03] border border-white/[0.06] hover:border-[#FF80B0]/20 transition-all duration-700 overflow-hidden shrink-0"
                style={{ width: '65%', minWidth: '520px', height: '550px' }}
              >
                <img src={a.img} alt={a.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 brightness-[0.85] group-hover:brightness-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF80B0]/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center pointer-events-none" />
                <div className="relative z-10 h-full flex flex-col justify-end p-10 md:p-12">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.08] border border-white/[0.1] backdrop-blur-sm flex items-center justify-center mb-5 group-hover:bg-[#FF80B0]/15 group-hover:border-[#FF80B0]/40 transition-all duration-500">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#FF80B0] transition-colors duration-500" fill="currentColor">
                      <path d={a.icon} />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-3 group-hover:text-[#FF80B0] transition-colors duration-500 drop-shadow-lg">
                    {a.title}
                  </h3>
                  <div className="w-10 h-[2px] bg-gradient-to-r from-[#FF80B0]/60 to-transparent mb-4" />
                  <p className="text-sm text-white/60 leading-relaxed max-w-md group-hover:text-white/80 transition-colors duration-500 drop-shadow-md">
                    {a.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── LOCATION ─── */
function LocationSection() {
  const { ref, visible } = useScrollReveal()
  const { ref: imgRef, offset } = useParallax(0.2)

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-8 md:px-16 lg:px-24 bg-gradient-to-b from-white to-[#FAF8F5]">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0z' stroke='%23800040' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")` }} />
      <div className="absolute bottom-0 right-1/4 w-[25vw] h-[25vw] rounded-full bg-[#800040]/[0.02] blur-[80px] pointer-events-none" />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className={`grid md:grid-cols-2 gap-16 md:gap-24 items-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div ref={imgRef} className={`order-2 md:order-1 relative group transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="aspect-[4/3] bg-[#F5F0EB] overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-700">
              <div className="absolute inset-0 bg-gradient-to-t from-[#800040]/30 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 ring-1 ring-[#800040]/10 group-hover:ring-[#800040]/20 pointer-events-none transition-all duration-500" />
              <div className="w-full h-full group-hover:scale-105 transition-transform duration-700">
                <img src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80" alt="Malibu Coast"
                  className="w-full h-full object-cover brightness-95"
                  style={{ transform: visible ? `translateY(0) scale(1)` : `translateY(${offset * 0.15}px) scale(1.08)` }} />
              </div>
            </div>
          </div>
          <div className={`order-1 md:order-2 max-w-lg transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-[1px] bg-gradient-to-r from-transparent via-[#800040]/60 to-transparent" />
              <p className="text-xs uppercase tracking-[0.2em] text-[#800040]/60 font-medium">Location</p>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-8 text-[#800040]">
              Pacific Coast<br />Malibu & Santa Monica
            </h2>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#800040]/30 to-transparent mb-8" />
            <p className="text-[#8B8070] leading-relaxed mb-6 text-sm md:text-base">Surrounded by pristine beaches, coastal trails, and world-class wellness destinations.</p>
            <p className="text-[#8B8070] leading-relaxed mb-10 text-sm md:text-base">A location designed not around movement — but around returning.</p>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#800040]/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CONTACT ─── */
const contactInfo = [
  { label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567', icon: 'M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.58 1 1 0 01-.25 1.01l-2.2 2.2z' },
  { label: 'Email', value: 'hello@orcaenclave.com', href: 'mailto:hello@orcaenclave.com', icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
  { label: 'Location', value: '123 Ocean Drive, Malibu, CA 90265', href: '#', icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z' },
]

function ContactSection() {
  const { ref, visible } = useScrollReveal()

  return (
    <section id="contact" ref={ref} className="min-h-screen py-20 md:py-60 px-6 md:px-16 lg:px-24 bg-[#800040] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#C2185B]/15 via-transparent to-[#FF80B0]/5 pointer-events-none" />
      <div className="absolute w-[60vw] h-[60vw] rounded-full bg-[#C2185B]/10 blur-[120px] top-10 -left-20 pointer-events-none" />
      <div className="absolute w-[40vw] h-[40vw] rounded-full bg-[#FF80B0]/8 blur-[100px] -bottom-10 right-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Header */}
        <div className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-transparent via-[#FF80B0] to-transparent" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#FF80B0]/80 font-medium drop-shadow-lg">Contact</p>
            <span className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-transparent via-[#FF80B0] to-transparent" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FF80B0] via-white to-[#FF80B0] drop-shadow-2xl mb-5">
            Get in touch
          </h2>
          <div className="w-12 md:w-16 h-[2px] bg-gradient-to-r from-transparent via-[#FF80B0] to-transparent mx-auto mb-5" />
          <p className="text-white/60 text-xs md:text-base mt-5 max-w-xl mx-auto leading-relaxed drop-shadow-lg px-2">
            We look forward to welcoming you to Orca Enclave
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start pt-10 md:pt-24">

          {/* Info side */}
          <div className="space-y-10 md:space-y-12">
            <div className={`space-y-6 md:space-y-8 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {contactInfo.map((item, i) => (
                <a key={i} href={item.href} className="flex items-center gap-4 md:gap-5 group no-underline">
                  <div className="w-10 md:w-12 h-10 md:h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:bg-white/[0.08] group-hover:border-[#FF80B0]/30 transition-all duration-500">
                    <svg viewBox="0 0 24 24" className="w-4 md:w-5 h-4 md:h-5 text-[#FF80B0]/60 group-hover:text-[#FF80B0] transition-colors duration-500" fill="currentColor">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.12em] text-white/40 mb-1">{item.label}</p>
                    <p className="text-xs md:text-sm text-white/80 group-hover:text-white transition-colors duration-500">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social */}
            <div className={`flex gap-3 md:gap-4 transition-all duration-1000 delay-400 ${visible ? 'opacity-100' : 'opacity-0'}`}>
              {['Instagram', 'Facebook', 'LinkedIn'].map(s => (
                <a key={s} href="#" className="w-8 md:w-10 h-8 md:h-10 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/40 hover:bg-white/[0.08] hover:border-[#FF80B0]/30 hover:text-[#FF80B0] transition-all duration-500 text-[9px] md:text-[10px] uppercase tracking-widest font-medium">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Form side */}
          <div className={`transition-all duration-1000 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <form onSubmit={e => e.preventDefault()} className="bg-white/[0.03] border border-white/[0.06] p-6 md:p-12 space-y-6 md:space-y-7">
              <div className="grid md:grid-cols-2 gap-6">
                {['Name', 'Email'].map(field => (
                  <div key={field}>
                    <label className="text-xs uppercase tracking-[0.12em] text-white/40 block mb-3">{field}</label>
                    <input type={field === 'Email' ? 'email' : 'text'}
                      placeholder={`Your ${field.toLowerCase()}`}
                      className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3.5 text-sm text-white outline-none transition-all duration-500 focus:border-[#FF80B0]/50 focus:bg-white/[0.06] placeholder-white/20" />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.12em] text-white/40 block mb-3">Phone</label>
                <input type="tel" placeholder="Your phone number"
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3.5 text-sm text-white outline-none transition-all duration-500 focus:border-[#FF80B0]/50 focus:bg-white/[0.06] placeholder-white/20" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.12em] text-white/40 block mb-3">Preferred Residence</label>
                <select defaultValue="" className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3.5 text-sm text-white outline-none transition-all duration-500 focus:border-[#FF80B0]/50 focus:bg-white/[0.06] appearance-none">
                  <option value="" disabled className="text-white/40">Select residence type</option>
                  <option value="ground-basement" className="text-[#1A1A1A]">Ground + Basement</option>
                  <option value="ground-floor" className="text-[#1A1A1A]">Ground Floor</option>
                  <option value="penthouse" className="text-[#1A1A1A]">Penthouse Duplex</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.12em] text-white/40 block mb-3">Message</label>
                <textarea rows={5} placeholder="Your message"
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3.5 text-sm text-white outline-none transition-all duration-500 focus:border-[#FF80B0]/50 focus:bg-white/[0.06] placeholder-white/20 resize-none" />
              </div>
              <button type="submit"
                className="w-full bg-gradient-to-r from-[#FF80B0] to-[#C2185B] text-white py-4 px-10 text-xs font-bold uppercase tracking-[0.15em] cursor-pointer border-0 rounded-sm hover:from-[#C2185B] hover:to-[#800040] transition-all duration-500 shadow-lg shadow-[#FF80B0]/20 hover:shadow-xl">
                Send Inquiry
              </button>
            </form>
          </div>

        </div>

        {/* Bottom info bar */}
        <div className={`mt-16 md:mt-24 pt-10 md:pt-16 border-t border-white/10 text-center transition-all duration-1000 delay-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col md:flex-row justify-center gap-y-3 md:gap-x-12 md:gap-y-4 text-xs md:text-sm text-white/50">
            <span>©2026 Orca Enclave</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span>123 Ocean Drive, Malibu, CA 90265</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span>hello@orcaenclave.com</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FOOTER ─── */
function FooterSection() {
  return (
    <footer className="py-12 px-8 md:px-16 lg:px-24 bg-[#4D0026]">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <LogoIcon size={20} className="text-[#FF80B0]" />
          <span className="font-display text-sm font-semibold text-white">Orca Enclave</span>
        </div>
        <p className="text-xs text-white/50">©2026 All rights reserved</p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-white/50 no-underline hover:text-[#FF80B0] transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs text-white/50 no-underline hover:text-[#FF80B0] transition-colors">Terms of Use</a>
        </div>
      </div>
    </footer>
  )
}

/* ─── LOGO ICON ─── */
function LogoIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M6.555 9.124C4.817 7.386 4.69 4.694 4.69 4.694s2.692.127 4.43 1.865c1.738 1.739 1.865 4.43 1.865 4.43s-2.691-.127-4.43-1.865z" fill="currentColor" />
      <path d="M20 .002l-3.843 8.117a5.143 5.143 0 000 3.762l2.342 4.948a3.2 3.2 0 00-1.645 1.68l-4.973-2.353a5.143 5.143 0 00-3.762 0L0 20v-.823c0-.828.423-1.598 1.122-2.041l6.522-4.14a5.143 5.143 0 014.712 0l1.75 1.11-1.11-1.75a5.143 5.143 0 010-4.712l4.14-6.522C17.58.423 18.35 0 19.178 0L20 .002z" fill="currentColor" />
      <path d="M33.445 30.876c1.738 1.738 1.865 4.43 1.865 4.43s-2.692-.127-4.43-1.865c-1.738-1.739-1.865-4.43-1.865-4.43s2.691.127 4.43 1.865z" fill="currentColor" />
      <path d="M20 39.998l3.843-8.117a5.143 5.143 0 000-3.762l-2.342-4.948a3.2 3.2 0 001.645-1.68l4.973 2.353a5.143 5.143 0 003.762 0L40 20v.823c0 .828-.423 1.598-1.122 2.041l-6.522 4.14a5.143 5.143 0 01-4.712 0l-1.75-1.11 1.11 1.75a5.143 5.143 0 010 4.712l-4.14 6.522c-.444.699-1.214 1.122-2.041 1.122L20 39.998z" fill="currentColor" />
      <path d="M30.876 6.555c1.738-1.738 4.43-1.865 4.43-1.865s-.127 2.692-1.865 4.43c-1.739 1.738-4.43 1.865-4.43 1.865s.127-2.691 1.865-4.43z" fill="currentColor" />
      <path d="M39.999 20l-8.118-3.843a5.143 5.143 0 00-3.762 0l-4.948 2.342a3.2 3.2 0 00-1.68-1.645l2.353-4.973a5.143 5.143 0 000-3.762L20 0h.823c.828 0 1.598.423 2.041 1.122l4.14 6.522a5.143 5.143 0 010 4.712l-1.11 1.75 1.75-1.11a5.143 5.143 0 014.712 0l6.522 4.14c.699.444 1.122 1.214 1.122 2.041l-.001.823z" fill="currentColor" />
      <path d="M9.124 33.445c-1.738 1.738-4.43 1.865-4.43 1.865s.127-2.692 1.865-4.43c1.739-1.738 4.43-1.865 4.43-1.865s-.127 2.691-1.865 4.43z" fill="currentColor" />
      <path d="M0 20l8.118 3.843a5.143 5.143 0 003.762 0l4.948-2.342a3.2 3.2 0 001.68 1.645l-2.353 4.973a5.143 5.143 0 000 3.762L20 40h-.823c-.828 0-1.598-.423-2.041-1.122l-4.14-6.522a5.143 5.143 0 010-4.712l1.11-1.75-1.75 1.11a5.143 5.143 0 01-4.712 0L1.122 22.864C.423 22.42 0 21.65 0 20.822L0 20z" fill="currentColor" />
    </svg>
  )
}