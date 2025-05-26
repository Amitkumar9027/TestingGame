import React, { useEffect, useState } from "react";
import "./CategoryContent.css";
import img1 from '../assets/Images/1.png'
import img2 from '../assets/Images/mainList/numberGuessing.jpg'
import img3 from '../assets/Images/mainList/MemorYCard.jpg'
import img4 from '../assets/Images/mainList/reactionTime.jpg'
import TicTacToe from "./Games/TicTacToe";
import vid1 from '../assets/Images/mainList/video/memory1.mp4'
import vid2 from '../assets/Images/mainList/video/number.mp4'
import vid3 from '../assets/Images/mainList/video/memory.mp4'
import vid4 from '../assets/Images/mainList/video/reaction.mp4'

import { useNavigate } from "react-router-dom";
const dummyMovies = {
  Action: [
    {
      title: "Tic Tac Toe",
      image: img1,
      videoId: "TicTacToe",
      path: "/tic-tac-toe",
      videoUrl: vid1
    },
    {
      title: "Guess Number",
      image: img2,
      videoId: "NumberGuessingGame",
      path: "/NumberGuessingGame",
      videoUrl: vid2
    }
  ],
  Comedy: [
    {
      title: "Memory Game",
      image: img3,
      videoId: "MemoryCardGameComedy",
      path: "/MemoryCardGame",
      videoUrl: vid3
    },
    {
      title: "Reaction Time",
      image: img4,
      videoId: "ReactionGameComedy",
      path: "/ReactionGame",
      videoUrl: vid4
    }
  ],
  Drama: [
    {
      title: "Dramatic Tic Tac Toe",
      image: img1,
      videoId: "TicTacToeDrama",
      path: "/tic-tac-toe",
      videoUrl: vid1
    },
    {
      title: "Guess My Number",
      image: img2,
      videoId: "GuessDrama",
      path: "/GuessDrama",
      videoUrl: vid2
    }
  ],
  Horror: [
    {
      title: "Scary Memory Game",
      image: img3,
      videoId: "MemoryCardGameHorror",
      path: "/MemoryCardGame",
      videoUrl: vid3
    },
    {
      title: "Jump Scare Reaction",
      image: img4,
      videoId: "ReactionGameHorror",
      path: "/ReactionGameHorror",
      videoUrl: vid4
    }
  ],
  "Sci-Fi": [
    {
      title: "Futuristic Tic Tac Toe",
      image: img1,
      videoId: "TicTacToeSciFi",
      path: "/TicTacToeSciFi",
      videoUrl: vid1
    },
    {
      title: "Alien Number Guess",
      image: img2,
      videoId: "GuessSciFi",
      path: "/GuessSciFi",
      videoUrl: vid2
    }
  ]
};

const CategoryContent = ({ category, mobileMenuOpen }) => {
  const [hoveredMovie, setHoveredMovie] = useState(null);
const navigate=useNavigate();


const [loading, setLoading] = useState(false);
// useEffect(() => {
//   const timer = setTimeout(() => {
//     setLoading(false);
//   }, 1500); // Simulate 1.5 second loading time
  
//   return () => clearTimeout(timer);
// }, [category]); // Trigger when category changes

  return (
   <div className={`content ${mobileMenuOpen ? "mobile-menu-open" : ""}`}>
  <h2>
    {loading ? (
      <div className="skeleton" style={{ width: '200px', height: '30px' }}></div>
    ) : (
      <span className="category-title">{category}</span>
    )} Games
  </h2>
  <div className="movies-grid">
    {loading ? (
      // Show skeleton loading when data is loading
      Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="movie-card">
          <div className="movie-poster skeleton">
            <div className="skeleton-poster"></div>
          </div>
          <div className="playDiv">
            <div className="play skeleton-button"></div>
          </div>
        </div>
      ))
    ) : (
      // Show actual content when data is loaded
      dummyMovies[category].map((movie) => (
        <div 
          key={movie.title}
          className="movie-card"
          onMouseEnter={() => setHoveredMovie(movie.videoId)}
          onMouseLeave={() => setHoveredMovie(null)}
        >
          <div className="movie-poster">
            {hoveredMovie === movie.videoId ? (
              <div className="video-container">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster={movie.image}
                  className="movie-video"
                >
                  <source src={movie.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <img 
                src={movie.image}
                alt={movie.title}
                loading="lazy"
                className="movie-image"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/300x450?text=${movie.title}`;
                }}
              />
            )}
          </div>
          <div className="playDiv">
            <button onClick={() => { navigate(movie.path) }} className="play">
              {movie.title}
            </button>
          </div>
        </div>
      ))
    )}
  </div>
</div>
  );
};

export default CategoryContent;