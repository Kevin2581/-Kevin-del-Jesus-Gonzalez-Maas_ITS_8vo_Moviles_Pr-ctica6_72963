import React from 'react';
import '../theme/pokedex.css'; // tu CSS de la pokedex

const Pokedex: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div id="pokedex">
      <div id="left">
        <div id="bg_curve1_left"></div>
        <div id="curve1_left">
          <div id="buttonGlass">
            <div id="reflect"></div>
          </div>
          <div id="miniButtonGlass1"></div>
          <div id="miniButtonGlass2"></div>
          <div id="miniButtonGlass3"></div>
        </div>

        <div id="bg_curve2_left"></div>
        <div id="curve2_left">
          <div id="junction">
            <div id="junction1"></div>
            <div id="junction2"></div>
          </div>

          {/* Pantalla */}
          <div id="screen">
            <div className="font-pokemon text-xs text-green-900 overflow-auto h-full">
              {children}
            </div>
          </div>

          {/* Botones */}
          <div id="bigbluebutton"></div>
          <div id="barbutton1"></div>
          <div id="barbutton2"></div>
          <div id="cross">
            <div id="topcross"><div id="upT"></div></div>
            <div id="leftcross"><div id="leftT"></div></div>
            <div id="midcross"><div id="midCircle"></div></div>
            <div id="rightcross"><div id="rightT"></div></div>
            <div id="botcross"><div id="downT"></div></div>
          </div>
        </div>
      </div>

      <div id="right">
        <div id="bg_curve1_right"></div>
        <div id="curve2_right"></div>
        <div id="bg_curve2_right"></div>
        <div id="stats"></div>
        <div id="blueButtons1">
          <div className="blueButton"></div>
          <div className="blueButton"></div>
        </div>
        <div id="blueButtons2">
          <div className="blueButton"></div>
          <div className="blueButton"></div>
        </div>
        <div id="barbutton3"></div>
        <div id="barbutton4"></div>
        <div id="miniButtonGlass4"></div>
        <div id="miniButtonGlass5"></div>
        <div id="yellowBox1"></div>
        <div id="yellowBox2"></div>
      </div>
    </div>
  );
};

export default Pokedex;
