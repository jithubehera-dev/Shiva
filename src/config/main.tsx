import {
  Component,
  StrictMode,
  useEffect,
  useRef,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "./index.css";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(
    error: Error,
  ): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(
    error: Error,
    errorInfo: ErrorInfo,
  ) {
    console.error(
      "Birthday App Error:",
      error,
      errorInfo,
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          style={{
            minHeight: "100vh",
            background: "#090708",
            color: "#f5eee8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div
            style={{
              maxWidth: "600px",
              width: "100%",
              padding: "28px",
              borderRadius: "16px",
              background: "#120d10",
              border:
                "1px solid rgba(255,255,255,.15)",
            }}
          >
            <div
              style={{
                color: "#e889aa",
                fontSize: "11px",
                letterSpacing: "3px",
                marginBottom: "14px",
              }}
            >
              BIRTHDAY EXPERIENCE
            </div>

            <h1
              style={{
                margin: "0 0 14px",
                fontSize: "28px",
              }}
            >
              The experience crashed
            </h1>

            <p
              style={{
                color: "#aaa",
                lineHeight: 1.6,
              }}
            >
              Something went wrong while loading the
              experience. Here's the error, for
              debugging:
            </p>

            <pre
              style={{
                background: "#050505",
                color: "#ff9bb8",
                padding: "16px",
                borderRadius: "10px",
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                fontSize: "13px",
              }}
            >
              {this.state.error?.message}
            </pre>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

function Root() {
  const [unlocked, setUnlocked] = useState(false);
  const [muted, setMuted] = useState(false);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Brief loading moment on first open, so the page doesn't
  // flash straight in — purely a polish touch, not tied to
  // any real asset loading.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  const handleUnlock = () => {
    setUnlocked(true);

    // Starting playback inside this click handler satisfies
    // mobile browsers' autoplay-requires-a-gesture rule.
    const audio = audioRef.current;

    if (audio) {
      audio.volume = 0.55;
      audio.play().catch(() => {
        // If a browser still blocks it, the mute/unmute
        // button lets her start it manually.
      });
    }
  };

  const toggleMuted = () => {
    setMuted((prev) => {
      const next = !prev;
      const audio = audioRef.current;

      if (audio) {
        if (next) {
          audio.pause();
        } else {
          audio.play().catch(() => {});
        }
      }

      return next;
    });
  };

  // Pause the music when she switches apps, locks the phone, or
  // backgrounds the browser tab — and resume it automatically
  // when she comes back, as long as she hasn't muted it herself.
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;

      if (!audio || !unlocked || muted) {
        return;
      }

      if (document.hidden) {
        audio.pause();
      } else {
        audio.play().catch(() => {});
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () =>
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
  }, [unlocked, muted]);

  return (
    <ErrorBoundary>
      <audio
        ref={audioRef}
        src="/music/birthday.mp3"
        loop
        preload="auto"
      />

      {loading && (
        <div className="loading-screen">
          <span className="loading-dot" />
          <p>Preparing something special…</p>
        </div>
      )}

      <App
        muted={muted}
        onToggleMuted={toggleMuted}
        onUnlock={handleUnlock}
      />
    </ErrorBoundary>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
