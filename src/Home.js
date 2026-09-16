// import React from "react";
import React, { useEffect, useState } from "react";
// data
import { faqData, communityData, roadmapData, teamData } from "./data/data";

// Components
import Accordion from "./components/accordion/Accordion";
import AccordionHeader from "./components/accordion/AccordionHeader";
import PublicComponent from "./components/PublicComponent";

function Home() {
  return (
    <>
      <section id="hero">
        <div className="hero-container">
          <h1 data-aos="fade-up" data-aos-duration="1000" className="heading">
            A Mafia <span>inspired</span> NFT <br />{" "}
            <span> project. Ape Mafia Club</span>
          </h1>
          <p
            data-aos="fade-up"
            data-aos-duration="1000"
            className="sub-heading"
          >
            it is not just a community; it is a well rooted, faithful, and tight
            knit Family. Ape Mafia Club is a unique collection of 4,999 Club
            members. All Apes are hand-drawn, and uniquely 1/1.
          </p>
          <PublicComponent />
        </div>
      </section>

      <section id="roadmap">
        <div className="roadmap-container">
          <h1 className="heading">
            Roadmap
            <svg
              className="svg-outline"
              viewBox="0 0 518 102"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2V63.0189L60.1887 100H516V40.8302L454.579 2H2Z"
                stroke="white"
                stroke-width="4"
              />
            </svg>
          </h1>
          <div className="roadmap-items">
            {roadmapData.map((item, i) => (
              <div
                key={i}
                data-aos={`fade-${i % 2 === 0 ? "left" : "right"}`}
                className="roadmap-item"
              >
                <div className="item-info">
                  <h1 className="item-header">{item.title}</h1>
                  <p className="item-des">{item.description}</p>
                  <svg
                    className="svg-outline"
                    viewBox="0 0 424 152"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1V94.3962L48.7736 151H423V60.434L372.572 1H1Z"
                      stroke="white"
                    />
                  </svg>
                </div>
                <div className="gun-count">
                  <div className="gun reverse">
                    <img src="/assets/gun.png" alt="gun" />
                  </div>
                  <div className="count">{item.id}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="community">
        <div className="community-container">
          <h1 className="heading">
            Ape Community <span>Description</span>
            <svg
              className="svg-outline"
              width="884"
              height="96"
              viewBox="0 0 884 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M790.984 2H5C3.34315 2 2 3.34315 2 5V91C2 92.6569 3.34314 94 5 94H879C880.657 94 882 92.6569 882 91V38.2781C882 37.0306 881.228 35.9132 880.061 35.472L792.045 2.19388C791.706 2.06569 791.347 2 790.984 2Z"
                stroke="white"
                stroke-width="3"
              />
            </svg>
          </h1>

          <div className="community-content">
            <div className="col-1">
              {communityData.map((item, i) => (
                <div key={i} data-aos="fade-right" className="check-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="check-icon"
                    fill="none"
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <div
              className="col-2"
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="2000"
            >
              <img src="https://musicpromotiontoday.com/amc/mockup-1.gif" />
            </div>
          </div>
        </div>
      </section>

      <section id="team">
        <div className="team-container">
          <div className="team-header">
            <h1 className="heading">
              TEAM
              <svg
                className="svg-outline"
                width="240"
                height="86"
                viewBox="0 0 240 86"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2V53.0566L28.717 84H238V34.4906L209.799 2H2Z"
                  stroke="white"
                  stroke-width="4"
                />
              </svg>
            </h1>
          </div>

          <div className="team-members">
            {teamData.map((item, i) => (
              <div
                key={i}
                data-aos={`fade-${i % 2 === 0 ? "left" : "right"}`}
                className="member-card"
              >
                <img src={item.image} alt="team member" />
                <div className="member-info">
                  <h2>{item.name}</h2>
                  <p>{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="faq-container">
          <h1 className="heading">
            Frequently Asked <span>Questions</span>
            <svg
              className="svg-outline"
              viewBox="0 0 982 122"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M916.5 2.50014C619.333 1.83348 23.4 0.900142 17 2.50014H1.5V51L49 120H980.5V51L916.5 2.50014Z"
                stroke="white"
                stroke-width="3"
              />
            </svg>
          </h1>

          <div className="faq-items">
            {faqData.map((item, i) => (
              <Accordion key={i}>
                <AccordionHeader>{item.title}</AccordionHeader>
                <p className="faq-des">{item.description}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      <section id="discord">
        <div className="discord-container">
          <div className="discord-info">
            <h1 className="heading">
              Join Our Ape Mafia Club (AMC) <br /> , on Discord
            </h1>
            <button
              className="discord-btn"
              onClick={() => {
                window.open("https://discord.gg/B6UmHqZB3B", "_blank").focus();
              }}
            >
              <div className="hover-btn">
                JOIN DISCORD
                <svg
                  className="btn-svg-fill"
                  width="249"
                  height="61"
                  viewBox="0 0 248 61"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M220.707 0.94873H3.23047C1.57361 0.94873 0.230469 2.29188 0.230469 3.94873V57.9487C0.230469 59.6056 1.57362 60.9487 3.23047 60.9487H244.23C245.887 60.9487 247.23 59.6056 247.23 57.9487V24.6141C247.23 23.7511 246.859 22.9299 246.21 22.3603L222.687 1.69493C222.14 1.21397 221.436 0.94873 220.707 0.94873Z"
                    fill="#1E1E1E"
                  />
                </svg>
              </div>
              <svg
                className="btn-svg-outline"
                width="248"
                height="60"
                viewBox="0 0 249 62"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M221.707 0.94873H4.23047C2.57361 0.94873 1.23047 2.29188 1.23047 3.94873V57.9487C1.23047 59.6056 2.57362 60.9487 4.23047 60.9487H245.23C246.887 60.9487 248.23 59.6056 248.23 57.9487V24.6141C248.23 23.7511 247.859 22.9299 247.21 22.3603L223.687 1.69493C223.14 1.21397 222.436 0.94873 221.707 0.94873Z"
                  stroke="white"
                />
              </svg>
            </button>
          </div>
          <svg
            className="svg-fill"
            width="100%"
            height="300"
            viewBox="0 0 1303 306"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1167.28 0.94873H3.23047C1.57361 0.94873 0.230469 2.29188 0.230469 3.94873V302.949C0.230469 304.606 1.5736 305.949 3.23045 305.949H1299.23C1300.89 305.949 1302.23 304.606 1302.23 302.949V115.736C1302.23 114.855 1301.84 114.017 1301.17 113.447L1169.22 1.65975C1168.68 1.20068 1167.99 0.94873 1167.28 0.94873Z"
              fill="#B33A39"
            />
          </svg>
          {/* <div className="discord-bg-image">
								<img src={footerBg} alt="footer backgroud" />
							</div> */}
        </div>
      </section>
    </>
  );
}

export default Home;
