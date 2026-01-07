'use client'

export default function ScheduleCard() {
  return (
    <div
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-8 text-center border-l-4 border-gold group cursor-pointer"
      onClick={() => {
        // Trigger booking modal - handled by ContactForm
        if (typeof window !== 'undefined') {
          const event = new CustomEvent('openBooking')
          window.dispatchEvent(event)
        }
      }}
    >
      <div className="text-6xl mb-4">📅</div>
      <h3 className="text-2xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">
        Schedule a Call
      </h3>
      <p className="text-gray-600 mb-4">Can't decide, schedule a call back at your convenience</p>
      <p className="text-sm font-semibold text-navy">Choose your preferred slot</p>
    </div>
  )
}
