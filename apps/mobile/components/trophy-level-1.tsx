import Svg, {
    Circle,
    Defs,
    G,
    LinearGradient,
    Mask,
    Path,
    Stop,
} from "react-native-svg";

export interface TrophyLevelProps {
	achieved: boolean;
	className?: string;
}

export const TrophyLevel1: React.FC<TrophyLevelProps> = ({
	achieved,
	...rest
}) =>
	achieved ? (
		<Svg width="216" height="221" viewBox="0 0 216 221" fill="none" {...rest}>
			<Mask
				id="mask0_503_13458"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="24"
				y="24"
				width="168"
				height="169"
			>
				<Circle cx="108" cy="108" r="84" fill="white" />
			</Mask>
			<G mask="url(#mask0_503_13458)">
				<Circle cx="108" cy="108" r="84" fill="url(#paint0_linear_503_13458)" />
				<G style={{ mixBlendMode: "color-burn" }} opacity="0.04">
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M33.0002 32.9989C26.3728 32.9989 21.0002 38.3715 21.0002 44.9989C21.0002 51.6263 26.3728 56.9989 33.0002 56.9989H54.0002C60.6276 56.9989 66.0002 51.6263 66.0002 44.9989C66.0002 38.3715 60.6276 32.9989 54.0002 32.9989H33.0002ZM141 81.0007C134.373 81.0007 129 86.3733 129 93.0007C129 99.6282 134.373 105.001 141 105.001H213C219.628 105.001 225 99.6282 225 93.0007C225 86.3733 219.628 81.0007 213 81.0007H141ZM108 165C108 158.372 113.373 153 120 153H192C198.628 153 204 158.372 204 165C204 171.627 198.628 177 192 177H120C113.373 177 108 171.627 108 165ZM30.0001 129C23.3727 129 18.0001 134.373 18.0001 141C18.0001 147.627 23.3727 153 30.0001 153H78.0001C84.6275 153 90.0001 147.627 90.0001 141C90.0001 134.373 84.6275 129 78.0001 129H30.0001ZM12.0001 101.999C12.0001 98.6856 14.6864 95.9993 18.0001 95.9993H45.0001C48.3138 95.9993 51.0001 98.6856 51.0001 101.999C51.0001 105.313 48.3138 107.999 45.0001 107.999H18.0001C14.6864 107.999 12.0001 105.313 12.0001 101.999ZM18.0001 68.9996C14.6864 68.9996 12.0001 71.6859 12.0001 74.9996C12.0001 78.3133 14.6864 80.9996 18.0001 80.9996H102C105.314 80.9996 108 78.3133 108 74.9996C108 71.6859 105.314 68.9996 102 68.9996H18.0001ZM90 38.9989C90 35.6852 92.6863 32.9989 96 32.9989H180C183.314 32.9989 186 35.6852 186 38.9989C186 42.3126 183.314 44.9989 180 44.9989H96C92.6863 44.9989 90 42.3126 90 38.9989ZM6.00009 171C2.68638 171 9.15527e-05 173.686 9.15527e-05 177C9.15527e-05 180.314 2.68638 183 6.00009 183H90.0001C93.3138 183 96.0001 180.314 96.0001 177C96.0001 173.686 93.3138 171 90.0001 171H6.00009ZM129 63.0011C129 59.6874 131.686 57.0011 135 57.0011H219C222.314 57.0011 225 59.6874 225 63.0011C225 66.3148 222.314 69.0011 219 69.0011H135C131.686 69.0011 129 66.3148 129 63.0011ZM118.6 116.999C113.74 116.999 109.8 120.939 109.8 125.799C109.8 130.659 113.74 134.599 118.6 134.599H191.4C196.261 134.599 200.2 130.659 200.2 125.799C200.2 120.939 196.26 116.999 191.4 116.999H118.6Z"
						fill="black"
					/>
				</G>
			</G>
			<G opacity="0.1">
				<Circle
					cx="108"
					cy="108"
					r="66"
					fill="#50C22B"
					// style={{ mixBlendMode: "multiply" }}
				/>
			</G>
            <G>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M84 108H132V205.009C132 207.272 129.591 208.72 127.593 207.659L108 197.25L88.4075 207.659C86.4093 208.72 84 207.272 84 205.009V108Z"
					fill="#265388"
				/>
			</G>
			<Circle
				// style={{ mixBlendMode: "multiply" }}
				opacity="0.2"
				cx="108"
				cy="114"
				r="60"
				fill="#62CF3F"
			/>
			<Circle cx="108" cy="108" r="60" fill="url(#paint1_linear_503_13458)" />
			<Mask
				id="mask1_503_13458"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="48"
				y="48"
				width="120"
				height="120"
			>
				<Circle cx="108" cy="108" r="60" fill="white" />
			</Mask>
			<G mask="url(#mask1_503_13458)">
				<Path
					d="M49.5001 108C49.5001 140.309 75.6914 166.5 108 166.5C140.309 166.5 166.5 140.309 166.5 108"
					stroke="#64788F"
					strokeWidth="3"
				/>
				<G style={{ mixBlendMode: "multiply" }} opacity="0.12">
					<Path
						d="M147 119.258L182.258 84"
						stroke="#78A2A9"
						strokeWidth="6"
						strokeLinecap="round"
					/>
				</G>
				<G style={{ mixBlendMode: "multiply" }} opacity="0.12">
					<Path
						d="M132 86.258L167.258 51"
						stroke="#78A2A9"
						strokeWidth="6"
						strokeLinecap="round"
					/>
				</G>
				<G style={{ mixBlendMode: "multiply" }} opacity="0.12">
					<Path
						d="M21.0001 143.258L56.258 108"
						stroke="#78A2A9"
						strokeWidth="6"
						strokeLinecap="round"
					/>
				</G>
				<G style={{ mixBlendMode: "multiply" }} opacity="0.12">
					<Path
						d="M153 77.258L188.258 42"
						stroke="#78A2A9"
						strokeWidth="6"
						strokeLinecap="round"
					/>
				</G>
				<G style={{ mixBlendMode: "multiply" }} opacity="0.12">
					<Path
						d="M42.0001 134.258L77.258 99"
						stroke="#78A2A9"
						strokeWidth="6"
						strokeLinecap="round"
					/>
				</G>
				<G style={{ mixBlendMode: "multiply" }} opacity="0.12">
					<Path
						d="M93.0001 170.258L128.258 135"
						stroke="#78A2A9"
						strokeWidth="6"
						strokeLinecap="round"
					/>
				</G>
				<G style={{ mixBlendMode: "multiply" }} opacity="0.12">
					<Path
						d="M141 149.258L176.258 114"
						stroke="#78A2A9"
						strokeWidth="6"
						strokeLinecap="round"
					/>
				</G>
				<Path
					d="M149.366 149.366C159.952 138.779 166.5 124.154 166.5 108C166.5 75.6913 140.309 49.5 108 49.5C75.6914 49.5 49.5001 75.6913 49.5001 108C49.5001 124.154 56.0479 138.779 66.6343 149.366"
					stroke="#8B99AF"
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<Path
					opacity="0.4"
					d="M166.5 108C166.5 75.6913 140.309 49.5 108 49.5C75.6914 49.5 49.5001 75.6913 49.5001 108"
					stroke="#CCD8EA"
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<Path
					opacity="0.2"
					d="M108 49.5C97.0254 49.5 86.7566 52.522 77.9805 57.7793"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<Path
					opacity="0.6"
					d="M97.5425 50.432C94.7565 50.9348 92.0392 51.6348 89.4054 52.5171"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
				/>
			</G>
            <G>
				<Circle cx="108" cy="108" r="45" fill="url(#paint2_linear_503_13458)" />
				<Circle
					cx="108"
					cy="108"
					r="46.5"
					stroke="#64788F"
					strokeOpacity="0.06"
					strokeWidth="3"
				/>
			</G>
			<Mask
				id="mask2_503_13458"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="63"
				y="63"
				width="90"
				height="90"
			>
				<Circle cx="108" cy="108" r="45" fill="white" />
			</Mask>
			<G mask="url(#mask2_503_13458)">
				<G style={{ mixBlendMode: "multiply" }} opacity="0.12">
					<Path
						d="M132 80.258L167.258 45"
						stroke="#78A2A9"
						strokeWidth="6"
						strokeLinecap="round"
					/>
				</G>
				<G style={{ mixBlendMode: "multiply" }} opacity="0.12">
					<Path
						d="M153 71.258L188.258 36"
						stroke="#78A2A9"
						strokeWidth="6"
						strokeLinecap="round"
					/>
				</G>
				<G style={{ mixBlendMode: "multiply" }} opacity="0.12">
					<Path
						d="M42.0001 128.258L77.2581 93"
						stroke="#78A2A9"
						strokeWidth="6"
						strokeLinecap="round"
					/>
				</G>
				<G style={{ mixBlendMode: "multiply" }} opacity="0.12">
					<Path
						d="M93.0001 164.258L128.258 129"
						stroke="#78A2A9"
						strokeWidth="6"
						strokeLinecap="round"
					/>
				</G>
				<G style={{ mixBlendMode: "multiply" }} opacity="0.12">
					<Path
						d="M147 113.258L182.258 78"
						stroke="#78A2A9"
						strokeWidth="6"
						strokeLinecap="round"
					/>
				</G>
				<Path
					opacity="0.6"
					d="M108 64.5C102.102 64.5 96.4783 65.6738 91.3495 67.8005"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
				/>
			</G>
            <G>
				<Path
					d="M90.8006 108L108 85.8864L125.199 108L108 130.113L90.8006 108Z"
					fill="white"
				/>
				<Path
					d="M88.4325 106.158C87.5899 107.241 87.5899 108.758 88.4325 109.842L105.632 131.955C106.2 132.686 107.074 133.113 108 133.113C108.926 133.113 109.8 132.686 110.368 131.955L127.567 109.842C128.41 108.758 128.41 107.241 127.567 106.158L110.368 84.0445C109.8 83.3138 108.926 82.8864 108 82.8864C107.074 82.8864 106.2 83.3138 105.632 84.0445L88.4325 106.158Z"
					stroke="white"
					strokeWidth="6"
					strokeLinejoin="round"
				/>
			</G>
            <G>
				<Path
					d="M90.8006 108L108 85.8864L125.199 108L108 130.113L90.8006 108Z"
					fill="url(#paint3_linear_503_13458)"
				/>
			</G>
			<Defs>
                
				<LinearGradient
					id="paint0_linear_503_13458"
					x1="24"
					y1="24"
					x2="24"
					y2="192"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#D9E242" />
					<Stop offset="1" stopColor="#84C400" />
				</LinearGradient>
				<LinearGradient
					id="paint1_linear_503_13458"
					x1="48"
					y1="48"
					x2="48"
					y2="168"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#ABB7CC" />
					<Stop offset="1" stopColor="#76879C" />
				</LinearGradient>
				<LinearGradient
					id="paint2_linear_503_13458"
					x1="63"
					y1="63"
					x2="63"
					y2="153"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#C6D1E4" />
					<Stop offset="1" stopColor="#A4B1C4" />
				</LinearGradient>
				<LinearGradient
					id="paint3_linear_503_13458"
					x1="90.8006"
					y1="85.8864"
					x2="90.8006"
					y2="130.113"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#A3B0C5" />
					<Stop offset="1" stopColor="#7A8AA1" />
				</LinearGradient>
			</Defs>
		</Svg>
	) : (
		<Svg width="216" height="216" viewBox="0 0 216 216" fill="none" {...rest}>
			<Mask
				id="mask0_503_14658"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="24"
				y="24"
				width="168"
				height="169"
			>
				<Circle cx="108" cy="108" r="84" fill="white" />
			</Mask>
			<G mask="url(#mask0_503_14658)">
				<G style={{ mixBlendMode: "screen" }} opacity="0.24">
					<Circle cx="108" cy="108" r="84" fill="white" />
				</G>
				<G style={{ mixBlendMode: "color-burn" }} opacity="0.04">
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M33 32.9989C26.3726 32.9989 21 38.3715 21 44.9989C21 51.6263 26.3726 56.9989 33 56.9989H54C60.6274 56.9989 66 51.6263 66 44.9989C66 38.3715 60.6274 32.9989 54 32.9989H33ZM141 81.0007C134.373 81.0007 129 86.3733 129 93.0007C129 99.6282 134.373 105.001 141 105.001H213C219.627 105.001 225 99.6282 225 93.0007C225 86.3733 219.627 81.0007 213 81.0007H141ZM108 165C108 158.372 113.373 153 120 153H192C198.627 153 204 158.372 204 165C204 171.627 198.627 177 192 177H120C113.373 177 108 171.627 108 165ZM30 129C23.3726 129 18 134.373 18 141C18 147.627 23.3726 153 30 153H78C84.6274 153 90 147.627 90 141C90 134.373 84.6274 129 78 129H30ZM12 101.999C12 98.6856 14.6863 95.9993 18 95.9993H45C48.3137 95.9993 51 98.6856 51 101.999C51 105.313 48.3137 107.999 45 107.999H18C14.6863 107.999 12 105.313 12 101.999ZM18 68.9996C14.6863 68.9996 12 71.6859 12 74.9996C12 78.3133 14.6863 80.9996 18 80.9996H102C105.314 80.9996 108 78.3133 108 74.9996C108 71.6859 105.314 68.9996 102 68.9996H18ZM90 38.9989C90 35.6852 92.6863 32.9989 96 32.9989H180C183.314 32.9989 186 35.6852 186 38.9989C186 42.3126 183.314 44.9989 180 44.9989H96C92.6863 44.9989 90 42.3126 90 38.9989ZM6 171C2.68629 171 0 173.686 0 177C0 180.314 2.68629 183 6 183H90C93.3137 183 96 180.314 96 177C96 173.686 93.3137 171 90 171H6ZM129 63.0011C129 59.6874 131.686 57.0011 135 57.0011H219C222.314 57.0011 225 59.6874 225 63.0011C225 66.3148 222.314 69.0011 219 69.0011H135C131.686 69.0011 129 66.3148 129 63.0011ZM118.6 116.999C113.74 116.999 109.8 120.939 109.8 125.799C109.8 130.659 113.74 134.599 118.6 134.599H191.4C196.26 134.599 200.2 130.659 200.2 125.799C200.2 120.939 196.26 116.999 191.4 116.999H118.6Z"
						fill="black"
					/>
				</G>
			</G>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M84 108H132V205.009C132 207.272 129.591 208.72 127.593 207.659L108 197.25L88.4075 207.659C86.4093 208.72 84 207.272 84 205.009V108Z"
				fill="#A1C7FF"
			/>
			<Circle cx="108" cy="108" r="60" fill="#B6D5FF" />
			<Circle cx="108" cy="108" r="45" fill="#D6E7FF" />
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M105.632 84.0446C106.833 82.5004 109.167 82.5004 110.368 84.0446L127.567 106.158C128.41 107.242 128.41 108.758 127.567 109.842L110.368 131.955C109.167 133.5 106.833 133.5 105.632 131.955L88.4325 109.842C87.5899 108.758 87.5899 107.242 88.4325 106.158L105.632 84.0446Z"
				fill="#A1C7FF"
				stroke="white"
				strokeWidth="6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
