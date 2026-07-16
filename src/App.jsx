import Nav from './components/Nav'
import Hero from './components/Hero'
import ScrollProgress from './components/ScrollProgress'
import Thriller from './components/Thriller'
import Sunflowers from './components/Sunflowers'
import BTS from './components/BTS'
import Music from './components/Music'
import Litchi from './components/Litchi'
import Gallery from './components/Gallery'
import Candids from './components/Candids'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative">
      <div className="grain" />
      <ScrollProgress />
      <Nav />
      <Hero />
      <div id="delights">
        <section className="relative bg-[#1c1812] pt-24 pb-4 md:pt-32 md:pb-8 flex items-center justify-center">
          <h2 className="font-display italic text-white text-4xl sm:text-5xl md:text-6xl text-center">
            Things She Likes
          </h2>
        </section>
        <Thriller />
        <Sunflowers />
        <BTS />
        <Music />
        <Litchi />
      </div>
      <Gallery />
      <Candids />
      <Footer />
    </div>
  )
}
