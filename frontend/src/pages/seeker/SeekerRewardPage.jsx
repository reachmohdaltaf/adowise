import { ScratchToReveal } from '@/components/magicui/scratch-to-reveal'
import React from 'react'

const SeekerRewardPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">🎉 Claim Your Reward!</h1>
      
      <ScratchToReveal
        width={300}
        height={300}
        minScratchPercentage={70}
        className="flex items-center justify-center overflow-hidden rounded-2xl border-4 border-purple-300 bg-gray-100 shadow-xl"
        gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
      >
        <div className="flex flex-col items-center justify-center">
          <p className="text-6xl mb-4">🎁</p>
          <p className="text-xl font-semibold text-gray-700">You won 100 Coins!</p>
        </div>
      </ScratchToReveal>

      <p className="mt-6 text-gray-600 text-center max-w-md">
        Scratch the card above to reveal your reward. Come back daily for more surprises!
      </p>
    </div>
  )
}

export default SeekerRewardPage
