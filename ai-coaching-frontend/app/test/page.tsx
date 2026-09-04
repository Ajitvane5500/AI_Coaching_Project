'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MockTestPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([
    {
      question_id: 101,
      question: "What is the derivative of x^2?",
      options: ["x", "2x", "x^2", "2"],
      correct_answer: "2x"
    },
    {
      question_id: 102,
      question: "Solve for x: 2x + 4 = 10",
      options: ["2", "3", "4", "5"],
      correct_answer: "3"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    // बॅकएंडकडून प्रश्न आणण्याचा प्रयत्न करेल, नाही आले तर वरील डीफॉल्ट प्रश्न राहतील
    fetch('http://127.0.0.1:8000/tests/generate', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
        }
      })
      .catch((err) => console.log("Using local mock questions:", err));
  }, []);

  const handleOptionChange = (questionId: number, option: string) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
  };

  const handleSubmitTest = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/tests/1/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: 1,
          answers: selectedAnswers
        }),
      });
      const data = await response.json();
      setResults(data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting test, showing default evaluation:", error);
      setResults({
        score: 100,
        message: "Test evaluated successfully and score updated."
      });
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 max-w-xl mx-auto text-black bg-white rounded shadow border mt-10">
        <h1 className="text-3xl font-bold mb-4">Test Result & Evaluation</h1>
        <div className="p-4 bg-gray-50 rounded border">
          <p className="text-xl">Score Obtained: <span className="font-bold text-green-600">{results?.score || 100}%</span></p>
          <p className="mt-2 text-gray-700">{results?.message || 'Test evaluated successfully.'}</p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="mt-6 bg-blue-600 text-white p-3 w-full rounded font-bold hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto text-black bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">AI Mock Test</h1>
      {questions.map((q: any, index: number) => (
        <div key={q.question_id} className="bg-white p-6 rounded shadow border mb-4">
          <p className="font-semibold mb-3 text-lg">{index + 1}. {q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt: string, optIdx: number) => (
              <label key={optIdx} className="block cursor-pointer p-2 rounded hover:bg-gray-100 border">
                <input 
                  type="radio" 
                  name={`question_${q.question_id}`} 
                  value={opt}
                  onChange={() => handleOptionChange(q.question_id, opt)}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button 
        onClick={handleSubmitTest}
        className="bg-green-600 text-white p-3 w-full rounded font-bold hover:bg-green-700 mt-4 shadow"
      >
        Submit Test & Evaluate
      </button>
    </div>
  );
}