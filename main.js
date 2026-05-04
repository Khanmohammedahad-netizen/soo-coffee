import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle')
const navLinks = document.querySelector('.nav-links')
const navLinkItems = document.querySelectorAll('.nav-links a')

mobileToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active')
  mobileToggle.classList.toggle('open')
})

navLinkItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active')
  })
})

// Navbar Scroll Effect
const nav = document.querySelector('nav')
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled')
  } else {
    nav.classList.remove('scrolled')
  }
})

// Hero Animations
const heroTL = gsap.timeline()

heroTL.from('.reveal', {
  y: 150,
  stagger: 0.2,
  duration: 1.5,
  ease: "power4.out",
  delay: 0.5
})

// Parallax Hero
gsap.to('.hero-video-placeholder', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  },
  y: 200,
  ease: 'none'
})

// Counters Animation
const counters = document.querySelectorAll('.counter')
counters.forEach(counter => {
  const target = +counter.getAttribute('data-target')
  const decimals = counter.getAttribute('data-decimals') || 0
  
  ScrollTrigger.create({
    trigger: counter,
    start: 'top 90%',
    onEnter: () => {
      let count = 0
      const duration = 2000 // ms
      const startTime = performance.now()
      
      const updateCount = (timestamp) => {
        const runtime = timestamp - startTime
        const progress = Math.min(runtime / duration, 1)
        
        // Easing function
        const easedProgress = 1 - Math.pow(1 - progress, 4)
        
        const currentCount = easedProgress * target
        counter.innerText = currentCount.toFixed(decimals) + (target === 171 ? '+' : target === 4.4 ? '★' : '')
        
        if (progress < 1) {
          requestAnimationFrame(updateCount)
        } else {
          counter.innerText = target.toFixed(decimals) + (target === 171 ? '+' : target === 4.4 ? '★' : '')
        }
      }
      
      requestAnimationFrame(updateCount)
    }
  })
})

// Menu Collage Animation
const collageItems = document.querySelectorAll('.collage-item')
gsap.from(collageItems, {
  scrollTrigger: {
    trigger: '.menu-collage',
    start: 'top 85%',
  },
  y: 50,
  opacity: 0,
  stagger: 0.15,
  duration: 1,
  ease: 'power3.out'
})

// Reviews Marquee Populator
const reviewsList = [
  { text: "Very lovely food and service. Pickleball court is very good and spacious.", author: "Rahul M." },
  { text: "Great ambience and very responsive service. Must visit!", author: "Sonia P." },
  { text: "The food is super and service also. The atmosphere and place was good.", author: "Arjun K." },
  { text: "Best specialty coffee in Jubilee Hills. The cortado is perfect.", author: "Vikram S." },
  { text: "Clean courts and great social vibe. Highly recommended for weekend games.", author: "Neha R." },
  { text: "The artisan skillet breakfast is a game changer. Exceptional quality.", author: "Priya D." }
]

const marquee = document.getElementById('marquee')
if (marquee) {
  // Populate marquee
  const populate = (items) => {
    items.forEach(review => {
      const card = document.createElement('div')
      card.className = 'review-card'
      card.innerHTML = `
        <p>"${review.text}"</p>
        <span class="review-author">— ${review.author}</span>
      `
      marquee.appendChild(card)
    })
  }

  // Double the items for seamless loop
  populate(reviewsList)
  populate(reviewsList)
}

// Refresh ScrollTrigger on resize
window.addEventListener('resize', () => {
  ScrollTrigger.refresh()
})
