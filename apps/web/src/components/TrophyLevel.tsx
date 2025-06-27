interface TrophyLevelProps {
  achieved: boolean
  className?: string
}

export const TrophyLevel1: React.FC<TrophyLevelProps> = ({ achieved, ...rest }) =>
  achieved ? (
    <svg width="216" height="221" viewBox="0 0 216 221" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <mask
        id="mask0_503_13458"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="24"
        y="24"
        width="168"
        height="169"
      >
        <circle cx="108" cy="108" r="84" fill="white" />
      </mask>
      <g mask="url(#mask0_503_13458)">
        <circle cx="108" cy="108" r="84" fill="url(#paint0_linear_503_13458)" />
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.04">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33.0002 32.9989C26.3728 32.9989 21.0002 38.3715 21.0002 44.9989C21.0002 51.6263 26.3728 56.9989 33.0002 56.9989H54.0002C60.6276 56.9989 66.0002 51.6263 66.0002 44.9989C66.0002 38.3715 60.6276 32.9989 54.0002 32.9989H33.0002ZM141 81.0007C134.373 81.0007 129 86.3733 129 93.0007C129 99.6282 134.373 105.001 141 105.001H213C219.628 105.001 225 99.6282 225 93.0007C225 86.3733 219.628 81.0007 213 81.0007H141ZM108 165C108 158.372 113.373 153 120 153H192C198.628 153 204 158.372 204 165C204 171.627 198.628 177 192 177H120C113.373 177 108 171.627 108 165ZM30.0001 129C23.3727 129 18.0001 134.373 18.0001 141C18.0001 147.627 23.3727 153 30.0001 153H78.0001C84.6275 153 90.0001 147.627 90.0001 141C90.0001 134.373 84.6275 129 78.0001 129H30.0001ZM12.0001 101.999C12.0001 98.6856 14.6864 95.9993 18.0001 95.9993H45.0001C48.3138 95.9993 51.0001 98.6856 51.0001 101.999C51.0001 105.313 48.3138 107.999 45.0001 107.999H18.0001C14.6864 107.999 12.0001 105.313 12.0001 101.999ZM18.0001 68.9996C14.6864 68.9996 12.0001 71.6859 12.0001 74.9996C12.0001 78.3133 14.6864 80.9996 18.0001 80.9996H102C105.314 80.9996 108 78.3133 108 74.9996C108 71.6859 105.314 68.9996 102 68.9996H18.0001ZM90 38.9989C90 35.6852 92.6863 32.9989 96 32.9989H180C183.314 32.9989 186 35.6852 186 38.9989C186 42.3126 183.314 44.9989 180 44.9989H96C92.6863 44.9989 90 42.3126 90 38.9989ZM6.00009 171C2.68638 171 9.15527e-05 173.686 9.15527e-05 177C9.15527e-05 180.314 2.68638 183 6.00009 183H90.0001C93.3138 183 96.0001 180.314 96.0001 177C96.0001 173.686 93.3138 171 90.0001 171H6.00009ZM129 63.0011C129 59.6874 131.686 57.0011 135 57.0011H219C222.314 57.0011 225 59.6874 225 63.0011C225 66.3148 222.314 69.0011 219 69.0011H135C131.686 69.0011 129 66.3148 129 63.0011ZM118.6 116.999C113.74 116.999 109.8 120.939 109.8 125.799C109.8 130.659 113.74 134.599 118.6 134.599H191.4C196.261 134.599 200.2 130.659 200.2 125.799C200.2 120.939 196.26 116.999 191.4 116.999H118.6Z"
            fill="black"
          />
        </g>
      </g>
      <g opacity="0.1">
        <circle cx="108" cy="108" r="66" fill="#50C22B" style={{ mixBlendMode: "multiply" }} />
      </g>
      <g filter="url(#filter0_d_503_13458)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M84 108H132V205.009C132 207.272 129.591 208.72 127.593 207.659L108 197.25L88.4075 207.659C86.4093 208.72 84 207.272 84 205.009V108Z"
          fill="#265388"
        />
      </g>
      <circle style={{ mixBlendMode: "multiply" }} opacity="0.2" cx="108" cy="114" r="60" fill="#62CF3F" />
      <circle cx="108" cy="108" r="60" fill="url(#paint1_linear_503_13458)" />
      <mask
        id="mask1_503_13458"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="48"
        y="48"
        width="120"
        height="120"
      >
        <circle cx="108" cy="108" r="60" fill="white" />
      </mask>
      <g mask="url(#mask1_503_13458)">
        <path
          d="M49.5001 108C49.5001 140.309 75.6914 166.5 108 166.5C140.309 166.5 166.5 140.309 166.5 108"
          stroke="#64788F"
          strokeWidth="3"
        />
        <g style={{ mixBlendMode: "multiply" }} opacity="0.12">
          <path d="M147 119.258L182.258 84" stroke="#78A2A9" strokeWidth="6" strokeLinecap="round" />
        </g>
        <g style={{ mixBlendMode: "multiply" }} opacity="0.12">
          <path d="M132 86.258L167.258 51" stroke="#78A2A9" strokeWidth="6" strokeLinecap="round" />
        </g>
        <g style={{ mixBlendMode: "multiply" }} opacity="0.12">
          <path d="M21.0001 143.258L56.258 108" stroke="#78A2A9" strokeWidth="6" strokeLinecap="round" />
        </g>
        <g style={{ mixBlendMode: "multiply" }} opacity="0.12">
          <path d="M153 77.258L188.258 42" stroke="#78A2A9" strokeWidth="6" strokeLinecap="round" />
        </g>
        <g style={{ mixBlendMode: "multiply" }} opacity="0.12">
          <path d="M42.0001 134.258L77.258 99" stroke="#78A2A9" strokeWidth="6" strokeLinecap="round" />
        </g>
        <g style={{ mixBlendMode: "multiply" }} opacity="0.12">
          <path d="M93.0001 170.258L128.258 135" stroke="#78A2A9" strokeWidth="6" strokeLinecap="round" />
        </g>
        <g style={{ mixBlendMode: "multiply" }} opacity="0.12">
          <path d="M141 149.258L176.258 114" stroke="#78A2A9" strokeWidth="6" strokeLinecap="round" />
        </g>
        <path
          d="M149.366 149.366C159.952 138.779 166.5 124.154 166.5 108C166.5 75.6913 140.309 49.5 108 49.5C75.6914 49.5 49.5001 75.6913 49.5001 108C49.5001 124.154 56.0479 138.779 66.6343 149.366"
          stroke="#8B99AF"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          opacity="0.4"
          d="M166.5 108C166.5 75.6913 140.309 49.5 108 49.5C75.6914 49.5 49.5001 75.6913 49.5001 108"
          stroke="#CCD8EA"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          opacity="0.2"
          d="M108 49.5C97.0254 49.5 86.7566 52.522 77.9805 57.7793"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          opacity="0.6"
          d="M97.5425 50.432C94.7565 50.9348 92.0392 51.6348 89.4054 52.5171"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g filter="url(#filter1_d_503_13458)">
        <circle cx="108" cy="108" r="45" fill="url(#paint2_linear_503_13458)" />
        <circle cx="108" cy="108" r="46.5" stroke="#64788F" strokeOpacity="0.06" strokeWidth="3" />
      </g>
      <mask
        id="mask2_503_13458"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="63"
        y="63"
        width="90"
        height="90"
      >
        <circle cx="108" cy="108" r="45" fill="white" />
      </mask>
      <g mask="url(#mask2_503_13458)">
        <g style={{ mixBlendMode: "multiply" }} opacity="0.12">
          <path d="M132 80.258L167.258 45" stroke="#78A2A9" strokeWidth="6" strokeLinecap="round" />
        </g>
        <g style={{ mixBlendMode: "multiply" }} opacity="0.12">
          <path d="M153 71.258L188.258 36" stroke="#78A2A9" strokeWidth="6" strokeLinecap="round" />
        </g>
        <g style={{ mixBlendMode: "multiply" }} opacity="0.12">
          <path d="M42.0001 128.258L77.2581 93" stroke="#78A2A9" strokeWidth="6" strokeLinecap="round" />
        </g>
        <g style={{ mixBlendMode: "multiply" }} opacity="0.12">
          <path d="M93.0001 164.258L128.258 129" stroke="#78A2A9" strokeWidth="6" strokeLinecap="round" />
        </g>
        <g style={{ mixBlendMode: "multiply" }} opacity="0.12">
          <path d="M147 113.258L182.258 78" stroke="#78A2A9" strokeWidth="6" strokeLinecap="round" />
        </g>
        <path
          opacity="0.6"
          d="M108 64.5C102.102 64.5 96.4783 65.6738 91.3495 67.8005"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g filter="url(#filter2_d_503_13458)">
        <path d="M90.8006 108L108 85.8864L125.199 108L108 130.113L90.8006 108Z" fill="white" />
        <path
          d="M88.4325 106.158C87.5899 107.241 87.5899 108.758 88.4325 109.842L105.632 131.955C106.2 132.686 107.074 133.113 108 133.113C108.926 133.113 109.8 132.686 110.368 131.955L127.567 109.842C128.41 108.758 128.41 107.241 127.567 106.158L110.368 84.0445C109.8 83.3138 108.926 82.8864 108 82.8864C107.074 82.8864 106.2 83.3138 105.632 84.0445L88.4325 106.158Z"
          stroke="white"
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </g>
      <g filter="url(#filter3_i_503_13458)">
        <path d="M90.8006 108L108 85.8864L125.199 108L108 130.113L90.8006 108Z" fill="url(#paint3_linear_503_13458)" />
      </g>
      <defs>
        <filter
          id="filter0_d_503_13458"
          x="78"
          y="108"
          width="60"
          height="112.013"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.603922 0 0 0 0 0.713726 0 0 0 0 0.356863 0 0 0 0.2 0" />
          <feBlend mode="darken" in2="BackgroundImageFix" result="effect1_dropShadow_503_13458" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13458" result="shape" />
        </filter>
        <filter
          id="filter1_d_503_13458"
          x="48"
          y="51"
          width="120"
          height="120"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="6" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.279884 0 0 0 0 0.409586 0 0 0 0 0.470833 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13458" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13458" result="shape" />
        </filter>
        <filter
          id="filter2_d_503_13458"
          x="78.8006"
          y="76.8864"
          width="58.3988"
          height="68.2271"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.19669 0 0 0 0 0.27695 0 0 0 0 0.483333 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13458" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13458" result="shape" />
        </filter>
        <filter
          id="filter3_i_503_13458"
          x="90.8006"
          y="85.8864"
          width="34.3988"
          height="47.2271"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.324977 0 0 0 0 0.428027 0 0 0 0 0.579167 0 0 0 0.4 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_503_13458" />
        </filter>
        <linearGradient id="paint0_linear_503_13458" x1="24" y1="24" x2="24" y2="192" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D9E242" />
          <stop offset="1" stopColor="#84C400" />
        </linearGradient>
        <linearGradient id="paint1_linear_503_13458" x1="48" y1="48" x2="48" y2="168" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ABB7CC" />
          <stop offset="1" stopColor="#76879C" />
        </linearGradient>
        <linearGradient id="paint2_linear_503_13458" x1="63" y1="63" x2="63" y2="153" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C6D1E4" />
          <stop offset="1" stopColor="#A4B1C4" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_503_13458"
          x1="90.8006"
          y1="85.8864"
          x2="90.8006"
          y2="130.113"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A3B0C5" />
          <stop offset="1" stopColor="#7A8AA1" />
        </linearGradient>
      </defs>
    </svg>
  ) : (
    <svg width="216" height="216" viewBox="0 0 216 216" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <mask
        id="mask0_503_14658"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="24"
        y="24"
        width="168"
        height="169"
      >
        <circle cx="108" cy="108" r="84" fill="white" />
      </mask>
      <g mask="url(#mask0_503_14658)">
        <g style={{ mixBlendMode: "screen" }} opacity="0.24">
          <circle cx="108" cy="108" r="84" fill="white" />
        </g>
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.04">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33 32.9989C26.3726 32.9989 21 38.3715 21 44.9989C21 51.6263 26.3726 56.9989 33 56.9989H54C60.6274 56.9989 66 51.6263 66 44.9989C66 38.3715 60.6274 32.9989 54 32.9989H33ZM141 81.0007C134.373 81.0007 129 86.3733 129 93.0007C129 99.6282 134.373 105.001 141 105.001H213C219.627 105.001 225 99.6282 225 93.0007C225 86.3733 219.627 81.0007 213 81.0007H141ZM108 165C108 158.372 113.373 153 120 153H192C198.627 153 204 158.372 204 165C204 171.627 198.627 177 192 177H120C113.373 177 108 171.627 108 165ZM30 129C23.3726 129 18 134.373 18 141C18 147.627 23.3726 153 30 153H78C84.6274 153 90 147.627 90 141C90 134.373 84.6274 129 78 129H30ZM12 101.999C12 98.6856 14.6863 95.9993 18 95.9993H45C48.3137 95.9993 51 98.6856 51 101.999C51 105.313 48.3137 107.999 45 107.999H18C14.6863 107.999 12 105.313 12 101.999ZM18 68.9996C14.6863 68.9996 12 71.6859 12 74.9996C12 78.3133 14.6863 80.9996 18 80.9996H102C105.314 80.9996 108 78.3133 108 74.9996C108 71.6859 105.314 68.9996 102 68.9996H18ZM90 38.9989C90 35.6852 92.6863 32.9989 96 32.9989H180C183.314 32.9989 186 35.6852 186 38.9989C186 42.3126 183.314 44.9989 180 44.9989H96C92.6863 44.9989 90 42.3126 90 38.9989ZM6 171C2.68629 171 0 173.686 0 177C0 180.314 2.68629 183 6 183H90C93.3137 183 96 180.314 96 177C96 173.686 93.3137 171 90 171H6ZM129 63.0011C129 59.6874 131.686 57.0011 135 57.0011H219C222.314 57.0011 225 59.6874 225 63.0011C225 66.3148 222.314 69.0011 219 69.0011H135C131.686 69.0011 129 66.3148 129 63.0011ZM118.6 116.999C113.74 116.999 109.8 120.939 109.8 125.799C109.8 130.659 113.74 134.599 118.6 134.599H191.4C196.26 134.599 200.2 130.659 200.2 125.799C200.2 120.939 196.26 116.999 191.4 116.999H118.6Z"
            fill="black"
          />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M84 108H132V205.009C132 207.272 129.591 208.72 127.593 207.659L108 197.25L88.4075 207.659C86.4093 208.72 84 207.272 84 205.009V108Z"
        fill="#A1C7FF"
      />
      <circle cx="108" cy="108" r="60" fill="#B6D5FF" />
      <circle cx="108" cy="108" r="45" fill="#D6E7FF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M105.632 84.0446C106.833 82.5004 109.167 82.5004 110.368 84.0446L127.567 106.158C128.41 107.242 128.41 108.758 127.567 109.842L110.368 131.955C109.167 133.5 106.833 133.5 105.632 131.955L88.4325 109.842C87.5899 108.758 87.5899 107.242 88.4325 106.158L105.632 84.0446Z"
        fill="#A1C7FF"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

export const TrophyLevel2: React.FC<TrophyLevelProps> = ({ achieved, ...rest }) =>
  achieved ? (
    <svg width="216" height="221" viewBox="0 0 216 221" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <mask
        id="mask0_503_13459"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="24"
        y="24"
        width="168"
        height="169"
      >
        <circle cx="108" cy="108" r="84" fill="white" />
      </mask>
      <g mask="url(#mask0_503_13459)">
        <circle cx="108" cy="108" r="84" fill="url(#paint0_linear_503_13459)" />
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.04">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33.0002 32.9989C26.3728 32.9989 21.0002 38.3715 21.0002 44.9989C21.0002 51.6263 26.3728 56.9989 33.0002 56.9989H54.0002C60.6276 56.9989 66.0002 51.6263 66.0002 44.9989C66.0002 38.3715 60.6276 32.9989 54.0002 32.9989H33.0002ZM141 81.0007C134.373 81.0007 129 86.3733 129 93.0007C129 99.6282 134.373 105.001 141 105.001H213C219.628 105.001 225 99.6282 225 93.0007C225 86.3733 219.628 81.0007 213 81.0007H141ZM108 165C108 158.372 113.373 153 120 153H192C198.628 153 204 158.372 204 165C204 171.627 198.628 177 192 177H120C113.373 177 108 171.627 108 165ZM30.0001 129C23.3727 129 18.0001 134.373 18.0001 141C18.0001 147.627 23.3727 153 30.0001 153H78.0001C84.6275 153 90.0001 147.627 90.0001 141C90.0001 134.373 84.6275 129 78.0001 129H30.0001ZM12.0001 101.999C12.0001 98.6856 14.6864 95.9993 18.0001 95.9993H45.0001C48.3138 95.9993 51.0001 98.6856 51.0001 101.999C51.0001 105.313 48.3138 107.999 45.0001 107.999H18.0001C14.6864 107.999 12.0001 105.313 12.0001 101.999ZM18.0001 68.9996C14.6864 68.9996 12.0001 71.6859 12.0001 74.9996C12.0001 78.3133 14.6864 80.9996 18.0001 80.9996H102C105.314 80.9996 108 78.3133 108 74.9996C108 71.6859 105.314 68.9996 102 68.9996H18.0001ZM90 38.9989C90 35.6852 92.6863 32.9989 96 32.9989H180C183.314 32.9989 186 35.6852 186 38.9989C186 42.3126 183.314 44.9989 180 44.9989H96C92.6863 44.9989 90 42.3126 90 38.9989ZM6.00009 171C2.68638 171 9.15527e-05 173.686 9.15527e-05 177C9.15527e-05 180.314 2.68638 183 6.00009 183H90.0001C93.3138 183 96.0001 180.314 96.0001 177C96.0001 173.686 93.3138 171 90.0001 171H6.00009ZM129 63.0011C129 59.6874 131.686 57.0011 135 57.0011H219C222.314 57.0011 225 59.6874 225 63.0011C225 66.3148 222.314 69.0011 219 69.0011H135C131.686 69.0011 129 66.3148 129 63.0011ZM118.6 116.999C113.74 116.999 109.8 120.939 109.8 125.799C109.8 130.659 113.74 134.599 118.6 134.599H191.4C196.261 134.599 200.2 130.659 200.2 125.799C200.2 120.939 196.26 116.999 191.4 116.999H118.6Z"
            fill="black"
          />
        </g>
      </g>
      <g opacity="0.1">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M97.4198 40.6869C103.729 36.1033 112.271 36.1033 118.58 40.6869L168.749 77.1368C175.058 81.7204 177.698 89.845 175.288 97.2614L156.125 156.239C153.715 163.655 146.804 168.676 139.006 168.676H76.9938C69.1958 168.676 62.2845 163.655 59.8748 156.239L40.712 97.2614C38.3022 89.845 40.9421 81.7204 47.2508 77.1368L97.4198 40.6869Z"
          fill="#0E995E"
          style={{ mixBlendMode: "multiply" }}
        />
      </g>
      <g filter="url(#filter0_d_503_13459)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M83.9999 108H132V205.009C132 207.272 129.591 208.72 127.592 207.659L108 197.25L88.4074 207.659C86.4092 208.72 83.9999 207.272 83.9999 205.009V108Z"
          fill="#12AAB5"
        />
      </g>
      <mask
        id="mask1_503_13459"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="84"
        y="108"
        width="48"
        height="101"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M83.9999 108H132V205.009C132 207.272 129.591 208.72 127.592 207.659L108 197.25L88.4074 207.659C86.4092 208.72 83.9999 207.272 83.9999 205.009V108Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask1_503_13459)">
        <path fillRule="evenodd" clipRule="evenodd" d="M95.9999 156H120V210H95.9999V156Z" fill="white" />
      </g>
      <path
        style={{ mixBlendMode: "multiply" }}
        opacity="0.2"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M100.947 50.1246C105.152 47.0689 110.848 47.0689 115.053 50.1246L166.569 87.5532C170.775 90.6089 172.535 96.0254 170.929 100.97L151.251 161.53C149.645 166.475 145.037 169.822 139.839 169.822H76.1613C70.9626 169.822 66.3551 166.475 64.7486 161.53L45.0712 100.97C43.4647 96.0254 45.2246 90.6089 49.4305 87.5532L100.947 50.1246Z"
        fill="#18AC6C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M100.947 44.1246C105.152 41.0689 110.848 41.0689 115.053 44.1246L166.569 81.5532C170.775 84.6089 172.535 90.0254 170.929 94.9696L151.251 155.53C149.645 160.475 145.037 163.822 139.839 163.822H76.1613C70.9626 163.822 66.3551 160.475 64.7486 155.53L45.0712 94.9696C43.4647 90.0254 45.2246 84.6089 49.4305 81.5532L100.947 44.1246Z"
        fill="url(#paint1_linear_503_13459)"
      />
      <mask
        id="mask2_503_13459"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="44"
        y="41"
        width="128"
        height="123"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M100.947 44.1246C105.152 41.0689 110.848 41.0689 115.053 44.1246L166.569 81.5532C170.775 84.6089 172.535 90.0254 170.929 94.9696L151.251 155.53C149.645 160.475 145.037 163.822 139.839 163.822H76.1613C70.9626 163.822 66.3551 160.475 64.7486 155.53L45.0712 94.9696C43.4647 90.0254 45.2246 84.6089 49.4305 81.5532L100.947 44.1246Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask2_503_13459)">
        <path
          d="M114.172 45.3383C110.492 42.6646 105.508 42.6646 101.828 45.3383L50.3121 82.7669C46.632 85.4407 45.0921 90.1801 46.4978 94.5063L66.1752 155.067C67.5808 159.393 71.6124 162.322 76.1613 162.322H139.839C144.387 162.322 148.419 159.393 149.825 155.067L169.502 94.5063C170.908 90.1801 169.368 85.4407 165.688 82.7669L114.172 45.3383Z"
          stroke="#E67515"
          strokeWidth="3"
        />
        <path d="M149.824 155.067L169.502 94.5062" stroke="#F68A2C" strokeWidth="3" strokeLinecap="round" />
        <path d="M46.4978 94.5062L66.1752 155.067" stroke="#F68A2C" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M169.502 94.5063C170.908 90.1801 169.368 85.4407 165.688 82.7669L114.172 45.3383C110.492 42.6646 105.508 42.6646 101.828 45.3383L50.3121 82.7669C46.632 85.4407 45.0921 90.1801 46.4978 94.5063"
          stroke="#FAA953"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          opacity="0.3"
          d="M114.172 45.3383C110.492 42.6646 105.508 42.6646 101.828 45.3383L50.3121 82.7669"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M101.828 45.338L88.9492 54.6952" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g filter="url(#filter1_d_503_13459)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M104.473 62.5623C106.576 61.0344 109.424 61.0344 111.527 62.5623L150.124 90.6049C152.227 92.1327 153.107 94.8409 152.304 97.3131L137.561 142.687C136.757 145.159 134.454 146.833 131.854 146.833H84.1455C81.5461 146.833 79.2424 145.159 78.4392 142.687L63.6963 97.3131C62.8931 94.841 63.773 92.1327 65.8759 90.6049L104.473 62.5623Z"
          fill="url(#paint2_linear_503_13459)"
        />
        <path
          d="M112.408 61.3488C109.78 59.439 106.22 59.439 103.592 61.3488L64.9943 89.3914C62.3656 91.3012 61.2657 94.6864 62.2697 97.7766L77.0126 143.15C78.0166 146.241 80.8963 148.333 84.1455 148.333H131.854C135.104 148.333 137.983 146.241 138.987 143.15L153.73 97.7766C154.734 94.6864 153.634 91.3012 151.006 89.3914L112.408 61.3488Z"
          stroke="#E86A00"
          strokeOpacity="0.06"
          strokeWidth="3"
        />
      </g>
      <mask
        id="mask3_503_13459"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="63"
        y="61"
        width="90"
        height="86"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M104.473 62.5623C106.576 61.0344 109.424 61.0344 111.527 62.5623L150.124 90.6049C152.227 92.1327 153.107 94.8409 152.304 97.3131L137.561 142.687C136.757 145.159 134.454 146.833 131.854 146.833H84.1455C81.5461 146.833 79.2424 145.159 78.4392 142.687L63.6963 97.3131C62.8931 94.841 63.773 92.1327 65.8759 90.6049L104.473 62.5623Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask3_503_13459)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M108 108L59.9999 120V96L108 108ZM108 108L120 60H95.9999L108 108ZM108 108L156 96V120L108 108ZM108 108L133.456 65.5736L150.426 82.5442L108 108ZM108 108L133.456 150.426L150.426 133.456L108 108ZM108 108L95.9999 156H120L108 108ZM108 108L82.5441 150.426L65.5735 133.456L108 108Z"
          fill="url(#paint3_linear_503_13459)"
        />
        <path d="M82.5441 65.5736L65.5735 82.5442L108 108L82.5441 65.5736Z" fill="url(#paint4_linear_503_13459)" />
        <path
          d="M100.531 67.281C98.4478 68.7942 96.8395 69.9627 95.7056 70.7866"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g filter="url(#filter2_d_503_13459)">
        <path
          d="M100.349 97.4699L108 86.3068L115.65 97.4699L128.631 101.296L120.379 112.022L120.751 125.55L108 121.016L95.2489 125.55L95.621 112.022L87.3683 101.296L100.349 97.4699Z"
          fill="white"
        />
        <path
          d="M110.474 84.6108C109.915 83.7946 108.989 83.3068 108 83.3068C107.01 83.3068 106.085 83.7946 105.525 84.6108L98.4778 94.894L86.5201 98.4189C85.571 98.6986 84.8209 99.4284 84.5152 100.369C84.2094 101.31 84.3873 102.342 84.9907 103.126L92.5928 113.006L92.25 125.468C92.2228 126.457 92.6851 127.396 93.4855 127.977C94.286 128.559 95.3218 128.708 96.254 128.377L108 124.2L119.746 128.377C120.678 128.708 121.714 128.559 122.514 127.977C123.315 127.396 123.777 126.457 123.75 125.468L123.407 113.006L131.009 103.126C131.612 102.342 131.79 101.31 131.485 100.369C131.179 99.4284 130.429 98.6986 129.48 98.4189L117.522 94.894L110.474 84.6108Z"
          stroke="white"
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </g>
      <g filter="url(#filter3_i_503_13459)">
        <path
          d="M100.349 97.4699L108 86.3068L115.65 97.4699L128.631 101.296L120.379 112.022L120.751 125.55L108 121.016L95.2489 125.55L95.621 112.022L87.3683 101.296L100.349 97.4699Z"
          fill="url(#paint5_linear_503_13459)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_503_13459"
          x="77.9999"
          y="108"
          width="60"
          height="112.013"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.333333 0 0 0 0 0.819608 0 0 0 0 0.615686 0 0 0 0.2 0" />
          <feBlend mode="darken" in2="BackgroundImageFix" result="effect1_dropShadow_503_13459" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13459" result="shape" />
        </filter>
        <filter
          id="filter1_d_503_13459"
          x="54.402"
          y="55.4164"
          width="107.196"
          height="103.416"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.95 0 0 0 0 0.442079 0 0 0 0 0 0 0 0 0.8 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13459" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13459" result="shape" />
        </filter>
        <filter
          id="filter2_d_503_13459"
          x="75.3683"
          y="77.3068"
          width="65.2632"
          height="63.2435"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.643137 0 0 0 0 0.262856 0 0 0 0 0.0196078 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13459" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13459" result="shape" />
        </filter>
        <filter
          id="filter3_i_503_13459"
          x="87.3683"
          y="86.3068"
          width="41.2631"
          height="42.2435"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.921569 0 0 0 0 0.447059 0 0 0 0 0.105882 0 0 0 0.4 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_503_13459" />
        </filter>
        <linearGradient id="paint0_linear_503_13459" x1="24" y1="24" x2="24" y2="192" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60DCA7" />
          <stop offset="1" stopColor="#54D09C" />
        </linearGradient>
        <linearGradient id="paint1_linear_503_13459" x1="39" y1="39" x2="39" y2="177" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FD9C43" />
          <stop offset="1" stopColor="#F27E1D" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_503_13459"
          x1="59.9999"
          y1="60"
          x2="59.9999"
          y2="156"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD17B" />
          <stop offset="1" stopColor="#FBA152" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_503_13459"
          x1="64.4777"
          y1="60"
          x2="64.4777"
          y2="147.044"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F58425" stopOpacity="0.2" />
          <stop offset="1" stopColor="#F58425" stopOpacity="0.01" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_503_13459"
          x1="64.4777"
          y1="60"
          x2="64.4777"
          y2="147.044"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F58425" stopOpacity="0.2" />
          <stop offset="1" stopColor="#F58425" stopOpacity="0.01" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_503_13459"
          x1="87.3683"
          y1="86.3068"
          x2="87.3683"
          y2="125.55"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FD9B41" />
          <stop offset="1" stopColor="#F48224" />
        </linearGradient>
      </defs>
    </svg>
  ) : (
    <svg width="216" height="216" viewBox="0 0 216 216" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <mask
        id="mask0_503_14659"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="24"
        y="24"
        width="168"
        height="169"
      >
        <circle cx="108" cy="108" r="84" fill="white" />
      </mask>
      <g mask="url(#mask0_503_14659)">
        <g style={{ mixBlendMode: "screen" }} opacity="0.24">
          <circle cx="108" cy="108" r="84" fill="white" />
        </g>
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.04">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33 32.9989C26.3726 32.9989 21 38.3715 21 44.9989C21 51.6263 26.3726 56.9989 33 56.9989H54C60.6274 56.9989 66 51.6263 66 44.9989C66 38.3715 60.6274 32.9989 54 32.9989H33ZM141 81.0007C134.373 81.0007 129 86.3733 129 93.0007C129 99.6282 134.373 105.001 141 105.001H213C219.627 105.001 225 99.6282 225 93.0007C225 86.3733 219.627 81.0007 213 81.0007H141ZM108 165C108 158.372 113.373 153 120 153H192C198.627 153 204 158.372 204 165C204 171.627 198.627 177 192 177H120C113.373 177 108 171.627 108 165ZM30 129C23.3726 129 18 134.373 18 141C18 147.627 23.3726 153 30 153H78C84.6274 153 90 147.627 90 141C90 134.373 84.6274 129 78 129H30ZM12 101.999C12 98.6856 14.6863 95.9993 18 95.9993H45C48.3137 95.9993 51 98.6856 51 101.999C51 105.313 48.3137 107.999 45 107.999H18C14.6863 107.999 12 105.313 12 101.999ZM18 68.9996C14.6863 68.9996 12 71.6859 12 74.9996C12 78.3133 14.6863 80.9996 18 80.9996H102C105.314 80.9996 108 78.3133 108 74.9996C108 71.6859 105.314 68.9996 102 68.9996H18ZM90 38.9989C90 35.6852 92.6863 32.9989 96 32.9989H180C183.314 32.9989 186 35.6852 186 38.9989C186 42.3126 183.314 44.9989 180 44.9989H96C92.6863 44.9989 90 42.3126 90 38.9989ZM6 171C2.68629 171 0 173.686 0 177C0 180.314 2.68629 183 6 183H90C93.3137 183 96 180.314 96 177C96 173.686 93.3137 171 90 171H6ZM129 63.0011C129 59.6874 131.686 57.0011 135 57.0011H219C222.314 57.0011 225 59.6874 225 63.0011C225 66.3148 222.314 69.0011 219 69.0011H135C131.686 69.0011 129 66.3148 129 63.0011ZM118.6 116.999C113.74 116.999 109.8 120.939 109.8 125.799C109.8 130.659 113.74 134.599 118.6 134.599H191.4C196.26 134.599 200.2 130.659 200.2 125.799C200.2 120.939 196.26 116.999 191.4 116.999H118.6Z"
            fill="black"
          />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M84 108H132V205.009C132 207.272 129.591 208.72 127.593 207.659L108 197.25L88.4075 207.659C86.4093 208.72 84 207.272 84 205.009V108Z"
        fill="#A1C7FF"
      />
      <mask
        id="mask1_503_14659"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="84"
        y="108"
        width="48"
        height="101"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M84 108H132V205.009C132 207.272 129.591 208.72 127.593 207.659L108 197.25L88.4075 207.659C86.4093 208.72 84 207.272 84 205.009V108Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask1_503_14659)">
        <path fillRule="evenodd" clipRule="evenodd" d="M96 156H120V210H96V156Z" fill="#E7F1FF" />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M100.947 44.1246C105.152 41.0689 110.848 41.0689 115.053 44.1246L166.569 81.5532C170.775 84.6089 172.535 90.0254 170.929 94.9696L151.251 155.53C149.645 160.475 145.037 163.822 139.839 163.822H76.1613C70.9626 163.822 66.3551 160.475 64.7486 155.53L45.0713 94.9696C43.4648 90.0254 45.2247 84.6089 49.4305 81.5532L100.947 44.1246Z"
        fill="#B6D5FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M104.473 62.5623C106.576 61.0344 109.424 61.0344 111.527 62.5623L150.124 90.6049C152.227 92.1327 153.107 94.8409 152.304 97.3131L137.561 142.687C136.758 145.159 134.454 146.833 131.854 146.833H84.1456C81.5462 146.833 79.2425 145.159 78.4392 142.687L63.6964 97.3131C62.8931 94.841 63.7731 92.1327 65.876 90.6049L104.473 62.5623Z"
        fill="#D6E7FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M108 124.2L96.2542 128.377C94.2681 129.083 92.1922 127.575 92.2501 125.468L92.5929 113.006L84.9908 103.126C83.7054 101.455 84.4984 99.0148 86.5202 98.4188L98.4779 94.8939L105.525 84.6108C106.717 82.872 109.283 82.872 110.475 84.6108L117.522 94.8939L129.48 98.4188C131.502 99.0148 132.295 101.455 131.009 103.126L123.407 113.006L123.75 125.468C123.808 127.575 121.732 129.083 119.746 128.377L108 124.2Z"
        fill="#A1C7FF"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

