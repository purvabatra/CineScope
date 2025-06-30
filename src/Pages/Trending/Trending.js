import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";

const Trending = () => {
  const [page] = useState(1);
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    try {
      // Using CORS proxy to bypass mobile network restrictions
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const targetUrl = encodeURIComponent(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      );
      
      const response = await fetch(proxyUrl + targetUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      console.log('=== DEBUG DATA START ===');
      console.log('Full API Response:', data);
      console.log('Results array:', data.results);
      console.log('Results length:', data.results?.length);
      console.log('First item:', data.results?.[0]);
      console.log('=== DEBUG DATA END ===');
      
      setContent(data.results);
    } catch (error) {
      console.error('Proxy API Error:', error);
      
      // Fallback: try direct API call
      console.log('Trying direct API call as fallback...');
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        );
        
        if (response.ok) {
          const data = await response.json();
          setContent(data.results);
          console.log('Direct API worked as fallback!');
        } else {
          throw new Error(`Direct API HTTP error! status: ${response.status}`);
        }
      } catch (fallbackError) {
        console.error('Both proxy and direct API failed:', fallbackError);
        
        // Optional: Set empty content or error state
        setContent([]);
      }
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending Today</span>
      <div className="trending">
        {content && content.length > 0 ? (
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))
        ) : (
          <div>Loading trending content...</div>
        )}
      </div>
    </div>
  );
};

export default Trending;