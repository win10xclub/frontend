import CustomButton from "@/components/CustomButton";
import Cards from "@/components/landingComponents/cards";
import HowToPlay from "@/components/landingComponents/howToPlay";

export default function Home() {
  return (
    <div className="relative w-screen h-screen flex flex-col justify-start p-[1rem] items-center gap-[1rem] text-white overflow-x-hidden">
      {/* <Cards
        rotation="55deg"
        top="10rem"
        left="-2.5rem"
        card1="0_6"
        card2="3_2"
      />
      <Cards
        rotation="-45deg"
        top="10rem"
        right="-2.5rem"
        card1="1_11"
        card3="0_3"
        card2="1_4"
      /> */}
      <div className="max-w-[50rem] flex flex-col justify-center items-center gap-[1rem]">
        <nav className="w-[100%] flex justify-between items-center">
          <p className="text-zinc-100 font-semibold">
            win<span className="italic text-blue-500">10x</span>.club
          </p>
          <a href="/auth">
            <CustomButton label={"Login"} />
          </a>
        </nav>

        <div className="relative overflow-hidden mt-[7rem] mobile:mt-[5rem]">
          <div className="relative z-50 bg-[#031117] border-[2px] px-[1rem] py-[0.45rem] rounded-full border-blue-800 text-[0.75rem] font-normal mt-[5rem] ">
            <h3 className="bg-gradient-to-r from-zinc-100 via-zinc-50 to-blue-500 inline-block text-transparent bg-clip-text">
              new game Leastscore launched
            </h3>
          </div>
          <Cards rotation="0deg" card1="1_12" card3="1_11" card2="1_1" />
        </div>
        <h1 className="text-[2.5rem] mobile:text-[4rem] font-semibold text-center mt-[3rem] mobile:mt-[1rem] leading-[2.5rem] mobile:leading-[4.5rem] bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-500 inline-block text-transparent bg-clip-text">
          Play and win together with friends
        </h1>
        <p className="text-center text-[0.75rem] mobile:text-[1rem]">
          Connect and Compete: Card Games with Friends
        </p>
        <div className="flex gap-[1rem] mt-[2rem] mobile:mt-[4rem]">
          <a href="#howtoplay">
            <CustomButton label={"How to play ?"} style="secondary" />
          </a>
          <a href="/auth">
            <CustomButton label={"Start Playing Now"} />
          </a>
        </div>

        <HowToPlay />
      </div>
    </div>
  );
}
