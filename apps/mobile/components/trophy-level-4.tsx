import React from "react";
import Svg, {
	Circle,
	Defs,
	FeBlend,
	FeColorMatrix,
	FeFlood,
	FeGaussianBlur,
	FeOffset,
	Filter,
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

export const TrophyLevel4: React.FC<TrophyLevelProps> = ({
	achieved,
	...rest
}) =>
	achieved ? (
		<Svg width="216" height="221" viewBox="0 0 216 221" fill="none" {...rest}>
			<Mask
				id="mask0_503_13462"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="24"
				y="24"
				width="168"
				height="169"
			>
				<Circle cx="108" cy="108" r="84" fill="white" />
			</Mask>
			<G mask="url(#mask0_503_13462)">
				<Circle cx="108" cy="108" r="84" fill="url(#paint0_linear_503_13462)" />
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
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M98.9955 38.0303C104.565 34.8149 111.426 34.8149 116.995 38.0303L164.091 65.221C169.66 68.4363 173.091 74.3786 173.091 80.8094V135.191C173.091 141.622 169.66 147.564 164.091 150.779L116.995 177.97C111.426 181.185 104.565 181.185 98.9955 177.97L51.8999 150.779C46.3307 147.564 42.8999 141.621 42.8999 135.191L42.8999 80.8094C42.8999 74.3786 46.3307 68.4364 51.8999 65.221L98.9955 38.0303Z"
					fill="#0602F3"
					// style={{ mixBlendMode: "multiply" }}
				/>
			</G>
			<G filter="url(#filter0_d_503_13462)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M87.2153 99L128.785 123L80.2799 207.012C79.1486 208.972 76.338 209.021 75.1383 207.103L63.3749 188.293L41.203 187.511C38.9418 187.431 37.5794 184.972 38.7107 183.012L87.2153 99Z"
					fill="#F55462"
				/>
			</G>
			<Mask
				id="mask1_503_13462"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="38"
				y="99"
				width="91"
				height="110"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M87.2153 99L128.785 123L80.2799 207.012C79.1486 208.972 76.338 209.021 75.1383 207.103L63.3749 188.293L41.203 187.511C38.9418 187.431 37.5794 184.972 38.7107 183.012L87.2153 99Z"
					fill="white"
				/>
			</Mask>
			<G mask="url(#mask1_503_13462)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M73.6076 146.569L94.3922 158.569L67.3922 205.335L46.6076 193.335L73.6076 146.569Z"
					fill="white"
				/>
			</G>
			<G filter="url(#filter1_d_503_13462)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M128.784 99L87.2153 123L135.72 207.012C136.851 208.972 139.662 209.021 140.862 207.103L152.625 188.293L174.797 187.511C177.058 187.431 178.42 184.972 177.289 183.012L128.784 99Z"
					fill="#F55462"
				/>
			</G>
			<Mask
				id="mask2_503_13462"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="87"
				y="99"
				width="91"
				height="110"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M128.784 99L87.2153 123L135.72 207.012C136.851 208.972 139.662 209.021 140.862 207.103L152.625 188.293L174.797 187.511C177.058 187.431 178.42 184.972 177.289 183.012L128.784 99Z"
					fill="white"
				/>
			</Mask>
			<G mask="url(#mask2_503_13462)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M142.392 146.569L121.608 158.569L148.608 205.335L169.392 193.335L142.392 146.569Z"
					fill="white"
				/>
			</G>
			<Path
				// style={{ mixBlendMode: "multiply" }}
				opacity="0.2"
				fillRule="evenodd"
				clipRule="evenodd"
				d="M102 48.464C105.713 46.3204 110.287 46.3204 114 48.464L161.756 76.0358C165.469 78.1794 167.756 82.1409 167.756 86.4281V141.572C167.756 145.859 165.469 149.82 161.756 151.964L114 179.536C110.287 181.679 105.713 181.679 102 179.536L54.2442 151.964C50.5314 149.82 48.2442 145.859 48.2442 141.572L48.2442 86.4281C48.2442 82.1409 50.5314 78.1794 54.2442 76.0358L102 48.464Z"
				fill="#0602F3"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M162 68.0311C162 66.8044 162.747 65.7013 163.886 65.2457L174.531 60.9874C175.714 60.5145 177 61.3852 177 62.6587V108.969C177 110.196 176.253 111.299 175.114 111.754L162 117V68.0311Z"
				fill="url(#paint1_linear_503_13462)"
				stroke="url(#paint2_linear_503_13462)"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Mask
				id="mask3_503_13462"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="160"
				y="61"
				width="19"
				height="55"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M162 70.0622C162 67.6088 163.494 65.4025 165.772 64.4913L168.772 63.2913C172.713 61.7149 177 64.6174 177 68.8622V106.938C177 109.391 175.506 111.597 173.228 112.509L170.228 113.709C166.287 115.285 162 112.383 162 108.138V70.0622Z"
					fill="white"
					stroke="white"
					strokeWidth="3"
				/>
			</Mask>
			<G mask="url(#mask3_503_13462)">
				<G opacity="0.04">
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M116.996 38.0303C111.426 34.8149 104.565 34.8149 98.9955 38.0303L51.8999 65.221C46.3307 68.4363 42.8999 74.3786 42.8999 80.8094V135.191C42.8999 141.622 46.3307 147.564 51.8999 150.779L98.9955 177.97C104.565 181.185 111.426 181.185 116.995 177.97L164.091 150.779C169.66 147.564 173.091 141.621 173.091 135.191L173.091 80.8094C173.091 74.3786 169.66 68.4364 164.091 65.221L116.996 38.0303Z"
						fill="#0602F3"
						// style={{ mixBlendMode: "multiply" }}
					/>
				</G>
			</G>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M54 68.0311C54 66.8044 53.2531 65.7013 52.1141 65.2457L41.4685 60.9874C40.2861 60.5145 39 61.3852 39 62.6587V108.969C39 110.196 39.7468 111.299 40.8858 111.754L54 117V68.0311Z"
				fill="url(#paint3_linear_503_13462)"
				stroke="url(#paint4_linear_503_13462)"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Mask
				id="mask4_503_13462"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="37"
				y="61"
				width="19"
				height="55"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M54 70.0622C54 67.6088 52.5062 65.4025 50.2283 64.4913L47.2283 63.2913C43.2871 61.7149 39 64.6174 39 68.8622V106.938C39 109.391 40.4937 111.597 42.7716 112.509L45.7716 113.709C49.7128 115.285 54 112.383 54 108.138V70.0622Z"
					fill="white"
					stroke="white"
					strokeWidth="3"
				/>
			</Mask>
			<G mask="url(#mask4_503_13462)">
				<G opacity="0.04">
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M98.9955 38.0303C104.565 34.8149 111.426 34.8149 116.995 38.0303L164.091 65.221C169.66 68.4363 173.091 74.3786 173.091 80.8094V135.191C173.091 141.622 169.66 147.564 164.091 150.779L116.995 177.97C111.426 181.185 104.565 181.185 98.9955 177.97L51.8999 150.779C46.3307 147.564 42.8999 141.621 42.8999 135.191L42.8999 80.8094C42.8999 74.3786 46.3307 68.4364 51.8999 65.221L98.9955 38.0303Z"
						fill="#0602F3"
						// style={{ mixBlendMode: "multiply" }}
					/>
				</G>
			</G>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M147 52.0621C147 50.0437 145.047 48.6012 143.118 49.1947L108 60.0002L72.8822 49.1947C70.9531 48.6012 69 50.0437 69 52.0621V96.0002C69 97.6571 70.3431 99.0002 72 99.0002H144C145.657 99.0002 147 97.6571 147 96.0002V52.0621Z"
				fill="url(#paint5_linear_503_13462)"
				stroke="url(#paint6_linear_503_13462)"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Mask
				id="mask5_503_13462"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="67"
				y="47"
				width="82"
				height="27"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M147 52.0619C147 50.0435 145.047 48.601 143.118 49.1945L108 60L72.8822 49.1945C70.9531 48.601 69 50.0435 69 52.0619V69C69 70.6569 70.3431 72 72 72H144C145.657 72 147 70.6569 147 69V52.0619Z"
					fill="white"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Mask>
			<G mask="url(#mask5_503_13462)">
				<G opacity="0.04">
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M98.9956 38.0303C104.565 34.8149 111.426 34.8149 116.996 38.0303L164.091 65.221C169.66 68.4363 173.091 74.3786 173.091 80.8094V135.191C173.091 141.622 169.66 147.564 164.091 150.779L116.996 177.97C111.426 181.185 104.565 181.185 98.9957 177.97L51.9001 150.779C46.3309 147.564 42.9001 141.621 42.9001 135.191L42.9001 80.8094C42.9001 74.3786 46.3309 68.4364 51.9001 65.221L98.9956 38.0303Z"
						fill="#0602F3"
						// style={{ mixBlendMode: "multiply" }}
					/>
				</G>
			</G>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M102 42.4641C105.713 40.3205 110.287 40.3205 114 42.4641L161.756 70.0359C165.469 72.1795 167.756 76.141 167.756 80.4282V135.572C167.756 139.859 165.469 143.821 161.756 145.964L114 173.536C110.287 175.679 105.713 175.679 102 173.536L54.2442 145.964C50.5314 143.821 48.2442 139.859 48.2442 135.572V80.4282C48.2442 76.141 50.5314 72.1795 54.2442 70.0359L102 42.4641Z"
				fill="url(#paint7_linear_503_13462)"
				stroke="#FFF04D"
				strokeOpacity="0.4"
				strokeWidth="3"
			/>
			<Path
				d="M113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9942 71.3349C51.7455 73.2105 49.7442 76.6768 49.7442 80.4281L49.7442 135.572C49.7442 139.323 51.7455 142.789 54.9942 144.665L102.75 172.237C105.999 174.112 110.001 174.112 113.25 172.237L161.006 144.665C164.254 142.789 166.256 139.323 166.256 135.572V80.4281C166.256 76.6768 164.254 73.2105 161.006 71.3349L113.25 43.7631Z"
				stroke="#F9B307"
				strokeWidth="3"
			/>
			<Path
				opacity="0.4"
				d="M113.25 172.237C118.866 168.994 122.846 166.696 125.189 165.344"
				stroke="white"
				strokeWidth="3"
				strokeLinecap="round"
			/>
			<Path
				d="M166.256 135.572V80.4281C166.256 76.6768 164.254 73.2105 161.006 71.3349L113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9942 71.3349C51.7455 73.2105 49.7442 76.6768 49.7442 80.4281L49.7442 135.572"
				stroke="#FAC00E"
				strokeWidth="3"
				strokeLinecap="round"
			/>
			<Path
				opacity="0.6"
				d="M166.256 80.4281C166.256 76.6768 164.254 73.2105 161.006 71.3349L113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9942 71.3349C51.7455 73.2105 49.7442 76.6768 49.7442 80.4281"
				stroke="#FDDB3D"
				strokeWidth="3"
				strokeLinecap="round"
			/>
			<Path
				opacity="0.6"
				d="M113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631C102.75 43.7631 86.8314 52.9537 78.8721 57.549"
				stroke="white"
				strokeWidth="3"
				strokeLinecap="round"
			/>
			<Path
				d="M102.75 43.7629C102.75 43.7629 94.3251 48.627 90.811 50.6559"
				stroke="white"
				strokeWidth="3"
				strokeLinecap="round"
			/>
			<G filter="url(#filter2_d_503_13462)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M105 61.7321C106.856 60.6603 109.144 60.6603 111 61.7321L146.569 82.268C148.426 83.3397 149.569 85.3205 149.569 87.4641V128.536C149.569 130.679 148.426 132.66 146.569 133.732L111 154.268C109.144 155.34 106.856 155.34 105 154.268L69.4307 133.732C67.5743 132.66 66.4307 130.679 66.4307 128.536V87.4641C66.4307 85.3205 67.5743 83.3397 69.4307 82.268L105 61.7321Z"
					fill="url(#paint8_linear_503_13462)"
				/>
				<Path
					d="M111.75 60.433C109.429 59.0933 106.57 59.0933 104.25 60.433L68.6807 80.9689C66.3602 82.3087 64.9307 84.7846 64.9307 87.4641V128.536C64.9307 131.215 66.3602 133.691 68.6807 135.031L104.25 155.567C106.57 156.907 109.429 156.907 111.75 155.567L147.319 135.031C149.64 133.691 151.069 131.215 151.069 128.536V87.4641C151.069 84.7846 149.64 82.3087 147.319 80.9689L111.75 60.433Z"
					stroke="#F5900D"
					strokeOpacity="0.1"
					strokeWidth="3"
					// style={{ mixBlendMode: "multiply" }}
				/>
			</G>
			<Mask
				id="mask6_503_13462"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="66"
				y="60"
				width="84"
				height="96"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M105 61.7321C106.856 60.6603 109.144 60.6603 111 61.7321L146.569 82.268C148.426 83.3397 149.569 85.3205 149.569 87.4641V128.536C149.569 130.679 148.426 132.66 146.569 133.732L111 154.268C109.144 155.34 106.856 155.34 105 154.268L69.4307 133.732C67.5743 132.66 66.4307 130.679 66.4307 128.536V87.4641C66.4307 85.3205 67.5743 83.3397 69.4307 82.268L105 61.7321Z"
					fill="white"
				/>
			</Mask>
			<G mask="url(#mask6_503_13462)">
				<G style={{ mixBlendMode: "multiply" }} opacity="0.3">
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M108 108L60 120V96L108 108ZM108 108L120 60H96L108 108ZM108 108L156 96V120L108 108ZM108 108L133.456 65.5736L150.426 82.5442L108 108ZM108 108L133.456 150.426L150.426 133.456L108 108ZM108 108L96 156H120L108 108ZM108 108L82.5441 150.426L65.5735 133.456L108 108Z"
						fill="#FFD640"
					/>
					<Path
						d="M82.5441 65.5736L65.5735 82.5442L108 108L82.5441 65.5736Z"
						fill="#FFD640"
					/>
				</G>
				<Path
					opacity="0.4"
					d="M145.819 83.5668L110.25 63.0309C108.858 62.227 107.142 62.227 105.75 63.0309C101.567 65.4461 98.6026 67.1574 96.8576 68.1648C93.2262 70.2615 90.2621 71.9728 87.9653 73.2988C84.0132 75.5806 78.085 79.0032 70.1807 83.5668"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<Path
					opacity="0.4"
					d="M145.819 132.33L110.25 152.865C108.858 153.669 107.142 153.669 105.75 152.865"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<Path
					d="M105.75 63.0308C101.567 65.446 98.6026 67.1573 96.8576 68.1647"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
				/>
			</G>
			<G filter="url(#filter3_d_503_13462)">
				<Path
					d="M100.349 97.4699L108 86.3068L115.65 97.4699L128.631 101.296L120.379 112.022L120.751 125.55L108 121.016L95.2489 125.55L95.621 112.022L87.3684 101.296L100.349 97.4699Z"
					fill="white"
				/>
				<Path
					d="M110.475 84.6108C109.915 83.7946 108.989 83.3068 108 83.3068C107.01 83.3068 106.085 83.7946 105.525 84.6108L98.4778 94.894L86.5201 98.4189C85.571 98.6986 84.8209 99.4284 84.5152 100.369C84.2094 101.31 84.3873 102.342 84.9907 103.126L92.5928 113.006L92.25 125.468C92.2228 126.457 92.6851 127.396 93.4855 127.977C94.286 128.559 95.3218 128.708 96.254 128.377L108 124.2L119.746 128.377C120.678 128.708 121.714 128.559 122.514 127.977C123.315 127.396 123.777 126.457 123.75 125.468L123.407 113.006L131.009 103.126C131.612 102.342 131.79 101.31 131.485 100.369C131.179 99.4284 130.429 98.6986 129.48 98.4189L117.522 94.894L110.475 84.6108Z"
					stroke="white"
					strokeWidth="6"
					strokeLinejoin="round"
				/>
			</G>
			<Path
				d="M100.349 97.4699L108 86.3068L115.65 97.4699L128.631 101.296L120.379 112.022L120.751 125.55L108 121.016L95.2489 125.55L95.621 112.022L87.3684 101.296L100.349 97.4699Z"
				fill="url(#paint9_linear_503_13462)"
			/>
			<Path
				opacity="0.4"
				d="M108 108V86.3068L100.248 97.3163L108 108Z"
				fill="url(#paint10_linear_503_13462)"
			/>
			<Path
				opacity="0.8"
				d="M108 108L100.248 97.3162L87.3684 101.296L108 108Z"
				fill="url(#paint11_linear_503_13462)"
			/>
			<Path
				opacity="0.5"
				d="M108 108L95.4475 112.084L95.2489 125.55L108 108Z"
				fill="url(#paint12_linear_503_13462)"
			/>
			<Path
				opacity="0.4"
				d="M120.751 125.55L120.552 112.084L108 108L120.751 125.55Z"
				fill="url(#paint13_linear_503_13462)"
			/>
			<Path
				d="M120.552 112.084L128.631 101.297L108 108L120.552 112.084Z"
				fill="#FEBA1B"
			/>
			<Path
				opacity="0.6"
				d="M128.631 101.296L115.752 97.3162L108 108L128.631 101.296Z"
				fill="url(#paint14_linear_503_13462)"
			/>
			<G filter="url(#filter4_d_503_13462)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M140.733 89.3398L139.175 88.7253C138.222 88.3495 137.754 87.2724 138.13 86.3195C138.318 85.8415 138.697 85.4632 139.175 85.2747L140.733 84.6602C142.529 83.9516 143.952 82.5294 144.66 80.7327L145.275 79.1747C145.65 78.2218 146.728 77.754 147.68 78.1298C148.158 78.3183 148.537 78.6967 148.725 79.1747L149.34 80.7327C150.048 82.5294 151.471 83.9516 153.267 84.6602L154.825 85.2747C155.778 85.6505 156.246 86.7276 155.87 87.6805C155.682 88.1585 155.303 88.5368 154.825 88.7253L153.267 89.3398C151.471 90.0484 150.048 91.4706 149.34 93.2673L148.725 94.8253C148.349 95.7782 147.272 96.246 146.319 95.8702C145.842 95.6817 145.463 95.3033 145.275 94.8253L144.66 93.2673C143.952 91.4706 142.529 90.0484 140.733 89.3398Z"
					fill="white"
				/>
			</G>
			<G filter="url(#filter5_d_503_13462)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M73.8218 139.56L72.7831 139.15C72.1478 138.9 71.836 138.182 72.0865 137.546C72.2122 137.228 72.4644 136.975 72.7831 136.85L73.8218 136.44C75.0195 135.968 75.9677 135.02 76.4401 133.822L76.8497 132.783C77.1003 132.148 77.8183 131.836 78.4536 132.087C78.7723 132.212 79.0245 132.464 79.1502 132.783L79.5598 133.822C80.0322 135.02 80.9804 135.968 82.1781 136.44L83.2168 136.85C83.8521 137.1 84.1639 137.818 83.9134 138.454C83.7877 138.772 83.5355 139.025 83.2168 139.15L82.1781 139.56C80.9804 140.032 80.0322 140.98 79.5598 142.178L79.1502 143.217C78.8996 143.852 78.1816 144.164 77.5463 143.913C77.2277 143.788 76.9754 143.536 76.8497 143.217L76.4401 142.178C75.9677 140.98 75.0195 140.032 73.8218 139.56Z"
					fill="white"
				/>
			</G>
			<G filter="url(#filter6_d_503_13462)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M62.2772 93.4498L60.9789 92.9378C60.1848 92.6246 59.795 91.727 60.1081 90.9329C60.2652 90.5346 60.5805 90.2193 60.9789 90.0622L62.2772 89.5502C63.7744 88.9597 64.9596 87.7745 65.5501 86.2773L66.0622 84.9789C66.3754 84.1849 67.2729 83.795 68.067 84.1082C68.4653 84.2653 68.7806 84.5806 68.9377 84.9789L69.4498 86.2773C70.0403 87.7745 71.2255 88.9597 72.7227 89.5502L74.021 90.0622C74.8151 90.3754 75.2049 91.273 74.8918 92.0671C74.7347 92.4654 74.4194 92.7807 74.021 92.9378L72.7227 93.4498C71.2255 94.0403 70.0403 95.2255 69.4498 96.7227L68.9377 98.0211C68.6246 98.8151 67.727 99.205 66.9329 98.8918C66.5346 98.7347 66.2193 98.4194 66.0622 98.0211L65.5501 96.7227C64.9596 95.2255 63.7744 94.0403 62.2772 93.4498Z"
					fill="white"
				/>
			</G>
			<G filter="url(#filter7_d_503_13462)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M139.366 137.67L138.587 137.363C138.111 137.175 137.877 136.636 138.065 136.16C138.159 135.921 138.348 135.732 138.587 135.637L139.366 135.33C140.265 134.976 140.976 134.265 141.33 133.366L141.637 132.587C141.825 132.111 142.364 131.877 142.84 132.065C143.079 132.159 143.268 132.348 143.363 132.587L143.67 133.366C144.024 134.265 144.735 134.976 145.634 135.33L146.413 135.637C146.889 135.825 147.123 136.364 146.935 136.84C146.841 137.079 146.652 137.268 146.413 137.363L145.634 137.67C144.735 138.024 144.024 138.735 143.67 139.634L143.363 140.413C143.175 140.889 142.636 141.123 142.16 140.935C141.921 140.841 141.732 140.652 141.637 140.413L141.33 139.634C140.976 138.735 140.265 138.024 139.366 137.67Z"
					fill="white"
				/>
			</G>
			<Defs>
				<Filter
					id="filter0_d_503_13462"
					x="32.3048"
					y="99"
					width="102.48"
					height="121.512"
					filterUnits="userSpaceOnUse"
				>
					<FeFlood floodOpacity="0" result="BackgroundImageFix" />
					<FeColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<FeOffset dy="6" />
					<FeGaussianBlur stdDeviation="3" />
					<FeColorMatrix
						type="matrix"
						values="0 0 0 0 0.401412 0 0 0 0 0.333333 0 0 0 0 0.819608 0 0 0 0.2 0"
					/>
					<FeBlend
						mode="darken"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_503_13462"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13462"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter1_d_503_13462"
					x="81.2153"
					y="99"
					width="102.48"
					height="121.512"
					filterUnits="userSpaceOnUse"
				>
					<FeFlood floodOpacity="0" result="BackgroundImageFix" />
					<FeColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<FeOffset dy="6" />
					<FeGaussianBlur stdDeviation="3" />
					<FeColorMatrix
						type="matrix"
						values="0 0 0 0 0.401412 0 0 0 0 0.333333 0 0 0 0 0.819608 0 0 0 0.2 0"
					/>
					<FeBlend
						mode="darken"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_503_13462"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13462"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter2_d_503_13462"
					x="57.4307"
					y="54.9282"
					width="101.138"
					height="112.144"
					filterUnits="userSpaceOnUse"
				>
					<FeFlood floodOpacity="0" result="BackgroundImageFix" />
					<FeColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<FeOffset dy="3" />
					<FeGaussianBlur stdDeviation="3" />
					<FeColorMatrix
						type="matrix"
						values="0 0 0 0 0.927721 0 0 0 0 0.665867 0 0 0 0 0.0535899 0 0 0 0.4 0"
					/>
					<FeBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_503_13462"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13462"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter3_d_503_13462"
					x="75.3683"
					y="77.3068"
					width="65.2632"
					height="63.2435"
					filterUnits="userSpaceOnUse"
				>
					<FeFlood floodOpacity="0" result="BackgroundImageFix" />
					<FeColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<FeOffset dy="3" />
					<FeGaussianBlur stdDeviation="3" />
					<FeColorMatrix
						type="matrix"
						values="0 0 0 0 0.996078 0 0 0 0 0.733333 0 0 0 0 0.105882 0 0 0 1 0"
					/>
					<FeBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_503_13462"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13462"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter4_d_503_13462"
					x="132"
					y="72"
					width="30"
					height="30"
					filterUnits="userSpaceOnUse"
				>
					<FeFlood floodOpacity="0" result="BackgroundImageFix" />
					<FeColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<FeOffset />
					<FeGaussianBlur stdDeviation="3" />
					<FeColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0"
					/>
					<FeBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_503_13462"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13462"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter5_d_503_13462"
					x="66"
					y="126"
					width="24"
					height="24"
					filterUnits="userSpaceOnUse"
				>
					<FeFlood floodOpacity="0" result="BackgroundImageFix" />
					<FeColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<FeOffset />
					<FeGaussianBlur stdDeviation="3" />
					<FeColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0"
					/>
					<FeBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_503_13462"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13462"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter6_d_503_13462"
					x="54"
					y="78"
					width="27"
					height="27"
					filterUnits="userSpaceOnUse"
				>
					<FeFlood floodOpacity="0" result="BackgroundImageFix" />
					<FeColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<FeOffset />
					<FeGaussianBlur stdDeviation="3" />
					<FeColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0"
					/>
					<FeBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_503_13462"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13462"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter7_d_503_13462"
					x="132"
					y="126"
					width="21"
					height="21"
					filterUnits="userSpaceOnUse"
				>
					<FeFlood floodOpacity="0" result="BackgroundImageFix" />
					<FeColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<FeOffset />
					<FeGaussianBlur stdDeviation="3" />
					<FeColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 0.94902 0 0 0 0 0.305882 0 0 0 1 0"
					/>
					<FeBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_503_13462"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13462"
						result="shape"
					/>
				</Filter>
				<LinearGradient
					id="paint0_linear_503_13462"
					x1="24"
					y1="24"
					x2="24"
					y2="192"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#6F61EC" />
					<Stop offset="1" stopColor="#3D2CD4" />
				</LinearGradient>
				<LinearGradient
					id="paint1_linear_503_13462"
					x1="177"
					y1="60"
					x2="177"
					y2="117"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#F7C71A" />
					<Stop offset="1" stopColor="#FBAA00" />
				</LinearGradient>
				<LinearGradient
					id="paint2_linear_503_13462"
					x1="177"
					y1="60"
					x2="177"
					y2="117"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FFDF6B" />
					<Stop offset="1" stopColor="#F8A60A" />
				</LinearGradient>
				<LinearGradient
					id="paint3_linear_503_13462"
					x1="39"
					y1="60"
					x2="39"
					y2="117"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#F7C71A" />
					<Stop offset="1" stopColor="#FBAA00" />
				</LinearGradient>
				<LinearGradient
					id="paint4_linear_503_13462"
					x1="39"
					y1="60"
					x2="39"
					y2="117"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FFDF6B" />
					<Stop offset="1" stopColor="#F8A60A" />
				</LinearGradient>
				<LinearGradient
					id="paint5_linear_503_13462"
					x1="69"
					y1="49.0613"
					x2="69"
					y2="99.0002"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#F7C71A" />
					<Stop offset="1" stopColor="#FBAA00" />
				</LinearGradient>
				<LinearGradient
					id="paint6_linear_503_13462"
					x1="69"
					y1="49.0613"
					x2="69"
					y2="99.0002"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FFDF6B" />
					<Stop offset="1" stopColor="#F8A60A" />
				</LinearGradient>
				<LinearGradient
					id="paint7_linear_503_13462"
					x1="39"
					y1="39"
					x2="39"
					y2="177"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FDE046" />
					<Stop offset="1" stopColor="#F9B800" />
				</LinearGradient>
				<LinearGradient
					id="paint8_linear_503_13462"
					x1="60"
					y1="60"
					x2="60"
					y2="156"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FFF550" />
					<Stop offset="1" stopColor="#FFD541" />
				</LinearGradient>
				<LinearGradient
					id="paint9_linear_503_13462"
					x1="86.3065"
					y1="86.3068"
					x2="86.3065"
					y2="129.693"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FCA50E" />
					<Stop offset="1" stopColor="#FFC823" />
				</LinearGradient>
				<LinearGradient
					id="paint10_linear_503_13462"
					x1="100.248"
					y1="80.8834"
					x2="87.4197"
					y2="90.0519"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FFEC36" stopOpacity="0.467505" />
					<Stop offset="1" stopColor="#FFF7AB" />
				</LinearGradient>
				<LinearGradient
					id="paint11_linear_503_13462"
					x1="87.4988"
					y1="99.9533"
					x2="99.5878"
					y2="114.834"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FFED08" stopOpacity="0.8" />
					<Stop offset="1" stopColor="white" />
				</LinearGradient>
				<LinearGradient
					id="paint12_linear_503_13462"
					x1="101.624"
					y1="129.938"
					x2="111.87"
					y2="115.051"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FFED08" stopOpacity="0.01" />
					<Stop offset="1" stopColor="#FFEF63" />
				</LinearGradient>
				<LinearGradient
					id="paint13_linear_503_13462"
					x1="108"
					y1="103.612"
					x2="97.7548"
					y2="118.5"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FFEC36" stopOpacity="0.467505" />
					<Stop offset="1" stopColor="#FFE94A" />
				</LinearGradient>
				<LinearGradient
					id="paint14_linear_503_13462"
					x1="108"
					y1="94.6452"
					x2="104.759"
					y2="107.161"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FFEC36" stopOpacity="0.467505" />
					<Stop offset="1" stopColor="#FFF7AB" />
				</LinearGradient>
			</Defs>
		</Svg>
	) : (
		<Svg width="216" height="216" viewBox="0 0 216 216" fill="none" {...rest}>
			<Mask
				id="mask0_503_14653"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="24"
				y="24"
				width="168"
				height="169"
			>
				<Circle cx="108" cy="108" r="84" fill="white" />
			</Mask>
			<G mask="url(#mask0_503_14653)">
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
				d="M87.2157 96L128.785 120L80.2803 204.012C79.149 205.972 76.3384 206.021 75.1387 204.103L63.3753 185.293L41.2034 184.511C38.9422 184.431 37.5798 181.972 38.7111 180.012L87.2157 96Z"
				fill="#A1C7FF"
			/>
			<Mask
				id="mask1_503_14653"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="38"
				y="96"
				width="91"
				height="110"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M87.2157 96L128.785 120L80.2803 204.012C79.149 205.972 76.3384 206.021 75.1387 204.103L63.3753 185.293L41.2034 184.511C38.9422 184.431 37.5798 181.972 38.7111 180.012L87.2157 96Z"
					fill="white"
				/>
			</Mask>
			<G mask="url(#mask1_503_14653)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M73.608 143.569L94.3926 155.569L67.3926 202.335L46.608 190.335L73.608 143.569Z"
					fill="#E7F1FF"
				/>
			</G>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M128.785 96L87.2154 120L135.72 204.012C136.851 205.972 139.662 206.021 140.862 204.103L152.625 185.293L174.797 184.511C177.058 184.431 178.421 181.972 177.289 180.012L128.785 96Z"
				fill="#A1C7FF"
			/>
			<Mask
				id="mask2_503_14653"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="87"
				y="96"
				width="91"
				height="110"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M128.785 96L87.2154 120L135.72 204.012C136.851 205.972 139.662 206.021 140.862 204.103L152.625 185.293L174.797 184.511C177.058 184.431 178.421 181.972 177.289 180.012L128.785 96Z"
					fill="white"
				/>
			</Mask>
			<G mask="url(#mask2_503_14653)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M142.392 143.569L121.608 155.569L148.608 202.335L169.392 190.335L142.392 143.569Z"
					fill="#E7F1FF"
				/>
			</G>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M162 68.0311C162 66.8044 162.747 65.7013 163.886 65.2457L174.531 60.9874C175.714 60.5145 177 61.3852 177 62.6587V108.969C177 110.196 176.253 111.299 175.114 111.754L162 117V68.0311Z"
				fill="#A1C7FF"
			/>
			<Mask
				id="mask3_503_14653"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="162"
				y="60"
				width="15"
				height="57"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M162 68.0311C162 66.8044 162.747 65.7013 163.886 65.2457L174.531 60.9874C175.714 60.5145 177 61.3852 177 62.6587V108.969C177 110.196 176.253 111.299 175.114 111.754L162 117V68.0311Z"
					fill="white"
				/>
			</Mask>
			<G mask="url(#mask3_503_14653)"></G>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M54 68.0311C54 66.8044 53.2531 65.7013 52.1142 65.2457L41.4685 60.9874C40.2861 60.5145 39 61.3852 39 62.6587V108.969C39 110.196 39.7469 111.299 40.8858 111.754L54 117V68.0311Z"
				fill="#A1C7FF"
			/>
			<Mask
				id="mask4_503_14653"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="39"
				y="60"
				width="15"
				height="57"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M54 68.0311C54 66.8044 53.2531 65.7013 52.1142 65.2457L41.4685 60.9874C40.2861 60.5145 39 61.3852 39 62.6587V108.969C39 110.196 39.7469 111.299 40.8858 111.754L54 117V68.0311Z"
					fill="white"
				/>
			</Mask>
			<G mask="url(#mask4_503_14653)"></G>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M147 52.0617C147 50.0433 145.047 48.6008 143.118 49.1944L108 59.9998L72.8823 49.1944C70.9531 48.6008 69 50.0433 69 52.0617V95.9998C69 97.6567 70.3431 98.9998 72 98.9998H144C145.657 98.9998 147 97.6567 147 95.9998V52.0617Z"
				fill="#A1C7FF"
			/>
			<Mask
				id="mask5_503_14653"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="69"
				y="49"
				width="78"
				height="50"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M147 52.0617C147 50.0433 145.047 48.6008 143.118 49.1944L108 59.9998L72.8823 49.1944C70.9531 48.6008 69 50.0433 69 52.0617V95.9998C69 97.6567 70.3431 98.9998 72 98.9998H144C145.657 98.9998 147 97.6567 147 95.9998V52.0617Z"
					fill="white"
				/>
			</Mask>
			<G mask="url(#mask5_503_14653)"></G>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M102 42.4641C105.713 40.3205 110.287 40.3205 114 42.4641L161.756 70.0359C165.469 72.1795 167.756 76.141 167.756 80.4282V135.572C167.756 139.859 165.469 143.821 161.756 145.964L114 173.536C110.287 175.679 105.713 175.679 102 173.536L54.2442 145.964C50.5314 143.821 48.2442 139.859 48.2442 135.572V80.4282C48.2442 76.141 50.5314 72.1795 54.2442 70.0359L102 42.4641Z"
				fill="#B6D5FF"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M105 61.7321C106.856 60.6603 109.144 60.6603 111 61.7321L146.569 82.268C148.426 83.3397 149.569 85.3205 149.569 87.4641V128.536C149.569 130.679 148.426 132.66 146.569 133.732L111 154.268C109.144 155.34 106.856 155.34 105 154.268L69.4308 133.732C67.5744 132.66 66.4308 130.679 66.4308 128.536V87.4641C66.4308 85.3205 67.5744 83.3397 69.4308 82.268L105 61.7321Z"
				fill="#D6E7FF"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M108 124.2L96.2542 128.377C94.2681 129.083 92.1922 127.575 92.2501 125.468L92.5929 113.006L84.9908 103.126C83.7054 101.455 84.4984 99.0148 86.5202 98.4188L98.4779 94.8939L105.525 84.6108C106.717 82.872 109.283 82.872 110.475 84.6108L117.522 94.8939L129.48 98.4188C131.502 99.0148 132.295 101.455 131.009 103.126L123.407 113.006L123.75 125.468C123.808 127.575 121.732 129.083 119.746 128.377L108 124.2Z"
				fill="#A1C7FF"
				stroke="white"
				strokeWidth="6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
