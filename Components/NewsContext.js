// NewsContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const NewsContext = createContext();

const fetchNews = async () => {
    const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=a765e240b016479f91a06d3668d61dfc');
    return response.data.articles;
  };

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews().then(data => setNews(data));
  }, []);

  return <NewsContext.Provider value={news}>{children}</NewsContext.Provider>;
};
