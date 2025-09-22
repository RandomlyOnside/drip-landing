export default function CafesPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Keep your café thriving, without big-app fees.</h1>
        <p className="text-lg mb-8">Join the neighborhood co-op. Reach locals directly, on fair terms.</p>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Your name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent2"
          />
          <input 
            type="email" 
            placeholder="Your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent2"
          />
          <input 
            type="text" 
            placeholder="Café name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent2"
          />
          <input 
            type="text" 
            placeholder="POS system (optional)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent2"
          />
          <button className="w-full bg-accent2 text-white px-8 py-3 rounded-lg font-medium">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}