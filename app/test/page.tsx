'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">DevOpsHub Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-lg glass border border-purple-500/30"
        >
          <h2 className="text-xl font-semibold mb-4">Test Card 1</h2>
          <p>This is a test card to verify basic functionality.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-lg glass border border-purple-500/30"
        >
          <h2 className="text-xl font-semibold mb-4">Test Card 2</h2>
          <p>This card tests the glassmorphism effect.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-lg glass border border-purple-500/30"
        >
          <h2 className="text-xl font-semibold mb-4">Test Card 3</h2>
          <p>This card tests the animations.</p>
        </motion.div>
      </div>
    </div>
  )
}