export const TrophyLevel3: React.FC<TrophyLevelProps> = ({ achieved, ...rest }) =>
  achieved ? (
    <svg width="216" height="221" viewBox="0 0 216 221" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <mask
        id="mask0_503_13460"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="24"
        y="24"
        width="168"
        height="169"
      >
        <circle cx="108" cy="108" r="84" fill="white" />
      </mask>
      <g mask="url(#mask0_503_13460)">
        <circle cx="108" cy="108" r="84" fill="url(#paint0_linear_503_13460)" />
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.04">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33.0002 32.9989C26.3728 32.9989 21.0002 38.3715 21.0002 44.9989C21.0002 51.6263 26.3728 56.9989 33.0002 56.9989H54.0002C60.6276 56.9989 66.0002 51.6263 66.0002 44.9989C66.0002 38.3715 60.6276 32.9989 54.0002 32.9989H33.0002ZM141 81.0007C134.373 81.0007 129 86.3733 129 93.0007C129 99.6282 134.373 105.001 141 105.001H213C219.627 105.001 225 99.6282 225 93.0007C225 86.3733 219.627 81.0007 213 81.0007H141ZM108 165C108 158.372 113.373 153 120 153H192C198.627 153 204 158.372 204 165C204 171.627 198.627 177 192 177H120C113.373 177 108 171.627 108 165ZM30.0001 129C23.3727 129 18.0001 134.373 18.0001 141C18.0001 147.627 23.3727 153 30.0001 153H78.0001C84.6275 153 90.0001 147.627 90.0001 141C90.0001 134.373 84.6275 129 78.0001 129H30.0001ZM12.0001 101.999C12.0001 98.6856 14.6864 95.9993 18.0001 95.9993H45.0001C48.3138 95.9993 51.0001 98.6856 51.0001 101.999C51.0001 105.313 48.3138 107.999 45.0001 107.999H18.0001C14.6864 107.999 12.0001 105.313 12.0001 101.999ZM18.0001 68.9996C14.6864 68.9996 12.0001 71.6859 12.0001 74.9996C12.0001 78.3133 14.6864 80.9996 18.0001 80.9996H102C105.314 80.9996 108 78.3133 108 74.9996C108 71.6859 105.314 68.9996 102 68.9996H18.0001ZM90 38.9989C90 35.6852 92.6863 32.9989 96 32.9989H180C183.314 32.9989 186 35.6852 186 38.9989C186 42.3126 183.314 44.9989 180 44.9989H96C92.6863 44.9989 90 42.3126 90 38.9989ZM6.00009 171C2.68638 171 9.15527e-05 173.686 9.15527e-05 177C9.15527e-05 180.314 2.68638 183 6.00009 183H90.0001C93.3138 183 96.0001 180.314 96.0001 177C96.0001 173.686 93.3138 171 90.0001 171H6.00009ZM129 63.0011C129 59.6874 131.686 57.0011 135 57.0011H219C222.314 57.0011 225 59.6874 225 63.0011C225 66.3148 222.314 69.0011 219 69.0011H135C131.686 69.0011 129 66.3148 129 63.0011ZM118.6 116.999C113.74 116.999 109.8 120.939 109.8 125.799C109.8 130.659 113.74 134.599 118.6 134.599H191.4C196.26 134.599 200.2 130.659 200.2 125.799C200.2 120.939 196.26 116.999 191.4 116.999H118.6Z"
            fill="black"
          />
        </g>
      </g>
      <g opacity="0.1">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M97.4199 40.6868C103.729 36.1033 112.271 36.1032 118.58 40.6868L168.749 77.1367C175.058 81.7203 177.698 89.8449 175.288 97.2613L156.125 156.238C153.715 163.655 146.804 168.676 139.006 168.676H76.9939C69.1958 168.676 62.2846 163.655 59.8749 156.239L40.712 97.2614C38.3023 89.8449 40.9422 81.7203 47.2509 77.1367L97.4199 40.6868Z"
          fill="#0298F3"
          style={{ mixBlendMode: "multiply" }}
        />
      </g>
      <g filter="url(#filter0_d_503_13460)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M84 108H132V205.009C132 207.272 129.591 208.72 127.593 207.659L108 197.25L88.4075 207.659C86.4093 208.72 84 207.272 84 205.009V108Z"
          fill="#7F45F6"
        />
      </g>
      <mask
        id="mask1_503_13460"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="84"
        y="108"
        width="48"
        height="101"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M84 108H132V205.009C132 207.272 129.591 208.72 127.593 207.659L108 197.25L88.4075 207.659C86.4093 208.72 84 207.272 84 205.009V108Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask1_503_13460)">
        <path fillRule="evenodd" clipRule="evenodd" d="M96 156H120V210H96V156Z" fill="white" />
      </g>
      <path
        style={{ mixBlendMode: "multiply" }}
        opacity="0.2"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M100.947 50.1248C105.153 47.0691 110.848 47.0691 115.054 50.1248L166.57 87.5534C170.775 90.6091 172.535 96.0255 170.929 100.97L151.252 161.531C149.645 166.475 145.038 169.822 139.839 169.822H76.1615C70.9628 169.822 66.3553 166.475 64.7488 161.531L45.0714 100.97C43.4649 96.0256 45.2248 90.6091 49.4307 87.5534L100.947 50.1248Z"
        fill="#0298F3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M100.947 44.1246C105.152 41.0689 110.848 41.0689 115.053 44.1246L166.569 81.5532C170.775 84.6089 172.535 90.0254 170.929 94.9696L151.251 155.53C149.645 160.475 145.037 163.822 139.839 163.822H76.1613C70.9626 163.822 66.3551 160.475 64.7486 155.53L45.0713 94.9696C43.4648 90.0254 45.2247 84.6089 49.4305 81.5532L100.947 44.1246Z"
        fill="url(#paint1_linear_503_13460)"
        stroke="#FEFFFF"
        strokeOpacity="0.2"
        strokeWidth="3"
      />
      <mask
        id="mask2_503_13460"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="42"
        y="40"
        width="132"
        height="126"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M100.947 44.1246C105.152 41.0689 110.848 41.0689 115.053 44.1246L166.569 81.5532C170.775 84.6089 172.535 90.0254 170.929 94.9696L151.251 155.53C149.645 160.475 145.037 163.822 139.839 163.822H76.1613C70.9626 163.822 66.3551 160.475 64.7486 155.53L45.0713 94.9696C43.4648 90.0254 45.2247 84.6089 49.4305 81.5532L100.947 44.1246Z"
          fill="white"
          stroke="white"
          strokeWidth="3"
        />
      </mask>
      <g mask="url(#mask2_503_13460)">
        <path
          d="M114.172 45.3383C110.492 42.6646 105.508 42.6646 101.828 45.3383L50.3122 82.7669C46.6321 85.4407 45.0922 90.1801 46.4979 94.5063L66.1753 155.067C67.581 159.393 71.6125 162.322 76.1614 162.322H139.839C144.388 162.322 148.419 159.393 149.825 155.067L169.502 94.5063C170.908 90.1801 169.368 85.4407 165.688 82.7669L114.172 45.3383Z"
          stroke="#94B4BD"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M149.825 155.067L169.502 94.5062" stroke="#B1CDD0" strokeWidth="3" strokeLinecap="round" />
        <path d="M46.4978 94.5062L66.1752 155.067" stroke="#B1CDD0" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M169.502 94.5063C170.908 90.1801 169.368 85.4407 165.688 82.7669L114.172 45.3383C110.492 42.6646 105.508 42.6646 101.828 45.3383L50.3122 82.7669C46.6321 85.4407 45.0922 90.1801 46.4979 94.5063"
          stroke="#C3E6E7"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          opacity="0.4"
          d="M114.172 45.3383C110.492 42.6646 105.508 42.6646 101.828 45.3383L50.3123 82.7669"
          stroke="#E5FEFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M101.828 45.338L88.9493 54.6952" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g filter="url(#filter1_d_503_13460)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M104.473 62.5623C106.576 61.0344 109.424 61.0344 111.527 62.5623L150.124 90.6049C152.227 92.1327 153.107 94.8409 152.304 97.3131L137.561 142.687C136.758 145.159 134.454 146.833 131.854 146.833H84.1456C81.5462 146.833 79.2425 145.159 78.4392 142.687L63.6964 97.3131C62.8931 94.841 63.7731 92.1327 65.876 90.6049L104.473 62.5623Z"
          fill="url(#paint2_linear_503_13460)"
        />
        <path
          d="M112.408 61.3488C109.78 59.439 106.22 59.439 103.592 61.3488L64.9943 89.3914C62.3657 91.3012 61.2657 94.6864 62.2698 97.7766L77.0126 143.15C78.0167 146.241 80.8964 148.333 84.1456 148.333H131.854C135.104 148.333 137.983 146.241 138.987 143.15L153.73 97.7766C154.734 94.6864 153.634 91.3012 151.006 89.3914L112.408 61.3488Z"
          stroke="#94A0A4"
          strokeOpacity="0.06"
          strokeWidth="3"
        />
      </g>
      <mask
        id="mask3_503_13460"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="63"
        y="61"
        width="90"
        height="86"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M104.473 62.5623C106.576 61.0344 109.424 61.0344 111.527 62.5623L150.124 90.6049C152.227 92.1327 153.107 94.8409 152.304 97.3131L137.561 142.687C136.758 145.159 134.454 146.833 131.854 146.833H84.1456C81.5462 146.833 79.2425 145.159 78.4392 142.687L63.6964 97.3131C62.8931 94.841 63.7731 92.1327 65.876 90.6049L104.473 62.5623Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask3_503_13460)">
        <g style={{ mixBlendMode: "multiply" }} opacity="0.2">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M108 108L60 120V96L108 108ZM108 108L120 60H96L108 108ZM108 108L156 96V120L108 108ZM108 108L133.456 65.5736L150.426 82.5442L108 108ZM108 108L133.456 150.426L150.426 133.456L108 108ZM108 108L96 156H120L108 108ZM108 108L82.5442 150.426L65.5736 133.456L108 108Z"
            fill="url(#paint3_linear_503_13460)"
          />
          <path d="M82.5442 65.5736L65.5736 82.5442L108 108L82.5442 65.5736Z" fill="url(#paint4_linear_503_13460)" />
        </g>
        <path
          d="M100.531 67.281C98.448 68.7942 96.8397 69.9627 95.7057 70.7866"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g filter="url(#filter2_d_503_13460)">
        <path
          d="M100.349 97.4699L108 86.3068L115.651 97.4699L128.631 101.296L120.379 112.022L120.751 125.55L108 121.016L95.249 125.55L95.621 112.022L87.3684 101.296L100.349 97.4699Z"
          fill="white"
        />
        <path
          d="M110.475 84.6108C109.915 83.7946 108.989 83.3068 108 83.3068C107.01 83.3068 106.085 83.7946 105.525 84.6108L98.4778 94.894L86.5201 98.4189C85.5711 98.6986 84.821 99.4284 84.5152 100.369C84.2095 101.31 84.3874 102.342 84.9908 103.126L92.5928 113.006L92.2501 125.468C92.2229 126.457 92.6851 127.396 93.4856 127.977C94.2861 128.559 95.3218 128.708 96.2541 128.377L108 124.2L119.746 128.377C120.678 128.708 121.714 128.559 122.514 127.977C123.315 127.396 123.777 126.457 123.75 125.468L123.407 113.006L131.009 103.126C131.612 102.342 131.79 101.31 131.485 100.369C131.179 99.4284 130.429 98.6986 129.48 98.4189L117.522 94.894L110.475 84.6108Z"
          stroke="white"
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </g>
      <g filter="url(#filter3_i_503_13460)">
        <path
          d="M100.349 97.4699L108 86.3068L115.651 97.4699L128.631 101.296L120.379 112.022L120.751 125.55L108 121.016L95.249 125.55L95.621 112.022L87.3684 101.296L100.349 97.4699Z"
          fill="url(#paint5_linear_503_13460)"
        />
      </g>
      <g filter="url(#filter4_d_503_13460)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M91.8218 148.56L90.7831 148.15C90.1479 147.9 89.836 147.182 90.0866 146.546C90.2122 146.228 90.4645 145.975 90.7831 145.85L91.8218 145.44C93.0196 144.968 93.9677 144.02 94.4401 142.822L94.8498 141.783C95.1003 141.148 95.8184 140.836 96.4536 141.087C96.7723 141.212 97.0245 141.464 97.1502 141.783L97.5599 142.822C98.0323 144.02 98.9804 144.968 100.178 145.44L101.217 145.85C101.852 146.1 102.164 146.818 101.913 147.454C101.788 147.772 101.536 148.025 101.217 148.15L100.178 148.56C98.9804 149.032 98.0323 149.98 97.5599 151.178L97.1502 152.217C96.8997 152.852 96.1816 153.164 95.5464 152.913C95.2277 152.788 94.9755 152.536 94.8498 152.217L94.4401 151.178C93.9677 149.98 93.0196 149.032 91.8218 148.56Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter5_d_503_13460)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M143.277 96.4498L141.979 95.9378C141.185 95.6246 140.795 94.727 141.108 93.9329C141.265 93.5346 141.581 93.2193 141.979 93.0622L143.277 92.5502C144.774 91.9597 145.96 90.7745 146.55 89.2773L147.062 87.9789C147.375 87.1849 148.273 86.795 149.067 87.1082C149.465 87.2653 149.781 87.5806 149.938 87.9789L150.45 89.2773C151.04 90.7745 152.226 91.9597 153.723 92.5502L155.021 93.0622C155.815 93.3754 156.205 94.273 155.892 95.0671C155.735 95.4654 155.419 95.7807 155.021 95.9378L153.723 96.4498C152.226 97.0403 151.04 98.2255 150.45 99.7227L149.938 101.021C149.625 101.815 148.727 102.205 147.933 101.892C147.535 101.735 147.219 101.419 147.062 101.021L146.55 99.7227C145.96 98.2255 144.774 97.0403 143.277 96.4498Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter6_d_503_13460)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M70.3664 110.67L69.5874 110.363C69.1109 110.175 68.877 109.636 69.0649 109.16C69.1592 108.921 69.3484 108.732 69.5874 108.637L70.3664 108.33C71.2647 107.976 71.9758 107.265 72.3301 106.366L72.6373 105.587C72.8252 105.111 73.3638 104.877 73.8402 105.065C74.0792 105.159 74.2684 105.348 74.3627 105.587L74.6699 106.366C75.0242 107.265 75.7353 107.976 76.6336 108.33L77.4126 108.637C77.8891 108.825 78.123 109.364 77.9351 109.84C77.8408 110.079 77.6516 110.268 77.4126 110.363L76.6336 110.67C75.7353 111.024 75.0242 111.735 74.6699 112.634L74.3627 113.413C74.1748 113.889 73.6362 114.123 73.1598 113.935C72.9208 113.841 72.7316 113.652 72.6373 113.413L72.3301 112.634C71.9758 111.735 71.2647 111.024 70.3664 110.67Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_503_13460"
          x="78"
          y="108"
          width="60"
          height="112.013"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.333333 0 0 0 0 0.790431 0 0 0 0 0.819608 0 0 0 0.2 0" />
          <feBlend mode="darken" in2="BackgroundImageFix" result="effect1_dropShadow_503_13460" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13460" result="shape" />
        </filter>
        <filter
          id="filter1_d_503_13460"
          x="54.4021"
          y="55.4164"
          width="107.196"
          height="103.416"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0196078 0 0 0 0 0.443137 0 0 0 0 0.643137 0 0 0 0.12 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13460" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13460" result="shape" />
        </filter>
        <filter
          id="filter2_d_503_13460"
          x="75.3683"
          y="77.3068"
          width="65.2632"
          height="63.2435"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.596078 0 0 0 0 0.745098 0 0 0 0 0.780392 0 0 0 0.5 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13460" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13460" result="shape" />
        </filter>
        <filter
          id="filter3_i_503_13460"
          x="87.3684"
          y="86.3068"
          width="41.2631"
          height="42.2435"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.508286 0 0 0 0 0.694443 0 0 0 0 0.72829 0 0 0 0.4 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_503_13460" />
        </filter>
        <filter
          id="filter4_d_503_13460"
          x="84"
          y="135"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.705882 0 0 0 0 0.823529 0 0 0 0 0.831373 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13460" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13460" result="shape" />
        </filter>
        <filter
          id="filter5_d_503_13460"
          x="135"
          y="81"
          width="27"
          height="27"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.705882 0 0 0 0 0.823529 0 0 0 0 0.831373 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13460" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13460" result="shape" />
        </filter>
        <filter
          id="filter6_d_503_13460"
          x="63"
          y="99"
          width="21"
          height="21"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.705882 0 0 0 0 0.823529 0 0 0 0 0.831373 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13460" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13460" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_503_13460" x1="24" y1="24" x2="24" y2="192" gradientUnits="userSpaceOnUse">
          <stop stopColor="#59CBF2" />
          <stop offset="1" stopColor="#40A7E8" />
        </linearGradient>
        <linearGradient id="paint1_linear_503_13460" x1="39" y1="39" x2="39" y2="177" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4ECEB" />
          <stop offset="1" stopColor="#A7BCC1" />
        </linearGradient>
        <linearGradient id="paint2_linear_503_13460" x1="60" y1="60" x2="60" y2="156" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0FBFE" />
          <stop offset="1" stopColor="#C0DCDC" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_503_13460"
          x1="64.439"
          y1="60"
          x2="64.439"
          y2="147.122"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AFD4D6" />
          <stop offset="1" stopColor="#B9D9DB" stopOpacity="0.57" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_503_13460"
          x1="64.439"
          y1="60"
          x2="64.439"
          y2="147.122"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AFD4D6" />
          <stop offset="1" stopColor="#B9D9DB" stopOpacity="0.57" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_503_13460"
          x1="87.3684"
          y1="86.3068"
          x2="87.3684"
          y2="125.55"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B7D6D8" />
          <stop offset="1" stopColor="#A7BCC1" />
        </linearGradient>
      </defs>
    </svg>
  ) : (
    <svg width="216" height="216" viewBox="0 0 216 216" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <mask
        id="mask0_503_14660"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="24"
        y="24"
        width="168"
        height="169"
      >
        <circle cx="108" cy="108" r="84" fill="white" />
      </mask>
      <g mask="url(#mask0_503_14660)">
        <g style={{ mixBlendMode: "screen" }} opacity="0.24">
          <circle cx="108" cy="108" r="84" fill="white" />
        </g>
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.04">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33 32.9989C26.3726 32.9989 21 38.3715 21 44.9989C21 51.6263 26.3726 56.9989 33 56.9989H54C60.6274 56.9989 66 51.6263 66 44.9989C66 38.3715 60.6274 32.9989 54 32.9989H33ZM141 81.0007C134.373 81.0007 129 86.3733 129 93.0007C129 99.6282 134.373 105.001 141 105.001H213C219.627 105.001 225 99.6282 225 93.0007C225 86.3733 219.627 81.0007 213 81.0007H141ZM108 165C108 158.372 113.373 153 120 153H192C198.627 153 204 158.372 204 165C204 171.627 198.627 177 192 177H120C113.373 177 108 171.627 108 165ZM30 129C23.3726 129 18 134.373 18 141C18 147.627 23.3726 153 30 153H78C84.6274 153 90 147.627 90 141C90 134.373 84.6274 129 78 129H30ZM12 101.999C12 98.6856 14.6863 95.9993 18 95.9993H45C48.3137 95.9993 51 98.6856 51 101.999C51 105.313 48.3137 107.999 45 107.999H18C14.6863 107.999 12 105.313 12 101.999ZM18 68.9996C14.6863 68.9996 12 71.6859 12 74.9996C12 78.3133 14.6863 80.9996 18 80.9996H102C105.314 80.9996 108 78.3133 108 74.9996C108 71.6859 105.314 68.9996 102 68.9996H18ZM90 38.9989C90 35.6852 92.6863 32.9989 96 32.9989H180C183.314 32.9989 186 35.6852 186 38.9989C186 42.3126 183.314 44.9989 180 44.9989H96C92.6863 44.9989 90 42.3126 90 38.9989ZM6 171C2.68629 171 0 173.686 0 177C0 180.314 2.68629 183 6 183H90C93.3137 183 96 180.314 96 177C96 173.686 93.3137 171 90 171H6ZM129 63.0011C129 59.6874 131.686 57.0011 135 57.0011H219C222.314 57.0011 225 59.6874 225 63.0011C225 66.3148 222.314 69.0011 219 69.0011H135C131.686 69.0011 129 66.3148 129 63.0011ZM118.6 116.999C113.74 116.999 109.8 120.939 109.8 125.799C109.8 130.659 113.74 134.599 118.6 134.599H191.4C196.26 134.599 200.2 130.659 200.2 125.799C200.2 120.939 196.26 116.999 191.4 116.999H118.6Z"
            fill="black"
          />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M84 108H132V205.009C132 207.272 129.591 208.72 127.593 207.659L108 197.25L88.4075 207.659C86.4093 208.72 84 207.272 84 205.009V108Z"
        fill="#A1C7FF"
      />
      <mask
        id="mask1_503_14660"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="84"
        y="108"
        width="48"
        height="101"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M84 108H132V205.009C132 207.272 129.591 208.72 127.593 207.659L108 197.25L88.4075 207.659C86.4093 208.72 84 207.272 84 205.009V108Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask1_503_14660)">
        <path fillRule="evenodd" clipRule="evenodd" d="M96 156H120V210H96V156Z" fill="#E7F1FF" />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M100.947 44.1246C105.152 41.0689 110.848 41.0689 115.053 44.1246L166.569 81.5532C170.775 84.6089 172.535 90.0254 170.929 94.9696L151.251 155.53C149.645 160.475 145.037 163.822 139.839 163.822H76.1613C70.9626 163.822 66.3551 160.475 64.7486 155.53L45.0713 94.9696C43.4648 90.0254 45.2247 84.6089 49.4305 81.5532L100.947 44.1246Z"
        fill="#B6D5FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M104.473 62.5623C106.576 61.0344 109.424 61.0344 111.527 62.5623L150.124 90.6049C152.227 92.1327 153.107 94.8409 152.304 97.3131L137.561 142.687C136.758 145.159 134.454 146.833 131.854 146.833H84.1456C81.5462 146.833 79.2425 145.159 78.4392 142.687L63.6964 97.3131C62.8931 94.841 63.7731 92.1327 65.876 90.6049L104.473 62.5623Z"
        fill="#D6E7FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M108 124.2L96.2542 128.377C94.2681 129.083 92.1922 127.575 92.2501 125.468L92.5929 113.006L84.9908 103.126C83.7054 101.455 84.4984 99.0148 86.5202 98.4188L98.4779 94.8939L105.525 84.6108C106.717 82.872 109.283 82.872 110.475 84.6108L117.522 94.8939L129.48 98.4188C131.502 99.0148 132.295 101.455 131.009 103.126L123.407 113.006L123.75 125.468C123.808 127.575 121.732 129.083 119.746 128.377L108 124.2Z"
        fill="#A1C7FF"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask
        id="mask2_503_14660"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="81"
        y="80"
        width="54"
        height="52"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M108 124.2L96.2542 128.377C94.2681 129.083 92.1922 127.575 92.2501 125.468L92.5929 113.006L84.9908 103.126C83.7054 101.455 84.4984 99.0148 86.5202 98.4188L98.4779 94.8939L105.525 84.6108C106.717 82.872 109.283 82.872 110.475 84.6108L117.522 94.8939L129.48 98.4188C131.502 99.0148 132.295 101.455 131.009 103.126L123.407 113.006L123.75 125.468C123.808 127.575 121.732 129.083 119.746 128.377L108 124.2Z"
          fill="white"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask2_503_14660)"></g>
    </svg>
  )

