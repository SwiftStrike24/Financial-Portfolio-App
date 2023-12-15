// Add at the top with your other imports
import './ZerionPortfolio.css'; // This assumes you have a CSS file for this component
import React, { useState } from 'react';
import axios from 'axios';

const ZerionPortfolio = () => {
  const [address, setAddress] = useState('');
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState('');

  const fetchPortfolio = async () => {
    try {
      const response = await axios.get(`/wallet/${address}/portfolio`);
      setPortfolio(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching portfolio:', err);
      setError('Failed to fetch portfolio. Please try again later.');
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter wallet address"
        className="input"
      />
      <button onClick={fetchPortfolio} className="button">
        Get Portfolio
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {portfolio && (
        <div>
          <h3 className="text-lg font-semibold my-4">Crypto Portfolio:</h3>
          <div className="mb-4">
            <h4 className="font-medium">Positions Distribution by Chain:</h4>
            <div className="overflow-x-auto mt-2">
              <table className="table">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">Chain</th>
                    <th className="px-4 py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(portfolio.data.attributes.positions_distribution_by_chain).map(([chain, amount]) => (
                    <tr key={chain}>
                      <td className="border px-4 py-2">{chain}</td>
                      <td className="border px-4 py-2">{amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h4 className="font-medium">Total:</h4>
            <p>Total Positions: {portfolio.data.attributes.total.positions.toFixed(2)}</p>
          </div>
          <div className="mt-4">
            <h4 className="font-medium">Changes (24h):</h4>
            <p>Absolute: {portfolio.data.attributes.changes.absolute_1d.toFixed(2)}</p>
            <p>Percent: {portfolio.data.attributes.changes.percent_1d.toFixed(2)}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZerionPortfolio;
