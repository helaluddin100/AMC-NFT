import { Link } from "react-scroll";

const NavLink = ({ title, to }) => {
  return (
    <li className="nav-item">
      <Link
        to={to}
        smooth={true}
        offset={-64}
        duration={500}
        exact="true"
        className="nav-link"
        activeClass="active"
      >
        {title}
        <svg
          width="100%"
          height="55"
          viewBox="0 0 93 55"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_1_351)">
            <path
              d="M9 9V32.0377L17.4906 46H84V23.6604L75.0377 9H9Z"
              fill="#181818"
            />
            <path
              d="M9 9V32.0377L17.4906 46H84V23.6604L75.0377 9H9Z"
              stroke="#B33A39"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_1_351"
              x="0.5"
              y="0.5"
              width="100%"
              height="55"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="4" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.701961 0 0 0 0 0.227451 0 0 0 0 0.223529 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1_351"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_1_351"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </Link>
    </li>
  );
};

export default NavLink;
