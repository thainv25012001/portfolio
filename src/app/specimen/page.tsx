import { Handjet, VT323 } from "next/font/google";

const pixel = Handjet({
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
});
const vt = VT323({
  weight: "400",
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
});

const SAMPLES = [
  "NGUYEN VIET THAI",
  "Kỹ sư đầu tiên của dự án",
  "01 ABOUT / 02 STACK / 03 WORK",
  "RESUME · CONTACT",
];

export default function Specimen() {
  return (
    <main style={{ background: "#0A0A0A", color: "#EDEDED", padding: 40 }}>
      {[300, 500, 700, 900].map((w) => (
        <section key={w} style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: "monospace", fontSize: 12, color: "#888" }}>
            Handjet {w}
          </p>
          {SAMPLES.map((s) => (
            <p
              key={s}
              className={pixel.className}
              style={{ fontWeight: w, fontSize: 64, margin: "8px 0" }}
            >
              {s}
            </p>
          ))}
        </section>
      ))}
      <section>
        <p style={{ fontFamily: "monospace", fontSize: 12, color: "#888" }}>
          VT323 (single weight, for comparison)
        </p>
        {SAMPLES.map((s) => (
          <p key={s} className={vt.className} style={{ fontSize: 64, margin: "8px 0" }}>
            {s}
          </p>
        ))}
      </section>
    </main>
  );
}
