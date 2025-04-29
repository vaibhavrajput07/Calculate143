import { useState } from 'react';

import './MainPage.css';

export default function MainPage() {
  const [yourName, setYourName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [result, setResult] = useState("");

  // Function to calculate love and store it in MongoDB
  const calculateLove = async () => {
    if (yourName.trim() === "" || partnerName.trim() === "") {
      setResult("Please enter both names ❤️");
      return;
    }

    let loveScore = 50;  // Start with a minimum love score of 50%

    // 1. Matching characters in both names
    const yourNameSet = new Set(yourName.toLowerCase().split(''));
    const partnerNameSet = new Set(partnerName.toLowerCase().split(''));
    const matchingCharacters = [...yourNameSet].filter(char => partnerNameSet.has(char)).length;
    loveScore += matchingCharacters * 5; // Add 5 for each matching character

    // 2. Check if both names have equal length
    if (yourName.length === partnerName.length) {
      loveScore += 10; // Add 10 if names are of the same length
    }

    // Ensure love score is within the range of 50 to 100
    loveScore = Math.min(Math.max(loveScore, 50), 100);

    setResult(`${yourName} ❤️ ${partnerName} = ${loveScore}% Love`);

    // Send the love score data to the backend API for storage in MongoDB
    try {
      const response = await fetch('http://localhost:5000/api/save-love', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          yourName,
          partnerName,
          loveScore
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Data saved successfully:', data);
      } else {
        console.log('Error:', data.error);
      }
    } catch (error) {
      console.error('Error saving data to the backend:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-400 to-pink-400 p-4">
      <h1 className="text-5xl font-bold text-white ">
        Love <span className="text-white">♥</span> Calculator
      </h1>
      <p className="text-white font-semibold mb-6 subTitle">
        Get Your Own Love Result Instantly*
      </p>

      <div className="flex flex-col md:flex-row items-center mt-8 justify-center gap-6 mb-6 w-full max-w-xl">
        <div className="input-group">
          <label htmlFor="yourName" className="input-label">Your Name:</label>
          <input
            type="text"
            id="yourName"
            placeholder="Enter Your Name"
            className="input-field"
            value={yourName}
            onChange={(e) => setYourName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="partnerName" className="input-label">Partner's Name:</label>
          <input
            type="text"
            id="partnerName"
            placeholder="Enter His/Her Name"
            className="input-field"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={calculateLove}
        className="bg-white text-red-500 font-bold py-3 px-8 rounded-full shadow-md hover:bg-red-100 transition"
      >
        ❤️ CALCULATE ❤️
      </button>

      <div className="mt-8 text-center result-container">
        <h2 className="text-2xl text-white font-bold mb-2">Result</h2>
        <hr className="border-white w-24 mx-auto mb-4" />
        <p className="text-white text-lg">{result}</p>
      </div>
    </div>
  );
}
