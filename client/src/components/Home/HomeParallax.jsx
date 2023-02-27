import React from "react";
import { Parallax, Background } from "react-parallax";
import { ParalaxBg } from "../../assets";

const HomeParallax = ({ isMobile }) => {
  const insideStyles = {
    color: "white",
    padding: 20,
    position: "absolute",
    fontSize: `${isMobile ? "40px" : "70px"}`,
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    lineHeight: "1.2",
  };
  return (
    <div className="fourth-div">
      <Parallax
        bgImage={ParalaxBg}
        strength={isMobile ? 500 : 300}
        renderLayer={(percentage) => (
          <div>
            <div
              style={{
                position: "absolute",
                background: `rgba(255, 125, 0, ${percentage * 1})`,
                left: "50%",
                top: "50%",
                borderRadius: "50%",
                transform: "translate(-50%,-50%)",
                width: percentage * 500,
                height: percentage * 500,
              }}
            />
          </div>
        )}
      >
        <div style={{ height: isMobile ? 300 : 600 }}>
          <h3 style={insideStyles}>
            PREMIUM PIZZA EXCLUSIVE UNTIL 01.03. TRY IT NOW!
          </h3>
        </div>
      </Parallax>
    </div>
  );
};

export default HomeParallax;
