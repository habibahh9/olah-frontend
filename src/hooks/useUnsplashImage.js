// src/hooks/useUnsplashImage.js
import { useState, useEffect } from "react";
const UNSPLASH_CLIENT_ID = import.meta.env.VITE_UNSPLASH_CLIENT_ID;

// Fallback image kalau API gagal
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400";

export function useUnsplashImage(query) {
  const cacheKey = `unsplash_${query}`;

  const [imageUrl, setImageUrl] = useState(() => {
    // Langsung pakai cache kalau ada — tidak perlu nunggu loading
    return localStorage.getItem(cacheKey) || null;
  });

  useEffect(() => {
    if (!query) return;
    // Sudah ada di cache, skip fetch
    if (localStorage.getItem(cacheKey)) return;

    const controller = new AbortController();

    async function fetchImage() {
      try {
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_CLIENT_ID}&per_page=1&orientation=landscape`,
          { signal: controller.signal }
        );
        const data = await res.json();
        const url = data.results?.[0]?.urls?.regular || FALLBACK_IMAGE;
        localStorage.setItem(cacheKey, url); // simpan ke cache
        setImageUrl(url);
      } catch (err) {
        if (err.name !== "AbortError") {
          setImageUrl(FALLBACK_IMAGE);
        }
      }
    }

    fetchImage();
    return () => controller.abort();
  }, [query]);

  return imageUrl || FALLBACK_IMAGE;
}