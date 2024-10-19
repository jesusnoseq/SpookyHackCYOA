import React, { useState } from 'react';
import FourLetterInput from './FourLetterInput';

interface MysteryFormProps {
  onSubmit: (answerOk: boolean) => void;
}

const MysteryForm: React.FC<MysteryFormProps> = ({ onSubmit }) => {
  const [answer, setAnswer] = useState('');
  const correctAnswerHash = 'd04b98f48e8f8bcc15c6ae5ac050801cd6dcfd428fb5f9e65c4e16e7807340fa';

  //   const code = `
  // def ????_table(data):
  //   buckets_number = 5
  //   temp = { }
  //   for item in data:
  //     key = ????(item) % buckets_number
  //     if key in temp:
  //       temp[key].append(item)
  //     else:
  //       temp[key] = [item]
  //  `

  const code = `
function save_user(username:str, password: str):
    salt = generate_random_bytes(16)  
    hpwd = ????(salt + password)
	  result = db.save(username, hpwd, salt)
    if(!result.ok){
        throw Exception(result.error)
    }
  `

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hresp = await hashString(answer.toLowerCase());
    console.log("MysteryForm handleSubmit ", hresp, correctAnswerHash);
    onSubmit(hresp === correctAnswerHash);
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
    <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-90 p-6">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Solve the Mystery</h2>
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <pre className={`p-4 overflow-auto`}>
            {code}
          </pre>
        </div>
        <form onSubmit={handleSubmit}>
          {/* <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="w-full p-2 mb-4 border rounded bg-gray-700 text-gray-100"
            required
          /> */}
          <div className="p-6 mb-6 border rounded">
            <FourLetterInput onChange={(value) => setAnswer(value)} />
          </div>
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