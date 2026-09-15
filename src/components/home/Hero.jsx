import BeachScene from "../illustrations/BeachScene";
import HibiscusFlower from "../illustrations/HibiscusFlower";
import Lily from "../illustrations/Lily";
import "./Hero.css";

export default function Hero({ firstName, lastName, role, bio }) {
  return (
    <header className="hero">
      <BeachScene />

      <Lily
        uid="heroB"
        className="bloom"
        style={{ bottom: 96, left: 36, width: 168, height: 168 }}
      />
      <HibiscusFlower
        uid="heroA"
        className="bloom"
        style={{ bottom: 52, left: 12, width: 104, height: 104 }}
      />
      <HibiscusFlower
        uid="heroC"
        className="bloom"
        style={{ bottom: 68, left: 168, width: 74, height: 74, opacity: 0.96 }}
      />
      <div className="scrim" />

      <div className="hero-inner">
        <h1>
          {firstName}
          <br />
          {lastName}
        </h1>
        <p className="role">{role}</p>
        <p className="sub">{bio}</p>
      </div>
    </header>
  );
}
