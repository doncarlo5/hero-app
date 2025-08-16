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
	Rect,
	Stop,
} from "react-native-svg";

export interface TrophyLevelProps {
	achieved: boolean;
	className?: string;
}

export const TrophyLevel5: React.FC<TrophyLevelProps> = ({
	achieved,
	...rest
}) =>
	achieved ? (
		<Svg width="216" height="221" viewBox="0 0 216 221" fill="none" {...rest}>
			<Mask
				id="mask0_503_13463"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="24"
				y="24"
				width="168"
				height="169"
			>
				<Circle cx="108" cy="108" r="84" fill="white" />
			</Mask>
			<G mask="url(#mask0_503_13463)">
				<Circle cx="108" cy="108" r="84" fill="url(#paint0_linear_503_13463)" />
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
					d="M98.9956 38.0302C104.565 34.8148 111.426 34.8148 116.996 38.0302L164.091 65.2208C169.66 68.4362 173.091 74.3785 173.091 80.8093V135.191C173.091 141.621 169.66 147.564 164.091 150.779L116.996 177.97C111.426 181.185 104.565 181.185 98.9956 177.97L51.9001 150.779C46.3308 147.564 42.9001 141.621 42.9001 135.191L42.9001 80.8093C42.9001 74.3785 46.3308 68.4362 51.9001 65.2208L98.9956 38.0302Z"
					fill="#7705A4"
					// style={{ mixBlendMode: "multiply" }}
				/>
			</G>
			<G filter="url(#filter0_d_503_13463)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M66 99H114V190.146C114 192.376 111.653 193.827 109.658 192.829L90 183L70.3417 192.829C68.347 193.827 66 192.376 66 190.146V99Z"
					fill="#32B4FF"
				/>
			</G>
			<G filter="url(#filter1_d_503_13463)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M102 99H150V190.146C150 192.376 147.653 193.827 145.658 192.829L126 183L106.342 192.829C104.347 193.827 102 192.376 102 190.146V99Z"
					fill="#32B4FF"
				/>
			</G>
			<G filter="url(#filter2_d_503_13463)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M84 114H132V205.146C132 207.376 129.653 208.827 127.658 207.829L108 198L88.3417 207.829C86.347 208.827 84 207.376 84 205.146V114Z"
					fill="white"
				/>
			</G>
			<Mask
				id="mask1_503_13463"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="84"
				y="114"
				width="48"
				height="95"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M84 114H132V205.146C132 207.376 129.653 208.827 127.658 207.829L108 198L88.3417 207.829C86.347 208.827 84 207.376 84 205.146V114Z"
					fill="white"
				/>
			</Mask>
			<G mask="url(#mask1_503_13463)">
				<Rect x="96.0001" y="114" width="24" height="96" fill="#F55462" />
			</G>
			<Path
				//   style={{ mixBlendMode: "multiply" }}
				opacity="0.2"
				fillRule="evenodd"
				clipRule="evenodd"
				d="M102 48.464C105.713 46.3204 110.287 46.3204 114 48.464L161.756 76.0358C165.469 78.1794 167.756 82.1409 167.756 86.4281V141.572C167.756 145.859 165.469 149.82 161.756 151.964L114 179.536C110.287 181.679 105.713 181.679 102 179.536L54.2443 151.964C50.5315 149.82 48.2443 145.859 48.2443 141.572L48.2443 86.4281C48.2443 82.1409 50.5315 78.1794 54.2443 76.0358L102 48.464Z"
				fill="#7705A4"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M162 68.0311C162 66.8044 162.747 65.7013 163.886 65.2457L174.532 60.9874C175.714 60.5145 177 61.3852 177 62.6587V108.969C177 110.196 176.253 111.299 175.114 111.754L162 117V68.0311Z"
				fill="url(#paint1_linear_503_13463)"
				stroke="url(#paint2_linear_503_13463)"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Mask
				id="mask2_503_13463"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="160"
				y="59"
				width="19"
				height="60"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M162 68.0311C162 66.8044 162.747 65.7013 163.886 65.2457L174.532 60.9874C175.714 60.5145 177 61.3852 177 62.6587V108.969C177 110.196 176.253 111.299 175.114 111.754L162 117V68.0311Z"
					fill="white"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Mask>
			<G mask="url(#mask2_503_13463)">
				<G
					style={{ mixBlendMode: "multiply" }}
					opacity="0.6"
					filter="url(#filter3_i_503_13463)"
				>
					<Path
						d="M163.5 86.5L180.577 79.3846C181.342 79.066 181.703 78.1878 181.385 77.4231C181.066 76.6584 180.188 76.2968 179.423 76.6154L161.423 84.1154C160.864 84.3483 163.5 86.5 163.5 86.5Z"
						fill="#FABC10"
					/>
				</G>
				<G
					style={{ mixBlendMode: "multiply" }}
					opacity="0.6"
					filter="url(#filter4_i_503_13463)"
				>
					<Path
						d="M163.5 104.5L180.577 97.3846C181.342 97.066 181.703 96.1878 181.385 95.4231C181.066 94.6584 180.188 94.2968 179.423 94.6154L161.423 102.115C160.864 102.348 163.5 104.5 163.5 104.5Z"
						fill="#FABC10"
					/>
				</G>
				<G opacity="0.04">
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M116.996 38.0302C111.426 34.8148 104.565 34.8148 98.9957 38.0302L51.9001 65.2208C46.3309 68.4362 42.9001 74.3785 42.9001 80.8093V135.191C42.9001 141.621 46.3309 147.564 51.9001 150.779L98.9957 177.97C104.565 181.185 111.426 181.185 116.996 177.97L164.091 150.779C169.66 147.564 173.091 141.621 173.091 135.191L173.091 80.8093C173.091 74.3785 169.66 68.4362 164.091 65.2208L116.996 38.0302Z"
						fill="#7705A4"
						//   style={{ mixBlendMode: "multiply" }}
					/>
				</G>
			</G>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M54 68.0311C54 66.8044 53.2532 65.7013 52.1142 65.2457L41.4685 60.9874C40.2862 60.5145 39 61.3852 39 62.6587V108.969C39 110.196 39.7469 111.299 40.8859 111.754L54 117V68.0311Z"
				fill="url(#paint3_linear_503_13463)"
				stroke="url(#paint4_linear_503_13463)"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Mask
				id="mask3_503_13463"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="37"
				y="59"
				width="19"
				height="60"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M54 68.0311C54 66.8044 53.2532 65.7013 52.1142 65.2457L41.4685 60.9874C40.2862 60.5145 39 61.3852 39 62.6587V108.969C39 110.196 39.7469 111.299 40.8859 111.754L54 117V68.0311Z"
					fill="white"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Mask>
			<G mask="url(#mask3_503_13463)">
				<G
					style={{ mixBlendMode: "multiply" }}
					opacity="0.6"
					filter="url(#filter5_i_503_13463)"
				>
					<Path
						d="M52.5001 86.5L35.4232 79.3846C34.6585 79.066 34.2969 78.1878 34.6155 77.4231C34.9341 76.6584 35.8123 76.2968 36.577 76.6154L54.577 84.1154C55.136 84.3483 52.5001 86.5 52.5001 86.5Z"
						fill="#FABC10"
					/>
				</G>
				<G
					style={{ mixBlendMode: "multiply" }}
					opacity="0.6"
					filter="url(#filter6_i_503_13463)"
				>
					<Path
						d="M52.5001 104.5L35.4232 97.3846C34.6585 97.066 34.2969 96.1878 34.6155 95.4231C34.9341 94.6584 35.8123 94.2968 36.577 94.6154L54.577 102.115C55.136 102.348 52.5001 104.5 52.5001 104.5Z"
						fill="#FABC10"
					/>
				</G>
				<G opacity="0.04">
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M98.9957 38.0302C104.565 34.8148 111.426 34.8148 116.996 38.0302L164.091 65.2208C169.66 68.4362 173.091 74.3785 173.091 80.8093V135.191C173.091 141.621 169.66 147.564 164.091 150.779L116.996 177.97C111.426 181.185 104.565 181.185 98.9957 177.97L51.9001 150.779C46.3309 147.564 42.9001 141.621 42.9001 135.191L42.9001 80.8093C42.9001 74.3785 46.3309 68.4362 51.9001 65.2208L98.9957 38.0302Z"
						fill="#7705A4"
						//   style={{ mixBlendMode: "multiply" }}
					/>
				</G>
			</G>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M150 51.9774C150 49.9843 148.092 48.5453 146.176 49.0928L108 60.0002L69.8242 49.0928C67.9078 48.5453 66 49.9843 66 51.9774V96.0002C66 97.6571 67.3432 99.0002 69 99.0002H147C148.657 99.0002 150 97.6571 150 96.0002V51.9774Z"
				fill="url(#paint5_linear_503_13463)"
				stroke="url(#paint6_linear_503_13463)"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M102 42.4641C105.713 40.3205 110.287 40.3205 114 42.4641L161.756 70.0359C165.469 72.1795 167.756 76.141 167.756 80.4282V135.572C167.756 139.859 165.469 143.821 161.756 145.964L114 173.536C110.287 175.679 105.713 175.679 102 173.536L54.2443 145.964C50.5315 143.821 48.2443 139.859 48.2443 135.572V80.4282C48.2443 76.141 50.5315 72.1795 54.2443 70.0359L102 42.4641Z"
				fill="url(#paint7_linear_503_13463)"
				stroke="#FFF04D"
				strokeOpacity="0.4"
				strokeWidth="3"
			/>
			<G
				style={{ mixBlendMode: "multiply" }}
				opacity="0.8"
				filter="url(#filter7_i_503_13463)"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M155.013 75.5654L112.55 51.0204C109.734 49.3931 106.266 49.3931 103.45 51.0204L60.987 75.5654C58.1716 77.1928 56.4373 80.2002 56.4373 83.4549V101.162L52.9949 106.332C52.3243 107.339 52.3243 108.65 52.9949 109.657L56.4373 114.827V132.545C56.4373 135.8 58.1716 138.807 60.987 140.434L103.45 164.979C106.266 166.607 109.734 166.607 112.55 164.979L155.013 140.434C157.828 138.807 159.562 135.8 159.562 132.545V114.827L163.005 109.657C163.676 108.65 163.676 107.339 163.005 106.332L159.562 101.162V83.4549C159.562 80.2002 157.828 77.1928 155.013 75.5654ZM59.4704 114.827V132.545C59.4704 134.715 60.6266 136.72 62.5035 137.805L104.967 162.35C106.844 163.434 109.156 163.434 111.033 162.35L153.496 137.805C155.373 136.72 156.529 134.715 156.529 132.545V114.827L153.087 109.657C152.416 108.65 152.416 107.339 153.087 106.332L156.529 101.162V83.4549C156.529 81.2851 155.373 79.2801 153.496 78.1952L111.033 53.6502C109.156 52.5653 106.844 52.5653 104.967 53.6502L62.5035 78.1952C60.6266 79.2801 59.4704 81.2851 59.4704 83.4549V101.162L62.9129 106.332C63.5835 107.339 63.5835 108.65 62.9129 109.657L59.4704 114.827Z"
					fill="#FABC10"
				/>
			</G>
			<Path
				d="M113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9943 71.3349C51.7456 73.2105 49.7443 76.6768 49.7443 80.4281L49.7443 135.572C49.7443 139.323 51.7456 142.789 54.9943 144.665L102.75 172.237C105.999 174.112 110.001 174.112 113.25 172.237L161.006 144.665C164.255 142.789 166.256 139.323 166.256 135.572V80.4281C166.256 76.6768 164.255 73.2105 161.006 71.3349L113.25 43.7631Z"
				stroke="#F9B307"
				strokeWidth="3"
			/>
			<Path
				opacity="0.4"
				d="M113.25 172.237C118.867 168.994 122.846 166.696 125.189 165.344"
				stroke="white"
				strokeWidth="3"
				strokeLinecap="round"
			/>
			<Path
				d="M166.256 135.572V80.4281C166.256 76.6768 164.255 73.2105 161.006 71.3349L113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9943 71.3349C51.7456 73.2105 49.7443 76.6768 49.7443 80.4281L49.7443 135.572"
				stroke="#FAC00E"
				strokeWidth="3"
				strokeLinecap="round"
			/>
			<Path
				opacity="0.6"
				d="M166.256 80.4281C166.256 76.6768 164.255 73.2105 161.006 71.3349L113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9943 71.3349C51.7456 73.2105 49.7443 76.6768 49.7443 80.4281"
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
				d="M102.75 43.7629C102.75 43.7629 94.3253 48.627 90.8111 50.6559"
				stroke="white"
				strokeWidth="3"
				strokeLinecap="round"
			/>
			<G filter="url(#filter8_d_503_13463)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M105 61.7321C106.856 60.6603 109.144 60.6603 111 61.7321L146.569 82.268C148.426 83.3397 149.569 85.3205 149.569 87.4641V128.536C149.569 130.679 148.426 132.66 146.569 133.732L111 154.268C109.144 155.34 106.856 155.34 105 154.268L69.4308 133.732C67.5744 132.66 66.4308 130.679 66.4308 128.536V87.4641C66.4308 85.3205 67.5744 83.3397 69.4308 82.268L105 61.7321Z"
					fill="url(#paint8_linear_503_13463)"
				/>
				<Path
					d="M111.75 60.433C109.43 59.0933 106.571 59.0933 104.25 60.433L68.6808 80.9689C66.3603 82.3087 64.9308 84.7846 64.9308 87.4641V128.536C64.9308 131.215 66.3603 133.691 68.6808 135.031L104.25 155.567C106.571 156.907 109.43 156.907 111.75 155.567L147.319 135.031C149.64 133.691 151.069 131.215 151.069 128.536V87.4641C151.069 84.7846 149.64 82.3087 147.319 80.9689L111.75 60.433Z"
					stroke="#F5900D"
					strokeOpacity="0.1"
					strokeWidth="3"
					// style={{ mixBlendMode: "multiply" }}
				/>
			</G>
			<Mask
				id="mask4_503_13463"
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
					d="M105 61.7321C106.856 60.6603 109.144 60.6603 111 61.7321L146.569 82.268C148.426 83.3397 149.569 85.3205 149.569 87.4641V128.536C149.569 130.679 148.426 132.66 146.569 133.732L111 154.268C109.144 155.34 106.856 155.34 105 154.268L69.4308 133.732C67.5744 132.66 66.4308 130.679 66.4308 128.536V87.4641C66.4308 85.3205 67.5744 83.3397 69.4308 82.268L105 61.7321Z"
					fill="white"
				/>
			</Mask>
			<G mask="url(#mask4_503_13463)">
				<G style={{ mixBlendMode: "multiply" }} opacity="0.3">
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M108 108L120 60H96L108 108ZM108 108L133.456 65.5737L150.426 82.5443L108 108ZM108 108L133.456 150.426L150.426 133.456L108 108L156 120V96L108 108L108 108L82.5442 65.5737L65.5736 82.5443L108 108L60 96V120L108 108L108 108L65.5737 133.456L82.5442 150.426L108 108L108 108L96 156H120L108 108ZM108 108L108 108L108 108L108 108Z"
						fill="#FFD640"
					/>
				</G>
				<Path
					opacity="0.4"
					d="M145.819 83.5671L110.25 63.0312C108.858 62.2274 107.142 62.2274 105.75 63.0312C101.567 65.4464 98.6027 67.1578 96.8578 68.1652C93.2263 70.2618 90.2622 71.9732 87.9655 73.2992C84.0133 75.5809 78.0851 79.0036 70.1808 83.5671"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<Path
					opacity="0.4"
					d="M145.819 132.33L110.25 152.866C108.858 153.67 107.142 153.67 105.75 152.866"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<Path
					d="M105.75 63.0311C101.567 65.4463 98.6026 67.1577 96.8577 68.1651"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
				/>
			</G>
			<G filter="url(#filter9_d_503_13463)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M108 81L132 108L108 135L84 108L108 81Z"
					fill="white"
				/>
				<Path
					d="M110.242 79.0069C109.673 78.3664 108.857 78 108 78C107.143 78 106.327 78.3664 105.758 79.0069L81.7578 106.007C80.7474 107.144 80.7474 108.856 81.7578 109.993L105.758 136.993C106.327 137.634 107.143 138 108 138C108.857 138 109.673 137.634 110.242 136.993L134.242 109.993C135.253 108.856 135.253 107.144 134.242 106.007L110.242 79.0069Z"
					stroke="white"
					strokeWidth="6"
					strokeLinejoin="round"
				/>
			</G>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M108 81L132 108H84L108 81Z"
				fill="url(#paint9_linear_503_13463)"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M108 135L132 108H84L108 135Z"
				fill="url(#paint10_linear_503_13463)"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M108 81L96.4285 108H119.571L108 81Z"
				fill="url(#paint11_linear_503_13463)"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M108 135L96.4285 108H119.571L108 135Z"
				fill="url(#paint12_linear_503_13463)"
			/>
			<G filter="url(#filter10_d_503_13463)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M140.733 89.3398L139.175 88.7253C138.222 88.3495 137.754 87.2724 138.13 86.3195C138.318 85.8415 138.697 85.4632 139.175 85.2747L140.733 84.6602C142.529 83.9516 143.952 82.5294 144.66 80.7327L145.275 79.1747C145.651 78.2218 146.728 77.754 147.681 78.1298C148.158 78.3183 148.537 78.6967 148.725 79.1747L149.34 80.7327C150.048 82.5294 151.471 83.9516 153.267 84.6602L154.825 85.2747C155.778 85.6505 156.246 86.7276 155.87 87.6805C155.682 88.1585 155.303 88.5368 154.825 88.7253L153.267 89.3398C151.471 90.0484 150.048 91.4706 149.34 93.2673L148.725 94.8253C148.35 95.7782 147.272 96.246 146.32 95.8702C145.842 95.6817 145.463 95.3033 145.275 94.8253L144.66 93.2673C143.952 91.4706 142.529 90.0484 140.733 89.3398Z"
					fill="white"
				/>
			</G>
			<G filter="url(#filter11_d_503_13463)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M79.8219 136.56L78.7832 136.15C78.1479 135.9 77.8361 135.182 78.0866 134.546C78.2123 134.228 78.4645 133.975 78.7832 133.85L79.8219 133.44C81.0196 132.968 81.9678 132.02 82.4402 130.822L82.8498 129.783C83.1004 129.148 83.8184 128.836 84.4537 129.087C84.7723 129.212 85.0246 129.464 85.1503 129.783L85.5599 130.822C86.0323 132.02 86.9805 132.968 88.1782 133.44L89.2169 133.85C89.8522 134.1 90.164 134.818 89.9135 135.454C89.7878 135.772 89.5356 136.025 89.2169 136.15L88.1782 136.56C86.9805 137.032 86.0323 137.98 85.5599 139.178L85.1503 140.217C84.8997 140.852 84.1817 141.164 83.5464 140.913C83.2277 140.788 82.9755 140.536 82.8498 140.217L82.4402 139.178C81.9678 137.98 81.0196 137.032 79.8219 136.56Z"
					fill="white"
				/>
			</G>
			<G filter="url(#filter12_d_503_13463)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M62.2773 93.4498L60.979 92.9378C60.1849 92.6246 59.7951 91.727 60.1082 90.9329C60.2653 90.5346 60.5806 90.2193 60.979 90.0622L62.2773 89.5502C63.7745 88.9597 64.9597 87.7745 65.5502 86.2773L66.0623 84.9789C66.3754 84.1849 67.273 83.795 68.0671 84.1082C68.4654 84.2653 68.7807 84.5806 68.9378 84.9789L69.4499 86.2773C70.0404 87.7745 71.2256 88.9597 72.7228 89.5502L74.0211 90.0622C74.8152 90.3754 75.205 91.273 74.8919 92.0671C74.7348 92.4654 74.4195 92.7807 74.0211 92.9378L72.7228 93.4498C71.2256 94.0403 70.0404 95.2255 69.4499 96.7227L68.9378 98.0211C68.6246 98.8151 67.7271 99.205 66.933 98.8918C66.5347 98.7347 66.2194 98.4194 66.0623 98.0211L65.5502 96.7227C64.9597 95.2255 63.7745 94.0403 62.2773 93.4498Z"
					fill="white"
				/>
			</G>
			<G filter="url(#filter13_d_503_13463)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M139.366 137.67L138.587 137.363C138.111 137.175 137.877 136.636 138.065 136.16C138.159 135.921 138.348 135.732 138.587 135.637L139.366 135.33C140.265 134.976 140.976 134.265 141.33 133.366L141.637 132.587C141.825 132.111 142.364 131.877 142.84 132.065C143.079 132.159 143.268 132.348 143.363 132.587L143.67 133.366C144.024 134.265 144.735 134.976 145.634 135.33L146.413 135.637C146.889 135.825 147.123 136.364 146.935 136.84C146.841 137.079 146.652 137.268 146.413 137.363L145.634 137.67C144.735 138.024 144.024 138.735 143.67 139.634L143.363 140.413C143.175 140.889 142.636 141.123 142.16 140.935C141.921 140.841 141.732 140.652 141.637 140.413L141.33 139.634C140.976 138.735 140.265 138.024 139.366 137.67Z"
					fill="white"
				/>
			</G>
			<Defs>
				<Filter
					id="filter0_d_503_13463"
					x="60"
					y="99"
					width="60"
					height="106.15"
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
						values="0 0 0 0 0.309804 0 0 0 0 0.247059 0 0 0 0 0.866667 0 0 0 0.2 0"
					/>
					<FeBlend
						mode="darken"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_503_13463"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13463"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter1_d_503_13463"
					x="96"
					y="99"
					width="60"
					height="106.15"
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
						values="0 0 0 0 0.309804 0 0 0 0 0.247059 0 0 0 0 0.866667 0 0 0 0.2 0"
					/>
					<FeBlend
						mode="darken"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_503_13463"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13463"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter2_d_503_13463"
					x="78"
					y="114"
					width="60"
					height="106.15"
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
						values="0 0 0 0 0.309804 0 0 0 0 0.247059 0 0 0 0 0.866667 0 0 0 0.2 0"
					/>
					<FeBlend
						mode="darken"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_503_13463"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13463"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter3_i_503_13463"
					x="161.345"
					y="76.4996"
					width="20.1551"
					height="13.0004"
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
						values="0 0 0 0 0.976471 0 0 0 0 0.713726 0 0 0 0 0.0352941 0 0 0 1 0"
					/>
					<FeBlend
						mode="normal"
						in2="shape"
						result="effect1_innerShadow_503_13463"
					/>
				</Filter>
				<Filter
					id="filter4_i_503_13463"
					x="161.345"
					y="94.4996"
					width="20.1551"
					height="13.0004"
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
						values="0 0 0 0 0.976471 0 0 0 0 0.713726 0 0 0 0 0.0352941 0 0 0 1 0"
					/>
					<FeBlend
						mode="normal"
						in2="shape"
						result="effect1_innerShadow_503_13463"
					/>
				</Filter>
				<Filter
					id="filter5_i_503_13463"
					x="34.4997"
					y="76.4996"
					width="20.1551"
					height="13.0004"
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
						values="0 0 0 0 0.976471 0 0 0 0 0.713726 0 0 0 0 0.0352941 0 0 0 1 0"
					/>
					<FeBlend
						mode="normal"
						in2="shape"
						result="effect1_innerShadow_503_13463"
					/>
				</Filter>
				<Filter
					id="filter6_i_503_13463"
					x="34.4997"
					y="94.4996"
					width="20.1551"
					height="13.0004"
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
						values="0 0 0 0 0.976471 0 0 0 0 0.713726 0 0 0 0 0.0352941 0 0 0 1 0"
					/>
					<FeBlend
						mode="normal"
						in2="shape"
						result="effect1_innerShadow_503_13463"
					/>
				</Filter>
				<Filter
					id="filter7_i_503_13463"
					x="52.492"
					y="49.7999"
					width="111.016"
					height="119.4"
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
						values="0 0 0 0 0.976471 0 0 0 0 0.713726 0 0 0 0 0.0352941 0 0 0 1 0"
					/>
					<FeBlend
						mode="normal"
						in2="shape"
						result="effect1_innerShadow_503_13463"
					/>
				</Filter>
				<Filter
					id="filter8_d_503_13463"
					x="57.4308"
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
						result="effect1_dropShadow_503_13463"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13463"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter9_d_503_13463"
					x="72"
					y="72"
					width="72"
					height="78"
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
						result="effect1_dropShadow_503_13463"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13463"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter10_d_503_13463"
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
						result="effect1_dropShadow_503_13463"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13463"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter11_d_503_13463"
					x="72"
					y="123"
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
						result="effect1_dropShadow_503_13463"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13463"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter12_d_503_13463"
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
						result="effect1_dropShadow_503_13463"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13463"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter13_d_503_13463"
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
						result="effect1_dropShadow_503_13463"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13463"
						result="shape"
					/>
				</Filter>
				<LinearGradient
					id="paint0_linear_503_13463"
					x1="26.5871"
					y1="24"
					x2="26.5871"
					y2="186.826"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#AE66FF" />
					<Stop offset="1" stopColor="#7E07E0" />
				</LinearGradient>
				<LinearGradient
					id="paint1_linear_503_13463"
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
					id="paint2_linear_503_13463"
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
					id="paint3_linear_503_13463"
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
					id="paint4_linear_503_13463"
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
					id="paint5_linear_503_13463"
					x1="66"
					y1="49.0613"
					x2="66"
					y2="99.0002"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#F7C71A" />
					<Stop offset="1" stopColor="#FBAA00" />
				</LinearGradient>
				<LinearGradient
					id="paint6_linear_503_13463"
					x1="66"
					y1="49.0613"
					x2="66"
					y2="99.0002"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FFDF6B" />
					<Stop offset="1" stopColor="#F8A60A" />
				</LinearGradient>
				<LinearGradient
					id="paint7_linear_503_13463"
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
					id="paint8_linear_503_13463"
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
					id="paint9_linear_503_13463"
					x1="84"
					y1="81"
					x2="84"
					y2="108"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#27DEEB" />
					<Stop offset="1" stopColor="#08C9FF" />
				</LinearGradient>
				<LinearGradient
					id="paint10_linear_503_13463"
					x1="84"
					y1="108"
					x2="84"
					y2="135"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#009BF6" />
					<Stop offset="1" stopColor="#00B5FF" />
				</LinearGradient>
				<LinearGradient
					id="paint11_linear_503_13463"
					x1="96.4285"
					y1="81"
					x2="96.4285"
					y2="108"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#8AFFFF" />
					<Stop offset="1" stopColor="#0DF3FF" />
				</LinearGradient>
				<LinearGradient
					id="paint12_linear_503_13463"
					x1="96.4285"
					y1="108"
					x2="96.4285"
					y2="135"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#00BAF3" />
					<Stop offset="1" stopColor="#00B5FF" />
				</LinearGradient>
			</Defs>
		</Svg>
	) : (
		<Svg width="216" height="216" viewBox="0 0 216 216" fill="none" {...rest}>
			<Mask
				id="mask0_503_14654"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="24"
				y="24"
				width="168"
				height="169"
			>
				<Circle cx="108" cy="108" r="84" fill="white" />
			</Mask>
			<G mask="url(#mask0_503_14654)">
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
				d="M63 99H111V190.146C111 192.376 108.653 193.827 106.658 192.829L87 183L67.3416 192.829C65.3469 193.827 63 192.376 63 190.146V99Z"
				fill="#A1C7FF"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M105 99H153V190.146C153 192.376 150.653 193.827 148.658 192.829L129 183L109.342 192.829C107.347 193.827 105 192.376 105 190.146V99Z"
				fill="#A1C7FF"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M84 114H132V205.146C132 207.376 129.653 208.827 127.658 207.829L108 198L88.3416 207.829C86.3469 208.827 84 207.376 84 205.146V114Z"
				fill="#E7F1FF"
			/>
			<Mask
				id="mask1_503_14654"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="84"
				y="114"
				width="48"
				height="95"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M84 114H132V205.146C132 207.376 129.653 208.827 127.658 207.829L108 198L88.3416 207.829C86.3469 208.827 84 207.376 84 205.146V114Z"
					fill="white"
				/>
			</Mask>
			<G mask="url(#mask1_503_14654)">
				<Rect x="96" y="114" width="24" height="96" fill="#A1C7FF" />
			</G>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M146.176 49.0925C148.092 48.5449 150 49.9839 150 51.977V95.9999C150 97.6567 148.657 98.9999 147 98.9999H69C67.3431 98.9999 66 97.6567 66 95.9999V51.977C66 49.9839 67.9077 48.5449 69.8242 49.0925L108 59.9999L146.176 49.0925ZM54 68.0311C54 66.8044 53.2531 65.7013 52.1142 65.2457L41.4685 60.9874C40.2861 60.5145 39 61.3852 39 62.6587V108.969C39 110.196 39.7469 111.299 40.8858 111.754L54 117V68.0311ZM162 68.0311C162 66.8044 162.747 65.7013 163.886 65.2457L174.531 60.9874C175.714 60.5145 177 61.3852 177 62.6587V108.969C177 110.196 176.253 111.299 175.114 111.754L162 117V68.0311Z"
				fill="#A1C7FF"
			/>
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
				d="M108 81L132 108L108 135L84 108L108 81Z"
				fill="#A1C7FF"
				stroke="white"
				strokeWidth="6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
