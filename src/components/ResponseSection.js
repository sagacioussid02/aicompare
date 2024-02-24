import React from 'react';

const ResponseSection = ({ responses }) => {
  return (
    <div className="response-section">
      {responses.map((response, index) => (
        <div key={index} className="response-cell">
          <textarea className="response-textarea" value={response} readOnly />
        </div>
      ))}
    </div>
  );
};

export default ResponseSection;
