import { ImageResponse } from "next/og";
import { getGT } from "gt-next/server";

// Image metadata
export const alt = "Ben Gubler - Web Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Image generation
export default async function Image() {
  const t = await getGT();
  
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
          position: "relative",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 25px 25px, #e2e8f0 2px, transparent 2px)`,
            backgroundSize: "50px 50px",
            opacity: 0.5,
          }}
        />

        {/* Header */}
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#1e293b",
              letterSpacing: "-0.025em",
              textTransform: "lowercase",
              marginBottom: "8px",
            }}
          >
            {t("bengubler.com")}
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#64748b",
              fontWeight: "500",
            }}
          >
            {t("Hello! Ahoj! Привет!")}
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            maxWidth: "900px",
            padding: "0 60px",
            zIndex: 1,
            marginTop: "80px",
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "32px",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              textAlign: "center",
              background: "linear-gradient(135deg, #0f172a 0%, #334155 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t("Ben Gubler")}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "32px",
              color: "#475569",
              lineHeight: 1.4,
              textAlign: "center",
              fontWeight: "400",
              marginBottom: "40px",
            }}
          >
            {t("Web Developer, AI Student & Language Enthusiast")}
          </p>

          {/* Decorative element */}
          <div
            style={{
              width: "120px",
              height: "4px",
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              borderRadius: "2px",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
