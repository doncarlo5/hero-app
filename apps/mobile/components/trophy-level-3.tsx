import React from "react";
import Svg, {
	Circle,
	Defs,
	FeBlend,
	FeColorMatrix,
	FeComposite,
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

export const TrophyLevel3: React.FC<TrophyLevelProps> = ({
	achieved,
	...rest
}) =>
	achieved ? (
		<Svg width="216" height="221" viewBox="0 0 216 221" fill="none" {...rest}>
			<Mask
				id="mask0_503_13460"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="24"
				y="24"
				width="168"
				height="169"
			>
				<Circle cx="108" cy="108" r="84" fill="white" />
			</Mask>
			<G mask="url(#mask0_503_13460)">
				<Circle cx="108" cy="108" r="84" fill="url(#paint0_linear_503_13460)" />
				<G style={{ mixBlendMode: "color-burn" }} opacity="0.04">
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M33.0002 32.9989C26.3728 32.9989 21.0002 38.3715 21.0002 44.9989C21.0002 51.6263 26.3728 56.9989 33.0002 56.9989H54.0002C60.6276 56.9989 66.0002 51.6263 66.0002 44.9989C66.0002 38.3715 60.6276 32.9989 54.0002 32.9989H33.0002ZM141 81.0007C134.373 81.0007 129 86.3733 129 93.0007C129 99.6282 134.373 105.001 141 105.001H213C219.627 105.001 225 99.6282 225 93.0007C225 86.3733 219.627 81.0007 213 81.0007H141ZM108 165C108 158.372 113.373 153 120 153H192C198.627 153 204 158.372 204 165C204 171.627 198.627 177 192 177H120C113.373 177 108 171.627 108 165ZM30.0001 129C23.3727 129 18.0001 134.373 18.0001 141C18.0001 147.627 23.3727 153 30.0001 153H78.0001C84.6275 153 90.0001 147.627 90.0001 141C90.0001 134.373 84.6275 129 78.0001 129H30.0001ZM12.0001 101.999C12.0001 98.6856 14.6864 95.9993 18.0001 95.9993H45.0001C48.3138 95.9993 51.0001 98.6856 51.0001 101.999C51.0001 105.313 48.3138 107.999 45.0001 107.999H18.0001C14.6864 107.999 12.0001 105.313 12.0001 101.999ZM18.0001 68.9996C14.6864 68.9996 12.0001 71.6859 12.0001 74.9996C12.0001 78.3133 14.6864 80.9996 18.0001 80.9996H102C105.314 80.9996 108 78.3133 108 74.9996C108 71.6859 105.314 68.9996 102 68.9996H18.0001ZM90 38.9989C90 35.6852 92.6863 32.9989 96 32.9989H180C183.314 32.9989 186 35.6852 186 38.9989C186 42.3126 183.314 44.9989 180 44.9989H96C92.6863 44.9989 90 42.3126 90 38.9989ZM6.00009 171C2.68638 171 9.15527e-05 173.686 9.15527e-05 177C9.15527e-05 180.314 2.68638 183 6.00009 183H90.0001C93.3138 183 96.0001 180.314 96.0001 177C96.0001 173.686 93.3138 171 90.0001 171H6.00009ZM129 63.0011C129 59.6874 131.686 57.0011 135 57.0011H219C222.314 57.0011 225 59.6874 225 63.0011C225 66.3148 222.314 69.0011 219 69.0011H135C131.686 69.0011 129 66.3148 129 63.0011ZM118.6 116.999C113.74 116.999 109.8 120.939 109.8 125.799C109.8 130.659 113.74 134.599 118.6 134.599H191.4C196.26 134.599 200.2 130.659 200.2 125.799C200.2 120.939 196.26 116.999 191.4 116.999H118.6Z"
						fill="black"
					/>
				</G>
			</G>
			<G opacity="0.1">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M97.4199 40.6868C103.729 36.1033 112.271 36.1032 118.58 40.6868L168.749 77.1367C175.058 81.7203 177.698 89.8449 175.288 97.2613L156.125 156.238C153.715 163.655 146.804 168.676 139.006 168.676H76.9939C69.1958 168.676 62.2846 163.655 59.8749 156.239L40.712 97.2614C38.3023 89.8449 40.9422 81.7203 47.2509 77.1367L97.4199 40.6868Z"
					fill="#0298F3"
					// style={{ mixBlendMode: "multiply" }}
				/>
			</G>
			<G filter="url(#filter0_d_503_13460)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M84 108H132V205.009C132 207.272 129.591 208.72 127.593 207.659L108 197.25L88.4075 207.659C86.4093 208.72 84 207.272 84 205.009V108Z"
					fill="#7F45F6"
				/>
			</G>
			<Mask
				id="mask1_503_13460"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="84"
				y="108"
				width="48"
				height="101"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M84 108H132V205.009C132 207.272 129.591 208.72 127.593 207.659L108 197.25L88.4075 207.659C86.4093 208.72 84 207.272 84 205.009V108Z"
					fill="white"
				/>
			</Mask>
			<G mask="url(#mask1_503_13460)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M96 156H120V210H96V156Z"
					fill="white"
				/>
			</G>
			<Path
				// style={{ mixBlendMode: "multiply" }}
				opacity="0.2"
				fillRule="evenodd"
				clipRule="evenodd"
				d="M100.947 50.1248C105.153 47.0691 110.848 47.0691 115.054 50.1248L166.57 87.5534C170.775 90.6091 172.535 96.0255 170.929 100.97L151.252 161.531C149.645 166.475 145.038 169.822 139.839 169.822H76.1615C70.9628 169.822 66.3553 166.475 64.7488 161.531L45.0714 100.97C43.4649 96.0256 45.2248 90.6091 49.4307 87.5534L100.947 50.1248Z"
				fill="#0298F3"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M100.947 44.1246C105.152 41.0689 110.848 41.0689 115.053 44.1246L166.569 81.5532C170.775 84.6089 172.535 90.0254 170.929 94.9696L151.251 155.53C149.645 160.475 145.037 163.822 139.839 163.822H76.1613C70.9626 163.822 66.3551 160.475 64.7486 155.53L45.0713 94.9696C43.4648 90.0254 45.2247 84.6089 49.4305 81.5532L100.947 44.1246Z"
				fill="url(#paint1_linear_503_13460)"
				stroke="#FEFFFF"
				strokeOpacity="0.2"
				strokeWidth="3"
			/>
			<Mask
				id="mask2_503_13460"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="42"
				y="40"
				width="132"
				height="126"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M100.947 44.1246C105.152 41.0689 110.848 41.0689 115.053 44.1246L166.569 81.5532C170.775 84.6089 172.535 90.0254 170.929 94.9696L151.251 155.53C149.645 160.475 145.037 163.822 139.839 163.822H76.1613C70.9626 163.822 66.3551 160.475 64.7486 155.53L45.0713 94.9696C43.4648 90.0254 45.2247 84.6089 49.4305 81.5532L100.947 44.1246Z"
					fill="white"
					stroke="white"
					strokeWidth="3"
				/>
			</Mask>
			<G mask="url(#mask2_503_13460)">
				<Path
					d="M114.172 45.3383C110.492 42.6646 105.508 42.6646 101.828 45.3383L50.3122 82.7669C46.6321 85.4407 45.0922 90.1801 46.4979 94.5063L66.1753 155.067C67.581 159.393 71.6125 162.322 76.1614 162.322H139.839C144.388 162.322 148.419 159.393 149.825 155.067L169.502 94.5063C170.908 90.1801 169.368 85.4407 165.688 82.7669L114.172 45.3383Z"
					stroke="#94B4BD"
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<Path
					d="M149.825 155.067L169.502 94.5062"
					stroke="#B1CDD0"
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<Path
					d="M46.4978 94.5062L66.1752 155.067"
					stroke="#B1CDD0"
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<Path
					d="M169.502 94.5063C170.908 90.1801 169.368 85.4407 165.688 82.7669L114.172 45.3383C110.492 42.6646 105.508 42.6646 101.828 45.3383L50.3122 82.7669C46.6321 85.4407 45.0922 90.1801 46.4979 94.5063"
					stroke="#C3E6E7"
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<Path
					opacity="0.4"
					d="M114.172 45.3383C110.492 42.6646 105.508 42.6646 101.828 45.3383L50.3123 82.7669"
					stroke="#E5FEFF"
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<Path
					d="M101.828 45.338L88.9493 54.6952"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
				/>
			</G>
			<G filter="url(#filter1_d_503_13460)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M104.473 62.5623C106.576 61.0344 109.424 61.0344 111.527 62.5623L150.124 90.6049C152.227 92.1327 153.107 94.8409 152.304 97.3131L137.561 142.687C136.758 145.159 134.454 146.833 131.854 146.833H84.1456C81.5462 146.833 79.2425 145.159 78.4392 142.687L63.6964 97.3131C62.8931 94.841 63.7731 92.1327 65.876 90.6049L104.473 62.5623Z"
					fill="url(#paint2_linear_503_13460)"
				/>
				<Path
					d="M112.408 61.3488C109.78 59.439 106.22 59.439 103.592 61.3488L64.9943 89.3914C62.3657 91.3012 61.2657 94.6864 62.2698 97.7766L77.0126 143.15C78.0167 146.241 80.8964 148.333 84.1456 148.333H131.854C135.104 148.333 137.983 146.241 138.987 143.15L153.73 97.7766C154.734 94.6864 153.634 91.3012 151.006 89.3914L112.408 61.3488Z"
					stroke="#94A0A4"
					strokeOpacity="0.06"
					strokeWidth="3"
				/>
			</G>
			<Mask
				id="mask3_503_13460"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="63"
				y="61"
				width="90"
				height="86"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M104.473 62.5623C106.576 61.0344 109.424 61.0344 111.527 62.5623L150.124 90.6049C152.227 92.1327 153.107 94.8409 152.304 97.3131L137.561 142.687C136.758 145.159 134.454 146.833 131.854 146.833H84.1456C81.5462 146.833 79.2425 145.159 78.4392 142.687L63.6964 97.3131C62.8931 94.841 63.7731 92.1327 65.876 90.6049L104.473 62.5623Z"
					fill="white"
				/>
			</Mask>
			<G mask="url(#mask3_503_13460)">
				<G style={{ mixBlendMode: "multiply" }} opacity="0.2">
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M108 108L60 120V96L108 108ZM108 108L120 60H96L108 108ZM108 108L156 96V120L108 108ZM108 108L133.456 65.5736L150.426 82.5442L108 108ZM108 108L133.456 150.426L150.426 133.456L108 108ZM108 108L96 156H120L108 108ZM108 108L82.5442 150.426L65.5736 133.456L108 108Z"
						fill="url(#paint3_linear_503_13460)"
					/>
					<Path
						d="M82.5442 65.5736L65.5736 82.5442L108 108L82.5442 65.5736Z"
						fill="url(#paint4_linear_503_13460)"
					/>
				</G>
				<Path
					d="M100.531 67.281C98.448 68.7942 96.8397 69.9627 95.7057 70.7866"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
				/>
			</G>
			<G filter="url(#filter2_d_503_13460)">
				<Path
					d="M100.349 97.4699L108 86.3068L115.651 97.4699L128.631 101.296L120.379 112.022L120.751 125.55L108 121.016L95.249 125.55L95.621 112.022L87.3684 101.296L100.349 97.4699Z"
					fill="white"
				/>
				<Path
					d="M110.475 84.6108C109.915 83.7946 108.989 83.3068 108 83.3068C107.01 83.3068 106.085 83.7946 105.525 84.6108L98.4778 94.894L86.5201 98.4189C85.5711 98.6986 84.821 99.4284 84.5152 100.369C84.2095 101.31 84.3874 102.342 84.9908 103.126L92.5928 113.006L92.2501 125.468C92.2229 126.457 92.6851 127.396 93.4856 127.977C94.2861 128.559 95.3218 128.708 96.2541 128.377L108 124.2L119.746 128.377C120.678 128.708 121.714 128.559 122.514 127.977C123.315 127.396 123.777 126.457 123.75 125.468L123.407 113.006L131.009 103.126C131.612 102.342 131.79 101.31 131.485 100.369C131.179 99.4284 130.429 98.6986 129.48 98.4189L117.522 94.894L110.475 84.6108Z"
					stroke="white"
					strokeWidth="6"
					strokeLinejoin="round"
				/>
			</G>
			<G filter="url(#filter3_i_503_13460)">
				<Path
					d="M100.349 97.4699L108 86.3068L115.651 97.4699L128.631 101.296L120.379 112.022L120.751 125.55L108 121.016L95.249 125.55L95.621 112.022L87.3684 101.296L100.349 97.4699Z"
					fill="url(#paint5_linear_503_13460)"
				/>
			</G>
			<G filter="url(#filter4_d_503_13460)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M91.8218 148.56L90.7831 148.15C90.1479 147.9 89.836 147.182 90.0866 146.546C90.2122 146.228 90.4645 145.975 90.7831 145.85L91.8218 145.44C93.0196 144.968 93.9677 144.02 94.4401 142.822L94.8498 141.783C95.1003 141.148 95.8184 140.836 96.4536 141.087C96.7723 141.212 97.0245 141.464 97.1502 141.783L97.5599 142.822C98.0323 144.02 98.9804 144.968 100.178 145.44L101.217 145.85C101.852 146.1 102.164 146.818 101.913 147.454C101.788 147.772 101.536 148.025 101.217 148.15L100.178 148.56C98.9804 149.032 98.0323 149.98 97.5599 151.178L97.1502 152.217C96.8997 152.852 96.1816 153.164 95.5464 152.913C95.2277 152.788 94.9755 152.536 94.8498 152.217L94.4401 151.178C93.9677 149.98 93.0196 149.032 91.8218 148.56Z"
					fill="white"
				/>
			</G>
			<G filter="url(#filter5_d_503_13460)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M143.277 96.4498L141.979 95.9378C141.185 95.6246 140.795 94.727 141.108 93.9329C141.265 93.5346 141.581 93.2193 141.979 93.0622L143.277 92.5502C144.774 91.9597 145.96 90.7745 146.55 89.2773L147.062 87.9789C147.375 87.1849 148.273 86.795 149.067 87.1082C149.465 87.2653 149.781 87.5806 149.938 87.9789L150.45 89.2773C151.04 90.7745 152.226 91.9597 153.723 92.5502L155.021 93.0622C155.815 93.3754 156.205 94.273 155.892 95.0671C155.735 95.4654 155.419 95.7807 155.021 95.9378L153.723 96.4498C152.226 97.0403 151.04 98.2255 150.45 99.7227L149.938 101.021C149.625 101.815 148.727 102.205 147.933 101.892C147.535 101.735 147.219 101.419 147.062 101.021L146.55 99.7227C145.96 98.2255 144.774 97.0403 143.277 96.4498Z"
					fill="white"
				/>
			</G>
			<G filter="url(#filter6_d_503_13460)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M70.3664 110.67L69.5874 110.363C69.1109 110.175 68.877 109.636 69.0649 109.16C69.1592 108.921 69.3484 108.732 69.5874 108.637L70.3664 108.33C71.2647 107.976 71.9758 107.265 72.3301 106.366L72.6373 105.587C72.8252 105.111 73.3638 104.877 73.8402 105.065C74.0792 105.159 74.2684 105.348 74.3627 105.587L74.6699 106.366C75.0242 107.265 75.7353 107.976 76.6336 108.33L77.4126 108.637C77.8891 108.825 78.123 109.364 77.9351 109.84C77.8408 110.079 77.6516 110.268 77.4126 110.363L76.6336 110.67C75.7353 111.024 75.0242 111.735 74.6699 112.634L74.3627 113.413C74.1748 113.889 73.6362 114.123 73.1598 113.935C72.9208 113.841 72.7316 113.652 72.6373 113.413L72.3301 112.634C71.9758 111.735 71.2647 111.024 70.3664 110.67Z"
					fill="white"
				/>
			</G>
			<Defs>
				<Filter
					id="filter0_d_503_13460"
					x="78"
					y="108"
					width="60"
					height="112.013"
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
						values="0 0 0 0 0.333333 0 0 0 0 0.790431 0 0 0 0 0.819608 0 0 0 0.2 0"
					/>
					<FeBlend
						mode="darken"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_503_13460"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13460"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter1_d_503_13460"
					x="54.4021"
					y="55.4164"
					width="107.196"
					height="103.416"
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
						values="0 0 0 0 0.0196078 0 0 0 0 0.443137 0 0 0 0 0.643137 0 0 0 0.12 0"
					/>
					<FeBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_503_13460"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13460"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter2_d_503_13460"
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
						values="0 0 0 0 0.596078 0 0 0 0 0.745098 0 0 0 0 0.780392 0 0 0 0.5 0"
					/>
					<FeBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_503_13460"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13460"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter3_i_503_13460"
					x="87.3684"
					y="86.3068"
					width="41.2631"
					height="42.2435"
					filterUnits="userSpaceOnUse"
				>
					<FeFlood floodOpacity="0" result="BackgroundImageFix" />
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="BackgroundImageFix"
						result="shape"
					/>
					<FeColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<FeOffset dy="3" />
					<FeGaussianBlur stdDeviation="1.5" />
					<FeComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<FeColorMatrix
						type="matrix"
						values="0 0 0 0 0.508286 0 0 0 0 0.694443 0 0 0 0 0.72829 0 0 0 0.4 0"
					/>
					<FeBlend
						mode="normal"
						in2="shape"
						result="effect1_innerShadow_503_13460"
					/>
				</Filter>
				<Filter
					id="filter4_d_503_13460"
					x="84"
					y="135"
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
						values="0 0 0 0 0.705882 0 0 0 0 0.823529 0 0 0 0 0.831373 0 0 0 1 0"
					/>
					<FeBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_503_13460"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13460"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter5_d_503_13460"
					x="135"
					y="81"
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
						values="0 0 0 0 0.705882 0 0 0 0 0.823529 0 0 0 0 0.831373 0 0 0 1 0"
					/>
					<FeBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_503_13460"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13460"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter6_d_503_13460"
					x="63"
					y="99"
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
						values="0 0 0 0 0.705882 0 0 0 0 0.823529 0 0 0 0 0.831373 0 0 0 1 0"
					/>
					<FeBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_503_13460"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13460"
						result="shape"
					/>
				</Filter>
				<LinearGradient
					id="paint0_linear_503_13460"
					x1="24"
					y1="24"
					x2="24"
					y2="192"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#59CBF2" />
					<Stop offset="1" stopColor="#40A7E8" />
				</LinearGradient>
				<LinearGradient
					id="paint1_linear_503_13460"
					x1="39"
					y1="39"
					x2="39"
					y2="177"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#C4ECEB" />
					<Stop offset="1" stopColor="#A7BCC1" />
				</LinearGradient>
				<LinearGradient
					id="paint2_linear_503_13460"
					x1="60"
					y1="60"
					x2="60"
					y2="156"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#F0FBFE" />
					<Stop offset="1" stopColor="#C0DCDC" />
				</LinearGradient>
				<LinearGradient
					id="paint3_linear_503_13460"
					x1="64.439"
					y1="60"
					x2="64.439"
					y2="147.122"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#AFD4D6" />
					<Stop offset="1" stopColor="#B9D9DB" stopOpacity="0.57" />
				</LinearGradient>
				<LinearGradient
					id="paint4_linear_503_13460"
					x1="64.439"
					y1="60"
					x2="64.439"
					y2="147.122"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#AFD4D6" />
					<Stop offset="1" stopColor="#B9D9DB" stopOpacity="0.57" />
				</LinearGradient>
				<LinearGradient
					id="paint5_linear_503_13460"
					x1="87.3684"
					y1="86.3068"
					x2="87.3684"
					y2="125.55"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#B7D6D8" />
					<Stop offset="1" stopColor="#A7BCC1" />
				</LinearGradient>
			</Defs>
		</Svg>
	) : (
		<Svg width="216" height="216" viewBox="0 0 216 216" fill="none" {...rest}>
			<Mask
				id="mask0_503_14660"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="24"
				y="24"
				width="168"
				height="169"
			>
				<Circle cx="108" cy="108" r="84" fill="white" />
			</Mask>
			<G mask="url(#mask0_503_14660)">
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
			<Mask
				id="mask1_503_14660"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="84"
				y="108"
				width="48"
				height="101"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M84 108H132V205.009C132 207.272 129.591 208.72 127.593 207.659L108 197.25L88.4075 207.659C86.4093 208.72 84 207.272 84 205.009V108Z"
					fill="white"
				/>
			</Mask>
			<G mask="url(#mask1_503_14660)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M96 156H120V210H96V156Z"
					fill="#E7F1FF"
				/>
			</G>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M100.947 44.1246C105.152 41.0689 110.848 41.0689 115.053 44.1246L166.569 81.5532C170.775 84.6089 172.535 90.0254 170.929 94.9696L151.251 155.53C149.645 160.475 145.037 163.822 139.839 163.822H76.1613C70.9626 163.822 66.3551 160.475 64.7486 155.53L45.0713 94.9696C43.4648 90.0254 45.2247 84.6089 49.4305 81.5532L100.947 44.1246Z"
				fill="#B6D5FF"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M104.473 62.5623C106.576 61.0344 109.424 61.0344 111.527 62.5623L150.124 90.6049C152.227 92.1327 153.107 94.8409 152.304 97.3131L137.561 142.687C136.758 145.159 134.454 146.833 131.854 146.833H84.1456C81.5462 146.833 79.2425 145.159 78.4392 142.687L63.6964 97.3131C62.8931 94.841 63.7731 92.1327 65.876 90.6049L104.473 62.5623Z"
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
			<Mask
				id="mask2_503_14660"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="81"
				y="80"
				width="54"
				height="52"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M108 124.2L96.2542 128.377C94.2681 129.083 92.1922 127.575 92.2501 125.468L92.5929 113.006L84.9908 103.126C83.7054 101.455 84.4984 99.0148 86.5202 98.4188L98.4779 94.8939L105.525 84.6108C106.717 82.872 109.283 82.872 110.475 84.6108L117.522 94.8939L129.48 98.4188C131.502 99.0148 132.295 101.455 131.009 103.126L123.407 113.006L123.75 125.468C123.808 127.575 121.732 129.083 119.746 128.377L108 124.2Z"
					fill="white"
					stroke="white"
					strokeWidth="6"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Mask>
			<G mask="url(#mask2_503_14660)"></G>
		</Svg>
	);
