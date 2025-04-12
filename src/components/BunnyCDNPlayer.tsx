// src/components/BunnyCDNPlayer.tsx
import React, { useState, useEffect, useRef } from 'react';

interface BunnyCDNPlayerProps {
  videoUrl: string;
}

const BunnyCDNPlayer: React.FC<BunnyCDNPlayerProps> = ({ videoUrl }) => {
  const [errorState, setErrorState] = useState<{
    hasError: boolean;
    message: string;
  }>({ hasError: false, message: '' });
  
  const [retryCount, setRetryCount] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const maxRetries = 3;

  useEffect(() => {
    const handleIframeError = () => {
      console.error(`Video player error: Failed to load DRM key for video at ${videoUrl}`);
      
      if (retryCount < maxRetries) {
        console.log(`Retrying DRM key fetch (${retryCount + 1}/${maxRetries})...`);
        setRetryCount(prev => prev + 1);
        
        // Reload the iframe after a short delay
        setTimeout(() => {
          if (iframeRef.current) {
            iframeRef.current.src = videoUrl;
          }
        }, 2000);
      } else {
        // After max retries, show error message
        setErrorState({
          hasError: true,
          message: 'Unable to load protected video content. Please try again later or contact support.'
        });
        
        // Log detailed error for debugging
        console.error({
          error: 'DRM key fetch failed after maximum retries',
          videoUrl,
          timestamp: new Date().toISOString(),
          videoId: videoUrl.split('/').pop()?.split('?')[0] || 'unknown'
        });
      }
    };

    // Listen for errors in the iframe
    window.addEventListener('error', (e) => {
      if (e.target instanceof HTMLElement && 
          e.target.tagName === 'IFRAME' && 
          (e.target as HTMLIFrameElement).src === videoUrl &&
          e.message?.includes('.drmkey')) {
        handleIframeError();
      }
    }, true);

    return () => {
      window.removeEventListener('error', handleIframeError);
    };
  }, [videoUrl, retryCount]);

  if (errorState.hasError) {
    return (
      <div className="rounded-xl w-full min-h-[260px] md:min-h-[400px] lg:min-h-[500px] flex items-center justify-center bg-gray-900 text-center p-8">
        <div>
          <div className="text-red-500 text-2xl mb-4">❌ Video Playback Error</div>
          <p className="text-white mb-6">{errorState.message}</p>
          <button 
            onClick={() => {
              setErrorState({ hasError: false, message: '' });
              setRetryCount(0);
              if (iframeRef.current) {
                iframeRef.current.src = videoUrl;
              }
            }}
            className="py-2 px-6 bg-[#532e62] hover:opacity-75 ease-in-out duration-150 focus:ring ring-gray-300/80 rounded font-semibold text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      className="rounded-xl w-full min-h-[260px] md:min-h-[400px] lg:min-h-[500px]"
      src={videoUrl}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
};

export default BunnyCDNPlayer;