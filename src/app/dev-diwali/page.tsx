import type { Metadata } from "next";
import DevDiwaliExperience from "./dev-diwali.jsx";
import "./dev-diwali.css";
import "./minimal.css";

export const metadata: Metadata = {
  title: "Dev Deepawali | Divine Banaras",
  description:
    "Experience Dev Deepawali in Varanasi, when the sacred ghats of the Ganga glow with countless diyas.",
};

export default function DevDiwaliPage() {
  return <DevDiwaliExperience />;
}
