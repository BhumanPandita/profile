import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#030712] flex flex-col items-center justify-center text-foreground p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-primary/10 blur-[150px]" />
      </div>
      <div className="z-10 text-center max-w-lg space-y-6">
        <h1 className="text-8xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-br from-primary via-secondary to-purple-500 opacity-80">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Page Not Found
        </h2>
        <p className="text-muted-foreground text-lg">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button className="mt-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-bold py-6 px-8 rounded-xl shadow-lg shadow-primary/25 transition-all duration-300 transform hover:scale-[1.02]">
            Return Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
