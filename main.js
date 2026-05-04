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

// Menu Carousel Horizontal Scroll Animation (Subtle Parallax)
const cards = document.querySelectorAll('.menu-card')
gsap.from(cards, {
  scrollTrigger: {
    trigger: '.menu-carousel',
    start: 'top 80%',
  },
  x: 100,
  opacity: 0,
  stagger: 0.1,
  duration: 1,
  ease: 'power3.out'
})

// Reviews Slider
const reviews = [
  { text: "Very lovely food and service. Pickleball court is very good and spacious.", author: "Rahul M." },
  { text: "Great ambience and very responsive service. Must visit!", author: "Sonia P." },
  { text: "The food is super and service also. The atmosphere and place was good.", author: "Arjun K." }
]

let currentReview = 0
const reviewCard = document.querySelector('.review-card')

function updateReview() {
  gsap.to(reviewCard, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    onComplete: () => {
      currentReview = (currentReview + 1) % reviews.length
      reviewCard.querySelector('p').innerText = `"${reviews[currentReview].text}"`
      reviewCard.querySelector('.review-author').innerText = `— ${reviews[currentReview].author}`
      gsap.to(reviewCard, {
        opacity: 1,
        y: 0,
        duration: 0.5
      })
    }
  })
}

setInterval(updateReview, 5000)

// Refresh ScrollTrigger on resize
window.addEventListener('resize', () => {
  ScrollTrigger.refresh()
})
