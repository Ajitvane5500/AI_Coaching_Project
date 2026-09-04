'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<any>({ exam: 'GATE', target_score: 90, readiness_score: 78 });
  const [prediction, setPrediction] = useState<any>({ score_range: '80 - 90' });
  const [mastery, setMastery] = useState<any[]>([
    { topic: 'Calculus', mastery: '65%' },
    { topic: 'Linear Algebra', mastery: '50%' }
  ]);
  const [studyPlan, setStudyPlan] = useState<any[]>([
    { day: 'Day 1-3', task: 'Revise Calculus & Core Formulas', status: 'Pending' },
    { day: 'Day 4-6', task: 'Solve Data Structures Practice Set', status: 'Pending' }
  ]);
  const [recommendations, setRecommendations] = useState<string[]>([
    'Focus 2 hours daily on Linear Algebra matrix operations.',
    'Attempt a mini-quiz on Differential Equations.'
  ]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/students/1/dashboard')
      .then(res => res.json())
      .then(data => { if (data) setDashboard(data); })
      .catch(err => console.log('Using fallback dashboard'));

    fetch('http://127.0.0.1:8000/students/1/performance-prediction')
      .then(res => res.json())
      .then(data => { if (data) setPrediction(data); })
      .catch(err => console.log('Using fallback prediction'));

    fetch('http://127.0.0.1:8000/students/1/topic-mastery')
      .then(res => res.json())
      .then(data => { if (data && data.topics) setMastery(data.topics); })
      .catch(err => console.log('Using fallback mastery'));

    fetch('http://127.0.0.1:8000/study-plan/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_id: 1 })
    })
      .then(res => res.json())
      .then(data => { if (data && data.study_plan) setStudyPlan(data.study_plan); })
      .catch(err => console.log('Using fallback study plan'));

    fetch('http://127.0.0.1:8000/students/1/recommendations')
      .then(res => res.json())
      .then(data => { if (data && data.recommendations) setRecommendations(data.recommendations); })
      .catch(err => console.log('Using fallback recommendations'));
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto text-black bg-gray-50 min-h-screen space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded shadow border">
        <div>
          <h1 className="text-3xl font-bold">AI Coaching Analytics Dashboard</h1>
          <p className="text-gray-600">Unified Student Intelligence & Progress Center</p>
        </div>
        <button 
          onClick={() => router.push('/test')}
          className="bg-green-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-green-700 shadow"
        >
          Take Mock Test
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded shadow border">
          <h3 className="text-sm font-semibold text-gray-500">Target Exam</h3>
          <p className="text-xl font-bold mt-1 text-blue-600">{dashboard?.exam || 'GATE'}</p>
        </div>
        <div className="bg-white p-5 rounded shadow border">
          <h3 className="text-sm font-semibold text-gray-500">Readiness Score</h3>
          <p className="text-xl font-bold mt-1 text-indigo-600">{dashboard?.readiness_score || 78}%</p>
        </div>
        <div className="bg-white p-5 rounded shadow border">
          <h3 className="text-sm font-semibold text-gray-500">Predicted Score Range</h3>
          <p className="text-xl font-bold mt-1 text-green-600">{prediction?.score_range || '80 - 90'}</p>
        </div>
        <div className="bg-white p-5 rounded shadow border">
          <h3 className="text-sm font-semibold text-gray-500">Target Score</h3>
          <p className="text-xl font-bold mt-1 text-purple-600">{dashboard?.target_score || 90}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Adaptive Study Plan</h2>
          <div className="space-y-3">
            {studyPlan.map((item: any, idx: number) => (
              <div key={idx} className="p-3 bg-gray-50 rounded border flex justify-between items-center">
                <div>
                  <span className="font-bold text-blue-600 text-sm">{item.day}</span>
                  <p className="text-gray-700 text-sm mt-1">{item.task}</p>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-semibold">{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Topic Mastery & Weak Areas</h2>
          <div className="space-y-4">
            {mastery.map((m: any, idx: number) => (
              <div key={idx}>
                <div className="flex justify-between text-sm font-semibold mb-1">
                  <span>{m.topic}</span>
                  <span>{m.mastery}</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div className="bg-blue-600 h-2 rounded" style={{ width: m.mastery }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow border">
        <h2 className="text-xl font-bold mb-3 text-gray-800">AI Smart Recommendations & Next Actions</h2>
        <ul className="list-disc pl-5 space-y-2">
          {recommendations.map((rec: string, idx: number) => (
            <li key={idx} className="text-red-600 font-medium">{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}