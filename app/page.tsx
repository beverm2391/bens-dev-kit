import AirbnbImageAnimation from "@/core/components/AirbnbImageAnimation";
import { FileTree } from "@/core/components/FileTree";


export default function Home() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <FileTree />
    </div>
  );
}
