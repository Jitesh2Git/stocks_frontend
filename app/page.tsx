import React from "react";
import Hero from "./components/Hero";
import LogoTicker from "./components/LogoTicker";
import Steps from "./components/Steps";
import CallToAction from "./components/CallToAction";
import News from "./components/News";

const Home = () => {
  return (
    <div>
      <Hero />
      <LogoTicker />
      <Steps />
      <News />
      <CallToAction />
    </div>
  );
};

export default Home;