export const TrophyLevel4: React.FC<TrophyLevelProps> = ({ achieved, ...rest }) =>
  achieved ? (
    <svg width="216" height="221" viewBox="0 0 216 221" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <mask
        id="mask0_503_13462"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="24"
        y="24"
        width="168"
        height="169"
      >
        <circle cx="108" cy="108" r="84" fill="white" />
      </mask>
      <g mask="url(#mask0_503_13462)">
        <circle cx="108" cy="108" r="84" fill="url(#paint0_linear_503_13462)" />
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.04">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33.0002 32.9989C26.3728 32.9989 21.0002 38.3715 21.0002 44.9989C21.0002 51.6263 26.3728 56.9989 33.0002 56.9989H54.0002C60.6276 56.9989 66.0002 51.6263 66.0002 44.9989C66.0002 38.3715 60.6276 32.9989 54.0002 32.9989H33.0002ZM141 81.0007C134.373 81.0007 129 86.3733 129 93.0007C129 99.6282 134.373 105.001 141 105.001H213C219.628 105.001 225 99.6282 225 93.0007C225 86.3733 219.628 81.0007 213 81.0007H141ZM108 165C108 158.372 113.373 153 120 153H192C198.628 153 204 158.372 204 165C204 171.627 198.628 177 192 177H120C113.373 177 108 171.627 108 165ZM30.0001 129C23.3727 129 18.0001 134.373 18.0001 141C18.0001 147.627 23.3727 153 30.0001 153H78.0001C84.6275 153 90.0001 147.627 90.0001 141C90.0001 134.373 84.6275 129 78.0001 129H30.0001ZM12.0001 101.999C12.0001 98.6856 14.6864 95.9993 18.0001 95.9993H45.0001C48.3138 95.9993 51.0001 98.6856 51.0001 101.999C51.0001 105.313 48.3138 107.999 45.0001 107.999H18.0001C14.6864 107.999 12.0001 105.313 12.0001 101.999ZM18.0001 68.9996C14.6864 68.9996 12.0001 71.6859 12.0001 74.9996C12.0001 78.3133 14.6864 80.9996 18.0001 80.9996H102C105.314 80.9996 108 78.3133 108 74.9996C108 71.6859 105.314 68.9996 102 68.9996H18.0001ZM90 38.9989C90 35.6852 92.6863 32.9989 96 32.9989H180C183.314 32.9989 186 35.6852 186 38.9989C186 42.3126 183.314 44.9989 180 44.9989H96C92.6863 44.9989 90 42.3126 90 38.9989ZM6.00009 171C2.68638 171 9.15527e-05 173.686 9.15527e-05 177C9.15527e-05 180.314 2.68638 183 6.00009 183H90.0001C93.3138 183 96.0001 180.314 96.0001 177C96.0001 173.686 93.3138 171 90.0001 171H6.00009ZM129 63.0011C129 59.6874 131.686 57.0011 135 57.0011H219C222.314 57.0011 225 59.6874 225 63.0011C225 66.3148 222.314 69.0011 219 69.0011H135C131.686 69.0011 129 66.3148 129 63.0011ZM118.6 116.999C113.74 116.999 109.8 120.939 109.8 125.799C109.8 130.659 113.74 134.599 118.6 134.599H191.4C196.261 134.599 200.2 130.659 200.2 125.799C200.2 120.939 196.26 116.999 191.4 116.999H118.6Z"
            fill="black"
          />
        </g>
      </g>
      <g opacity="0.1">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M98.9955 38.0303C104.565 34.8149 111.426 34.8149 116.995 38.0303L164.091 65.221C169.66 68.4363 173.091 74.3786 173.091 80.8094V135.191C173.091 141.622 169.66 147.564 164.091 150.779L116.995 177.97C111.426 181.185 104.565 181.185 98.9955 177.97L51.8999 150.779C46.3307 147.564 42.8999 141.621 42.8999 135.191L42.8999 80.8094C42.8999 74.3786 46.3307 68.4364 51.8999 65.221L98.9955 38.0303Z"
          fill="#0602F3"
          style={{ mixBlendMode: "multiply" }}
        />
      </g>
      <g filter="url(#filter0_d_503_13462)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M87.2153 99L128.785 123L80.2799 207.012C79.1486 208.972 76.338 209.021 75.1383 207.103L63.3749 188.293L41.203 187.511C38.9418 187.431 37.5794 184.972 38.7107 183.012L87.2153 99Z"
          fill="#F55462"
        />
      </g>
      <mask
        id="mask1_503_13462"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="38"
        y="99"
        width="91"
        height="110"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M87.2153 99L128.785 123L80.2799 207.012C79.1486 208.972 76.338 209.021 75.1383 207.103L63.3749 188.293L41.203 187.511C38.9418 187.431 37.5794 184.972 38.7107 183.012L87.2153 99Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask1_503_13462)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M73.6076 146.569L94.3922 158.569L67.3922 205.335L46.6076 193.335L73.6076 146.569Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter1_d_503_13462)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M128.784 99L87.2153 123L135.72 207.012C136.851 208.972 139.662 209.021 140.862 207.103L152.625 188.293L174.797 187.511C177.058 187.431 178.42 184.972 177.289 183.012L128.784 99Z"
          fill="#F55462"
        />
      </g>
      <mask
        id="mask2_503_13462"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="87"
        y="99"
        width="91"
        height="110"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M128.784 99L87.2153 123L135.72 207.012C136.851 208.972 139.662 209.021 140.862 207.103L152.625 188.293L174.797 187.511C177.058 187.431 178.42 184.972 177.289 183.012L128.784 99Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask2_503_13462)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M142.392 146.569L121.608 158.569L148.608 205.335L169.392 193.335L142.392 146.569Z"
          fill="white"
        />
      </g>
      <path
        style={{ mixBlendMode: "multiply" }}
        opacity="0.2"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M102 48.464C105.713 46.3204 110.287 46.3204 114 48.464L161.756 76.0358C165.469 78.1794 167.756 82.1409 167.756 86.4281V141.572C167.756 145.859 165.469 149.82 161.756 151.964L114 179.536C110.287 181.679 105.713 181.679 102 179.536L54.2442 151.964C50.5314 149.82 48.2442 145.859 48.2442 141.572L48.2442 86.4281C48.2442 82.1409 50.5314 78.1794 54.2442 76.0358L102 48.464Z"
        fill="#0602F3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M162 68.0311C162 66.8044 162.747 65.7013 163.886 65.2457L174.531 60.9874C175.714 60.5145 177 61.3852 177 62.6587V108.969C177 110.196 176.253 111.299 175.114 111.754L162 117V68.0311Z"
        fill="url(#paint1_linear_503_13462)"
        stroke="url(#paint2_linear_503_13462)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask
        id="mask3_503_13462"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="160"
        y="61"
        width="19"
        height="55"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M162 70.0622C162 67.6088 163.494 65.4025 165.772 64.4913L168.772 63.2913C172.713 61.7149 177 64.6174 177 68.8622V106.938C177 109.391 175.506 111.597 173.228 112.509L170.228 113.709C166.287 115.285 162 112.383 162 108.138V70.0622Z"
          fill="white"
          stroke="white"
          strokeWidth="3"
        />
      </mask>
      <g mask="url(#mask3_503_13462)">
        <g opacity="0.04">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M116.996 38.0303C111.426 34.8149 104.565 34.8149 98.9955 38.0303L51.8999 65.221C46.3307 68.4363 42.8999 74.3786 42.8999 80.8094V135.191C42.8999 141.622 46.3307 147.564 51.8999 150.779L98.9955 177.97C104.565 181.185 111.426 181.185 116.995 177.97L164.091 150.779C169.66 147.564 173.091 141.621 173.091 135.191L173.091 80.8094C173.091 74.3786 169.66 68.4364 164.091 65.221L116.996 38.0303Z"
            fill="#0602F3"
            style={{ mixBlendMode: "multiply" }}
          />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M54 68.0311C54 66.8044 53.2531 65.7013 52.1141 65.2457L41.4685 60.9874C40.2861 60.5145 39 61.3852 39 62.6587V108.969C39 110.196 39.7468 111.299 40.8858 111.754L54 117V68.0311Z"
        fill="url(#paint3_linear_503_13462)"
        stroke="url(#paint4_linear_503_13462)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask
        id="mask4_503_13462"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="37"
        y="61"
        width="19"
        height="55"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M54 70.0622C54 67.6088 52.5062 65.4025 50.2283 64.4913L47.2283 63.2913C43.2871 61.7149 39 64.6174 39 68.8622V106.938C39 109.391 40.4937 111.597 42.7716 112.509L45.7716 113.709C49.7128 115.285 54 112.383 54 108.138V70.0622Z"
          fill="white"
          stroke="white"
          strokeWidth="3"
        />
      </mask>
      <g mask="url(#mask4_503_13462)">
        <g opacity="0.04">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M98.9955 38.0303C104.565 34.8149 111.426 34.8149 116.995 38.0303L164.091 65.221C169.66 68.4363 173.091 74.3786 173.091 80.8094V135.191C173.091 141.622 169.66 147.564 164.091 150.779L116.995 177.97C111.426 181.185 104.565 181.185 98.9955 177.97L51.8999 150.779C46.3307 147.564 42.8999 141.621 42.8999 135.191L42.8999 80.8094C42.8999 74.3786 46.3307 68.4364 51.8999 65.221L98.9955 38.0303Z"
            fill="#0602F3"
            style={{ mixBlendMode: "multiply" }}
          />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M147 52.0621C147 50.0437 145.047 48.6012 143.118 49.1947L108 60.0002L72.8822 49.1947C70.9531 48.6012 69 50.0437 69 52.0621V96.0002C69 97.6571 70.3431 99.0002 72 99.0002H144C145.657 99.0002 147 97.6571 147 96.0002V52.0621Z"
        fill="url(#paint5_linear_503_13462)"
        stroke="url(#paint6_linear_503_13462)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask
        id="mask5_503_13462"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="67"
        y="47"
        width="82"
        height="27"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M147 52.0619C147 50.0435 145.047 48.601 143.118 49.1945L108 60L72.8822 49.1945C70.9531 48.601 69 50.0435 69 52.0619V69C69 70.6569 70.3431 72 72 72H144C145.657 72 147 70.6569 147 69V52.0619Z"
          fill="white"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask5_503_13462)">
        <g opacity="0.04">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M98.9956 38.0303C104.565 34.8149 111.426 34.8149 116.996 38.0303L164.091 65.221C169.66 68.4363 173.091 74.3786 173.091 80.8094V135.191C173.091 141.622 169.66 147.564 164.091 150.779L116.996 177.97C111.426 181.185 104.565 181.185 98.9957 177.97L51.9001 150.779C46.3309 147.564 42.9001 141.621 42.9001 135.191L42.9001 80.8094C42.9001 74.3786 46.3309 68.4364 51.9001 65.221L98.9956 38.0303Z"
            fill="#0602F3"
            style={{ mixBlendMode: "multiply" }}
          />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M102 42.4641C105.713 40.3205 110.287 40.3205 114 42.4641L161.756 70.0359C165.469 72.1795 167.756 76.141 167.756 80.4282V135.572C167.756 139.859 165.469 143.821 161.756 145.964L114 173.536C110.287 175.679 105.713 175.679 102 173.536L54.2442 145.964C50.5314 143.821 48.2442 139.859 48.2442 135.572V80.4282C48.2442 76.141 50.5314 72.1795 54.2442 70.0359L102 42.4641Z"
        fill="url(#paint7_linear_503_13462)"
        stroke="#FFF04D"
        strokeOpacity="0.4"
        strokeWidth="3"
      />
      <path
        d="M113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9942 71.3349C51.7455 73.2105 49.7442 76.6768 49.7442 80.4281L49.7442 135.572C49.7442 139.323 51.7455 142.789 54.9942 144.665L102.75 172.237C105.999 174.112 110.001 174.112 113.25 172.237L161.006 144.665C164.254 142.789 166.256 139.323 166.256 135.572V80.4281C166.256 76.6768 164.254 73.2105 161.006 71.3349L113.25 43.7631Z"
        stroke="#F9B307"
        strokeWidth="3"
      />
      <path
        opacity="0.4"
        d="M113.25 172.237C118.866 168.994 122.846 166.696 125.189 165.344"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M166.256 135.572V80.4281C166.256 76.6768 164.254 73.2105 161.006 71.3349L113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9942 71.3349C51.7455 73.2105 49.7442 76.6768 49.7442 80.4281L49.7442 135.572"
        stroke="#FAC00E"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        opacity="0.6"
        d="M166.256 80.4281C166.256 76.6768 164.254 73.2105 161.006 71.3349L113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9942 71.3349C51.7455 73.2105 49.7442 76.6768 49.7442 80.4281"
        stroke="#FDDB3D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        opacity="0.6"
        d="M113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631C102.75 43.7631 86.8314 52.9537 78.8721 57.549"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M102.75 43.7629C102.75 43.7629 94.3251 48.627 90.811 50.6559"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g filter="url(#filter2_d_503_13462)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M105 61.7321C106.856 60.6603 109.144 60.6603 111 61.7321L146.569 82.268C148.426 83.3397 149.569 85.3205 149.569 87.4641V128.536C149.569 130.679 148.426 132.66 146.569 133.732L111 154.268C109.144 155.34 106.856 155.34 105 154.268L69.4307 133.732C67.5743 132.66 66.4307 130.679 66.4307 128.536V87.4641C66.4307 85.3205 67.5743 83.3397 69.4307 82.268L105 61.7321Z"
          fill="url(#paint8_linear_503_13462)"
        />
        <path
          d="M111.75 60.433C109.429 59.0933 106.57 59.0933 104.25 60.433L68.6807 80.9689C66.3602 82.3087 64.9307 84.7846 64.9307 87.4641V128.536C64.9307 131.215 66.3602 133.691 68.6807 135.031L104.25 155.567C106.57 156.907 109.429 156.907 111.75 155.567L147.319 135.031C149.64 133.691 151.069 131.215 151.069 128.536V87.4641C151.069 84.7846 149.64 82.3087 147.319 80.9689L111.75 60.433Z"
          stroke="#F5900D"
          strokeOpacity="0.1"
          strokeWidth="3"
          style={{ mixBlendMode: "multiply" }}
        />
      </g>
      <mask
        id="mask6_503_13462"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="66"
        y="60"
        width="84"
        height="96"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M105 61.7321C106.856 60.6603 109.144 60.6603 111 61.7321L146.569 82.268C148.426 83.3397 149.569 85.3205 149.569 87.4641V128.536C149.569 130.679 148.426 132.66 146.569 133.732L111 154.268C109.144 155.34 106.856 155.34 105 154.268L69.4307 133.732C67.5743 132.66 66.4307 130.679 66.4307 128.536V87.4641C66.4307 85.3205 67.5743 83.3397 69.4307 82.268L105 61.7321Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask6_503_13462)">
        <g style={{ mixBlendMode: "multiply" }} opacity="0.3">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M108 108L60 120V96L108 108ZM108 108L120 60H96L108 108ZM108 108L156 96V120L108 108ZM108 108L133.456 65.5736L150.426 82.5442L108 108ZM108 108L133.456 150.426L150.426 133.456L108 108ZM108 108L96 156H120L108 108ZM108 108L82.5441 150.426L65.5735 133.456L108 108Z"
            fill="#FFD640"
          />
          <path d="M82.5441 65.5736L65.5735 82.5442L108 108L82.5441 65.5736Z" fill="#FFD640" />
        </g>
        <path
          opacity="0.4"
          d="M145.819 83.5668L110.25 63.0309C108.858 62.227 107.142 62.227 105.75 63.0309C101.567 65.4461 98.6026 67.1574 96.8576 68.1648C93.2262 70.2615 90.2621 71.9728 87.9653 73.2988C84.0132 75.5806 78.085 79.0032 70.1807 83.5668"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          opacity="0.4"
          d="M145.819 132.33L110.25 152.865C108.858 153.669 107.142 153.669 105.75 152.865"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M105.75 63.0308C101.567 65.446 98.6026 67.1573 96.8576 68.1647"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g filter="url(#filter3_d_503_13462)">
        <path
          d="M100.349 97.4699L108 86.3068L115.65 97.4699L128.631 101.296L120.379 112.022L120.751 125.55L108 121.016L95.2489 125.55L95.621 112.022L87.3684 101.296L100.349 97.4699Z"
          fill="white"
        />
        <path
          d="M110.475 84.6108C109.915 83.7946 108.989 83.3068 108 83.3068C107.01 83.3068 106.085 83.7946 105.525 84.6108L98.4778 94.894L86.5201 98.4189C85.571 98.6986 84.8209 99.4284 84.5152 100.369C84.2094 101.31 84.3873 102.342 84.9907 103.126L92.5928 113.006L92.25 125.468C92.2228 126.457 92.6851 127.396 93.4855 127.977C94.286 128.559 95.3218 128.708 96.254 128.377L108 124.2L119.746 128.377C120.678 128.708 121.714 128.559 122.514 127.977C123.315 127.396 123.777 126.457 123.75 125.468L123.407 113.006L131.009 103.126C131.612 102.342 131.79 101.31 131.485 100.369C131.179 99.4284 130.429 98.6986 129.48 98.4189L117.522 94.894L110.475 84.6108Z"
          stroke="white"
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M100.349 97.4699L108 86.3068L115.65 97.4699L128.631 101.296L120.379 112.022L120.751 125.55L108 121.016L95.2489 125.55L95.621 112.022L87.3684 101.296L100.349 97.4699Z"
        fill="url(#paint9_linear_503_13462)"
      />
      <path opacity="0.4" d="M108 108V86.3068L100.248 97.3163L108 108Z" fill="url(#paint10_linear_503_13462)" />
      <path opacity="0.8" d="M108 108L100.248 97.3162L87.3684 101.296L108 108Z" fill="url(#paint11_linear_503_13462)" />
      <path opacity="0.5" d="M108 108L95.4475 112.084L95.2489 125.55L108 108Z" fill="url(#paint12_linear_503_13462)" />
      <path
        opacity="0.4"
        d="M120.751 125.55L120.552 112.084L108 108L120.751 125.55Z"
        fill="url(#paint13_linear_503_13462)"
      />
      <path d="M120.552 112.084L128.631 101.297L108 108L120.552 112.084Z" fill="#FEBA1B" />
      <path
        opacity="0.6"
        d="M128.631 101.296L115.752 97.3162L108 108L128.631 101.296Z"
        fill="url(#paint14_linear_503_13462)"
      />
      <g filter="url(#filter4_d_503_13462)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M140.733 89.3398L139.175 88.7253C138.222 88.3495 137.754 87.2724 138.13 86.3195C138.318 85.8415 138.697 85.4632 139.175 85.2747L140.733 84.6602C142.529 83.9516 143.952 82.5294 144.66 80.7327L145.275 79.1747C145.65 78.2218 146.728 77.754 147.68 78.1298C148.158 78.3183 148.537 78.6967 148.725 79.1747L149.34 80.7327C150.048 82.5294 151.471 83.9516 153.267 84.6602L154.825 85.2747C155.778 85.6505 156.246 86.7276 155.87 87.6805C155.682 88.1585 155.303 88.5368 154.825 88.7253L153.267 89.3398C151.471 90.0484 150.048 91.4706 149.34 93.2673L148.725 94.8253C148.349 95.7782 147.272 96.246 146.319 95.8702C145.842 95.6817 145.463 95.3033 145.275 94.8253L144.66 93.2673C143.952 91.4706 142.529 90.0484 140.733 89.3398Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter5_d_503_13462)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M73.8218 139.56L72.7831 139.15C72.1478 138.9 71.836 138.182 72.0865 137.546C72.2122 137.228 72.4644 136.975 72.7831 136.85L73.8218 136.44C75.0195 135.968 75.9677 135.02 76.4401 133.822L76.8497 132.783C77.1003 132.148 77.8183 131.836 78.4536 132.087C78.7723 132.212 79.0245 132.464 79.1502 132.783L79.5598 133.822C80.0322 135.02 80.9804 135.968 82.1781 136.44L83.2168 136.85C83.8521 137.1 84.1639 137.818 83.9134 138.454C83.7877 138.772 83.5355 139.025 83.2168 139.15L82.1781 139.56C80.9804 140.032 80.0322 140.98 79.5598 142.178L79.1502 143.217C78.8996 143.852 78.1816 144.164 77.5463 143.913C77.2277 143.788 76.9754 143.536 76.8497 143.217L76.4401 142.178C75.9677 140.98 75.0195 140.032 73.8218 139.56Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter6_d_503_13462)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M62.2772 93.4498L60.9789 92.9378C60.1848 92.6246 59.795 91.727 60.1081 90.9329C60.2652 90.5346 60.5805 90.2193 60.9789 90.0622L62.2772 89.5502C63.7744 88.9597 64.9596 87.7745 65.5501 86.2773L66.0622 84.9789C66.3754 84.1849 67.2729 83.795 68.067 84.1082C68.4653 84.2653 68.7806 84.5806 68.9377 84.9789L69.4498 86.2773C70.0403 87.7745 71.2255 88.9597 72.7227 89.5502L74.021 90.0622C74.8151 90.3754 75.2049 91.273 74.8918 92.0671C74.7347 92.4654 74.4194 92.7807 74.021 92.9378L72.7227 93.4498C71.2255 94.0403 70.0403 95.2255 69.4498 96.7227L68.9377 98.0211C68.6246 98.8151 67.727 99.205 66.9329 98.8918C66.5346 98.7347 66.2193 98.4194 66.0622 98.0211L65.5501 96.7227C64.9596 95.2255 63.7744 94.0403 62.2772 93.4498Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter7_d_503_13462)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M139.366 137.67L138.587 137.363C138.111 137.175 137.877 136.636 138.065 136.16C138.159 135.921 138.348 135.732 138.587 135.637L139.366 135.33C140.265 134.976 140.976 134.265 141.33 133.366L141.637 132.587C141.825 132.111 142.364 131.877 142.84 132.065C143.079 132.159 143.268 132.348 143.363 132.587L143.67 133.366C144.024 134.265 144.735 134.976 145.634 135.33L146.413 135.637C146.889 135.825 147.123 136.364 146.935 136.84C146.841 137.079 146.652 137.268 146.413 137.363L145.634 137.67C144.735 138.024 144.024 138.735 143.67 139.634L143.363 140.413C143.175 140.889 142.636 141.123 142.16 140.935C141.921 140.841 141.732 140.652 141.637 140.413L141.33 139.634C140.976 138.735 140.265 138.024 139.366 137.67Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_503_13462"
          x="32.3048"
          y="99"
          width="102.48"
          height="121.512"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.401412 0 0 0 0 0.333333 0 0 0 0 0.819608 0 0 0 0.2 0" />
          <feBlend mode="darken" in2="BackgroundImageFix" result="effect1_dropShadow_503_13462" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13462" result="shape" />
        </filter>
        <filter
          id="filter1_d_503_13462"
          x="81.2153"
          y="99"
          width="102.48"
          height="121.512"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.401412 0 0 0 0 0.333333 0 0 0 0 0.819608 0 0 0 0.2 0" />
          <feBlend mode="darken" in2="BackgroundImageFix" result="effect1_dropShadow_503_13462" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13462" result="shape" />
        </filter>
        <filter
          id="filter2_d_503_13462"
          x="57.4307"
          y="54.9282"
          width="101.138"
          height="112.144"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.927721 0 0 0 0 0.665867 0 0 0 0 0.0535899 0 0 0 0.4 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13462" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13462" result="shape" />
        </filter>
        <filter
          id="filter3_d_503_13462"
          x="75.3683"
          y="77.3068"
          width="65.2632"
          height="63.2435"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.996078 0 0 0 0 0.733333 0 0 0 0 0.105882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13462" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13462" result="shape" />
        </filter>
        <filter
          id="filter4_d_503_13462"
          x="132"
          y="72"
          width="30"
          height="30"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13462" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13462" result="shape" />
        </filter>
        <filter
          id="filter5_d_503_13462"
          x="66"
          y="126"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13462" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13462" result="shape" />
        </filter>
        <filter
          id="filter6_d_503_13462"
          x="54"
          y="78"
          width="27"
          height="27"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13462" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13462" result="shape" />
        </filter>
        <filter
          id="filter7_d_503_13462"
          x="132"
          y="126"
          width="21"
          height="21"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13462" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13462" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_503_13462" x1="24" y1="24" x2="24" y2="192" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6F61EC" />
          <stop offset="1" stopColor="#3D2CD4" />
        </linearGradient>
        <linearGradient id="paint1_linear_503_13462" x1="177" y1="60" x2="177" y2="117" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7C71A" />
          <stop offset="1" stopColor="#FBAA00" />
        </linearGradient>
        <linearGradient id="paint2_linear_503_13462" x1="177" y1="60" x2="177" y2="117" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient id="paint3_linear_503_13462" x1="39" y1="60" x2="39" y2="117" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7C71A" />
          <stop offset="1" stopColor="#FBAA00" />
        </linearGradient>
        <linearGradient id="paint4_linear_503_13462" x1="39" y1="60" x2="39" y2="117" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_503_13462"
          x1="69"
          y1="49.0613"
          x2="69"
          y2="99.0002"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F7C71A" />
          <stop offset="1" stopColor="#FBAA00" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_503_13462"
          x1="69"
          y1="49.0613"
          x2="69"
          y2="99.0002"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient id="paint7_linear_503_13462" x1="39" y1="39" x2="39" y2="177" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE046" />
          <stop offset="1" stopColor="#F9B800" />
        </linearGradient>
        <linearGradient id="paint8_linear_503_13462" x1="60" y1="60" x2="60" y2="156" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF550" />
          <stop offset="1" stopColor="#FFD541" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_503_13462"
          x1="86.3065"
          y1="86.3068"
          x2="86.3065"
          y2="129.693"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FCA50E" />
          <stop offset="1" stopColor="#FFC823" />
        </linearGradient>
        <linearGradient
          id="paint10_linear_503_13462"
          x1="100.248"
          y1="80.8834"
          x2="87.4197"
          y2="90.0519"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFEC36" stopOpacity="0.467505" />
          <stop offset="1" stopColor="#FFF7AB" />
        </linearGradient>
        <linearGradient
          id="paint11_linear_503_13462"
          x1="87.4988"
          y1="99.9533"
          x2="99.5878"
          y2="114.834"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFED08" stopOpacity="0.8" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint12_linear_503_13462"
          x1="101.624"
          y1="129.938"
          x2="111.87"
          y2="115.051"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFED08" stopOpacity="0.01" />
          <stop offset="1" stopColor="#FFEF63" />
        </linearGradient>
        <linearGradient
          id="paint13_linear_503_13462"
          x1="108"
          y1="103.612"
          x2="97.7548"
          y2="118.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFEC36" stopOpacity="0.467505" />
          <stop offset="1" stopColor="#FFE94A" />
        </linearGradient>
        <linearGradient
          id="paint14_linear_503_13462"
          x1="108"
          y1="94.6452"
          x2="104.759"
          y2="107.161"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFEC36" stopOpacity="0.467505" />
          <stop offset="1" stopColor="#FFF7AB" />
        </linearGradient>
      </defs>
    </svg>
  ) : (
    <svg width="216" height="216" viewBox="0 0 216 216" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <mask
        id="mask0_503_14653"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="24"
        y="24"
        width="168"
        height="169"
      >
        <circle cx="108" cy="108" r="84" fill="white" />
      </mask>
      <g mask="url(#mask0_503_14653)">
        <g style={{ mixBlendMode: "screen" }} opacity="0.24">
          <circle cx="108" cy="108" r="84" fill="white" />
        </g>
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.04">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33 32.9989C26.3726 32.9989 21 38.3715 21 44.9989C21 51.6263 26.3726 56.9989 33 56.9989H54C60.6274 56.9989 66 51.6263 66 44.9989C66 38.3715 60.6274 32.9989 54 32.9989H33ZM141 81.0007C134.373 81.0007 129 86.3733 129 93.0007C129 99.6282 134.373 105.001 141 105.001H213C219.627 105.001 225 99.6282 225 93.0007C225 86.3733 219.627 81.0007 213 81.0007H141ZM108 165C108 158.372 113.373 153 120 153H192C198.627 153 204 158.372 204 165C204 171.627 198.627 177 192 177H120C113.373 177 108 171.627 108 165ZM30 129C23.3726 129 18 134.373 18 141C18 147.627 23.3726 153 30 153H78C84.6274 153 90 147.627 90 141C90 134.373 84.6274 129 78 129H30ZM12 101.999C12 98.6856 14.6863 95.9993 18 95.9993H45C48.3137 95.9993 51 98.6856 51 101.999C51 105.313 48.3137 107.999 45 107.999H18C14.6863 107.999 12 105.313 12 101.999ZM18 68.9996C14.6863 68.9996 12 71.6859 12 74.9996C12 78.3133 14.6863 80.9996 18 80.9996H102C105.314 80.9996 108 78.3133 108 74.9996C108 71.6859 105.314 68.9996 102 68.9996H18ZM90 38.9989C90 35.6852 92.6863 32.9989 96 32.9989H180C183.314 32.9989 186 35.6852 186 38.9989C186 42.3126 183.314 44.9989 180 44.9989H96C92.6863 44.9989 90 42.3126 90 38.9989ZM6 171C2.68629 171 0 173.686 0 177C0 180.314 2.68629 183 6 183H90C93.3137 183 96 180.314 96 177C96 173.686 93.3137 171 90 171H6ZM129 63.0011C129 59.6874 131.686 57.0011 135 57.0011H219C222.314 57.0011 225 59.6874 225 63.0011C225 66.3148 222.314 69.0011 219 69.0011H135C131.686 69.0011 129 66.3148 129 63.0011ZM118.6 116.999C113.74 116.999 109.8 120.939 109.8 125.799C109.8 130.659 113.74 134.599 118.6 134.599H191.4C196.26 134.599 200.2 130.659 200.2 125.799C200.2 120.939 196.26 116.999 191.4 116.999H118.6Z"
            fill="black"
          />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M87.2157 96L128.785 120L80.2803 204.012C79.149 205.972 76.3384 206.021 75.1387 204.103L63.3753 185.293L41.2034 184.511C38.9422 184.431 37.5798 181.972 38.7111 180.012L87.2157 96Z"
        fill="#A1C7FF"
      />
      <mask
        id="mask1_503_14653"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="38"
        y="96"
        width="91"
        height="110"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M87.2157 96L128.785 120L80.2803 204.012C79.149 205.972 76.3384 206.021 75.1387 204.103L63.3753 185.293L41.2034 184.511C38.9422 184.431 37.5798 181.972 38.7111 180.012L87.2157 96Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask1_503_14653)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M73.608 143.569L94.3926 155.569L67.3926 202.335L46.608 190.335L73.608 143.569Z"
          fill="#E7F1FF"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M128.785 96L87.2154 120L135.72 204.012C136.851 205.972 139.662 206.021 140.862 204.103L152.625 185.293L174.797 184.511C177.058 184.431 178.421 181.972 177.289 180.012L128.785 96Z"
        fill="#A1C7FF"
      />
      <mask
        id="mask2_503_14653"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="87"
        y="96"
        width="91"
        height="110"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M128.785 96L87.2154 120L135.72 204.012C136.851 205.972 139.662 206.021 140.862 204.103L152.625 185.293L174.797 184.511C177.058 184.431 178.421 181.972 177.289 180.012L128.785 96Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask2_503_14653)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M142.392 143.569L121.608 155.569L148.608 202.335L169.392 190.335L142.392 143.569Z"
          fill="#E7F1FF"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M162 68.0311C162 66.8044 162.747 65.7013 163.886 65.2457L174.531 60.9874C175.714 60.5145 177 61.3852 177 62.6587V108.969C177 110.196 176.253 111.299 175.114 111.754L162 117V68.0311Z"
        fill="#A1C7FF"
      />
      <mask
        id="mask3_503_14653"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="162"
        y="60"
        width="15"
        height="57"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M162 68.0311C162 66.8044 162.747 65.7013 163.886 65.2457L174.531 60.9874C175.714 60.5145 177 61.3852 177 62.6587V108.969C177 110.196 176.253 111.299 175.114 111.754L162 117V68.0311Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask3_503_14653)"></g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M54 68.0311C54 66.8044 53.2531 65.7013 52.1142 65.2457L41.4685 60.9874C40.2861 60.5145 39 61.3852 39 62.6587V108.969C39 110.196 39.7469 111.299 40.8858 111.754L54 117V68.0311Z"
        fill="#A1C7FF"
      />
      <mask
        id="mask4_503_14653"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="39"
        y="60"
        width="15"
        height="57"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M54 68.0311C54 66.8044 53.2531 65.7013 52.1142 65.2457L41.4685 60.9874C40.2861 60.5145 39 61.3852 39 62.6587V108.969C39 110.196 39.7469 111.299 40.8858 111.754L54 117V68.0311Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask4_503_14653)"></g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M147 52.0617C147 50.0433 145.047 48.6008 143.118 49.1944L108 59.9998L72.8823 49.1944C70.9531 48.6008 69 50.0433 69 52.0617V95.9998C69 97.6567 70.3431 98.9998 72 98.9998H144C145.657 98.9998 147 97.6567 147 95.9998V52.0617Z"
        fill="#A1C7FF"
      />
      <mask
        id="mask5_503_14653"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="69"
        y="49"
        width="78"
        height="50"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M147 52.0617C147 50.0433 145.047 48.6008 143.118 49.1944L108 59.9998L72.8823 49.1944C70.9531 48.6008 69 50.0433 69 52.0617V95.9998C69 97.6567 70.3431 98.9998 72 98.9998H144C145.657 98.9998 147 97.6567 147 95.9998V52.0617Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask5_503_14653)"></g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M102 42.4641C105.713 40.3205 110.287 40.3205 114 42.4641L161.756 70.0359C165.469 72.1795 167.756 76.141 167.756 80.4282V135.572C167.756 139.859 165.469 143.821 161.756 145.964L114 173.536C110.287 175.679 105.713 175.679 102 173.536L54.2442 145.964C50.5314 143.821 48.2442 139.859 48.2442 135.572V80.4282C48.2442 76.141 50.5314 72.1795 54.2442 70.0359L102 42.4641Z"
        fill="#B6D5FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M105 61.7321C106.856 60.6603 109.144 60.6603 111 61.7321L146.569 82.268C148.426 83.3397 149.569 85.3205 149.569 87.4641V128.536C149.569 130.679 148.426 132.66 146.569 133.732L111 154.268C109.144 155.34 106.856 155.34 105 154.268L69.4308 133.732C67.5744 132.66 66.4308 130.679 66.4308 128.536V87.4641C66.4308 85.3205 67.5744 83.3397 69.4308 82.268L105 61.7321Z"
        fill="#D6E7FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M108 124.2L96.2542 128.377C94.2681 129.083 92.1922 127.575 92.2501 125.468L92.5929 113.006L84.9908 103.126C83.7054 101.455 84.4984 99.0148 86.5202 98.4188L98.4779 94.8939L105.525 84.6108C106.717 82.872 109.283 82.872 110.475 84.6108L117.522 94.8939L129.48 98.4188C131.502 99.0148 132.295 101.455 131.009 103.126L123.407 113.006L123.75 125.468C123.808 127.575 121.732 129.083 119.746 128.377L108 124.2Z"
        fill="#A1C7FF"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

