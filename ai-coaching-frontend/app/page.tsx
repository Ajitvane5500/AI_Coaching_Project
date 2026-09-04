'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 text-black">
      <div className="max-w-xl text-center bg-white p-8 rounded shadow border">
        <h1 className="text-4xl font-bold mb-4">AI Coaching Platform</h1>
        <p className="text-gray-600 mb-8">Your personalized AI mentor for exam preparation, mock tests, and performance tracking.</p>
        
        <div className="space-y-4">
          <button 
            onClick={() => router.push('/onboarding')}
            className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700"
          >
            Start Student Onboarding
          </button>
          <button 
            onClick={() => router.push('/dashboard')}
            className="w-full bg-gray-800 text-white p-3 rounded font-bold hover:bg-gray-900"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}