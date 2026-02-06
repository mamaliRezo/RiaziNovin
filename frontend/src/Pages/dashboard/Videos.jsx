import { useState, useEffect } from "react";
import api from "../../services/api";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch videos from protected API
    const fetchVideos = async () => {
      try {
        const response = await api.get("/videos/");
        setVideos(response.data);
      } catch (err) {
        setError("Failed to load videos. Please check your authentication.");
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading videos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Protected Videos Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video, index) => (
          <div key={index} className="border rounded-lg p-4 shadow">
            <h2 className="font-semibold">
              {video.title || `Video ${index + 1}`}
            </h2>
            <p className="text-gray-600">
              {video.description || "No description"}
            </p>
            {/* Add video player or link here */}
          </div>
        ))}
      </div>
      {videos.length === 0 && (
        <div className="text-center text-gray-500">No videos available.</div>
      )}
    </div>
  );
}