export const TrophyLevel5: React.FC<TrophyLevelProps> = ({ achieved, ...rest }) =>
  achieved ? (
    <svg width="216" height="221" viewBox="0 0 216 221" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <mask
        id="mask0_503_13463"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="24"
        y="24"
        width="168"
        height="169"
      >
        <circle cx="108" cy="108" r="84" fill="white" />
      </mask>
      <g mask="url(#mask0_503_13463)">
        <circle cx="108" cy="108" r="84" fill="url(#paint0_linear_503_13463)" />
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.04">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33.0002 32.9989C26.3728 32.9989 21.0002 38.3715 21.0002 44.9989C21.0002 51.6263 26.3728 56.9989 33.0002 56.9989H54.0002C60.6276 56.9989 66.0002 51.6263 66.0002 44.9989C66.0002 38.3715 60.6276 32.9989 54.0002 32.9989H33.0002ZM141 81.0007C134.373 81.0007 129 86.3733 129 93.0007C129 99.6282 134.373 105.001 141 105.001H213C219.628 105.001 225 99.6282 225 93.0007C225 86.3733 219.628 81.0007 213 81.0007H141ZM108 165C108 158.372 113.373 153 120 153H192C198.628 153 204 158.372 204 165C204 171.627 198.628 177 192 177H120C113.373 177 108 171.627 108 165ZM30.0001 129C23.3727 129 18.0001 134.373 18.0001 141C18.0001 147.627 23.3727 153 30.0001 153H78.0001C84.6275 153 90.0001 147.627 90.0001 141C90.0001 134.373 84.6275 129 78.0001 129H30.0001ZM12.0001 101.999C12.0001 98.6856 14.6864 95.9993 18.0001 95.9993H45.0001C48.3138 95.9993 51.0001 98.6856 51.0001 101.999C51.0001 105.313 48.3138 107.999 45.0001 107.999H18.0001C14.6864 107.999 12.0001 105.313 12.0001 101.999ZM18.0001 68.9996C14.6864 68.9996 12.0001 71.6859 12.0001 74.9996C12.0001 78.3133 14.6864 80.9996 18.0001 80.9996H102C105.314 80.9996 108 78.3133 108 74.9996C108 71.6859 105.314 68.9996 102 68.9996H18.0001ZM90 38.9989C90 35.6852 92.6863 32.9989 96 32.9989H180C183.314 32.9989 186 35.6852 186 38.9989C186 42.3126 183.314 44.9989 180 44.9989H96C92.6863 44.9989 90 42.3126 90 38.9989ZM6.00009 171C2.68638 171 9.15527e-05 173.686 9.15527e-05 177C9.15527e-05 180.314 2.68638 183 6.00009 183H90.0001C93.3138 183 96.0001 180.314 96.0001 177C96.0001 173.686 93.3138 171 90.0001 171H6.00009ZM129 63.0011C129 59.6874 131.686 57.0011 135 57.0011H219C222.314 57.0011 225 59.6874 225 63.0011C225 66.3148 222.314 69.0011 219 69.0011H135C131.686 69.0011 129 66.3148 129 63.0011ZM118.6 116.999C113.74 116.999 109.8 120.939 109.8 125.799C109.8 130.659 113.74 134.599 118.6 134.599H191.4C196.261 134.599 200.2 130.659 200.2 125.799C200.2 120.939 196.26 116.999 191.4 116.999H118.6Z"
            fill="black"
          />
        </g>
      </g>
      <g opacity="0.1">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M98.9956 38.0302C104.565 34.8148 111.426 34.8148 116.996 38.0302L164.091 65.2208C169.66 68.4362 173.091 74.3785 173.091 80.8093V135.191C173.091 141.621 169.66 147.564 164.091 150.779L116.996 177.97C111.426 181.185 104.565 181.185 98.9956 177.97L51.9001 150.779C46.3308 147.564 42.9001 141.621 42.9001 135.191L42.9001 80.8093C42.9001 74.3785 46.3308 68.4362 51.9001 65.2208L98.9956 38.0302Z"
          fill="#7705A4"
          style={{ mixBlendMode: "multiply" }}
        />
      </g>
      <g filter="url(#filter0_d_503_13463)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M66 99H114V190.146C114 192.376 111.653 193.827 109.658 192.829L90 183L70.3417 192.829C68.347 193.827 66 192.376 66 190.146V99Z"
          fill="#32B4FF"
        />
      </g>
      <g filter="url(#filter1_d_503_13463)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M102 99H150V190.146C150 192.376 147.653 193.827 145.658 192.829L126 183L106.342 192.829C104.347 193.827 102 192.376 102 190.146V99Z"
          fill="#32B4FF"
        />
      </g>
      <g filter="url(#filter2_d_503_13463)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M84 114H132V205.146C132 207.376 129.653 208.827 127.658 207.829L108 198L88.3417 207.829C86.347 208.827 84 207.376 84 205.146V114Z"
          fill="white"
        />
      </g>
      <mask
        id="mask1_503_13463"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="84"
        y="114"
        width="48"
        height="95"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M84 114H132V205.146C132 207.376 129.653 208.827 127.658 207.829L108 198L88.3417 207.829C86.347 208.827 84 207.376 84 205.146V114Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask1_503_13463)">
        <rect x="96.0001" y="114" width="24" height="96" fill="#F55462" />
      </g>
      <path
        style={{ mixBlendMode: "multiply" }}
        opacity="0.2"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M102 48.464C105.713 46.3204 110.287 46.3204 114 48.464L161.756 76.0358C165.469 78.1794 167.756 82.1409 167.756 86.4281V141.572C167.756 145.859 165.469 149.82 161.756 151.964L114 179.536C110.287 181.679 105.713 181.679 102 179.536L54.2443 151.964C50.5315 149.82 48.2443 145.859 48.2443 141.572L48.2443 86.4281C48.2443 82.1409 50.5315 78.1794 54.2443 76.0358L102 48.464Z"
        fill="#7705A4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M162 68.0311C162 66.8044 162.747 65.7013 163.886 65.2457L174.532 60.9874C175.714 60.5145 177 61.3852 177 62.6587V108.969C177 110.196 176.253 111.299 175.114 111.754L162 117V68.0311Z"
        fill="url(#paint1_linear_503_13463)"
        stroke="url(#paint2_linear_503_13463)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask
        id="mask2_503_13463"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="160"
        y="59"
        width="19"
        height="60"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M162 68.0311C162 66.8044 162.747 65.7013 163.886 65.2457L174.532 60.9874C175.714 60.5145 177 61.3852 177 62.6587V108.969C177 110.196 176.253 111.299 175.114 111.754L162 117V68.0311Z"
          fill="white"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask2_503_13463)">
        <g style={{ mixBlendMode: "multiply" }} opacity="0.6" filter="url(#filter3_i_503_13463)">
          <path
            d="M163.5 86.5L180.577 79.3846C181.342 79.066 181.703 78.1878 181.385 77.4231C181.066 76.6584 180.188 76.2968 179.423 76.6154L161.423 84.1154C160.864 84.3483 163.5 86.5 163.5 86.5Z"
            fill="#FABC10"
          />
        </g>
        <g style={{ mixBlendMode: "multiply" }} opacity="0.6" filter="url(#filter4_i_503_13463)">
          <path
            d="M163.5 104.5L180.577 97.3846C181.342 97.066 181.703 96.1878 181.385 95.4231C181.066 94.6584 180.188 94.2968 179.423 94.6154L161.423 102.115C160.864 102.348 163.5 104.5 163.5 104.5Z"
            fill="#FABC10"
          />
        </g>
        <g opacity="0.04">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M116.996 38.0302C111.426 34.8148 104.565 34.8148 98.9957 38.0302L51.9001 65.2208C46.3309 68.4362 42.9001 74.3785 42.9001 80.8093V135.191C42.9001 141.621 46.3309 147.564 51.9001 150.779L98.9957 177.97C104.565 181.185 111.426 181.185 116.996 177.97L164.091 150.779C169.66 147.564 173.091 141.621 173.091 135.191L173.091 80.8093C173.091 74.3785 169.66 68.4362 164.091 65.2208L116.996 38.0302Z"
            fill="#7705A4"
            style={{ mixBlendMode: "multiply" }}
          />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M54 68.0311C54 66.8044 53.2532 65.7013 52.1142 65.2457L41.4685 60.9874C40.2862 60.5145 39 61.3852 39 62.6587V108.969C39 110.196 39.7469 111.299 40.8859 111.754L54 117V68.0311Z"
        fill="url(#paint3_linear_503_13463)"
        stroke="url(#paint4_linear_503_13463)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask
        id="mask3_503_13463"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="37"
        y="59"
        width="19"
        height="60"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M54 68.0311C54 66.8044 53.2532 65.7013 52.1142 65.2457L41.4685 60.9874C40.2862 60.5145 39 61.3852 39 62.6587V108.969C39 110.196 39.7469 111.299 40.8859 111.754L54 117V68.0311Z"
          fill="white"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask3_503_13463)">
        <g style={{ mixBlendMode: "multiply" }} opacity="0.6" filter="url(#filter5_i_503_13463)">
          <path
            d="M52.5001 86.5L35.4232 79.3846C34.6585 79.066 34.2969 78.1878 34.6155 77.4231C34.9341 76.6584 35.8123 76.2968 36.577 76.6154L54.577 84.1154C55.136 84.3483 52.5001 86.5 52.5001 86.5Z"
            fill="#FABC10"
          />
        </g>
        <g style={{ mixBlendMode: "multiply" }} opacity="0.6" filter="url(#filter6_i_503_13463)">
          <path
            d="M52.5001 104.5L35.4232 97.3846C34.6585 97.066 34.2969 96.1878 34.6155 95.4231C34.9341 94.6584 35.8123 94.2968 36.577 94.6154L54.577 102.115C55.136 102.348 52.5001 104.5 52.5001 104.5Z"
            fill="#FABC10"
          />
        </g>
        <g opacity="0.04">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M98.9957 38.0302C104.565 34.8148 111.426 34.8148 116.996 38.0302L164.091 65.2208C169.66 68.4362 173.091 74.3785 173.091 80.8093V135.191C173.091 141.621 169.66 147.564 164.091 150.779L116.996 177.97C111.426 181.185 104.565 181.185 98.9957 177.97L51.9001 150.779C46.3309 147.564 42.9001 141.621 42.9001 135.191L42.9001 80.8093C42.9001 74.3785 46.3309 68.4362 51.9001 65.2208L98.9957 38.0302Z"
            fill="#7705A4"
            style={{ mixBlendMode: "multiply" }}
          />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M150 51.9774C150 49.9843 148.092 48.5453 146.176 49.0928L108 60.0002L69.8242 49.0928C67.9078 48.5453 66 49.9843 66 51.9774V96.0002C66 97.6571 67.3432 99.0002 69 99.0002H147C148.657 99.0002 150 97.6571 150 96.0002V51.9774Z"
        fill="url(#paint5_linear_503_13463)"
        stroke="url(#paint6_linear_503_13463)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M102 42.4641C105.713 40.3205 110.287 40.3205 114 42.4641L161.756 70.0359C165.469 72.1795 167.756 76.141 167.756 80.4282V135.572C167.756 139.859 165.469 143.821 161.756 145.964L114 173.536C110.287 175.679 105.713 175.679 102 173.536L54.2443 145.964C50.5315 143.821 48.2443 139.859 48.2443 135.572V80.4282C48.2443 76.141 50.5315 72.1795 54.2443 70.0359L102 42.4641Z"
        fill="url(#paint7_linear_503_13463)"
        stroke="#FFF04D"
        strokeOpacity="0.4"
        strokeWidth="3"
      />
      <g style={{ mixBlendMode: "multiply" }} opacity="0.8" filter="url(#filter7_i_503_13463)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M155.013 75.5654L112.55 51.0204C109.734 49.3931 106.266 49.3931 103.45 51.0204L60.987 75.5654C58.1716 77.1928 56.4373 80.2002 56.4373 83.4549V101.162L52.9949 106.332C52.3243 107.339 52.3243 108.65 52.9949 109.657L56.4373 114.827V132.545C56.4373 135.8 58.1716 138.807 60.987 140.434L103.45 164.979C106.266 166.607 109.734 166.607 112.55 164.979L155.013 140.434C157.828 138.807 159.562 135.8 159.562 132.545V114.827L163.005 109.657C163.676 108.65 163.676 107.339 163.005 106.332L159.562 101.162V83.4549C159.562 80.2002 157.828 77.1928 155.013 75.5654ZM59.4704 114.827V132.545C59.4704 134.715 60.6266 136.72 62.5035 137.805L104.967 162.35C106.844 163.434 109.156 163.434 111.033 162.35L153.496 137.805C155.373 136.72 156.529 134.715 156.529 132.545V114.827L153.087 109.657C152.416 108.65 152.416 107.339 153.087 106.332L156.529 101.162V83.4549C156.529 81.2851 155.373 79.2801 153.496 78.1952L111.033 53.6502C109.156 52.5653 106.844 52.5653 104.967 53.6502L62.5035 78.1952C60.6266 79.2801 59.4704 81.2851 59.4704 83.4549V101.162L62.9129 106.332C63.5835 107.339 63.5835 108.65 62.9129 109.657L59.4704 114.827Z"
          fill="#FABC10"
        />
      </g>
      <path
        d="M113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9943 71.3349C51.7456 73.2105 49.7443 76.6768 49.7443 80.4281L49.7443 135.572C49.7443 139.323 51.7456 142.789 54.9943 144.665L102.75 172.237C105.999 174.112 110.001 174.112 113.25 172.237L161.006 144.665C164.255 142.789 166.256 139.323 166.256 135.572V80.4281C166.256 76.6768 164.255 73.2105 161.006 71.3349L113.25 43.7631Z"
        stroke="#F9B307"
        strokeWidth="3"
      />
      <path
        opacity="0.4"
        d="M113.25 172.237C118.867 168.994 122.846 166.696 125.189 165.344"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M166.256 135.572V80.4281C166.256 76.6768 164.255 73.2105 161.006 71.3349L113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9943 71.3349C51.7456 73.2105 49.7443 76.6768 49.7443 80.4281L49.7443 135.572"
        stroke="#FAC00E"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        opacity="0.6"
        d="M166.256 80.4281C166.256 76.6768 164.255 73.2105 161.006 71.3349L113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9943 71.3349C51.7456 73.2105 49.7443 76.6768 49.7443 80.4281"
        stroke="#FDDB3D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        opacity="0.6"
        d="M113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631C102.75 43.7631 86.8314 52.9537 78.8721 57.549"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M102.75 43.7629C102.75 43.7629 94.3253 48.627 90.8111 50.6559"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g filter="url(#filter8_d_503_13463)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M105 61.7321C106.856 60.6603 109.144 60.6603 111 61.7321L146.569 82.268C148.426 83.3397 149.569 85.3205 149.569 87.4641V128.536C149.569 130.679 148.426 132.66 146.569 133.732L111 154.268C109.144 155.34 106.856 155.34 105 154.268L69.4308 133.732C67.5744 132.66 66.4308 130.679 66.4308 128.536V87.4641C66.4308 85.3205 67.5744 83.3397 69.4308 82.268L105 61.7321Z"
          fill="url(#paint8_linear_503_13463)"
        />
        <path
          d="M111.75 60.433C109.43 59.0933 106.571 59.0933 104.25 60.433L68.6808 80.9689C66.3603 82.3087 64.9308 84.7846 64.9308 87.4641V128.536C64.9308 131.215 66.3603 133.691 68.6808 135.031L104.25 155.567C106.571 156.907 109.43 156.907 111.75 155.567L147.319 135.031C149.64 133.691 151.069 131.215 151.069 128.536V87.4641C151.069 84.7846 149.64 82.3087 147.319 80.9689L111.75 60.433Z"
          stroke="#F5900D"
          strokeOpacity="0.1"
          strokeWidth="3"
          style={{ mixBlendMode: "multiply" }}
        />
      </g>
      <mask
        id="mask4_503_13463"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="66"
        y="60"
        width="84"
        height="96"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M105 61.7321C106.856 60.6603 109.144 60.6603 111 61.7321L146.569 82.268C148.426 83.3397 149.569 85.3205 149.569 87.4641V128.536C149.569 130.679 148.426 132.66 146.569 133.732L111 154.268C109.144 155.34 106.856 155.34 105 154.268L69.4308 133.732C67.5744 132.66 66.4308 130.679 66.4308 128.536V87.4641C66.4308 85.3205 67.5744 83.3397 69.4308 82.268L105 61.7321Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask4_503_13463)">
        <g style={{ mixBlendMode: "multiply" }} opacity="0.3">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M108 108L120 60H96L108 108ZM108 108L133.456 65.5737L150.426 82.5443L108 108ZM108 108L133.456 150.426L150.426 133.456L108 108L156 120V96L108 108L108 108L82.5442 65.5737L65.5736 82.5443L108 108L60 96V120L108 108L108 108L65.5737 133.456L82.5442 150.426L108 108L108 108L96 156H120L108 108ZM108 108L108 108L108 108L108 108Z"
            fill="#FFD640"
          />
        </g>
        <path
          opacity="0.4"
          d="M145.819 83.5671L110.25 63.0312C108.858 62.2274 107.142 62.2274 105.75 63.0312C101.567 65.4464 98.6027 67.1578 96.8578 68.1652C93.2263 70.2618 90.2622 71.9732 87.9655 73.2992C84.0133 75.5809 78.0851 79.0036 70.1808 83.5671"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          opacity="0.4"
          d="M145.819 132.33L110.25 152.866C108.858 153.67 107.142 153.67 105.75 152.866"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M105.75 63.0311C101.567 65.4463 98.6026 67.1577 96.8577 68.1651"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g filter="url(#filter9_d_503_13463)">
        <path fillRule="evenodd" clipRule="evenodd" d="M108 81L132 108L108 135L84 108L108 81Z" fill="white" />
        <path
          d="M110.242 79.0069C109.673 78.3664 108.857 78 108 78C107.143 78 106.327 78.3664 105.758 79.0069L81.7578 106.007C80.7474 107.144 80.7474 108.856 81.7578 109.993L105.758 136.993C106.327 137.634 107.143 138 108 138C108.857 138 109.673 137.634 110.242 136.993L134.242 109.993C135.253 108.856 135.253 107.144 134.242 106.007L110.242 79.0069Z"
          stroke="white"
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </g>
      <path fillRule="evenodd" clipRule="evenodd" d="M108 81L132 108H84L108 81Z" fill="url(#paint9_linear_503_13463)" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M108 135L132 108H84L108 135Z"
        fill="url(#paint10_linear_503_13463)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M108 81L96.4285 108H119.571L108 81Z"
        fill="url(#paint11_linear_503_13463)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M108 135L96.4285 108H119.571L108 135Z"
        fill="url(#paint12_linear_503_13463)"
      />
      <g filter="url(#filter10_d_503_13463)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M140.733 89.3398L139.175 88.7253C138.222 88.3495 137.754 87.2724 138.13 86.3195C138.318 85.8415 138.697 85.4632 139.175 85.2747L140.733 84.6602C142.529 83.9516 143.952 82.5294 144.66 80.7327L145.275 79.1747C145.651 78.2218 146.728 77.754 147.681 78.1298C148.158 78.3183 148.537 78.6967 148.725 79.1747L149.34 80.7327C150.048 82.5294 151.471 83.9516 153.267 84.6602L154.825 85.2747C155.778 85.6505 156.246 86.7276 155.87 87.6805C155.682 88.1585 155.303 88.5368 154.825 88.7253L153.267 89.3398C151.471 90.0484 150.048 91.4706 149.34 93.2673L148.725 94.8253C148.35 95.7782 147.272 96.246 146.32 95.8702C145.842 95.6817 145.463 95.3033 145.275 94.8253L144.66 93.2673C143.952 91.4706 142.529 90.0484 140.733 89.3398Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter11_d_503_13463)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M79.8219 136.56L78.7832 136.15C78.1479 135.9 77.8361 135.182 78.0866 134.546C78.2123 134.228 78.4645 133.975 78.7832 133.85L79.8219 133.44C81.0196 132.968 81.9678 132.02 82.4402 130.822L82.8498 129.783C83.1004 129.148 83.8184 128.836 84.4537 129.087C84.7723 129.212 85.0246 129.464 85.1503 129.783L85.5599 130.822C86.0323 132.02 86.9805 132.968 88.1782 133.44L89.2169 133.85C89.8522 134.1 90.164 134.818 89.9135 135.454C89.7878 135.772 89.5356 136.025 89.2169 136.15L88.1782 136.56C86.9805 137.032 86.0323 137.98 85.5599 139.178L85.1503 140.217C84.8997 140.852 84.1817 141.164 83.5464 140.913C83.2277 140.788 82.9755 140.536 82.8498 140.217L82.4402 139.178C81.9678 137.98 81.0196 137.032 79.8219 136.56Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter12_d_503_13463)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M62.2773 93.4498L60.979 92.9378C60.1849 92.6246 59.7951 91.727 60.1082 90.9329C60.2653 90.5346 60.5806 90.2193 60.979 90.0622L62.2773 89.5502C63.7745 88.9597 64.9597 87.7745 65.5502 86.2773L66.0623 84.9789C66.3754 84.1849 67.273 83.795 68.0671 84.1082C68.4654 84.2653 68.7807 84.5806 68.9378 84.9789L69.4499 86.2773C70.0404 87.7745 71.2256 88.9597 72.7228 89.5502L74.0211 90.0622C74.8152 90.3754 75.205 91.273 74.8919 92.0671C74.7348 92.4654 74.4195 92.7807 74.0211 92.9378L72.7228 93.4498C71.2256 94.0403 70.0404 95.2255 69.4499 96.7227L68.9378 98.0211C68.6246 98.8151 67.7271 99.205 66.933 98.8918C66.5347 98.7347 66.2194 98.4194 66.0623 98.0211L65.5502 96.7227C64.9597 95.2255 63.7745 94.0403 62.2773 93.4498Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter13_d_503_13463)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M139.366 137.67L138.587 137.363C138.111 137.175 137.877 136.636 138.065 136.16C138.159 135.921 138.348 135.732 138.587 135.637L139.366 135.33C140.265 134.976 140.976 134.265 141.33 133.366L141.637 132.587C141.825 132.111 142.364 131.877 142.84 132.065C143.079 132.159 143.268 132.348 143.363 132.587L143.67 133.366C144.024 134.265 144.735 134.976 145.634 135.33L146.413 135.637C146.889 135.825 147.123 136.364 146.935 136.84C146.841 137.079 146.652 137.268 146.413 137.363L145.634 137.67C144.735 138.024 144.024 138.735 143.67 139.634L143.363 140.413C143.175 140.889 142.636 141.123 142.16 140.935C141.921 140.841 141.732 140.652 141.637 140.413L141.33 139.634C140.976 138.735 140.265 138.024 139.366 137.67Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_503_13463"
          x="60"
          y="99"
          width="60"
          height="106.15"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.309804 0 0 0 0 0.247059 0 0 0 0 0.866667 0 0 0 0.2 0" />
          <feBlend mode="darken" in2="BackgroundImageFix" result="effect1_dropShadow_503_13463" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13463" result="shape" />
        </filter>
        <filter
          id="filter1_d_503_13463"
          x="96"
          y="99"
          width="60"
          height="106.15"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.309804 0 0 0 0 0.247059 0 0 0 0 0.866667 0 0 0 0.2 0" />
          <feBlend mode="darken" in2="BackgroundImageFix" result="effect1_dropShadow_503_13463" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13463" result="shape" />
        </filter>
        <filter
          id="filter2_d_503_13463"
          x="78"
          y="114"
          width="60"
          height="106.15"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.309804 0 0 0 0 0.247059 0 0 0 0 0.866667 0 0 0 0.2 0" />
          <feBlend mode="darken" in2="BackgroundImageFix" result="effect1_dropShadow_503_13463" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13463" result="shape" />
        </filter>
        <filter
          id="filter3_i_503_13463"
          x="161.345"
          y="76.4996"
          width="20.1551"
          height="13.0004"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.976471 0 0 0 0 0.713726 0 0 0 0 0.0352941 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_503_13463" />
        </filter>
        <filter
          id="filter4_i_503_13463"
          x="161.345"
          y="94.4996"
          width="20.1551"
          height="13.0004"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.976471 0 0 0 0 0.713726 0 0 0 0 0.0352941 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_503_13463" />
        </filter>
        <filter
          id="filter5_i_503_13463"
          x="34.4997"
          y="76.4996"
          width="20.1551"
          height="13.0004"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.976471 0 0 0 0 0.713726 0 0 0 0 0.0352941 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_503_13463" />
        </filter>
        <filter
          id="filter6_i_503_13463"
          x="34.4997"
          y="94.4996"
          width="20.1551"
          height="13.0004"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.976471 0 0 0 0 0.713726 0 0 0 0 0.0352941 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_503_13463" />
        </filter>
        <filter
          id="filter7_i_503_13463"
          x="52.492"
          y="49.7999"
          width="111.016"
          height="119.4"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.976471 0 0 0 0 0.713726 0 0 0 0 0.0352941 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_503_13463" />
        </filter>
        <filter
          id="filter8_d_503_13463"
          x="57.4308"
          y="54.9282"
          width="101.138"
          height="112.144"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.927721 0 0 0 0 0.665867 0 0 0 0 0.0535899 0 0 0 0.4 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13463" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13463" result="shape" />
        </filter>
        <filter
          id="filter9_d_503_13463"
          x="72"
          y="72"
          width="72"
          height="78"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.996078 0 0 0 0 0.733333 0 0 0 0 0.105882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13463" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13463" result="shape" />
        </filter>
        <filter
          id="filter10_d_503_13463"
          x="132"
          y="72"
          width="30"
          height="30"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13463" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13463" result="shape" />
        </filter>
        <filter
          id="filter11_d_503_13463"
          x="72"
          y="123"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13463" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13463" result="shape" />
        </filter>
        <filter
          id="filter12_d_503_13463"
          x="54"
          y="78"
          width="27"
          height="27"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13463" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13463" result="shape" />
        </filter>
        <filter
          id="filter13_d_503_13463"
          x="132"
          y="126"
          width="21"
          height="21"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13463" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13463" result="shape" />
        </filter>
        <linearGradient
          id="paint0_linear_503_13463"
          x1="26.5871"
          y1="24"
          x2="26.5871"
          y2="186.826"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AE66FF" />
          <stop offset="1" stopColor="#7E07E0" />
        </linearGradient>
        <linearGradient id="paint1_linear_503_13463" x1="177" y1="60" x2="177" y2="117" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7C71A" />
          <stop offset="1" stopColor="#FBAA00" />
        </linearGradient>
        <linearGradient id="paint2_linear_503_13463" x1="177" y1="60" x2="177" y2="117" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient id="paint3_linear_503_13463" x1="39" y1="60" x2="39" y2="117" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7C71A" />
          <stop offset="1" stopColor="#FBAA00" />
        </linearGradient>
        <linearGradient id="paint4_linear_503_13463" x1="39" y1="60" x2="39" y2="117" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_503_13463"
          x1="66"
          y1="49.0613"
          x2="66"
          y2="99.0002"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F7C71A" />
          <stop offset="1" stopColor="#FBAA00" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_503_13463"
          x1="66"
          y1="49.0613"
          x2="66"
          y2="99.0002"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient id="paint7_linear_503_13463" x1="39" y1="39" x2="39" y2="177" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE046" />
          <stop offset="1" stopColor="#F9B800" />
        </linearGradient>
        <linearGradient id="paint8_linear_503_13463" x1="60" y1="60" x2="60" y2="156" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF550" />
          <stop offset="1" stopColor="#FFD541" />
        </linearGradient>
        <linearGradient id="paint9_linear_503_13463" x1="84" y1="81" x2="84" y2="108" gradientUnits="userSpaceOnUse">
          <stop stopColor="#27DEEB" />
          <stop offset="1" stopColor="#08C9FF" />
        </linearGradient>
        <linearGradient id="paint10_linear_503_13463" x1="84" y1="108" x2="84" y2="135" gradientUnits="userSpaceOnUse">
          <stop stopColor="#009BF6" />
          <stop offset="1" stopColor="#00B5FF" />
        </linearGradient>
        <linearGradient
          id="paint11_linear_503_13463"
          x1="96.4285"
          y1="81"
          x2="96.4285"
          y2="108"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8AFFFF" />
          <stop offset="1" stopColor="#0DF3FF" />
        </linearGradient>
        <linearGradient
          id="paint12_linear_503_13463"
          x1="96.4285"
          y1="108"
          x2="96.4285"
          y2="135"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00BAF3" />
          <stop offset="1" stopColor="#00B5FF" />
        </linearGradient>
      </defs>
    </svg>
  ) : (
    <svg width="216" height="216" viewBox="0 0 216 216" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <mask
        id="mask0_503_14654"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="24"
        y="24"
        width="168"
        height="169"
      >
        <circle cx="108" cy="108" r="84" fill="white" />
      </mask>
      <g mask="url(#mask0_503_14654)">
        <g style={{ mixBlendMode: "screen" }} opacity="0.24">
          <circle cx="108" cy="108" r="84" fill="white" />
        </g>
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.04">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33 32.9989C26.3726 32.9989 21 38.3715 21 44.9989C21 51.6263 26.3726 56.9989 33 56.9989H54C60.6274 56.9989 66 51.6263 66 44.9989C66 38.3715 60.6274 32.9989 54 32.9989H33ZM141 81.0007C134.373 81.0007 129 86.3733 129 93.0007C129 99.6282 134.373 105.001 141 105.001H213C219.627 105.001 225 99.6282 225 93.0007C225 86.3733 219.627 81.0007 213 81.0007H141ZM108 165C108 158.372 113.373 153 120 153H192C198.627 153 204 158.372 204 165C204 171.627 198.627 177 192 177H120C113.373 177 108 171.627 108 165ZM30 129C23.3726 129 18 134.373 18 141C18 147.627 23.3726 153 30 153H78C84.6274 153 90 147.627 90 141C90 134.373 84.6274 129 78 129H30ZM12 101.999C12 98.6856 14.6863 95.9993 18 95.9993H45C48.3137 95.9993 51 98.6856 51 101.999C51 105.313 48.3137 107.999 45 107.999H18C14.6863 107.999 12 105.313 12 101.999ZM18 68.9996C14.6863 68.9996 12 71.6859 12 74.9996C12 78.3133 14.6863 80.9996 18 80.9996H102C105.314 80.9996 108 78.3133 108 74.9996C108 71.6859 105.314 68.9996 102 68.9996H18ZM90 38.9989C90 35.6852 92.6863 32.9989 96 32.9989H180C183.314 32.9989 186 35.6852 186 38.9989C186 42.3126 183.314 44.9989 180 44.9989H96C92.6863 44.9989 90 42.3126 90 38.9989ZM6 171C2.68629 171 0 173.686 0 177C0 180.314 2.68629 183 6 183H90C93.3137 183 96 180.314 96 177C96 173.686 93.3137 171 90 171H6ZM129 63.0011C129 59.6874 131.686 57.0011 135 57.0011H219C222.314 57.0011 225 59.6874 225 63.0011C225 66.3148 222.314 69.0011 219 69.0011H135C131.686 69.0011 129 66.3148 129 63.0011ZM118.6 116.999C113.74 116.999 109.8 120.939 109.8 125.799C109.8 130.659 113.74 134.599 118.6 134.599H191.4C196.26 134.599 200.2 130.659 200.2 125.799C200.2 120.939 196.26 116.999 191.4 116.999H118.6Z"
            fill="black"
          />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M63 99H111V190.146C111 192.376 108.653 193.827 106.658 192.829L87 183L67.3416 192.829C65.3469 193.827 63 192.376 63 190.146V99Z"
        fill="#A1C7FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M105 99H153V190.146C153 192.376 150.653 193.827 148.658 192.829L129 183L109.342 192.829C107.347 193.827 105 192.376 105 190.146V99Z"
        fill="#A1C7FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M84 114H132V205.146C132 207.376 129.653 208.827 127.658 207.829L108 198L88.3416 207.829C86.3469 208.827 84 207.376 84 205.146V114Z"
        fill="#E7F1FF"
      />
      <mask
        id="mask1_503_14654"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="84"
        y="114"
        width="48"
        height="95"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M84 114H132V205.146C132 207.376 129.653 208.827 127.658 207.829L108 198L88.3416 207.829C86.3469 208.827 84 207.376 84 205.146V114Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask1_503_14654)">
        <rect x="96" y="114" width="24" height="96" fill="#A1C7FF" />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M146.176 49.0925C148.092 48.5449 150 49.9839 150 51.977V95.9999C150 97.6567 148.657 98.9999 147 98.9999H69C67.3431 98.9999 66 97.6567 66 95.9999V51.977C66 49.9839 67.9077 48.5449 69.8242 49.0925L108 59.9999L146.176 49.0925ZM54 68.0311C54 66.8044 53.2531 65.7013 52.1142 65.2457L41.4685 60.9874C40.2861 60.5145 39 61.3852 39 62.6587V108.969C39 110.196 39.7469 111.299 40.8858 111.754L54 117V68.0311ZM162 68.0311C162 66.8044 162.747 65.7013 163.886 65.2457L174.531 60.9874C175.714 60.5145 177 61.3852 177 62.6587V108.969C177 110.196 176.253 111.299 175.114 111.754L162 117V68.0311Z"
        fill="#A1C7FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M102 42.4641C105.713 40.3205 110.287 40.3205 114 42.4641L161.756 70.0359C165.469 72.1795 167.756 76.141 167.756 80.4282V135.572C167.756 139.859 165.469 143.821 161.756 145.964L114 173.536C110.287 175.679 105.713 175.679 102 173.536L54.2442 145.964C50.5314 143.821 48.2442 139.859 48.2442 135.572V80.4282C48.2442 76.141 50.5314 72.1795 54.2442 70.0359L102 42.4641Z"
        fill="#B6D5FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M105 61.7321C106.856 60.6603 109.144 60.6603 111 61.7321L146.569 82.268C148.426 83.3397 149.569 85.3205 149.569 87.4641V128.536C149.569 130.679 148.426 132.66 146.569 133.732L111 154.268C109.144 155.34 106.856 155.34 105 154.268L69.4308 133.732C67.5744 132.66 66.4308 130.679 66.4308 128.536V87.4641C66.4308 85.3205 67.5744 83.3397 69.4308 82.268L105 61.7321Z"
        fill="#D6E7FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M108 81L132 108L108 135L84 108L108 81Z"
        fill="#A1C7FF"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

