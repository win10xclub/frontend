import CustomButton from "@/components/CustomButton";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-[1rem]">
      <p className="text-white">website in progress, in meantime play</p>
      <a href="/auth"><CustomButton label={"Login"} /></a>
      
    </div>
  );
}
