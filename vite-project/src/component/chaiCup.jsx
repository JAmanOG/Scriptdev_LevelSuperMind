import React, { useState, useEffect } from 'react';

export const ChaiGlass = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    inputs: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
    },
    input: {
      padding: '8px',
      width: '80px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    chaiGlass: {
      height: '140px',
      width: '90px',
      position: 'relative',
      marginTop: '20px',
    },
    glassBody: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      border: '3px solid #333',
      borderRadius: '3px 3px 8px 8px',
      overflow: 'hidden',
      clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)',
    },
    glassBorderLeft: {
      position: 'absolute',
      top: '0',
      left: '5%',
      height: '100%',
      width: '2px',
      background: '#333',
      transform: 'skew(5deg)',
      zIndex: 4,
    },
    glassBorderRight: {
      position: 'absolute',
      top: '0',
      right: '5%',
      height: '100%',
      width: '2px',
      background: '#333',
      transform: 'skew(-5deg)',
      zIndex: 4,
    },
    ribs: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      height: '75%',
      display: 'flex',
      justifyContent: 'space-between',
      zIndex: 2,
    },
    rib: {
      width: '2px',
      height: '100%',
      background: 'rgba(51, 51, 51, 0.3)',
      boxShadow: '0 0 1px rgba(255, 255, 255, 0.5)',
    },
    liquid: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      height: '0',
      background: 'linear-gradient(45deg, #c17e3e, #e6a15c)',
      transition: 'height 0.5s ease-in-out',
      zIndex: 1,
    },
    foam: {
      position: 'absolute',
      width: '100%',
      height: '10px',
      background: '#f8e4cf',
      borderRadius: '50%',
      filter: 'blur(1px)',
      zIndex: 3,
    },
    bubble: {
      position: 'absolute',
      width: '4px',
      height: '4px',
      background: 'rgba(255, 255, 255, 0.6)',
      borderRadius: '50%',
      animation: 'bubble 2s infinite',
      zIndex: 2,
    },
    averageDisplay: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      marginTop: '20px',
    },
    shadow: {
      position: 'absolute',
      bottom: '-10px',
      left: '10%',
      width: '80%',
      height: '10px',
      background: 'rgba(0, 0, 0, 0.1)',
      borderRadius: '50%',
      filter: 'blur(3px)',
    },
  };

  // Add bubble keyframes
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bubble {
        0% {
          transform: translateY(0) scale(1);
          opacity: 0;
        }
        50% {
          opacity: 0.8;
        }
        100% {
          transform: translateY(-20px) scale(0.5);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const [values, setValues] = useState([0, 0, 0]);
  const [liquidHeight, setLiquidHeight] = useState(0);
  const [average, setAverage] = useState(0);

  const updateGlass = (newValues) => {
    const avg = newValues.reduce((a, b) => a + b, 0) / newValues.length;
    const fillPercentage = Math.min(Math.max(avg, 0), 100);
    setLiquidHeight(fillPercentage);
    setAverage(avg);
  };

  const handleInputChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = parseFloat(value) || 0;
    setValues(newValues);
    updateGlass(newValues);
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputs}>
        {[0, 1, 2].map((index) => (
          <input
            key={index}
            type="number"
            placeholder={`Value ${index + 1}`}
            style={styles.input}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      
      <div style={styles.chaiGlass}>
        <div style={styles.glassBody}>
          <div style={styles.glassBorderLeft}></div>
          <div style={styles.glassBorderRight}></div>
          <div style={styles.ribs}>
            {[...Array(10)].map((_, index) => (
              <div key={index} style={styles.rib}></div>
            ))}
          </div>
          <div style={{...styles.liquid, height: `${liquidHeight}%`}}>
            <div style={{...styles.foam, bottom: `${liquidHeight}%`}}></div>
            <div style={{...styles.bubble, left: '20%', animationDelay: '0s'}}></div>
            <div style={{...styles.bubble, left: '50%', animationDelay: '0.5s'}}></div>
            <div style={{...styles.bubble, left: '80%', animationDelay: '1s'}}></div>
          </div>
        </div>
        <div style={styles.shadow}></div>
      </div>
      
      <div style={styles.averageDisplay}>Average: {average.toFixed(1)}</div>
    </div>
  );
};

