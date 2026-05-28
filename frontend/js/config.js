/**
 * API configuration — update API_BASE_URL after deploying backend to Render.
 * For local dev: run backend on port 5000 and use http://localhost:5000
 */
const CONFIG = {
  API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000'
    : 'https://backend-ruby-ten-45.vercel.app',

  VIDEOS: [
    'assets/videos/wall1.mp4',
    'assets/videos/wall2.mp4',
    'assets/videos/wall3.mp4',
    'assets/videos/wall4.mp4',
    'assets/videos/wall5.mp4',
    'assets/videos/wall6.mp4',
    'assets/videos/wall7.mp4',
  ],
};