export const TrophyLevel6: React.FC<TrophyLevelProps> = ({ achieved, ...rest }) =>
  achieved ? (
    <svg width="216" height="221" viewBox="0 0 216 221" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <mask
        id="mask0_503_13464"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="24"
        y="24"
        width="168"
        height="169"
      >
        <circle cx="108" cy="108" r="84" fill="white" />
      </mask>
      <g mask="url(#mask0_503_13464)">
        <circle cx="108" cy="108" r="84" fill="url(#paint0_linear_503_13464)" />
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.04">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33.0002 32.9989C26.3728 32.9989 21.0002 38.3715 21.0002 44.9989C21.0002 51.6263 26.3728 56.9989 33.0002 56.9989H54.0002C60.6276 56.9989 66.0002 51.6263 66.0002 44.9989C66.0002 38.3715 60.6276 32.9989 54.0002 32.9989H33.0002ZM141 81.0007C134.373 81.0007 129 86.3733 129 93.0007C129 99.6282 134.373 105.001 141 105.001H213C219.628 105.001 225 99.6282 225 93.0007C225 86.3733 219.628 81.0007 213 81.0007H141ZM108 165C108 158.372 113.373 153 120 153H192C198.628 153 204 158.372 204 165C204 171.627 198.628 177 192 177H120C113.373 177 108 171.627 108 165ZM30.0001 129C23.3727 129 18.0001 134.373 18.0001 141C18.0001 147.627 23.3727 153 30.0001 153H78.0001C84.6275 153 90.0001 147.627 90.0001 141C90.0001 134.373 84.6275 129 78.0001 129H30.0001ZM12.0001 101.999C12.0001 98.6856 14.6864 95.9993 18.0001 95.9993H45.0001C48.3138 95.9993 51.0001 98.6856 51.0001 101.999C51.0001 105.313 48.3138 107.999 45.0001 107.999H18.0001C14.6864 107.999 12.0001 105.313 12.0001 101.999ZM18.0001 68.9996C14.6864 68.9996 12.0001 71.6859 12.0001 74.9996C12.0001 78.3133 14.6864 80.9996 18.0001 80.9996H102C105.314 80.9996 108 78.3133 108 74.9996C108 71.6859 105.314 68.9996 102 68.9996H18.0001ZM90 38.9989C90 35.6852 92.6863 32.9989 96 32.9989H180C183.314 32.9989 186 35.6852 186 38.9989C186 42.3126 183.314 44.9989 180 44.9989H96C92.6863 44.9989 90 42.3126 90 38.9989ZM6.00009 171C2.68638 171 9.15527e-05 173.686 9.15527e-05 177C9.15527e-05 180.314 2.68638 183 6.00009 183H90.0001C93.3138 183 96.0001 180.314 96.0001 177C96.0001 173.686 93.3138 171 90.0001 171H6.00009ZM129 63.0011C129 59.6874 131.686 57.0011 135 57.0011H219C222.314 57.0011 225 59.6874 225 63.0011C225 66.3148 222.314 69.0011 219 69.0011H135C131.686 69.0011 129 66.3148 129 63.0011ZM118.6 116.999C113.74 116.999 109.8 120.939 109.8 125.799C109.8 130.659 113.74 134.599 118.6 134.599H191.4C196.261 134.599 200.2 130.659 200.2 125.799C200.2 120.939 196.26 116.999 191.4 116.999H118.6Z"
            fill="black"
          />
        </g>
      </g>
      <g opacity="0.2">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M98.9956 38.0302C104.565 34.8148 111.426 34.8148 116.996 38.0302L164.091 65.2208C169.66 68.4362 173.091 74.3785 173.091 80.8093V135.191C173.091 141.621 169.66 147.564 164.091 150.779L116.996 177.97C111.426 181.185 104.565 181.185 98.9956 177.97L51.9001 150.779C46.3308 147.564 42.9001 141.621 42.9001 135.191L42.9001 80.8093C42.9001 74.3785 46.3308 68.4362 51.9001 65.2208L98.9956 38.0302Z"
          fill="#A4053A"
          fillOpacity="0.2"
          style={{ mixBlendMode: "multiply" }}
        />
      </g>
      <g filter="url(#filter0_d_503_13464)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M66 99H114V190.146C114 192.376 111.653 193.827 109.658 192.829L90 183L70.3416 192.829C68.3469 193.827 66 192.376 66 190.146V99Z"
          fill="#7F45F6"
        />
      </g>
      <g filter="url(#filter1_d_503_13464)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M102 99H150V190.146C150 192.376 147.653 193.827 145.658 192.829L126 183L106.342 192.829C104.347 193.827 102 192.376 102 190.146V99Z"
          fill="#7F45F6"
        />
      </g>
      <g filter="url(#filter2_d_503_13464)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M84 114H132V205.146C132 207.376 129.653 208.827 127.658 207.829L108 198L88.3416 207.829C86.3469 208.827 84 207.376 84 205.146V114Z"
          fill="white"
        />
      </g>
      <mask
        id="mask1_503_13464"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="84"
        y="114"
        width="48"
        height="95"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M84 114H132V205.146C132 207.376 129.653 208.827 127.658 207.829L108 198L88.3416 207.829C86.3469 208.827 84 207.376 84 205.146V114Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask1_503_13464)">
        <rect x="96" y="114" width="24" height="96" fill="#F55462" />
      </g>
      <path
        style={{ mixBlendMode: "multiply" }}
        opacity="0.8"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M102 48.464C105.713 46.3204 110.287 46.3204 114 48.464L161.756 76.0358C165.469 78.1794 167.756 82.1409 167.756 86.4281V141.572C167.756 145.859 165.469 149.82 161.756 151.964L114 179.536C110.287 181.679 105.713 181.679 102 179.536L54.2443 151.964C50.5314 149.82 48.2443 145.859 48.2443 141.572L48.2443 86.4281C48.2443 82.1409 50.5315 78.1794 54.2443 76.0358L102 48.464Z"
        fill="#A4053A"
        fillOpacity="0.2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M57 73.5L42 67.5V64.5L27.5952 58.498C26.1785 57.9077 24.7203 59.2474 25.1888 60.7089L42.2764 114.022C42.5734 114.949 43.3017 115.674 44.2298 115.967L57 120V73.5Z"
        fill="url(#paint1_linear_503_13464)"
        stroke="url(#paint2_linear_503_13464)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask
        id="mask2_503_13464"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="26"
        y="60"
        width="33"
        height="60"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M57 77.5622C57 75.1088 55.5063 72.9025 53.2283 71.9913L43.4035 68.0614C42.5558 67.7223 42 66.9014 42 65.9884C42 65.0871 41.4581 64.2742 40.6261 63.9275L35.9839 61.9933C31.2616 60.0257 26.4011 64.4914 27.9625 69.3631L41.8027 112.544C42.3968 114.398 43.8534 115.848 45.7096 116.435L49.1932 117.535C53.0603 118.756 57 115.869 57 111.813V77.5622Z"
          fill="white"
          stroke="white"
          strokeWidth="3"
        />
      </mask>
      <g mask="url(#mask2_503_13464)">
        <g style={{ mixBlendMode: "multiply" }} opacity="0.6" filter="url(#filter3_i_503_13464)">
          <path
            d="M57.5571 90.1073C58.3263 90.415 58.7004 91.2879 58.3927 92.0571C58.0851 92.8263 57.2121 93.2004 56.4429 92.8927L41.4429 86.8927C40.8735 86.6649 40.5 86.1134 40.5 85.5V83.5L23.4231 76.3846C22.6584 76.066 22.2968 75.1878 22.6154 74.4231C22.934 73.6584 23.8122 73.2968 24.5769 73.6154L42.5769 81.1154C43.1359 81.3483 43.5 81.8945 43.5 82.5V84.4845L57.5571 90.1073Z"
            fill="#FABC10"
          />
        </g>
        <g style={{ mixBlendMode: "multiply" }} opacity="0.6" filter="url(#filter4_i_503_13464)">
          <path
            d="M60.5571 108.107C61.3263 108.415 61.7004 109.288 61.3927 110.057C61.0851 110.826 60.2121 111.2 59.4429 110.893L44.4429 104.893C43.8735 104.665 43.5 104.113 43.5 103.5V101.5L26.4231 94.3846C25.6584 94.066 25.2968 93.1878 25.6154 92.4231C25.934 91.6584 26.8122 91.2968 27.5769 91.6154L45.5769 99.1154C46.1359 99.3483 46.5 99.8945 46.5 100.5V102.484L60.5571 108.107Z"
            fill="#FABC10"
          />
        </g>
        <g opacity="0.2">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M98.9956 38.0302C104.565 34.8148 111.426 34.8148 116.996 38.0302L164.091 65.2208C169.66 68.4362 173.091 74.3785 173.091 80.8093V135.191C173.091 141.621 169.66 147.564 164.091 150.779L116.996 177.97C111.426 181.185 104.565 181.185 98.9956 177.97L51.9001 150.779C46.3308 147.564 42.9001 141.621 42.9001 135.191L42.9001 80.8093C42.9001 74.3785 46.3308 68.4362 51.9001 65.2208L98.9956 38.0302Z"
            fill="#A4053A"
            fillOpacity="0.2"
            style={{ mixBlendMode: "multiply" }}
          />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M159 73.5L174 67.5V64.5L188.405 58.498C189.822 57.9077 191.28 59.2474 190.811 60.7089L173.724 114.022C173.427 114.949 172.698 115.674 171.77 115.967L159 120V73.5Z"
        fill="url(#paint3_linear_503_13464)"
        stroke="url(#paint4_linear_503_13464)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask
        id="mask3_503_13464"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="157"
        y="60"
        width="33"
        height="60"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M159 77.5622C159 75.1088 160.494 72.9025 162.772 71.9913L172.597 68.0614C173.444 67.7223 174 66.9014 174 65.9884C174 65.0871 174.542 64.2742 175.374 63.9275L180.016 61.9933C184.738 60.0257 189.599 64.4914 188.037 69.3631L174.197 112.544C173.603 114.398 172.147 115.848 170.29 116.435L166.807 117.535C162.94 118.756 159 115.869 159 111.813V77.5622Z"
          fill="white"
          stroke="white"
          strokeWidth="3"
        />
      </mask>
      <g mask="url(#mask3_503_13464)">
        <g style={{ mixBlendMode: "multiply" }} opacity="0.6" filter="url(#filter5_i_503_13464)">
          <path
            d="M158.443 90.1073C157.674 90.415 157.3 91.2879 157.607 92.0571C157.915 92.8263 158.788 93.2004 159.557 92.8927L174.557 86.8927C175.127 86.6649 175.5 86.1134 175.5 85.5V83.5L192.577 76.3846C193.342 76.066 193.703 75.1878 193.385 74.4231C193.066 73.6584 192.188 73.2968 191.423 73.6154L173.423 81.1154C172.864 81.3483 172.5 81.8945 172.5 82.5V84.4845L158.443 90.1073Z"
            fill="#FABC10"
          />
        </g>
        <g style={{ mixBlendMode: "multiply" }} opacity="0.6" filter="url(#filter6_i_503_13464)">
          <path
            d="M155.443 108.107C154.674 108.415 154.3 109.288 154.607 110.057C154.915 110.826 155.788 111.2 156.557 110.893L171.557 104.893C172.127 104.665 172.5 104.113 172.5 103.5V101.5L189.577 94.3846C190.342 94.066 190.703 93.1878 190.385 92.4231C190.066 91.6584 189.188 91.2968 188.423 91.6154L170.423 99.1154C169.864 99.3483 169.5 99.8945 169.5 100.5V102.484L155.443 108.107Z"
            fill="#FABC10"
          />
        </g>
        <g opacity="0.2">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M117.004 38.0302C111.435 34.8148 104.574 34.8148 99.0045 38.0302L51.9089 65.2208C46.3397 68.4362 42.9089 74.3785 42.9089 80.8093V135.191C42.9089 141.621 46.3397 147.564 51.9089 150.779L99.0045 177.97C104.574 181.185 111.435 181.185 117.004 177.97L164.1 150.779C169.669 147.564 173.1 141.621 173.1 135.191L173.1 80.8093C173.1 74.3785 169.669 68.4362 164.1 65.2208L117.004 38.0302Z"
            fill="#A4053A"
            fillOpacity="0.2"
            style={{ mixBlendMode: "multiply" }}
          />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M54 126L43.4219 131.289C42.5326 131.734 41.9213 132.59 41.7899 133.576L39.4807 150.895C39.2838 152.372 40.8642 153.435 42.158 152.695L60 142.5L54 126Z"
        fill="url(#paint5_linear_503_13464)"
        stroke="url(#paint6_linear_503_13464)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask
        id="mask4_503_13464"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="39"
        y="126"
        width="22"
        height="25"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M56.3007 132.327C55.0751 128.957 51.1862 127.407 47.9786 129.011L44.8439 130.578C43.0651 131.467 41.8426 133.18 41.5798 135.152L40.6023 142.482C39.9459 147.406 45.214 150.949 49.5266 148.485L55.6103 145.008C58.1466 143.559 59.2705 140.494 58.2722 137.749L56.3007 132.327Z"
          fill="white"
          stroke="white"
          strokeWidth="3"
        />
      </mask>
      <g mask="url(#mask4_503_13464)">
        <g opacity="0.1">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M98.3398 38.0302C103.909 34.8148 110.771 34.8148 116.34 38.0302L163.435 65.2208C169.005 68.4362 172.435 74.3785 172.435 80.8093V135.191C172.435 141.621 169.005 147.564 163.435 150.779L116.34 177.97C110.771 181.185 103.909 181.185 98.3398 177.97L51.2443 150.779C45.6751 147.564 42.2443 141.621 42.2443 135.191L42.2443 80.8093C42.2443 74.3785 45.675 68.4362 51.2443 65.2208L98.3398 38.0302Z"
            fill="#F37E02"
            style={{ mixBlendMode: "multiply" }}
          />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M162 126L172.578 131.289C173.467 131.734 174.079 132.59 174.21 133.576L176.519 150.895C176.716 152.372 175.136 153.435 173.842 152.695L156 142.5L162 126Z"
        fill="url(#paint7_linear_503_13464)"
        stroke="url(#paint8_linear_503_13464)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask
        id="mask5_503_13464"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="154"
        y="124"
        width="25"
        height="31"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M162 126L172.578 131.289C173.467 131.734 174.079 132.59 174.21 133.576L176.519 150.895C176.716 152.372 175.136 153.435 173.842 152.695L156 142.5L162 126Z"
          fill="white"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask5_503_13464)">
        <g opacity="0.1">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M117.66 38.0302C112.091 34.8148 105.229 34.8148 99.6602 38.0302L52.5646 65.2208C46.9954 68.4362 43.5646 74.3785 43.5646 80.8093V135.191C43.5646 141.621 46.9954 147.564 52.5646 150.779L99.6602 177.97C105.229 181.185 112.091 181.185 117.66 177.97L164.756 150.779C170.325 147.564 173.756 141.621 173.756 135.191L173.756 80.8093C173.756 74.3785 170.325 68.4362 164.756 65.2208L117.66 38.0302Z"
            fill="#F37E02"
            style={{ mixBlendMode: "multiply" }}
          />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M90.0612 71.0248C90.0612 75.6271 87.4289 79.8241 83.2856 81.8278L77.4077 84.6704C69.4391 88.524 60.1833 82.7188 60.1833 73.8673V59.3392C60.1833 57.1957 61.3269 55.2149 63.1833 54.1431L85.5612 41.2232C87.5612 40.0685 90.0612 41.5119 90.0612 43.8213V71.0248Z"
        fill="url(#paint9_linear_503_13464)"
      />
      <path opacity="0.4" d="M63.6199 55.6195L86.3437 42.5024" stroke="#FDEDAC" strokeWidth="3" strokeLinecap="round" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M125.939 71.0248C125.939 75.6271 128.571 79.8241 132.715 81.8278L138.593 84.6704C146.561 88.524 155.817 82.7188 155.817 73.8673V59.3392C155.817 57.1957 154.673 55.2149 152.817 54.1431L130.439 41.2232C128.439 40.0685 125.939 41.5119 125.939 43.8213V71.0248Z"
        fill="url(#paint10_linear_503_13464)"
      />
      <path opacity="0.4" d="M152.38 55.6195L129.656 42.5024" stroke="#FDEDAC" strokeWidth="3" strokeLinecap="round" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M102 42.4641C105.713 40.3205 110.287 40.3205 114 42.4641L161.756 70.0359C165.469 72.1795 167.756 76.141 167.756 80.4282V135.572C167.756 139.859 165.469 143.821 161.756 145.964L114 173.536C110.287 175.679 105.713 175.679 102 173.536L54.2442 145.964C50.5314 143.821 48.2442 139.859 48.2442 135.572V80.4282C48.2442 76.141 50.5314 72.1795 54.2442 70.0359L102 42.4641Z"
        fill="url(#paint11_linear_503_13464)"
        stroke="#FFF04D"
        strokeOpacity="0.4"
        strokeWidth="3"
      />
      <mask
        id="mask6_503_13464"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="48"
        y="39"
        width="120"
        height="138"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M105 40.7321C106.856 39.6603 109.144 39.6603 111 40.7321L164.756 71.7679C166.612 72.8397 167.756 74.8205 167.756 76.9641V139.036C167.756 141.179 166.612 143.16 164.756 144.232L111 175.268C109.144 176.34 106.856 176.34 105 175.268L51.2442 144.232C49.3878 143.16 48.2442 141.179 48.2442 139.036V76.9641C48.2442 74.8205 49.3878 72.8397 51.2442 71.7679L105 40.7321Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask6_503_13464)">
        <g style={{ mixBlendMode: "multiply" }} opacity="0.8" filter="url(#filter7_i_503_13464)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M155.013 75.5654L112.55 51.0204C109.734 49.3931 106.266 49.3931 103.45 51.0204L60.987 75.5654C58.1717 77.1928 56.4374 80.2002 56.4374 83.4549V101.162L52.9949 106.332C52.3243 107.339 52.3243 108.65 52.9949 109.657L56.4374 114.827V132.545C56.4374 135.8 58.1717 138.807 60.987 140.434L103.45 164.979C106.266 166.607 109.734 166.607 112.55 164.979L155.013 140.434C157.828 138.807 159.563 135.8 159.563 132.545V114.827L163.005 109.657C163.676 108.65 163.676 107.339 163.005 106.332L159.563 101.162V83.4549C159.563 80.2002 157.828 77.1928 155.013 75.5654ZM59.4705 114.827V132.545C59.4705 134.715 60.6267 136.72 62.5036 137.805L104.967 162.35C106.844 163.434 109.156 163.434 111.033 162.35L153.496 137.805C155.373 136.72 156.529 134.715 156.529 132.545V114.827L153.087 109.657C152.416 108.65 152.416 107.339 153.087 106.332L156.529 101.162V83.4549C156.529 81.2851 155.373 79.2801 153.496 78.1952L111.033 53.6502C109.156 52.5653 106.844 52.5653 104.967 53.6502L62.5036 78.1952C60.6267 79.2801 59.4705 81.2851 59.4705 83.4549V101.162L62.9129 106.332C63.5835 107.339 63.5835 108.65 62.9129 109.657L59.4705 114.827Z"
            fill="#FABC10"
          />
        </g>
        <path
          d="M113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9943 71.3349C51.7456 73.2105 49.7443 76.6768 49.7443 80.4281L49.7443 135.572C49.7443 139.323 51.7456 142.789 54.9943 144.665L102.75 172.237C105.999 174.112 110.001 174.112 113.25 172.237L161.006 144.665C164.254 142.789 166.256 139.323 166.256 135.572V80.4281C166.256 76.6768 164.254 73.2105 161.006 71.3349L113.25 43.7631Z"
          stroke="#FAB90A"
          strokeWidth="3"
        />
        <path
          opacity="0.4"
          d="M113.25 172.237C118.867 168.994 122.846 166.696 125.189 165.344"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M166.256 135.572V80.4281C166.256 76.6768 164.254 73.2105 161.006 71.3349L113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9943 71.3349C51.7456 73.2105 49.7443 76.6768 49.7443 80.4281L49.7443 135.572"
          stroke="#FAC81C"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          opacity="0.6"
          d="M166.256 80.4281C166.256 76.6768 164.254 73.2105 161.006 71.3349L113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9943 71.3349C51.7456 73.2105 49.7443 76.6768 49.7443 80.4281"
          stroke="#FDDB3D"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          opacity="0.6"
          d="M113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631C102.75 43.7631 86.8314 52.9537 78.8721 57.549"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M102.75 43.7629C102.75 43.7629 94.3252 48.627 90.8111 50.6559"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g filter="url(#filter8_d_503_13464)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M105 61.7321C106.856 60.6603 109.144 60.6603 111 61.7321L146.569 82.268C148.426 83.3397 149.569 85.3205 149.569 87.4641V128.536C149.569 130.679 148.426 132.66 146.569 133.732L111 154.268C109.144 155.34 106.856 155.34 105 154.268L69.4308 133.732C67.5744 132.66 66.4308 130.679 66.4308 128.536V87.4641C66.4308 85.3205 67.5744 83.3397 69.4308 82.268L105 61.7321Z"
          fill="url(#paint12_linear_503_13464)"
        />
        <path
          d="M111.75 60.433C109.429 59.0933 106.571 59.0933 104.25 60.433L68.6808 80.9689C66.3603 82.3087 64.9308 84.7846 64.9308 87.4641V128.536C64.9308 131.215 66.3603 133.691 68.6808 135.031L104.25 155.567C106.571 156.907 109.429 156.907 111.75 155.567L147.319 135.031C149.64 133.691 151.069 131.215 151.069 128.536V87.4641C151.069 84.7846 149.64 82.3087 147.319 80.9689L111.75 60.433Z"
          stroke="#F5900D"
          strokeOpacity="0.1"
          strokeWidth="3"
          style={{ mixBlendMode: "multiply" }}
        />
      </g>
      <mask
        id="mask7_503_13464"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="66"
        y="60"
        width="84"
        height="96"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M105 61.7321C106.856 60.6603 109.144 60.6603 111 61.7321L146.569 82.268C148.426 83.3397 149.569 85.3205 149.569 87.4641V128.536C149.569 130.679 148.426 132.66 146.569 133.732L111 154.268C109.144 155.34 106.856 155.34 105 154.268L69.4308 133.732C67.5744 132.66 66.4308 130.679 66.4308 128.536V87.4641C66.4308 85.3205 67.5744 83.3397 69.4308 82.268L105 61.7321Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask7_503_13464)">
        <g style={{ mixBlendMode: "multiply" }} opacity="0.3">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M108 108L60 120V96L108 108ZM108 108L120 60H96L108 108ZM108 108L156 96V120L108 108ZM108 108L133.456 65.5736L150.426 82.5442L108 108ZM108 108L133.456 150.426L150.426 133.456L108 108ZM108 108L96 156H120L108 108ZM108 108L82.5442 150.426L65.5736 133.456L108 108Z"
            fill="#FFD640"
          />
          <path d="M82.5442 65.5736L65.5736 82.5442L108 108L82.5442 65.5736Z" fill="#FFD640" />
        </g>
        <path
          opacity="0.4"
          d="M145.819 83.5671L110.25 63.0312C108.858 62.2274 107.142 62.2274 105.75 63.0312C101.567 65.4464 98.6027 67.1578 96.8578 68.1652C93.2263 70.2618 90.2622 71.9732 87.9655 73.2992C84.0133 75.5809 78.0851 79.0036 70.1808 83.5671"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M105.75 63.0311C101.567 65.4463 98.6026 67.1577 96.8577 68.1651"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          opacity="0.4"
          d="M145.819 132.33L110.25 152.866C108.858 153.67 107.142 153.67 105.75 152.866"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g filter="url(#filter9_d_503_13464)">
        <path d="M89.3333 91.672L108 80.5001L126.667 91.672V124.328L108 135.5L89.3333 124.328V91.672Z" fill="white" />
        <path
          d="M87.7927 89.0978C86.8874 89.6396 86.3333 90.617 86.3333 91.672V124.328C86.3333 125.383 86.8874 126.361 87.7927 126.902L106.459 138.074C107.408 138.642 108.592 138.642 109.541 138.074L128.207 126.902C129.113 126.361 129.667 125.383 129.667 124.328V91.672C129.667 90.617 129.113 89.6396 128.207 89.0978L109.541 77.9259C108.592 77.3582 107.408 77.3582 106.459 77.9259L87.7927 89.0978Z"
          stroke="white"
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M89.3333 91.672L108 80.5001V92.5314L99.5151 97.6876L89.3333 91.672Z"
        fill="url(#paint13_linear_503_13464)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M89.3333 91.6721V124.328L99.5151 118.313V97.6877L89.3333 91.6721Z"
        fill="url(#paint14_linear_503_13464)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M108 135.5L89.3333 124.328L99.5151 118.312L108 123.469V135.5Z"
        fill="url(#paint15_linear_503_13464)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M108 135.5L126.667 124.328L116.485 118.312L108 123.469V135.5Z"
        fill="url(#paint16_linear_503_13464)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M126.667 91.6721V124.328L116.485 118.313V97.6877L126.667 91.6721Z"
        fill="url(#paint17_linear_503_13464)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M126.667 91.672L108 80.5001V92.5314L116.485 97.6876L126.667 91.672Z"
        fill="url(#paint18_linear_503_13464)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M99.5153 118.312L108 123.469L116.485 118.312V97.6875L108 92.5312L99.5153 97.6875V118.312Z"
        fill="url(#paint19_linear_503_13464)"
      />
      <g filter="url(#filter10_d_503_13464)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M140.733 89.3398L139.175 88.7253C138.222 88.3495 137.754 87.2724 138.13 86.3195C138.318 85.8415 138.697 85.4632 139.175 85.2747L140.733 84.6602C142.529 83.9516 143.952 82.5294 144.66 80.7327L145.275 79.1747C145.65 78.2218 146.728 77.754 147.68 78.1298C148.158 78.3183 148.537 78.6967 148.725 79.1747L149.34 80.7327C150.048 82.5294 151.471 83.9516 153.267 84.6602L154.825 85.2747C155.778 85.6505 156.246 86.7276 155.87 87.6805C155.682 88.1585 155.303 88.5368 154.825 88.7253L153.267 89.3398C151.471 90.0484 150.048 91.4706 149.34 93.2673L148.725 94.8253C148.35 95.7782 147.272 96.246 146.32 95.8702C145.842 95.6817 145.463 95.3033 145.275 94.8253L144.66 93.2673C143.952 91.4706 142.529 90.0484 140.733 89.3398Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter11_d_503_13464)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M73.8218 139.56L72.7831 139.15C72.1479 138.9 71.836 138.182 72.0866 137.546C72.2122 137.228 72.4645 136.975 72.7831 136.85L73.8218 136.44C75.0196 135.968 75.9677 135.02 76.4401 133.822L76.8498 132.783C77.1003 132.148 77.8184 131.836 78.4536 132.087C78.7723 132.212 79.0245 132.464 79.1502 132.783L79.5599 133.822C80.0323 135.02 80.9804 135.968 82.1782 136.44L83.2169 136.85C83.8521 137.1 84.164 137.818 83.9134 138.454C83.7878 138.772 83.5355 139.025 83.2169 139.15L82.1782 139.56C80.9804 140.032 80.0323 140.98 79.5599 142.178L79.1502 143.217C78.8997 143.852 78.1816 144.164 77.5464 143.913C77.2277 143.788 76.9755 143.536 76.8498 143.217L76.4401 142.178C75.9677 140.98 75.0196 140.032 73.8218 139.56Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter12_d_503_13464)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M62.2773 93.4498L60.9789 92.9378C60.1849 92.6246 59.795 91.727 60.1082 90.9329C60.2653 90.5346 60.5806 90.2193 60.9789 90.0622L62.2773 89.5502C63.7745 88.9597 64.9597 87.7745 65.5502 86.2773L66.0622 84.9789C66.3754 84.1849 67.273 83.795 68.0671 84.1082C68.4654 84.2653 68.7807 84.5806 68.9378 84.9789L69.4498 86.2773C70.0403 87.7745 71.2255 88.9597 72.7227 89.5502L74.0211 90.0622C74.8151 90.3754 75.205 91.273 74.8918 92.0671C74.7347 92.4654 74.4194 92.7807 74.0211 92.9378L72.7227 93.4498C71.2255 94.0403 70.0403 95.2255 69.4498 96.7227L68.9378 98.0211C68.6246 98.8151 67.727 99.205 66.9329 98.8918C66.5346 98.7347 66.2193 98.4194 66.0622 98.0211L65.5502 96.7227C64.9597 95.2255 63.7745 94.0403 62.2773 93.4498Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter13_d_503_13464)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M139.366 134.67L138.587 134.363C138.111 134.175 137.877 133.636 138.065 133.16C138.159 132.921 138.348 132.732 138.587 132.637L139.366 132.33C140.265 131.976 140.976 131.265 141.33 130.366L141.637 129.587C141.825 129.111 142.364 128.877 142.84 129.065C143.079 129.159 143.268 129.348 143.363 129.587L143.67 130.366C144.024 131.265 144.735 131.976 145.634 132.33L146.413 132.637C146.889 132.825 147.123 133.364 146.935 133.84C146.841 134.079 146.652 134.268 146.413 134.363L145.634 134.67C144.735 135.024 144.024 135.735 143.67 136.634L143.363 137.413C143.175 137.889 142.636 138.123 142.16 137.935C141.921 137.841 141.732 137.652 141.637 137.413L141.33 136.634C140.976 135.735 140.265 135.024 139.366 134.67Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_503_13464"
          x="60"
          y="99"
          width="60"
          height="106.15"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.921569 0 0 0 0 0.215686 0 0 0 0 0.305882 0 0 0 0.2 0" />
          <feBlend mode="darken" in2="BackgroundImageFix" result="effect1_dropShadow_503_13464" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13464" result="shape" />
        </filter>
        <filter
          id="filter1_d_503_13464"
          x="96"
          y="99"
          width="60"
          height="106.15"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.921569 0 0 0 0 0.215686 0 0 0 0 0.305882 0 0 0 0.2 0" />
          <feBlend mode="darken" in2="BackgroundImageFix" result="effect1_dropShadow_503_13464" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13464" result="shape" />
        </filter>
        <filter
          id="filter2_d_503_13464"
          x="78"
          y="114"
          width="60"
          height="106.15"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.921569 0 0 0 0 0.215686 0 0 0 0 0.305882 0 0 0 0.2 0" />
          <feBlend mode="darken" in2="BackgroundImageFix" result="effect1_dropShadow_503_13464" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13464" result="shape" />
        </filter>
        <filter
          id="filter3_i_503_13464"
          x="22.4996"
          y="73.4996"
          width="36.0008"
          height="22.5007"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.976471 0 0 0 0 0.713726 0 0 0 0 0.0352941 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_503_13464" />
        </filter>
        <filter
          id="filter4_i_503_13464"
          x="25.4996"
          y="91.4996"
          width="36.0008"
          height="22.5007"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.976471 0 0 0 0 0.713726 0 0 0 0 0.0352941 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_503_13464" />
        </filter>
        <filter
          id="filter5_i_503_13464"
          x="157.5"
          y="73.4996"
          width="36.0008"
          height="22.5007"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.976471 0 0 0 0 0.713726 0 0 0 0 0.0352941 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_503_13464" />
        </filter>
        <filter
          id="filter6_i_503_13464"
          x="154.5"
          y="91.4996"
          width="36.0008"
          height="22.5007"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.976471 0 0 0 0 0.713726 0 0 0 0 0.0352941 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_503_13464" />
        </filter>
        <filter
          id="filter7_i_503_13464"
          x="52.4919"
          y="49.7999"
          width="111.016"
          height="119.4"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.976471 0 0 0 0 0.713726 0 0 0 0 0.0352941 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_503_13464" />
        </filter>
        <filter
          id="filter8_d_503_13464"
          x="57.4308"
          y="54.9282"
          width="101.138"
          height="112.144"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.927721 0 0 0 0 0.665867 0 0 0 0 0.0535899 0 0 0 0.4 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13464" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13464" result="shape" />
        </filter>
        <filter
          id="filter9_d_503_13464"
          x="77.3333"
          y="71.5001"
          width="61.3333"
          height="79"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.996078 0 0 0 0 0.733333 0 0 0 0 0.105882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13464" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13464" result="shape" />
        </filter>
        <filter
          id="filter10_d_503_13464"
          x="132"
          y="72"
          width="30"
          height="30"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13464" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13464" result="shape" />
        </filter>
        <filter
          id="filter11_d_503_13464"
          x="66"
          y="126"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13464" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13464" result="shape" />
        </filter>
        <filter
          id="filter12_d_503_13464"
          x="54"
          y="78"
          width="27"
          height="27"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13464" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13464" result="shape" />
        </filter>
        <filter
          id="filter13_d_503_13464"
          x="132"
          y="123"
          width="21"
          height="21"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13464" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13464" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_503_13464" x1="24" y1="24" x2="24" y2="192" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF7F7D" />
          <stop offset="1" stopColor="#EC2E4A" />
        </linearGradient>
        <linearGradient id="paint1_linear_503_13464" x1="24" y1="57" x2="24" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7C71A" />
          <stop offset="1" stopColor="#FBAA00" />
        </linearGradient>
        <linearGradient id="paint2_linear_503_13464" x1="24" y1="57" x2="24" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient id="paint3_linear_503_13464" x1="192" y1="57" x2="192" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7C71A" />
          <stop offset="1" stopColor="#FBAA00" />
        </linearGradient>
        <linearGradient id="paint4_linear_503_13464" x1="192" y1="57" x2="192" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient id="paint5_linear_503_13464" x1="39" y1="126" x2="39" y2="154.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7C71A" />
          <stop offset="1" stopColor="#FBAA00" />
        </linearGradient>
        <linearGradient id="paint6_linear_503_13464" x1="39" y1="126" x2="39" y2="154.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_503_13464"
          x1="177"
          y1="126"
          x2="177"
          y2="154.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F7C71A" />
          <stop offset="1" stopColor="#FBAA00" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_503_13464"
          x1="177"
          y1="126"
          x2="177"
          y2="154.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_503_13464"
          x1="60.1833"
          y1="40.8208"
          x2="60.1833"
          y2="86.8161"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FBCC24" />
          <stop offset="1" stopColor="#F9B800" />
        </linearGradient>
        <linearGradient
          id="paint10_linear_503_13464"
          x1="155.817"
          y1="40.8208"
          x2="155.817"
          y2="86.8161"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FBCC24" />
          <stop offset="1" stopColor="#F9B800" />
        </linearGradient>
        <linearGradient id="paint11_linear_503_13464" x1="39" y1="39" x2="39" y2="177" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE046" />
          <stop offset="1" stopColor="#F9B800" />
        </linearGradient>
        <linearGradient id="paint12_linear_503_13464" x1="60" y1="60" x2="60" y2="156" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF550" />
          <stop offset="1" stopColor="#FFD541" />
        </linearGradient>
        <linearGradient
          id="paint13_linear_503_13464"
          x1="109.41"
          y1="92.3588"
          x2="104.328"
          y2="82.8273"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD3D3" />
          <stop offset="1" stopColor="#FF7E8A" />
        </linearGradient>
        <linearGradient
          id="paint14_linear_503_13464"
          x1="99.5151"
          y1="124.328"
          x2="99.5151"
          y2="91.6721"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF8B89" />
          <stop offset="1" stopColor="#F34C5D" />
        </linearGradient>
        <linearGradient
          id="paint15_linear_503_13464"
          x1="103.481"
          y1="131.864"
          x2="107.58"
          y2="122.732"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF7F7D" />
          <stop offset="1" stopColor="#F21248" />
        </linearGradient>
        <linearGradient
          id="paint16_linear_503_13464"
          x1="126.667"
          y1="135.5"
          x2="126.667"
          y2="118.312"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF8B89" />
          <stop offset="1" stopColor="#F34C5D" />
        </linearGradient>
        <linearGradient
          id="paint17_linear_503_13464"
          x1="126.667"
          y1="124.328"
          x2="126.667"
          y2="91.6721"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF8B89" />
          <stop offset="1" stopColor="#F34C5D" />
        </linearGradient>
        <linearGradient
          id="paint18_linear_503_13464"
          x1="116.766"
          y1="97.4642"
          x2="121.369"
          y2="88.5509"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF7F7D" />
          <stop offset="1" stopColor="#F21248" />
        </linearGradient>
        <linearGradient
          id="paint19_linear_503_13464"
          x1="116.485"
          y1="123.469"
          x2="116.485"
          y2="92.5312"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF7F7D" />
          <stop offset="1" stopColor="#F21248" />
        </linearGradient>
      </defs>
    </svg>
  ) : (
    <svg width="216" height="216" viewBox="0 0 216 216" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <mask
        id="mask0_503_14655"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="24"
        y="24"
        width="168"
        height="169"
      >
        <circle cx="108" cy="108" r="84" fill="white" />
      </mask>
      <g mask="url(#mask0_503_14655)">
        <g style={{ mixBlendMode: "screen" }} opacity="0.24">
          <circle cx="108" cy="108" r="84" fill="white" />
        </g>
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.04">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33 32.9989C26.3726 32.9989 21 38.3715 21 44.9989C21 51.6263 26.3726 56.9989 33 56.9989H54C60.6274 56.9989 66 51.6263 66 44.9989C66 38.3715 60.6274 32.9989 54 32.9989H33ZM141 81.0007C134.373 81.0007 129 86.3733 129 93.0007C129 99.6282 134.373 105.001 141 105.001H213C219.627 105.001 225 99.6282 225 93.0007C225 86.3733 219.627 81.0007 213 81.0007H141ZM108 165C108 158.372 113.373 153 120 153H192C198.627 153 204 158.372 204 165C204 171.627 198.627 177 192 177H120C113.373 177 108 171.627 108 165ZM30 129C23.3726 129 18 134.373 18 141C18 147.627 23.3726 153 30 153H78C84.6274 153 90 147.627 90 141C90 134.373 84.6274 129 78 129H30ZM12 101.999C12 98.6856 14.6863 95.9993 18 95.9993H45C48.3137 95.9993 51 98.6856 51 101.999C51 105.313 48.3137 107.999 45 107.999H18C14.6863 107.999 12 105.313 12 101.999ZM18 68.9996C14.6863 68.9996 12 71.6859 12 74.9996C12 78.3133 14.6863 80.9996 18 80.9996H102C105.314 80.9996 108 78.3133 108 74.9996C108 71.6859 105.314 68.9996 102 68.9996H18ZM90 38.9989C90 35.6852 92.6863 32.9989 96 32.9989H180C183.314 32.9989 186 35.6852 186 38.9989C186 42.3126 183.314 44.9989 180 44.9989H96C92.6863 44.9989 90 42.3126 90 38.9989ZM6 171C2.68629 171 0 173.686 0 177C0 180.314 2.68629 183 6 183H90C93.3137 183 96 180.314 96 177C96 173.686 93.3137 171 90 171H6ZM129 63.0011C129 59.6874 131.686 57.0011 135 57.0011H219C222.314 57.0011 225 59.6874 225 63.0011C225 66.3148 222.314 69.0011 219 69.0011H135C131.686 69.0011 129 66.3148 129 63.0011ZM118.6 116.999C113.74 116.999 109.8 120.939 109.8 125.799C109.8 130.659 113.74 134.599 118.6 134.599H191.4C196.26 134.599 200.2 130.659 200.2 125.799C200.2 120.939 196.26 116.999 191.4 116.999H118.6Z"
            fill="black"
          />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M63 99H111V190.146C111 192.376 108.653 193.827 106.658 192.829L87 183L67.3416 192.829C65.3469 193.827 63 192.376 63 190.146V99Z"
        fill="#A1C7FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M105 99H153V190.146C153 192.376 150.653 193.827 148.658 192.829L129 183L109.342 192.829C107.347 193.827 105 192.376 105 190.146V99Z"
        fill="#A1C7FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M84 114H132V205.146C132 207.376 129.653 208.827 127.658 207.829L108 198L88.3416 207.829C86.3469 208.827 84 207.376 84 205.146V114Z"
        fill="#E7F1FF"
      />
      <mask
        id="mask1_503_14655"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="84"
        y="114"
        width="48"
        height="95"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M84 114H132V205.146C132 207.376 129.653 208.827 127.658 207.829L108 198L88.3416 207.829C86.3469 208.827 84 207.376 84 205.146V114Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask1_503_14655)">
        <rect x="96" y="114" width="24" height="96" fill="#A1C7FF" />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M127.439 71.0245V43.8211C127.439 43.5577 127.508 43.2991 127.64 43.0711C128.054 42.3536 128.972 42.1078 129.689 42.522L152.067 55.4419C153.459 56.2457 154.317 57.7313 154.317 59.339V76.4058C154.317 77.7489 154.013 79.0747 153.428 80.2839C151.286 84.7128 145.96 86.5668 141.531 84.425L133.368 80.4772C129.742 78.7239 127.439 75.0516 127.439 71.0245ZM56.9999 73.5L41.9999 67.5V64.5L27.5951 58.498C26.1784 57.9077 24.7203 59.2474 25.1887 60.7089L42.2763 114.022C42.5734 114.949 43.3016 115.674 44.2297 115.967L56.9999 120V73.5ZM43.4219 131.289L53.9999 126L59.9999 142.5L42.1579 152.695C40.8641 153.435 39.2837 152.372 39.4806 150.895L41.7898 133.576C41.9212 132.59 42.5325 131.734 43.4219 131.289ZM172.578 131.289L162 126L156 142.5L173.842 152.695C175.136 153.435 176.716 152.372 176.519 150.895L174.21 133.576C174.079 132.59 173.467 131.734 172.578 131.289ZM174 67.5L159 73.5V120L171.77 115.967C172.698 115.674 173.427 114.949 173.724 114.022L190.811 60.7089C191.28 59.2474 189.821 57.9077 188.405 58.498L174 64.5V67.5ZM88.5609 43.8211V71.0245C88.5609 75.0516 86.2577 78.7239 82.6323 80.4772L74.4689 84.425C70.04 86.5668 64.7134 84.7128 62.5716 80.2839C61.9868 79.0747 61.683 77.7489 61.683 76.4058V59.339C61.683 57.7313 62.5407 56.2457 63.933 55.4419L86.3109 42.522C87.0284 42.1078 87.9457 42.3536 88.36 43.0711C88.4916 43.2991 88.5609 43.5577 88.5609 43.8211Z"
        fill="#A1C7FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M102 42.4641C105.713 40.3205 110.287 40.3205 114 42.4641L161.756 70.0359C165.469 72.1795 167.756 76.141 167.756 80.4282V135.572C167.756 139.859 165.469 143.821 161.756 145.964L114 173.536C110.287 175.679 105.713 175.679 102 173.536L54.2442 145.964C50.5314 143.821 48.2442 139.859 48.2442 135.572V80.4282C48.2442 76.141 50.5314 72.1795 54.2442 70.0359L102 42.4641Z"
        fill="#B6D5FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M105 61.7321C106.856 60.6603 109.144 60.6603 111 61.7321L146.569 82.268C148.426 83.3397 149.569 85.3205 149.569 87.4641V128.536C149.569 130.679 148.426 132.66 146.569 133.732L111 154.268C109.144 155.34 106.856 155.34 105 154.268L69.4308 133.732C67.5744 132.66 66.4308 130.679 66.4308 128.536V87.4641C66.4308 85.3205 67.5744 83.3397 69.4308 82.268L105 61.7321Z"
        fill="#D6E7FF"
      />
      <mask
        id="mask2_503_14655"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="66"
        y="60"
        width="84"
        height="96"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M105 61.7321C106.856 60.6603 109.144 60.6603 111 61.7321L146.569 82.268C148.426 83.3397 149.569 85.3205 149.569 87.4641V128.536C149.569 130.679 148.426 132.66 146.569 133.732L111 154.268C109.144 155.34 106.856 155.34 105 154.268L69.4308 133.732C67.5744 132.66 66.4308 130.679 66.4308 128.536V87.4641C66.4308 85.3205 67.5744 83.3397 69.4308 82.268L105 61.7321Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask2_503_14655)">
        <path
          d="M89.3335 91.672L108 80.5001L126.667 91.672V124.328L108 135.5L89.3335 124.328V91.672Z"
          fill="#A1C7FF"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )

