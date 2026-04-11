"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error Boundry Caught:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#030712] flex flex-col items-center justify-center text-foreground p-4">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-red-500/10 blur-[150px]" />
      </div>
      <div className="z-10 text-center max-w-md space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-500">
          Something went wrong!
        </h2>
        <p className="text-muted-foreground">
          An unexpected error occurred. Don't worry, it's not you, it's me.
        </p>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-6 rounded-xl"
        >
          Try again
        </Button>
      </div>
    </main>
  );
}
