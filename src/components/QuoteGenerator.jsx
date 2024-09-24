// src/QuoteGenerator.js
import React, { useState, useEffect } from "react";
import axios from "axios";

// Helper function to generate random colors
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const QuoteGenerator = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [quoteColor, setQuoteColor] = useState("#000"); // Default color

  // Function to fetch a random quote and change the color
  const fetchQuote = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/quotes/random");
      const data = response.data;
      setQuote(data.quote);
      setAuthor(data.author);
      setQuoteColor(getRandomColor()); // Change color on each new quote
    } catch (error) {
      console.error("Error fetching the quote", error);
    }
  };

  // Fetch an initial quote when the component loads
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        width: "50%",
        height:"300px",
        marginLeft: "auto", // Center horizontally
        marginRight: "auto", // Center horizontally
        borderRadius: "20px",
        border: `1px solid ${quoteColor}`, // Dynamic border color
        boxShadow: `0 4px 8px ${quoteColor}`, // Dynamic shadow color
        padding: "20px", // Internal spacing
        backgroundColor: "#FFFFF0" // Background color
      }}
    >
      <h1 style={{ fontFamily: "Arial, sans-serif", color: "#20B2AA" }}>Quotes Daily</h1>
      <div
        style={{
          marginBottom: "20px",
          fontSize: "24px",
          fontStyle: "italic",
          color: quoteColor, // Dynamic color for the quote
        }}
      >
        "{quote}"
      </div>
      <div
        style={{
          marginBottom: "30px",
          fontSize: "20px",
          fontWeight: "bold",
          color: quoteColor, // Dynamic color for the author
        }}
      >
        - {author}
      </div>
      <button
        onClick={fetchQuote}
        style={{
          padding: "10px 20px",
          fontSize: "18px",
          backgroundColor: "#20B2AA",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
          marginBottom: "20px"
        }}
      >
        Get New Quote 😀
      </button>
    </div>
  );
};

export default QuoteGenerator;
