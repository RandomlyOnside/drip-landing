export default function LocalsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Be the first to sip with Local Drip.</h1>
        <p className="text-lg mb-8">Get your neighborhood café in your pocket. Early access in [Neighborhood].</p>
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent1"
          />
          <button className="w-full bg-accent1 text-white px-8 py-3 rounded-lg font-medium">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}