import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * WebAudio-generated ambient drone (no external audio file).
 * Two detuned sine oscillators + slow LFO on gain = soft breathing pad.
 */
export default function AmbientAudio() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gain: GainNode; oscs: OscillatorNode[]; lfo: OscillatorNode } | null>(
    null,
  );

  useEffect(() => () => stop(), []);

  const start = async () => {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return;
    const ctx: AudioContext = ctxRef.current ?? new AC();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") await ctx.resume();

    const gain = ctx.createGain();
    gain.gain.value = 0;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.Q.value = 0.7;
    filter.connect(gain).connect(ctx.destination);

    const freqs = [110, 138.6, 164.8, 220]; // A2 / C#3 / E3 / A3
    const oscs = freqs.map((f, i) => {
      const o = ctx.createOscillator();
      o.type = i % 2 ? "triangle" : "sine";
      o.frequency.value = f;
      o.detune.value = (i - 1) * 6;
      const g = ctx.createGain();
      g.gain.value = 0.15;
      o.connect(g).connect(filter);
      o.start();
      return o;
    });

    // LFO for gentle breathing
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.12;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.05;
    lfo.connect(lfoGain).connect(gain.gain);
    lfo.start();

    gain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 1.5);
    nodesRef.current = { gain, oscs, lfo };
  };

  const stop = () => {
    const n = nodesRef.current;
    const ctx = ctxRef.current;
    if (!n || !ctx) return;
    n.gain.gain.cancelScheduledValues(ctx.currentTime);
    n.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
    setTimeout(() => {
      try {
        n.oscs.forEach((o) => o.stop());
        n.lfo.stop();
      } catch {}
      nodesRef.current = null;
    }, 700);
  };

  return (
    <button
      onClick={() => {
        if (on) {
          stop();
          setOn(false);
        } else {
          start();
          setOn(true);
        }
      }}
      aria-label={on ? "Mute ambient sound" : "Play ambient sound"}
      title={on ? "Mute ambient" : "Ambient sound"}
      className="fixed bottom-5 left-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/40 text-white/85 backdrop-blur hover:bg-black/60 hover:text-white"
    >
      {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
