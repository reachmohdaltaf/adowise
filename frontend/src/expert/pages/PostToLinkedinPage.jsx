import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const PostToLinkedinPage = () => {
  const [copied, setCopied] = useState(false);

  const postText = `🎉 I'm happy to share that I've officially become an Expert on Adowise.com! 🚀 A platform where guidance meets action. Let's connect and grow together! #Adowise #Expert`;

  const handleCopy = () => {
    navigator.clipboard.writeText(postText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://adowise.com')}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-semibold">Share your achievement on LinkedIn!</h1>
      <p className="max-w-xl text-gray-700">
        Copy the message below, then click “Share on LinkedIn” to post it with your expert badge!
      </p>

      <div className="bg-gray-100 p-4 rounded w-full max-w-xl text-left">
        <pre className="whitespace-pre-wrap">{postText}</pre>
        <Button onClick={handleCopy} className="mt-2 text-sm">
          {copied ? 'Copied ✅' : 'Copy Message'}
        </Button>
      </div>

      <Button
        onClick={handleShare}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
      >
        Share on LinkedIn
      </Button>
    </div>
  );
};

export default PostToLinkedinPage;
