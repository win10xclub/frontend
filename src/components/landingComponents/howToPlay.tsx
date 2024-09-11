import React from "react";

const HowToPlay = () => {
  return (
    <div className="flex flex-col mt-[5rem]" id="howtoplay">
      <h1 className="text-[2rem] font-semibold text-zinc-400 text-center mb-[2rem]">How to play</h1>

      <div>
        {/* Tab */}
        <div className="bg-[#06212d] px-[2rem] p-[1rem] rounded-[12px]">
          <h3 className="text-[1rem] text-zinc-300 mt-[1rem] font-bold">
            1. Deal and Swap
          </h3>
          <p className="text-[0.9rem] text-zinc-400 mt-[0.5rem]">
            Each player is dealt five cards. Players take turns swapping cards
            from their hand with either recently discarded cards or by drawing
            from the deck.
          </p>
          <h3 className="text-[1rem] text-zinc-300 mt-[1rem] font-bold">
            2. Declare and Compare
          </h3>
          <p className="text-[0.9rem] text-zinc-400 mt-[0.5rem]">
            A player can declare when they believe they have the lowest possible
            sum of cards. All players reveal their hands, and the player with
            the lowest sum wins the round.
          </p>
          <h3 className="text-[1rem] text-zinc-300 mt-[1rem] font-bold">
            3. Win the game
          </h3>
          <p className="text-[0.9rem] text-zinc-400 mt-[0.5rem]">
            The game continues until a player reaches a predetermined number of
            points. The player with the fewest total points at the end of the
            game is the overall winner.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
