import Board from '@/components/game_board'
import React, { Suspense } from 'react'

function board_page() {
  return (
    <Suspense>
        <Board />
    </Suspense>
  )
}

export default board_page