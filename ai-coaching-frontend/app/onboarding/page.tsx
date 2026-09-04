'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    exam: '',
    target_score: '',
    target_date: '',
    available_hours: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://127.0.0.1:8000/students/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: 1,
          exam: formData.exam,
          target_score: Number(formData.target_score),
          target_date: formData.target_date,
          available_hours: Number(formData.available_hours)
        }),
      }).catch(err => console.log("Background sync error:", err));
      
      router.push('/dashboard');
    } catch (err) {
      console.error('Error:', err);
      router.push('/dashboard');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto text-black bg-white rounded shadow border mt-10">
      <h1 className="text-2xl font-bold mb-4">Student Onboarding</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Target Exam:</label>
          <input 
            type="text"
            className="border p-2 w-full rounded text-black"
            value={formData.exam}
            onChange={(e) => setFormData({...formData, exam: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Target Score:</label>
          <input 
            type="number"
            className="border p-2 w-full rounded text-black"
            value={formData.target_score}
            onChange={(e) => setFormData({...formData, target_score: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Target Date:</label>
          <input 
            type="date"
            className="border p-2 w-full rounded text-black"
            value={formData.target_date}
            onChange={(e) => setFormData({...formData, target_date: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Available Study Hours (per day):</label>
          <input 
            type="number"
            className="border p-2 w-full rounded text-black"
            value={formData.available_hours}
            onChange={(e) => setFormData({...formData, available_hours: e.target.value})}
            required
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-600 text-white p-3 w-full rounded font-bold hover:bg-blue-700"
        >
          Save & Continue to Dashboard
        </button>
      </form>
    </div>
  );
}