export const TrophyLevel7: React.FC<TrophyLevelProps> = ({ achieved, ...rest }) =>
  achieved ? (
    <svg width="216" height="221" viewBox="0 0 216 221" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <mask
        id="mask0_503_13465"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="24"
        y="24"
        width="168"
        height="169"
      >
        <circle cx="108" cy="108" r="84" fill="white" />
      </mask>
      <g mask="url(#mask0_503_13465)">
        <circle cx="108" cy="108" r="84" fill="url(#paint0_linear_503_13465)" />
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.04">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33.0004 32.9989C26.3729 32.9989 21.0004 38.3715 21.0004 44.9989C21.0004 51.6263 26.3729 56.9989 33.0004 56.9989H54.0004C60.6278 56.9989 66.0004 51.6263 66.0004 44.9989C66.0004 38.3715 60.6278 32.9989 54.0004 32.9989H33.0004ZM141 81.0007C134.373 81.0007 129 86.3733 129 93.0007C129 99.6282 134.373 105.001 141 105.001H213C219.628 105.001 225 99.6282 225 93.0007C225 86.3733 219.628 81.0007 213 81.0007H141ZM108 165C108 158.372 113.373 153 120 153H192C198.628 153 204 158.372 204 165C204 171.627 198.628 177 192 177H120C113.373 177 108 171.627 108 165ZM30.0002 129C23.3728 129 18.0002 134.373 18.0002 141C18.0002 147.627 23.3728 153 30.0002 153H78.0002C84.6276 153 90.0002 147.627 90.0002 141C90.0002 134.373 84.6276 129 78.0002 129H30.0002ZM12.0002 101.999C12.0002 98.6856 14.6865 95.9993 18.0002 95.9993H45.0002C48.3139 95.9993 51.0002 98.6856 51.0002 101.999C51.0002 105.313 48.3139 107.999 45.0002 107.999H18.0002C14.6865 107.999 12.0002 105.313 12.0002 101.999ZM18.0002 68.9996C14.6865 68.9996 12.0002 71.6859 12.0002 74.9996C12.0002 78.3133 14.6865 80.9996 18.0002 80.9996H102C105.314 80.9996 108 78.3133 108 74.9996C108 71.6859 105.314 68.9996 102 68.9996H18.0002ZM90 38.9989C90 35.6852 92.6863 32.9989 96 32.9989H180C183.314 32.9989 186 35.6852 186 38.9989C186 42.3126 183.314 44.9989 180 44.9989H96C92.6863 44.9989 90 42.3126 90 38.9989ZM6.00018 171C2.68647 171 0.000183105 173.686 0.000183105 177C0.000183105 180.314 2.68647 183 6.00018 183H90.0002C93.3139 183 96.0002 180.314 96.0002 177C96.0002 173.686 93.3139 171 90.0002 171H6.00018ZM129 63.0011C129 59.6874 131.686 57.0011 135 57.0011H219C222.314 57.0011 225 59.6874 225 63.0011C225 66.3148 222.314 69.0011 219 69.0011H135C131.686 69.0011 129 66.3148 129 63.0011ZM118.6 116.999C113.74 116.999 109.8 120.939 109.8 125.799C109.8 130.659 113.74 134.599 118.6 134.599H191.4C196.261 134.599 200.201 130.659 200.201 125.799C200.201 120.939 196.261 116.999 191.4 116.999H118.6Z"
            fill="black"
          />
        </g>
      </g>
      <g opacity="0.1">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M98.9955 38.0302C104.565 34.8148 111.426 34.8148 116.996 38.0302L164.091 65.2208C169.66 68.4362 173.091 74.3785 173.091 80.8093V135.191C173.091 141.621 169.66 147.564 164.091 150.779L116.996 177.97C111.426 181.185 104.565 181.185 98.9955 177.97L51.9 150.779C46.3308 147.564 42.9 141.621 42.9 135.191L42.9 80.8093C42.9 74.3785 46.3307 68.4362 51.9 65.2208L98.9955 38.0302Z"
          fill="black"
          style={{ mixBlendMode: "multiply" }}
        />
      </g>
      <g filter="url(#filter0_d_503_13465)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M60 99H108V190.146C108 192.376 105.653 193.827 103.658 192.829L84 183L64.3416 192.829C62.3469 193.827 60 192.376 60 190.146V99Z"
          fill="#7F45F6"
        />
      </g>
      <g filter="url(#filter1_d_503_13465)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M72 108H120V199.146C120 201.376 117.653 202.827 115.658 201.829L96 192L76.3416 201.829C74.3469 202.827 72 201.376 72 199.146V108Z"
          fill="#50E2C2"
        />
      </g>
      <g filter="url(#filter2_d_503_13465)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M108 99H156V190.146C156 192.376 153.653 193.827 151.658 192.829L132 183L112.342 192.829C110.347 193.827 108 192.376 108 190.146V99Z"
          fill="#7F45F6"
        />
      </g>
      <g filter="url(#filter3_d_503_13465)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M96 108H144V199.146C144 201.376 141.653 202.827 139.658 201.829L120 192L100.342 201.829C98.3469 202.827 96 201.376 96 199.146V108Z"
          fill="#50E2C2"
        />
      </g>
      <g filter="url(#filter4_d_503_13465)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M84 114H132V205.146C132 207.376 129.653 208.827 127.658 207.829L108 198L88.3416 207.829C86.3469 208.827 84 207.376 84 205.146V114Z"
          fill="white"
        />
      </g>
      <mask
        id="mask1_503_13465"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="84"
        y="114"
        width="48"
        height="95"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M84 114H132V205.146C132 207.376 129.653 208.827 127.658 207.829L108 198L88.3416 207.829C86.3469 208.827 84 207.376 84 205.146V114Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask1_503_13465)">
        <rect x="96" y="114" width="24" height="96" fill="#F55462" />
      </g>
      <path
        style={{ mixBlendMode: "multiply" }}
        opacity="0.1"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M102 52.9677C105.713 50.8241 110.287 50.8241 114 52.9677L161.756 80.5395C165.469 82.6831 167.756 86.6446 167.756 90.9318V146.075C167.756 150.363 165.469 154.324 161.756 156.468L114 184.039C110.287 186.183 105.713 186.183 102 184.039L54.2443 156.468C50.5314 154.324 48.2443 150.363 48.2443 146.075L48.2443 90.9318C48.2443 86.6446 50.5315 82.6831 54.2443 80.5395L102 52.9677Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M74.4495 117.371L59.4495 111.371V108.371L44.42 102.109C43.1208 101.568 41.7308 102.66 41.9495 104.05L44.0538 117.428C44.2122 118.436 44.8715 119.294 45.8042 119.706L74.4495 132.371V117.371Z"
        fill="url(#paint1_linear_503_13465)"
        stroke="url(#paint2_linear_503_13465)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M68.4495 102.371L53.4495 96.3712V93.3712L38.42 87.1089C37.1208 86.5676 35.7308 87.6597 35.9495 89.0501L38.0538 102.428C38.2122 103.436 38.8715 104.294 39.8042 104.706L68.4495 117.371V102.371Z"
        fill="url(#paint3_linear_503_13465)"
        stroke="url(#paint4_linear_503_13465)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M62.4495 87.3712L47.4495 81.3712V78.3712L32.42 72.1089C31.1208 71.5676 29.7308 72.6597 29.9495 74.0501L32.0538 87.4283C32.2122 88.4356 32.8715 89.2935 33.8042 89.7059L62.4495 102.371V87.3712Z"
        fill="url(#paint5_linear_503_13465)"
        stroke="url(#paint6_linear_503_13465)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M56.4496 72.3713L41.4496 66.3713V63.3713L26.42 57.109C25.1208 56.5677 23.7309 57.6599 23.9496 59.0502L26.0538 72.4284C26.2123 73.4358 26.8716 74.2937 27.8043 74.706L56.4496 87.3713V72.3713Z"
        fill="url(#paint7_linear_503_13465)"
        stroke="url(#paint8_linear_503_13465)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask
        id="mask2_503_13465"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="22"
        y="55"
        width="54"
        height="76"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30.6313 78.3845C30.3754 76.7575 29.3105 75.3719 27.8042 74.7059C26.8715 74.2935 26.2122 73.4356 26.0538 72.4283L23.9495 59.0501C23.8979 58.7216 23.9382 58.3851 24.0661 58.0781C24.4485 57.1605 25.5023 56.7266 26.42 57.1089L40.0756 62.7987C40.9076 63.1454 41.4495 63.9583 41.4495 64.8596C41.4495 65.7726 42.0053 66.5935 42.853 66.9326L52.6779 70.8625C54.9558 71.7737 56.4495 73.98 56.4495 76.4334V81.7401C56.4495 83.6916 57.6376 85.4465 59.4495 86.1712C61.2614 86.896 62.4495 88.6508 62.4495 90.6023V96.7401C62.4495 98.6916 63.6376 100.446 65.4495 101.171C67.2614 101.896 68.4495 103.651 68.4495 105.602V111.74C68.4495 113.692 69.6376 115.446 71.4495 116.171C73.2614 116.896 74.4495 118.651 74.4495 120.602V123.158C74.4495 127.495 69.9898 130.399 66.0233 128.646L45.8042 119.706C44.8715 119.294 44.2122 118.436 44.0538 117.428L42.6313 108.384C42.3754 106.757 41.3105 105.372 39.8042 104.706C38.8715 104.294 38.2122 103.436 38.0538 102.428L36.6313 93.3845C36.3754 91.7575 35.3105 90.3719 33.8042 89.7059C32.8715 89.2935 32.2122 88.4356 32.0538 87.4283L30.6313 78.3845Z"
          fill="white"
          stroke="white"
          strokeWidth="3"
        />
      </mask>
      <g mask="url(#mask2_503_13465)">
        <g opacity="0.1">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M98.9955 38.0306C104.565 34.8152 111.426 34.8152 116.996 38.0305L164.091 65.2212C169.66 68.4366 173.091 74.3789 173.091 80.8096V135.191C173.091 141.622 169.66 147.564 164.091 150.779L116.996 177.97C111.426 181.185 104.565 181.185 98.9955 177.97L51.9 150.779C46.3308 147.564 42.9 141.622 42.9 135.191L42.9 80.8096C42.9 74.3788 46.3307 68.4366 51.9 65.2212L98.9955 38.0306Z"
            fill="black"
            style={{ mixBlendMode: "multiply" }}
          />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M141.55 117.371L156.55 111.371V108.371L171.58 102.109C172.879 101.568 174.269 102.66 174.05 104.05L171.946 117.428C171.788 118.436 171.128 119.294 170.196 119.706L141.55 132.371V117.371Z"
        fill="url(#paint9_linear_503_13465)"
        stroke="url(#paint10_linear_503_13465)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M147.55 102.371L162.55 96.3712V93.3712L177.58 87.1089C178.879 86.5676 180.269 87.6597 180.05 89.0501L177.946 102.428C177.788 103.436 177.128 104.294 176.196 104.706L147.55 117.371V102.371Z"
        fill="url(#paint11_linear_503_13465)"
        stroke="url(#paint12_linear_503_13465)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M153.55 87.3712L168.55 81.3712V78.3712L183.58 72.1089C184.879 71.5676 186.269 72.6597 186.05 74.0501L183.946 87.4283C183.788 88.4356 183.128 89.2935 182.196 89.7059L153.55 102.371V87.3712Z"
        fill="url(#paint13_linear_503_13465)"
        stroke="url(#paint14_linear_503_13465)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M159.55 72.3712L174.55 66.3712V63.3712L189.58 57.1089C190.879 56.5676 192.269 57.6597 192.05 59.0501L189.946 72.4283C189.788 73.4356 189.128 74.2935 188.196 74.7059L159.55 87.3712V72.3712Z"
        fill="url(#paint15_linear_503_13465)"
        stroke="url(#paint16_linear_503_13465)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask
        id="mask3_503_13465"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="140"
        y="55"
        width="54"
        height="76"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M185.369 78.3845C185.624 76.7575 186.689 75.3719 188.196 74.7059C189.128 74.2935 189.788 73.4356 189.946 72.4283L192.05 59.0501C192.102 58.7216 192.062 58.3851 191.934 58.0781C191.551 57.1605 190.497 56.7266 189.58 57.1089L175.924 62.7987C175.092 63.1454 174.55 63.9583 174.55 64.8596C174.55 65.7726 173.994 66.5935 173.147 66.9326L163.322 70.8625C161.044 71.7737 159.55 73.98 159.55 76.4334V81.7401C159.55 83.6916 158.362 85.4465 156.55 86.1712C154.738 86.896 153.55 88.6508 153.55 90.6023V96.7401C153.55 98.6916 152.362 100.446 150.55 101.171C148.738 101.896 147.55 103.651 147.55 105.602V111.74C147.55 113.692 146.362 115.446 144.55 116.171C142.738 116.896 141.55 118.651 141.55 120.602V123.158C141.55 127.495 146.01 130.399 149.977 128.646L170.196 119.706C171.128 119.294 171.788 118.436 171.946 117.428L173.369 108.384C173.624 106.757 174.689 105.372 176.196 104.706C177.128 104.294 177.788 103.436 177.946 102.428L179.369 93.3845C179.624 91.7575 180.689 90.3719 182.196 89.7059C183.128 89.2935 183.788 88.4356 183.946 87.4283L185.369 78.3845Z"
          fill="white"
          stroke="white"
          strokeWidth="3"
        />
      </mask>
      <g mask="url(#mask3_503_13465)">
        <g opacity="0.1">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M116.996 38.0302C111.426 34.8148 104.565 34.8148 98.9955 38.0302L51.8999 65.2208C46.3307 68.4362 42.8999 74.3785 42.8999 80.8093V135.191C42.8999 141.621 46.3307 147.564 51.8999 150.779L98.9955 177.97C104.565 181.185 111.426 181.185 116.995 177.97L164.091 150.779C169.66 147.564 173.091 141.621 173.091 135.191L173.091 80.8093C173.091 74.3785 169.66 68.4362 164.091 65.2208L116.996 38.0302Z"
            fill="black"
            style={{ mixBlendMode: "multiply" }}
          />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M54 126L43.4219 131.289C42.5326 131.734 41.9213 132.59 41.7899 133.576L39.4807 150.895C39.2838 152.372 40.8642 153.435 42.158 152.695L60 142.5L54 126Z"
        fill="url(#paint17_linear_503_13465)"
        stroke="url(#paint18_linear_503_13465)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M162 126L172.578 131.289C173.467 131.734 174.079 132.59 174.21 133.576L176.519 150.895C176.716 152.372 175.136 153.435 173.842 152.695L156 142.5L162 126Z"
        fill="url(#paint19_linear_503_13465)"
        stroke="url(#paint20_linear_503_13465)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M132.691 48.1554C134.034 48.9132 133.497 50.962 131.954 50.962H84.0457C82.502 50.962 81.9649 48.9111 83.3106 48.1545L107.3 34.6672C107.757 34.4102 108.315 34.4105 108.772 34.6681L132.691 48.1554Z"
        fill="url(#paint21_linear_503_13465)"
        stroke="url(#paint22_linear_503_13465)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g filter="url(#filter5_i_503_13465)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M162 150.091C162 151.163 161.428 152.153 160.5 152.689L117 177.804C111.431 181.019 104.569 181.019 99 177.804L55.5 152.689C54.5718 152.153 54 151.163 54 150.091V138.387C54 136.074 56.506 134.631 58.506 135.792L99.5665 159.625C104.781 162.652 111.219 162.652 116.434 159.625L157.494 135.792C159.494 134.631 162 136.074 162 138.387V150.091Z"
          fill="url(#paint23_linear_503_13465)"
        />
      </g>
      <path
        d="M160.5 150.091C160.5 150.627 160.214 151.122 159.75 151.39L116.25 176.505C111.145 179.452 104.855 179.452 99.75 176.505L56.25 151.39C55.7859 151.122 55.5 150.627 55.5 150.091V138.387C55.5 137.231 56.753 136.509 57.753 137.09L98.8135 160.922C104.494 164.219 111.506 164.219 117.187 160.922L158.247 137.09C159.247 136.509 160.5 137.231 160.5 138.387V150.091Z"
        stroke="url(#paint24_linear_503_13465)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask id="path-30-inside-1_503_13465" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M94.9685 57.6645C95.6237 57.0988 96.0076 56.2719 96.0076 55.3941L96.0076 44.2224C96.0076 44.218 96.0076 44.2137 96.0076 44.2093V36.9064C96.0076 33.9383 92.1583 32.7726 90.5116 35.2421L82.9139 46.6362L61.4886 59.1316C60.5668 59.6692 60 60.656 60 61.7231V75.3949C60 77.7909 62.6702 79.2201 64.6639 77.8912L72.4816 72.6805L94.6715 57.8904C94.7758 57.8209 94.875 57.7454 94.9685 57.6645Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M94.9685 57.6645C95.6237 57.0988 96.0076 56.2719 96.0076 55.3941L96.0076 44.2224C96.0076 44.218 96.0076 44.2137 96.0076 44.2093V36.9064C96.0076 33.9383 92.1583 32.7726 90.5116 35.2421L82.9139 46.6362L61.4886 59.1316C60.5668 59.6692 60 60.656 60 61.7231V75.3949C60 77.7909 62.6702 79.2201 64.6639 77.8912L72.4816 72.6805L94.6715 57.8904C94.7758 57.8209 94.875 57.7454 94.9685 57.6645Z"
        fill="url(#paint25_linear_503_13465)"
      />
      <path
        d="M96.0076 55.3941L93.0076 55.3941V55.3941H96.0076ZM94.9685 57.6645L96.9292 59.9352L96.9292 59.9352L94.9685 57.6645ZM96.0076 44.2224L99.0076 44.2224V44.2224H96.0076ZM96.0076 44.2093H93.0076L93.0076 44.2224L96.0076 44.2093ZM90.5116 35.2421L93.0076 36.9064V36.9064L90.5116 35.2421ZM82.9139 46.6362L84.4253 49.2277C84.8198 48.9976 85.1566 48.6805 85.4099 48.3005L82.9139 46.6362ZM61.4886 59.1316L59.9773 56.5402H59.9773L61.4886 59.1316ZM64.6639 77.8912L63 75.3949H63L64.6639 77.8912ZM72.4816 72.6805L70.8177 70.1842L72.4816 72.6805ZM94.6715 57.8904L96.3353 60.3867L94.6715 57.8904ZM93.0076 55.3941L93.0079 55.3939L96.9292 59.9352C98.2397 58.8036 99.0076 57.1499 99.0076 55.3941H93.0076ZM93.0076 44.2224L93.0076 55.3941L99.0076 55.3941L99.0076 44.2224L93.0076 44.2224ZM93.0076 44.2224L93.0076 44.2224H99.0076C99.0076 44.2146 99.0076 44.2057 99.0076 44.1962L93.0076 44.2224ZM93.0076 36.9064V44.2093H99.0076V36.9064H93.0076ZM93.0076 36.9064C93.0203 36.8873 93.029 36.8776 93.032 36.8745C93.0349 36.8713 93.0342 36.8726 93.0294 36.8762C93.0247 36.8797 93.0182 36.884 93.0102 36.8881C93.0023 36.8922 92.9948 36.8952 92.9882 36.8974C92.975 36.9016 92.9701 36.9009 92.9752 36.9009C92.9777 36.9009 92.9821 36.9011 92.9881 36.902C92.994 36.9029 93.0007 36.9043 93.0076 36.9064C93.0146 36.9085 93.0209 36.911 93.0264 36.9136C93.0318 36.9161 93.0355 36.9184 93.0377 36.9198C93.0419 36.9227 93.0374 36.9205 93.0288 36.9097C93.0245 36.9042 93.0199 36.8975 93.0156 36.8898C93.0113 36.8819 93.0082 36.8747 93.0062 36.8691C93.0043 36.8635 93.0044 36.8621 93.0051 36.8663C93.0058 36.8706 93.0076 36.8835 93.0076 36.9064H99.0076C99.0076 30.9703 91.3089 28.6389 88.0156 33.5777L93.0076 36.9064ZM85.4099 48.3005L93.0076 36.9064L88.0156 33.5777L80.4179 44.9719L85.4099 48.3005ZM63 61.7231L84.4253 49.2277L81.4025 44.0447L59.9773 56.5402L63 61.7231ZM63 61.7231L63 61.7231L59.9773 56.5402C58.1337 57.6154 57 59.5889 57 61.7231H63ZM63 75.3949V61.7231H57V75.3949H63ZM63 75.3949L63 75.3949H57C57 80.1868 62.3404 83.0452 66.3277 80.3876L63 75.3949ZM70.8177 70.1842L63 75.3949L66.3277 80.3876L74.1454 75.1769L70.8177 70.1842ZM93.0076 55.3941L70.8177 70.1842L74.1454 75.1769L96.3353 60.3867L93.0076 55.3941ZM93.0079 55.3939L93.0076 55.3941L96.3353 60.3867C96.5437 60.2478 96.7419 60.0969 96.9292 59.9352L93.0079 55.3939Z"
        fill="url(#paint26_linear_503_13465)"
        mask="url(#path-30-inside-1_503_13465)"
      />
      <mask id="path-32-inside-2_503_13465" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M120 44.2095C120 44.2138 120 44.2181 120 44.2224V55.3941C120 56.0485 120.213 56.6746 120.593 57.1854C120.723 57.3597 120.872 57.5206 121.039 57.6645C121.133 57.7454 121.232 57.8209 121.336 57.8904L121.336 57.8904L143.526 72.6805L151.344 77.8912C153.337 79.2201 156.008 77.7909 156.008 75.3949V61.7231C156.008 60.656 155.441 59.6692 154.519 59.1316L133.094 46.6362L125.496 35.2421C123.849 32.7726 120 33.9383 120 36.9064V44.2095Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M120 44.2095C120 44.2138 120 44.2181 120 44.2224V55.3941C120 56.0485 120.213 56.6746 120.593 57.1854C120.723 57.3597 120.872 57.5206 121.039 57.6645C121.133 57.7454 121.232 57.8209 121.336 57.8904L121.336 57.8904L143.526 72.6805L151.344 77.8912C153.337 79.2201 156.008 77.7909 156.008 75.3949V61.7231C156.008 60.656 155.441 59.6692 154.519 59.1316L133.094 46.6362L125.496 35.2421C123.849 32.7726 120 33.9383 120 36.9064V44.2095Z"
        fill="url(#paint27_linear_503_13465)"
      />
      <path
        d="M120 44.2095L123 44.2216V44.2095H120ZM120.593 57.1854L123 55.3943L123 55.3943L120.593 57.1854ZM121.039 57.6645L119.078 59.9352L119.078 59.9352L121.039 57.6645ZM121.336 57.8904L119.672 60.3867C119.867 60.5162 120.075 60.6226 120.294 60.7036L121.336 57.8904ZM121.336 57.8904L123 55.3941C122.806 55.2646 122.597 55.1582 122.378 55.0772L121.336 57.8904ZM143.526 72.6805L145.19 70.1842L143.526 72.6805ZM151.344 77.8912L153.008 75.3949L151.344 77.8912ZM154.519 59.1316L156.03 56.5402V56.5402L154.519 59.1316ZM133.094 46.6362L130.598 48.3005C130.851 48.6805 131.188 48.9976 131.582 49.2277L133.094 46.6362ZM125.496 35.2421L127.992 33.5777V33.5777L125.496 35.2421ZM117 44.1975C117 44.2058 117 44.2141 117 44.2224H123C123 44.2221 123 44.2218 123 44.2216L117 44.1975ZM117 44.2224V55.3941H123V44.2224H117ZM117 55.3941C117 56.7032 117.427 57.9557 118.187 58.9764L123 55.3943L123 55.3941H117ZM118.187 58.9764C118.446 59.3251 118.745 59.647 119.078 59.9352L123 55.3939L123 55.3943L118.187 58.9764ZM119.078 59.9352C119.266 60.0968 119.464 60.2477 119.672 60.3867L123 55.3941L123 55.3939L119.078 59.9352ZM120.294 60.7036L120.294 60.7036L122.378 55.0772L122.378 55.0771L120.294 60.7036ZM119.672 60.3867L141.862 75.1769L145.19 70.1842L123 55.3941L119.672 60.3867ZM141.862 75.1769L149.68 80.3876L153.008 75.3949L145.19 70.1842L141.862 75.1769ZM149.68 80.3876C153.667 83.0452 159.008 80.1868 159.008 75.3949H153.008L153.008 75.3949L149.68 80.3876ZM159.008 75.3949V61.7231H153.008V75.3949H159.008ZM159.008 61.7231C159.008 59.5889 157.874 57.6154 156.03 56.5402L153.008 61.7231V61.7231H159.008ZM156.03 56.5402L134.605 44.0447L131.582 49.2277L153.008 61.7231L156.03 56.5402ZM135.59 44.9719L127.992 33.5777L123 36.9064L130.598 48.3005L135.59 44.9719ZM127.992 33.5777C124.699 28.6389 117 30.9703 117 36.9064H123C123 36.8835 123.002 36.8706 123.003 36.8663C123.003 36.8621 123.003 36.8635 123.001 36.8691C122.999 36.8747 122.996 36.8819 122.992 36.8898C122.988 36.8975 122.983 36.9042 122.979 36.9097C122.97 36.9205 122.966 36.9227 122.97 36.9198C122.972 36.9184 122.976 36.9161 122.981 36.9136C122.987 36.911 122.993 36.9085 123 36.9064C123.007 36.9043 123.014 36.9029 123.02 36.902C123.026 36.9011 123.03 36.9009 123.032 36.9009C123.038 36.9009 123.033 36.9016 123.019 36.8974C123.013 36.8952 123.005 36.8922 122.997 36.8881C122.989 36.884 122.983 36.8797 122.978 36.8762C122.973 36.8726 122.973 36.8713 122.976 36.8745C122.979 36.8776 122.987 36.8873 123 36.9064L127.992 33.5777ZM117 36.9064V44.2095H123V36.9064H117Z"
        fill="url(#paint28_linear_503_13465)"
        mask="url(#path-32-inside-2_503_13465)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M102 42.4641C105.713 40.3205 110.287 40.3205 114 42.4641L161.756 70.0359C165.469 72.1795 167.756 76.141 167.756 80.4282V135.572C167.756 139.859 165.469 143.821 161.756 145.964L114 173.536C110.287 175.679 105.713 175.679 102 173.536L54.2442 145.964C50.5314 143.821 48.2442 139.859 48.2442 135.572V80.4282C48.2442 76.141 50.5314 72.1795 54.2442 70.0359L102 42.4641Z"
        fill="url(#paint29_linear_503_13465)"
        stroke="#FFF04D"
        strokeOpacity="0.4"
        strokeWidth="3"
      />
      <mask
        id="mask4_503_13465"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="48"
        y="40"
        width="120"
        height="136"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M102 42.4641C105.713 40.3205 110.287 40.3205 114 42.4641L161.756 70.0359C165.469 72.1795 167.756 76.141 167.756 80.4282V135.572C167.756 139.859 165.469 143.821 161.756 145.964L114 173.536C110.287 175.679 105.713 175.679 102 173.536L54.2442 145.964C50.5314 143.821 48.2442 139.859 48.2442 135.572V80.4282C48.2442 76.141 50.5314 72.1795 54.2442 70.0359L102 42.4641Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask4_503_13465)">
        <g style={{ mixBlendMode: "multiply" }} opacity="0.4">
          <path
            d="M108 108L126 36H90L108 108L69.8164 44.3604L44.3605 69.8162L108 108L36 90V126L108 108L44.3605 146.184L69.8164 171.64L108 108L90 180H126L108 108L146.184 171.64L171.639 146.184L108 108L180 126V90L108 108L171.639 69.8162L146.184 44.3604L108 108Z"
            fill="#FFD640"
          />
        </g>
        <g filter="url(#filter6_di_503_13465)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M155.013 75.5654L112.55 51.0204C109.734 49.3931 106.266 49.3931 103.45 51.0204L60.987 75.5654C58.1716 77.1928 56.4373 80.2002 56.4373 83.4549V101.162L52.9949 106.332C52.3243 107.339 52.3243 108.65 52.9949 109.657L56.4373 114.827V132.545C56.4373 135.8 58.1716 138.807 60.987 140.434L103.45 164.979C106.266 166.607 109.734 166.607 112.55 164.979L155.013 140.434C157.828 138.807 159.562 135.8 159.562 132.545V114.827L163.005 109.657C163.676 108.65 163.676 107.339 163.005 106.332L159.562 101.162V83.4549C159.562 80.2002 157.828 77.1928 155.013 75.5654ZM59.4705 114.827V132.545C59.4705 134.715 60.6267 136.72 62.5036 137.805L104.967 162.35C106.844 163.434 109.156 163.434 111.033 162.35L153.496 137.805C155.373 136.72 156.529 134.715 156.529 132.545V114.827L153.087 109.657C152.416 108.65 152.416 107.339 153.087 106.332L156.529 101.162V83.4549C156.529 81.2851 155.373 79.2801 153.496 78.1952L111.033 53.6502C109.156 52.5653 106.844 52.5653 104.967 53.6502L62.5036 78.1952C60.6267 79.2801 59.4705 81.2851 59.4705 83.4549V101.162L62.9129 106.332C63.5835 107.339 63.5835 108.65 62.9129 109.657L59.4705 114.827Z"
            fill="#676763"
          />
        </g>
        <mask
          id="mask5_503_13465"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="52"
          y="49"
          width="112"
          height="118"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M155.013 75.5654L112.55 51.0204C109.734 49.3931 106.266 49.3931 103.45 51.0204L60.987 75.5654C58.1716 77.1928 56.4373 80.2002 56.4373 83.4549V101.162L52.9949 106.332C52.3243 107.339 52.3243 108.65 52.9949 109.657L56.4373 114.827V132.545C56.4373 135.8 58.1716 138.807 60.987 140.434L103.45 164.979C106.266 166.607 109.734 166.607 112.55 164.979L155.013 140.434C157.828 138.807 159.562 135.8 159.562 132.545V114.827L163.005 109.657C163.676 108.65 163.676 107.339 163.005 106.332L159.562 101.162V83.4549C159.562 80.2002 157.828 77.1928 155.013 75.5654ZM59.4705 114.827V132.545C59.4705 134.715 60.6267 136.72 62.5036 137.805L104.967 162.35C106.844 163.434 109.156 163.434 111.033 162.35L153.496 137.805C155.373 136.72 156.529 134.715 156.529 132.545V114.827L153.087 109.657C152.416 108.65 152.416 107.339 153.087 106.332L156.529 101.162V83.4549C156.529 81.2851 155.373 79.2801 153.496 78.1952L111.033 53.6502C109.156 52.5653 106.844 52.5653 104.967 53.6502L62.5036 78.1952C60.6267 79.2801 59.4705 81.2851 59.4705 83.4549V101.162L62.9129 106.332C63.5835 107.339 63.5835 108.65 62.9129 109.657L59.4705 114.827Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask5_503_13465)">
          <g style={{ mixBlendMode: "multiply" }} opacity="0.4">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M108 108L36 90V126L108 108ZM108 108L126 36H90L108 108ZM108 108L180 126V90L108 108ZM108 108L146.184 44.3604L171.64 69.8162L108 108ZM108 108L171.64 146.184L146.184 171.64L108 108ZM108 108L69.8162 171.64L44.3604 146.184L108 108ZM108 108L126 180H90L108 108Z"
              fill="#5A5951"
            />
            <path d="M69.8162 44.3604L44.3604 69.8162L108 108L69.8162 44.3604Z" fill="#5A5951" />
          </g>
        </g>
        <path
          d="M113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9943 71.3349C51.7456 73.2105 49.7443 76.6768 49.7443 80.4281L49.7443 135.572C49.7443 139.323 51.7456 142.789 54.9943 144.665L102.75 172.237C105.999 174.112 110.001 174.112 113.25 172.237L161.006 144.665C164.254 142.789 166.256 139.323 166.256 135.572V80.4281C166.256 76.6768 164.254 73.2105 161.006 71.3349L113.25 43.7631Z"
          stroke="#FAB90A"
          strokeWidth="3"
        />
        <path
          opacity="0.4"
          d="M113.25 172.237C118.867 168.994 122.846 166.696 125.189 165.344"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M166.256 135.572V80.4281C166.256 76.6768 164.254 73.2105 161.006 71.3349L113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9943 71.3349C51.7456 73.2105 49.7443 76.6768 49.7443 80.4281L49.7443 135.572"
          stroke="#FAC81C"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          opacity="0.6"
          d="M166.256 80.4281C166.256 76.6768 164.254 73.2105 161.006 71.3349L113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9943 71.3349C51.7456 73.2105 49.7443 76.6768 49.7443 80.4281"
          stroke="#FFE56A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          opacity="0.6"
          d="M113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631C102.75 43.7631 86.8314 52.9537 78.8721 57.549"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M102.75 43.7629C102.75 43.7629 94.3251 48.627 90.811 50.6559"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g filter="url(#filter7_d_503_13465)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M105 61.7321C106.856 60.6603 109.144 60.6603 111 61.7321L146.569 82.268C148.426 83.3397 149.569 85.3205 149.569 87.4641V128.536C149.569 130.679 148.426 132.66 146.569 133.732L111 154.268C109.144 155.34 106.856 155.34 105 154.268L69.4308 133.732C67.5744 132.66 66.4308 130.679 66.4308 128.536V87.4641C66.4308 85.3205 67.5744 83.3397 69.4308 82.268L105 61.7321Z"
          fill="url(#paint30_linear_503_13465)"
        />
        <path
          d="M111.75 60.433C109.429 59.0933 106.571 59.0933 104.25 60.433L68.6808 80.9689C66.3603 82.3087 64.9308 84.7846 64.9308 87.4641V128.536C64.9308 131.215 66.3603 133.691 68.6808 135.031L104.25 155.567C106.571 156.907 109.429 156.907 111.75 155.567L147.319 135.031C149.64 133.691 151.069 131.215 151.069 128.536V87.4641C151.069 84.7846 149.64 82.3087 147.319 80.9689L111.75 60.433Z"
          stroke="#F5900D"
          strokeOpacity="0.1"
          strokeWidth="3"
          style={{ mixBlendMode: "multiply" }}
        />
      </g>
      <mask
        id="mask6_503_13465"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="66"
        y="60"
        width="84"
        height="96"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M105 61.7321C106.856 60.6603 109.144 60.6603 111 61.7321L146.569 82.268C148.426 83.3397 149.569 85.3205 149.569 87.4641V128.536C149.569 130.679 148.426 132.66 146.569 133.732L111 154.268C109.144 155.34 106.856 155.34 105 154.268L69.4308 133.732C67.5744 132.66 66.4308 130.679 66.4308 128.536V87.4641C66.4308 85.3205 67.5744 83.3397 69.4308 82.268L105 61.7321Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask6_503_13465)">
        <g style={{ mixBlendMode: "multiply" }} opacity="0.3">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M108 108L60 120V96L108 108ZM108 108L120 60H96L108 108ZM108 108L156 96V120L108 108ZM108 108L133.456 65.5736L150.426 82.5442L108 108ZM108 108L133.456 150.426L150.426 133.456L108 108ZM108 108L96 156H120L108 108ZM108 108L82.5442 150.426L65.5736 133.456L108 108Z"
            fill="#FFD640"
          />
          <path d="M82.5442 65.5736L65.5736 82.5442L108 108L82.5442 65.5736Z" fill="#FFD640" />
        </g>
        <path
          opacity="0.4"
          d="M145.819 83.5671L110.25 63.0312C108.858 62.2274 107.142 62.2274 105.75 63.0312C101.567 65.4464 98.6027 67.1578 96.8578 68.1652C93.2263 70.2618 90.2622 71.9732 87.9655 73.2992C84.0133 75.5809 78.0851 79.0036 70.1808 83.5671"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M105.75 63.0311C101.567 65.4463 98.6026 67.1577 96.8577 68.1651"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          opacity="0.4"
          d="M145.819 132.33L110.25 152.866C108.858 153.67 107.142 153.67 105.75 152.866"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g filter="url(#filter8_d_503_13465)">
        <mask
          id="path-53-outside-3_503_13465"
          maskUnits="userSpaceOnUse"
          x="74"
          y="83.4115"
          width="68"
          height="55"
          fill="black"
        >
          <rect fill="white" x="74" y="83.4115" width="68" height="55" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M81 105L90 89.4115H126L135 105H81ZM108 132L135 105H81L108 132Z"
          />
        </mask>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M81 105L90 89.4115H126L135 105H81ZM108 132L135 105H81L108 132Z"
          fill="white"
        />
        <path
          d="M90 89.4115V83.4115C87.8564 83.4115 85.8756 84.5551 84.8038 86.4115L90 89.4115ZM81 105L75.8038 102C74.7321 103.856 74.7321 106.144 75.8038 108C76.8756 109.856 78.8564 111 81 111V105ZM126 89.4115L131.196 86.4115C130.124 84.5551 128.144 83.4115 126 83.4115V89.4115ZM135 105V111C137.144 111 139.124 109.856 140.196 108C141.268 106.144 141.268 103.856 140.196 102L135 105ZM135 105L139.243 109.243C140.959 107.527 141.472 104.946 140.543 102.704C139.615 100.462 137.427 99 135 99V105ZM108 132L103.757 136.243C106.101 138.586 109.899 138.586 112.243 136.243L108 132ZM81 105V99C78.5732 99 76.3854 100.462 75.4567 102.704C74.528 104.946 75.0414 107.527 76.7574 109.243L81 105ZM84.8038 86.4115L75.8038 102L86.1962 108L95.1962 92.4115L84.8038 86.4115ZM126 83.4115H90V95.4115H126V83.4115ZM140.196 102L131.196 86.4115L120.804 92.4115L129.804 108L140.196 102ZM81 111H135V99H81V111ZM130.757 100.757L103.757 127.757L112.243 136.243L139.243 109.243L130.757 100.757ZM81 111H135V99H81V111ZM112.243 127.757L85.2426 100.757L76.7574 109.243L103.757 136.243L112.243 127.757Z"
          fill="white"
          mask="url(#path-53-outside-3_503_13465)"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M108 132L135 105H81L108 132Z"
        fill="url(#paint31_linear_503_13465)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M108 132L99 105H117L108 132Z"
        fill="url(#paint32_linear_503_13465)"
      />
      <path d="M90 89.4115L81 105H135L126 89.4115H90Z" fill="url(#paint33_linear_503_13465)" />
      <path d="M90 89.4115L99 105H81L90 89.4115Z" fill="url(#paint34_linear_503_13465)" />
      <path d="M108 89.4115L117 105H99L108 89.4115Z" fill="url(#paint35_linear_503_13465)" />
      <path d="M126 89.4115L135 105H117L126 89.4115Z" fill="url(#paint36_linear_503_13465)" />
      <g filter="url(#filter9_d_503_13465)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M140.733 89.3398L139.175 88.7253C138.222 88.3495 137.754 87.2724 138.13 86.3195C138.318 85.8415 138.697 85.4632 139.175 85.2747L140.733 84.6602C142.529 83.9516 143.952 82.5294 144.66 80.7327L145.275 79.1747C145.65 78.2218 146.728 77.754 147.68 78.1298C148.158 78.3183 148.537 78.6967 148.725 79.1747L149.34 80.7327C150.048 82.5294 151.471 83.9516 153.267 84.6602L154.825 85.2747C155.778 85.6505 156.246 86.7276 155.87 87.6805C155.682 88.1585 155.303 88.5368 154.825 88.7253L153.267 89.3398C151.471 90.0484 150.048 91.4706 149.34 93.2673L148.725 94.8253C148.35 95.7782 147.272 96.246 146.32 95.8702C145.842 95.6817 145.463 95.3033 145.275 94.8253L144.66 93.2673C143.952 91.4706 142.529 90.0484 140.733 89.3398Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter10_d_503_13465)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M79.8218 136.56L78.7831 136.15C78.1479 135.9 77.836 135.182 78.0866 134.546C78.2122 134.228 78.4645 133.975 78.7831 133.85L79.8218 133.44C81.0196 132.968 81.9677 132.02 82.4401 130.822L82.8498 129.783C83.1003 129.148 83.8184 128.836 84.4536 129.087C84.7723 129.212 85.0245 129.464 85.1502 129.783L85.5599 130.822C86.0323 132.02 86.9804 132.968 88.1782 133.44L89.2169 133.85C89.8521 134.1 90.164 134.818 89.9134 135.454C89.7878 135.772 89.5355 136.025 89.2169 136.15L88.1782 136.56C86.9804 137.032 86.0323 137.98 85.5599 139.178L85.1502 140.217C84.8997 140.852 84.1816 141.164 83.5464 140.913C83.2277 140.788 82.9755 140.536 82.8498 140.217L82.4401 139.178C81.9677 137.98 81.0196 137.032 79.8218 136.56Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter11_d_503_13465)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M62.2773 93.4498L60.9789 92.9378C60.1849 92.6246 59.795 91.727 60.1082 90.9329C60.2653 90.5346 60.5806 90.2193 60.9789 90.0622L62.2773 89.5502C63.7745 88.9597 64.9597 87.7745 65.5502 86.2773L66.0622 84.9789C66.3754 84.1849 67.273 83.795 68.0671 84.1082C68.4654 84.2653 68.7807 84.5806 68.9378 84.9789L69.4498 86.2773C70.0403 87.7745 71.2255 88.9597 72.7227 89.5502L74.0211 90.0622C74.8151 90.3754 75.205 91.273 74.8918 92.0671C74.7347 92.4654 74.4194 92.7807 74.0211 92.9378L72.7227 93.4498C71.2255 94.0403 70.0403 95.2255 69.4498 96.7227L68.9378 98.0211C68.6246 98.8151 67.727 99.205 66.9329 98.8918C66.5346 98.7347 66.2193 98.4194 66.0622 98.0211L65.5502 96.7227C64.9597 95.2255 63.7745 94.0403 62.2773 93.4498Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter12_d_503_13465)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M139.366 137.67L138.587 137.363C138.111 137.175 137.877 136.636 138.065 136.16C138.159 135.921 138.348 135.732 138.587 135.637L139.366 135.33C140.265 134.976 140.976 134.265 141.33 133.366L141.637 132.587C141.825 132.111 142.364 131.877 142.84 132.065C143.079 132.159 143.268 132.348 143.363 132.587L143.67 133.366C144.024 134.265 144.735 134.976 145.634 135.33L146.413 135.637C146.889 135.825 147.123 136.364 146.935 136.84C146.841 137.079 146.652 137.268 146.413 137.363L145.634 137.67C144.735 138.024 144.024 138.735 143.67 139.634L143.363 140.413C143.175 140.889 142.636 141.123 142.16 140.935C141.921 140.841 141.732 140.652 141.637 140.413L141.33 139.634C140.976 138.735 140.265 138.024 139.366 137.67Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter13_d_503_13465)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M126.911 105.78L126.392 105.575C126.074 105.45 125.918 105.091 126.043 104.773C126.106 104.614 126.232 104.488 126.392 104.425L126.911 104.22C127.51 103.984 127.984 103.51 128.22 102.911L128.425 102.392C128.55 102.074 128.909 101.918 129.227 102.043C129.386 102.106 129.512 102.232 129.575 102.392L129.78 102.911C130.016 103.51 130.49 103.984 131.089 104.22L131.608 104.425C131.926 104.55 132.082 104.909 131.957 105.227C131.894 105.386 131.768 105.512 131.608 105.575L131.089 105.78C130.49 106.016 130.016 106.49 129.78 107.089L129.575 107.608C129.45 107.926 129.091 108.082 128.773 107.957C128.614 107.894 128.488 107.768 128.425 107.608L128.22 107.089C127.984 106.49 127.51 106.016 126.911 105.78Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_503_13465"
          x="54"
          y="99"
          width="60"
          height="106.15"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.61352 0 0 0 0 0.61352 0 0 0 0 0.61352 0 0 0 0.2 0" />
          <feBlend mode="darken" in2="BackgroundImageFix" result="effect1_dropShadow_503_13465" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13465" result="shape" />
        </filter>
        <filter
          id="filter1_d_503_13465"
          x="66"
          y="108"
          width="60"
          height="106.15"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.61352 0 0 0 0 0.61352 0 0 0 0 0.61352 0 0 0 0.2 0" />
          <feBlend mode="darken" in2="BackgroundImageFix" result="effect1_dropShadow_503_13465" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13465" result="shape" />
        </filter>
        <filter
          id="filter2_d_503_13465"
          x="102"
          y="99"
          width="60"
          height="106.15"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.61352 0 0 0 0 0.61352 0 0 0 0 0.61352 0 0 0 0.2 0" />
          <feBlend mode="darken" in2="BackgroundImageFix" result="effect1_dropShadow_503_13465" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13465" result="shape" />
        </filter>
        <filter
          id="filter3_d_503_13465"
          x="90"
          y="108"
          width="60"
          height="106.15"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.61352 0 0 0 0 0.61352 0 0 0 0 0.61352 0 0 0 0.2 0" />
          <feBlend mode="darken" in2="BackgroundImageFix" result="effect1_dropShadow_503_13465" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13465" result="shape" />
        </filter>
        <filter
          id="filter4_d_503_13465"
          x="78"
          y="114"
          width="60"
          height="106.15"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.61352 0 0 0 0 0.61352 0 0 0 0 0.61352 0 0 0 0.2 0" />
          <feBlend mode="darken" in2="BackgroundImageFix" result="effect1_dropShadow_503_13465" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13465" result="shape" />
        </filter>
        <filter
          id="filter5_i_503_13465"
          x="54"
          y="135.382"
          width="108"
          height="47.833"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.929412 0 0 0 0 0.568627 0 0 0 0 0 0 0 0 0.5 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_503_13465" />
        </filter>
        <filter
          id="filter6_di_503_13465"
          x="49.4919"
          y="47.9999"
          width="117.016"
          height="122.4"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1.2" />
          <feGaussianBlur stdDeviation="1.5" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.909804 0 0 0 0 0.556863 0 0 0 0.4 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13465" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13465" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.31048 0 0 0 0 0.31048 0 0 0 0 0.279572 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_503_13465" />
        </filter>
        <filter
          id="filter7_d_503_13465"
          x="57.4308"
          y="54.9282"
          width="101.138"
          height="112.144"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.927721 0 0 0 0 0.665867 0 0 0 0 0.0535899 0 0 0 0.4 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13465" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13465" result="shape" />
        </filter>
        <filter
          id="filter8_d_503_13465"
          x="68.9998"
          y="80.4115"
          width="78.0004"
          height="66.5885"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.996078 0 0 0 0 0.733333 0 0 0 0 0.105882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13465" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13465" result="shape" />
        </filter>
        <filter
          id="filter9_d_503_13465"
          x="132"
          y="72"
          width="30"
          height="30"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13465" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13465" result="shape" />
        </filter>
        <filter
          id="filter10_d_503_13465"
          x="72"
          y="123"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13465" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13465" result="shape" />
        </filter>
        <filter
          id="filter11_d_503_13465"
          x="54"
          y="78"
          width="27"
          height="27"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13465" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13465" result="shape" />
        </filter>
        <filter
          id="filter12_d_503_13465"
          x="132"
          y="126"
          width="21"
          height="21"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13465" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13465" result="shape" />
        </filter>
        <filter
          id="filter13_d_503_13465"
          x="120"
          y="96"
          width="18"
          height="18"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_13465" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_13465" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_503_13465" x1="24" y1="24" x2="24" y2="192" gradientUnits="userSpaceOnUse">
          <stop stopColor="#575753" />
          <stop offset="1" stopColor="#403F36" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_503_13465"
          x1="18.0127"
          y1="57.2587"
          x2="18.0127"
          y2="132.371"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#75756F" />
          <stop offset="1" stopColor="#3A342A" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_503_13465"
          x1="41.9277"
          y1="101.97"
          x2="41.9277"
          y2="132.371"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_503_13465"
          x1="11.8999"
          y1="56.9341"
          x2="11.8999"
          y2="132.257"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#75756F" />
          <stop offset="1" stopColor="#3A342A" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_503_13465"
          x1="35.9277"
          y1="86.97"
          x2="35.9277"
          y2="117.371"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_503_13465"
          x1="5.72165"
          y1="56.831"
          x2="5.72165"
          y2="132.488"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#75756F" />
          <stop offset="1" stopColor="#3A342A" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_503_13465"
          x1="29.9277"
          y1="71.97"
          x2="29.9277"
          y2="102.371"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_503_13465"
          x1="-0.194672"
          y1="56.9701"
          x2="-0.194672"
          y2="132.471"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#75756F" />
          <stop offset="1" stopColor="#3A342A" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_503_13465"
          x1="23.9279"
          y1="56.9701"
          x2="23.9279"
          y2="87.3713"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_503_13465"
          x1="197.987"
          y1="57.2587"
          x2="197.987"
          y2="132.371"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#75756F" />
          <stop offset="1" stopColor="#3A342A" />
        </linearGradient>
        <linearGradient
          id="paint10_linear_503_13465"
          x1="174.072"
          y1="101.97"
          x2="174.072"
          y2="132.371"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient
          id="paint11_linear_503_13465"
          x1="204.1"
          y1="56.9341"
          x2="204.1"
          y2="132.257"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#75756F" />
          <stop offset="1" stopColor="#3A342A" />
        </linearGradient>
        <linearGradient
          id="paint12_linear_503_13465"
          x1="180.072"
          y1="86.97"
          x2="180.072"
          y2="117.371"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient
          id="paint13_linear_503_13465"
          x1="210.278"
          y1="56.831"
          x2="210.278"
          y2="132.488"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#75756F" />
          <stop offset="1" stopColor="#3A342A" />
        </linearGradient>
        <linearGradient
          id="paint14_linear_503_13465"
          x1="186.072"
          y1="71.97"
          x2="186.072"
          y2="102.371"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient
          id="paint15_linear_503_13465"
          x1="216.195"
          y1="56.97"
          x2="216.195"
          y2="132.47"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#75756F" />
          <stop offset="1" stopColor="#3A342A" />
        </linearGradient>
        <linearGradient
          id="paint16_linear_503_13465"
          x1="192.072"
          y1="56.97"
          x2="192.072"
          y2="87.3712"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient
          id="paint17_linear_503_13465"
          x1="39.4647"
          y1="126"
          x2="39.4647"
          y2="152.933"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#75756F" />
          <stop offset="1" stopColor="#3A342A" />
        </linearGradient>
        <linearGradient
          id="paint18_linear_503_13465"
          x1="39.4647"
          y1="126"
          x2="39.4647"
          y2="152.933"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient
          id="paint19_linear_503_13465"
          x1="177"
          y1="126"
          x2="177"
          y2="154.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#75756F" />
          <stop offset="1" stopColor="#3A342A" />
        </linearGradient>
        <linearGradient
          id="paint20_linear_503_13465"
          x1="177"
          y1="126"
          x2="177"
          y2="154.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient
          id="paint21_linear_503_13465"
          x1="81"
          y1="33"
          x2="81"
          y2="52.462"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#75756F" />
          <stop offset="1" stopColor="#3A342A" />
        </linearGradient>
        <linearGradient
          id="paint22_linear_503_13465"
          x1="81"
          y1="33"
          x2="81"
          y2="52.462"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient
          id="paint23_linear_503_13465"
          x1="54"
          y1="135.386"
          x2="54"
          y2="180.215"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F39C05" />
          <stop offset="1" stopColor="#F59100" />
        </linearGradient>
        <linearGradient
          id="paint24_linear_503_13465"
          x1="54"
          y1="135.386"
          x2="54"
          y2="180.215"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFBA45" />
          <stop offset="1" stopColor="#F59100" />
        </linearGradient>
        <linearGradient
          id="paint25_linear_503_13465"
          x1="60"
          y1="33.9009"
          x2="60"
          y2="78.4"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#75756F" />
          <stop offset="1" stopColor="#3A342A" />
        </linearGradient>
        <linearGradient
          id="paint26_linear_503_13465"
          x1="60"
          y1="33.9009"
          x2="60"
          y2="78.4"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient
          id="paint27_linear_503_13465"
          x1="120"
          y1="33.9009"
          x2="120"
          y2="78.4"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#75756F" />
          <stop offset="1" stopColor="#3A342A" />
        </linearGradient>
        <linearGradient
          id="paint28_linear_503_13465"
          x1="120"
          y1="33.9009"
          x2="120"
          y2="78.4"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDF6B" />
          <stop offset="1" stopColor="#F8A60A" />
        </linearGradient>
        <linearGradient id="paint29_linear_503_13465" x1="39" y1="39" x2="39" y2="177" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE046" />
          <stop offset="1" stopColor="#F9B800" />
        </linearGradient>
        <linearGradient id="paint30_linear_503_13465" x1="60" y1="60" x2="60" y2="156" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF550" />
          <stop offset="1" stopColor="#FFD541" />
        </linearGradient>
        <linearGradient
          id="paint31_linear_503_13465"
          x1="108"
          y1="132"
          x2="108"
          y2="105"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#878787" />
          <stop offset="1" stopColor="#1F1F1F" />
        </linearGradient>
        <linearGradient
          id="paint32_linear_503_13465"
          x1="117"
          y1="132"
          x2="117"
          y2="105"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#878787" />
          <stop offset="1" stopColor="#4E4E4E" />
        </linearGradient>
        <linearGradient
          id="paint33_linear_503_13465"
          x1="135"
          y1="105"
          x2="135"
          y2="89.4115"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#A8A8A8" />
        </linearGradient>
        <linearGradient
          id="paint34_linear_503_13465"
          x1="87"
          y1="105"
          x2="87"
          y2="92.0096"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#818181" />
          <stop offset="1" stopColor="#A0A0A0" />
        </linearGradient>
        <linearGradient
          id="paint35_linear_503_13465"
          x1="105"
          y1="105"
          x2="105"
          y2="92.0096"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#818181" />
          <stop offset="1" stopColor="#A0A0A0" />
        </linearGradient>
        <linearGradient
          id="paint36_linear_503_13465"
          x1="123"
          y1="105"
          x2="123"
          y2="92.0096"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#818181" />
          <stop offset="1" stopColor="#A0A0A0" />
        </linearGradient>
      </defs>
    </svg>
  ) : (
    <svg width="216" height="216" viewBox="0 0 216 216" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <mask
        id="mask0_503_14656"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="24"
        y="24"
        width="168"
        height="169"
      >
        <circle cx="108" cy="108" r="84" fill="white" />
      </mask>
      <g mask="url(#mask0_503_14656)">
        <g style={{ mixBlendMode: "screen" }} opacity="0.24">
          <circle cx="108" cy="108" r="84" fill="white" />
        </g>
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.04">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33 32.9989C26.3726 32.9989 21 38.3715 21 44.9989C21 51.6263 26.3726 56.9989 33 56.9989H54C60.6274 56.9989 66 51.6263 66 44.9989C66 38.3715 60.6274 32.9989 54 32.9989H33ZM141 81.0007C134.373 81.0007 129 86.3733 129 93.0007C129 99.6282 134.373 105.001 141 105.001H213C219.627 105.001 225 99.6282 225 93.0007C225 86.3733 219.627 81.0007 213 81.0007H141ZM108 165C108 158.372 113.373 153 120 153H192C198.627 153 204 158.372 204 165C204 171.627 198.627 177 192 177H120C113.373 177 108 171.627 108 165ZM30 129C23.3726 129 18 134.373 18 141C18 147.627 23.3726 153 30 153H78C84.6274 153 90 147.627 90 141C90 134.373 84.6274 129 78 129H30ZM12 101.999C12 98.6856 14.6863 95.9993 18 95.9993H45C48.3137 95.9993 51 98.6856 51 101.999C51 105.313 48.3137 107.999 45 107.999H18C14.6863 107.999 12 105.313 12 101.999ZM18 68.9996C14.6863 68.9996 12 71.6859 12 74.9996C12 78.3133 14.6863 80.9996 18 80.9996H102C105.314 80.9996 108 78.3133 108 74.9996C108 71.6859 105.314 68.9996 102 68.9996H18ZM90 38.9989C90 35.6852 92.6863 32.9989 96 32.9989H180C183.314 32.9989 186 35.6852 186 38.9989C186 42.3126 183.314 44.9989 180 44.9989H96C92.6863 44.9989 90 42.3126 90 38.9989ZM6 171C2.68629 171 0 173.686 0 177C0 180.314 2.68629 183 6 183H90C93.3137 183 96 180.314 96 177C96 173.686 93.3137 171 90 171H6ZM129 63.0011C129 59.6874 131.686 57.0011 135 57.0011H219C222.314 57.0011 225 59.6874 225 63.0011C225 66.3148 222.314 69.0011 219 69.0011H135C131.686 69.0011 129 66.3148 129 63.0011ZM118.6 116.999C113.74 116.999 109.8 120.939 109.8 125.799C109.8 130.659 113.74 134.599 118.6 134.599H191.4C196.26 134.599 200.2 130.659 200.2 125.799C200.2 120.939 196.26 116.999 191.4 116.999H118.6Z"
            fill="black"
          />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M60 99H108V190.146C108 192.376 105.653 193.827 103.658 192.829L84 183L64.3416 192.829C62.3469 193.827 60 192.376 60 190.146V99Z"
        fill="#A1C7FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M72 108H120V199.146C120 201.376 117.653 202.827 115.658 201.829L96 192L76.3416 201.829C74.3469 202.827 72 201.376 72 199.146V108Z"
        fill="#C0DBFF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M108 99H156V190.146C156 192.376 153.653 193.827 151.658 192.829L132 183L112.342 192.829C110.347 193.827 108 192.376 108 190.146V99Z"
        fill="#A1C7FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M96 108H144V199.146C144 201.376 141.653 202.827 139.658 201.829L120 192L100.342 201.829C98.3469 202.827 96 201.376 96 199.146V108Z"
        fill="#C0DBFF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M84 114H132V205.146C132 207.376 129.653 208.827 127.658 207.829L108 198L88.3416 207.829C86.3469 208.827 84 207.376 84 205.146V114Z"
        fill="#E7F1FF"
      />
      <mask
        id="mask1_503_14656"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="84"
        y="114"
        width="48"
        height="95"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M84 114H132V205.146C132 207.376 129.653 208.827 127.658 207.829L108 198L88.3416 207.829C86.3469 208.827 84 207.376 84 205.146V114Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask1_503_14656)">
        <rect x="96" y="114" width="24" height="96" fill="#A1C7FF" />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M109.508 33.3615L120 39.2777V36.9067C120 33.9386 123.85 32.7729 125.496 35.2423L133.094 46.637L154.519 59.1319C155.441 59.6695 156.007 60.6563 156.007 61.7234V75.7775C156.007 78.0928 153.496 79.5354 151.496 78.369L121.488 60.8683C120.567 60.3307 120 59.3439 120 58.2768V52.4621H96.0078V52.4999L96.0077 52.5302V58.2768C96.0077 59.3439 95.4408 60.3307 94.519 60.8683L64.5114 78.369C62.5114 79.5354 60 78.0928 60 75.7775V61.7234C60 60.6563 60.5669 59.6695 61.4887 59.1319L82.9142 46.6363L90.5118 35.2423C92.1585 32.7729 96.0078 33.9386 96.0078 36.9067V39.2949L106.565 33.3597C107.479 32.8458 108.595 32.8465 109.508 33.3615ZM41.4494 66.3712L56.4494 72.3712V84.9712L62.4494 87.3712V99.9712L68.4494 102.371V114.971L74.4494 117.371V132.371L45.804 119.706C44.8714 119.294 44.2121 118.436 44.0536 117.428L42.2206 105.774L39.804 104.706C38.8714 104.294 38.2121 103.436 38.0536 102.428L36.2206 90.7744L33.804 89.7059C32.8714 89.2935 32.2121 88.4356 32.0536 87.4283L30.2206 75.7744L27.804 74.7059C26.8714 74.2935 26.2121 73.4356 26.0536 72.4283L23.9494 59.0501C23.7307 57.6597 25.1206 56.5676 26.4198 57.1089L41.4494 63.3712V66.3712ZM174.551 66.3712L159.551 72.3712V84.9712L153.551 87.3712V99.9712L147.551 102.371V114.971L141.551 117.371V132.371L170.196 119.706C171.129 119.294 171.788 118.436 171.946 117.428L173.779 105.774L176.196 104.706C177.129 104.294 177.788 103.436 177.946 102.428L179.779 90.7744L182.196 89.7059C183.129 89.2935 183.788 88.4356 183.946 87.4283L185.779 75.7744L188.196 74.7059C189.129 74.2935 189.788 73.4356 189.946 72.4283L192.051 59.0501C192.269 57.6597 190.879 56.5676 189.58 57.1089L174.551 63.3712V66.3712ZM53.9997 126L43.4216 131.289C42.5322 131.734 41.921 132.59 41.7896 133.576L39.4804 150.895C39.2834 152.372 40.8639 153.435 42.1576 152.695L55.5 145.071V150.091C55.5 150.627 55.7859 151.122 56.25 151.39L99.75 176.505C104.855 179.452 111.145 179.452 116.25 176.505L159.75 151.39C160.214 151.122 160.5 150.627 160.5 150.091V145.071L173.842 152.695C175.136 153.435 176.716 152.372 176.519 150.895L174.21 133.576C174.079 132.59 173.467 131.734 172.578 131.289L162 126L157.893 137.295L117.187 160.922C111.506 164.22 104.494 164.22 98.8135 160.922L58.107 137.295L53.9997 126Z"
        fill="#A1C7FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M102 42.4641C105.713 40.3205 110.287 40.3205 114 42.4641L161.756 70.0359C165.469 72.1795 167.756 76.141 167.756 80.4282V135.572C167.756 139.859 165.469 143.821 161.756 145.964L114 173.536C110.287 175.679 105.713 175.679 102 173.536L54.2442 145.964C50.5314 143.821 48.2442 139.859 48.2442 135.572V80.4282C48.2442 76.141 50.5314 72.1795 54.2442 70.0359L102 42.4641Z"
        fill="#B6D5FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M105 61.7321C106.856 60.6603 109.144 60.6603 111 61.7321L146.569 82.268C148.426 83.3397 149.569 85.3205 149.569 87.4641V128.536C149.569 130.679 148.426 132.66 146.569 133.732L111 154.268C109.144 155.34 106.856 155.34 105 154.268L69.4308 133.732C67.5744 132.66 66.4308 130.679 66.4308 128.536V87.4641C66.4308 85.3205 67.5744 83.3397 69.4308 82.268L105 61.7321Z"
        fill="#D6E7FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M88.5 90H126L135 105L108 132L81 105L88.5 90Z"
        fill="#A1C7FF"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
