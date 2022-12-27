import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadConfettiPreset } from "tsparticles-preset-confetti";

export const Fireworks = () => {
  // this customizes the component tsParticles installation
  const customInit = async (engine: Engine): Promise<void> => {
    // this adds the preset to tsParticles, you can safely use the
    await loadConfettiPreset(engine);
  };

  const options = {
    preset: "confetti",
  };

  return <Particles options={options} init={customInit} width="100%" />;
};
