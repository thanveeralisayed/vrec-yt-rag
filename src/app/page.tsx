"use client";

import { useState } from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "@/lib/auth-client";

export default function Home() {
  const { data: session, isPending } = useSession();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGitHubSignIn = async () => {
    try {
      setIsSigningIn(true);
      setError(null);
      await signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to connect to GitHub. Please try again.");
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.reload();
          },
        },
      });
    } catch (err: unknown) {
      console.error(err);
      setIsSigningOut(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-zinc-100 flex flex-col justify-between overflow-hidden selection:bg-white/20 selection:text-white antialiased">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-[-100px] left-1/2 -translate-x-1/2 h-[450px] w-[700px] rounded-full bg-gradient-to-b from-red-600/15 via-rose-500/5 to-transparent blur-[120px]"
        aria-hidden="true"
      />

      {/* Top Header - Just App Name */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 sm:py-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center shadow-inner">
            <svg
              className="w-4 h-4 text-red-500 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
            </svg>
          </div>
          <span className="font-semibold text-base sm:text-lg tracking-tight text-white">
            yt-rag
          </span>
        </div>
      </header>

      {/* Main Content Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:py-16">
        <div className="w-full max-w-[400px]">
          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs sm:text-sm text-center backdrop-blur-md">
              {error}
            </div>
          )}

          {isPending ? (
            /* Skeleton / Loading State */
            <div className="relative rounded-3xl border border-white/[0.08] bg-zinc-900/30 p-10 backdrop-blur-2xl shadow-2xl shadow-black/80 flex flex-col items-center justify-center gap-4">
              <div className="h-7 w-7 rounded-full border-2 border-zinc-700 border-t-white animate-spin" />
              <div className="h-3 w-16 bg-zinc-800/80 rounded-full animate-pulse" />
            </div>
          ) : session?.user ? (
            /* Logged in state: profile image, name, email & sign out */
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-900/40 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl shadow-black/80 flex flex-col items-center text-center before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
              {/* Profile Image with subtle glowing ring */}
              <div className="relative mb-4 group">
                <div className="relative h-20 w-20 rounded-full overflow-hidden bg-zinc-800/80 p-0.5 ring-1 ring-white/15 shadow-xl">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name ?? "Profile"}
                      fill
                      sizes="80px"
                      className="rounded-full object-cover"
                      priority
                    />
                  ) : (
                    <div className="h-full w-full rounded-full bg-zinc-800 flex items-center justify-center text-xl font-medium text-white">
                      {session.user.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                  )}
                </div>
                <span
                  className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-black flex items-center justify-center"
                  title="Active"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              </div>

              {/* Name & Email */}
              <h1 className="text-xl font-semibold tracking-tight text-white mt-1">
                {session.user.name}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-1 truncate max-w-full">
                {session.user.email}
              </p>

              {/* Subtle divider */}
              <div className="w-full h-px bg-white/[0.06] my-6" />

              {/* Sign Out Button */}
              <button
                id="sign-out-btn"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="w-full h-11 rounded-xl text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 border border-white/[0.08] hover:border-white/15 transition-all duration-150 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-sm"
              >
                {isSigningOut ? (
                  <>
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-zinc-400 border-t-white animate-spin" />
                    <span>Signing out...</span>
                  </>
                ) : (
                  <span>Sign out</span>
                )}
              </button>
            </div>
          ) : (
            /* Logged out state: Modern minimalist login */
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-900/40 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl shadow-black/80 flex flex-col items-center text-center before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
              {/* App Icon Glyph */}
              <div className="h-12 w-12 rounded-2xl bg-zinc-900/90 border border-white/10 flex items-center justify-center shadow-inner mb-6">
                <svg
                  className="w-6 h-6 text-red-500 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
                </svg>
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Sign in to yt-rag
              </h1>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                Continue with your GitHub account
              </p>

              <div className="w-full mt-8">
                <button
                  id="github-signin-btn"
                  onClick={handleGitHubSignIn}
                  disabled={isSigningIn}
                  className="group relative w-full h-12 rounded-xl bg-white text-zinc-950 font-medium text-sm flex items-center justify-center gap-3 transition-all duration-200 hover:bg-zinc-100 active:scale-[0.99] shadow-lg shadow-white/5 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  {isSigningIn ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-zinc-400 border-t-zinc-950 animate-spin" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 fill-current transition-transform duration-200 group-hover:scale-105"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span>Continue with GitHub</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Subtle bottom spacing */}
      <footer className="relative z-10 w-full py-6" />
    </div>
  );
}
