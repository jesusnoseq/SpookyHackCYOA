import React, { useState } from 'react';

interface MysteryFormProps {
  onSubmit: (answer: string) => void;
  timeLeft: number;
}

const MysteryForm: React.FC<MysteryFormProps> = ({ onSubmit, timeLeft }) => {
  const [answer, setAnswer] = useState('');
  const correctAnswerHash = 'D04B98F48E8F8BCC15C6AE5AC050801CD6DCFD428FB5F9E65C4E16E7807340FA';

  const code = `
def ????_table(data):
  buckets_number = 5
  temp = { }
  for item in data:
    key = ????(item) % buckets_number
    if key in temp:
      temp[key].append(item)
    else:
      temp[key] = [item]
 `

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answer);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const hashString = async (str: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  return (
    <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-80 p-6">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Solve the Mystery</h2>
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <pre className={`p-4 overflow-auto`}>
            {code}
          </pre>
        </div>

        <div className="text-xl text-red-500 mb-4">Time left: {formatTime(timeLeft)}</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="w-full p-2 mb-4 border rounded bg-gray-700 text-gray-100"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Submit Answer
          </button>
        </form>
      </div>
    </div>
  );
};

export default MysteryForm;