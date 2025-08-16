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

export const TrophyLevel6: React.FC<TrophyLevelProps> = ({
	achieved,
	...rest
}) =>
	achieved ? (
		<Svg width="216" height="221" viewBox="0 0 216 221" fill="none" {...rest}>
			<Mask
				id="mask0_503_13464"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="24"
				y="24"
				width="168"
				height="169"
			>
				<Circle cx="108" cy="108" r="84" fill="white" />
			</Mask>
			<G mask="url(#mask0_503_13464)">
				<Circle cx="108" cy="108" r="84" fill="url(#paint0_linear_503_13464)" />
				<G style={{ mixBlendMode: "color-burn" }} opacity="0.04">
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M33.0002 32.9989C26.3728 32.9989 21.0002 38.3715 21.0002 44.9989C21.0002 51.6263 26.3728 56.9989 33.0002 56.9989H54.0002C60.6276 56.9989 66.0002 51.6263 66.0002 44.9989C66.0002 38.3715 60.6276 32.9989 54.0002 32.9989H33.0002ZM141 81.0007C134.373 81.0007 129 86.3733 129 93.0007C129 99.6282 134.373 105.001 141 105.001H213C219.628 105.001 225 99.6282 225 93.0007C225 86.3733 219.628 81.0007 213 81.0007H141ZM108 165C108 158.372 113.373 153 120 153H192C198.628 153 204 158.372 204 165C204 171.627 198.628 177 192 177H120C113.373 177 108 171.627 108 165ZM30.0001 129C23.3727 129 18.0001 134.373 18.0001 141C18.0001 147.627 23.3727 153 30.0001 153H78.0001C84.6275 153 90.0001 147.627 90.0001 141C90.0001 134.373 84.6275 129 78.0001 129H30.0001ZM12.0001 101.999C12.0001 98.6856 14.6864 95.9993 18.0001 95.9993H45.0001C48.3138 95.9993 51.0001 98.6856 51.0001 101.999C51.0001 105.313 48.3138 107.999 45.0001 107.999H18.0001C14.6864 107.999 12.0001 105.313 12.0001 101.999ZM18.0001 68.9996C14.6864 68.9996 12.0001 71.6859 12.0001 74.9996C12.0001 78.3133 14.6864 80.9996 18.0001 80.9996H102C105.314 80.9996 108 78.3133 108 74.9996C108 71.6859 105.314 68.9996 102 68.9996H18.0001ZM90 38.9989C90 35.6852 92.6863 32.9989 96 32.9989H180C183.314 32.9989 186 35.6852 186 38.9989C186 42.3126 183.314 44.9989 180 44.9989H96C92.6863 44.9989 90 42.3126 90 38.9989ZM6.00009 171C2.68638 171 9.15527e-05 173.686 9.15527e-05 177C9.15527e-05 180.314 2.68638 183 6.00009 183H90.0001C93.3138 183 96.0001 180.314 96.0001 177C96.0001 173.686 93.3138 171 90.0001 171H6.00009ZM129 63.0011C129 59.6874 131.686 57.0011 135 57.0011H219C222.314 57.0011 225 59.6874 225 63.0011C225 66.3148 222.314 69.0011 219 69.0011H135C131.686 69.0011 129 66.3148 129 63.0011ZM118.6 116.999C113.74 116.999 109.8 120.939 109.8 125.799C109.8 130.659 113.74 134.599 118.6 134.599H191.4C196.261 134.599 200.2 130.659 200.2 125.799C200.2 120.939 196.26 116.999 191.4 116.999H118.6Z"
						fill="black"
					/>
				</G>
			</G>
			<G opacity="0.2">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M98.9956 38.0302C104.565 34.8148 111.426 34.8148 116.996 38.0302L164.091 65.2208C169.66 68.4362 173.091 74.3785 173.091 80.8093V135.191C173.091 141.621 169.66 147.564 164.091 150.779L116.996 177.97C111.426 181.185 104.565 181.185 98.9956 177.97L51.9001 150.779C46.3308 147.564 42.9001 141.621 42.9001 135.191L42.9001 80.8093C42.9001 74.3785 46.3308 68.4362 51.9001 65.2208L98.9956 38.0302Z"
					fill="#A4053A"
					fillOpacity="0.2"
					// style={{ mixBlendMode: "multiply" }}
				/>
			</G>
			<G filter="url(#filter0_d_503_13464)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M66 99H114V190.146C114 192.376 111.653 193.827 109.658 192.829L90 183L70.3416 192.829C68.3469 193.827 66 192.376 66 190.146V99Z"
					fill="#7F45F6"
				/>
			</G>
			<G filter="url(#filter1_d_503_13464)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M102 99H150V190.146C150 192.376 147.653 193.827 145.658 192.829L126 183L106.342 192.829C104.347 193.827 102 192.376 102 190.146V99Z"
					fill="#7F45F6"
				/>
			</G>
			<G filter="url(#filter2_d_503_13464)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M84 114H132V205.146C132 207.376 129.653 208.827 127.658 207.829L108 198L88.3416 207.829C86.3469 208.827 84 207.376 84 205.146V114Z"
					fill="white"
				/>
			</G>
			<Mask
				id="mask1_503_13464"
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
			<G mask="url(#mask1_503_13464)">
				<Rect x="96" y="114" width="24" height="96" fill="#F55462" />
			</G>
			<Path
				// style={{ mixBlendMode: "multiply" }}
				opacity="0.8"
				fillRule="evenodd"
				clipRule="evenodd"
				d="M102 48.464C105.713 46.3204 110.287 46.3204 114 48.464L161.756 76.0358C165.469 78.1794 167.756 82.1409 167.756 86.4281V141.572C167.756 145.859 165.469 149.82 161.756 151.964L114 179.536C110.287 181.679 105.713 181.679 102 179.536L54.2443 151.964C50.5314 149.82 48.2443 145.859 48.2443 141.572L48.2443 86.4281C48.2443 82.1409 50.5315 78.1794 54.2443 76.0358L102 48.464Z"
				fill="#A4053A"
				fillOpacity="0.2"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M57 73.5L42 67.5V64.5L27.5952 58.498C26.1785 57.9077 24.7203 59.2474 25.1888 60.7089L42.2764 114.022C42.5734 114.949 43.3017 115.674 44.2298 115.967L57 120V73.5Z"
				fill="url(#paint1_linear_503_13464)"
				stroke="url(#paint2_linear_503_13464)"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Mask
				id="mask2_503_13464"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="26"
				y="60"
				width="33"
				height="60"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M57 77.5622C57 75.1088 55.5063 72.9025 53.2283 71.9913L43.4035 68.0614C42.5558 67.7223 42 66.9014 42 65.9884C42 65.0871 41.4581 64.2742 40.6261 63.9275L35.9839 61.9933C31.2616 60.0257 26.4011 64.4914 27.9625 69.3631L41.8027 112.544C42.3968 114.398 43.8534 115.848 45.7096 116.435L49.1932 117.535C53.0603 118.756 57 115.869 57 111.813V77.5622Z"
					fill="white"
					stroke="white"
					strokeWidth="3"
				/>
			</Mask>
			<G mask="url(#mask2_503_13464)">
				<G
					style={{ mixBlendMode: "multiply" }}
					opacity="0.6"
					filter="url(#filter3_i_503_13464)"
				>
					<Path
						d="M57.5571 90.1073C58.3263 90.415 58.7004 91.2879 58.3927 92.0571C58.0851 92.8263 57.2121 93.2004 56.4429 92.8927L41.4429 86.8927C40.8735 86.6649 40.5 86.1134 40.5 85.5V83.5L23.4231 76.3846C22.6584 76.066 22.2968 75.1878 22.6154 74.4231C22.934 73.6584 23.8122 73.2968 24.5769 73.6154L42.5769 81.1154C43.1359 81.3483 43.5 81.8945 43.5 82.5V84.4845L57.5571 90.1073Z"
						fill="#FABC10"
					/>
				</G>
				<G
					style={{ mixBlendMode: "multiply" }}
					opacity="0.6"
					filter="url(#filter4_i_503_13464)"
				>
					<Path
						d="M60.5571 108.107C61.3263 108.415 61.7004 109.288 61.3927 110.057C61.0851 110.826 60.2121 111.2 59.4429 110.893L44.4429 104.893C43.8735 104.665 43.5 104.113 43.5 103.5V101.5L26.4231 94.3846C25.6584 94.066 25.2968 93.1878 25.6154 92.4231C25.934 91.6584 26.8122 91.2968 27.5769 91.6154L45.5769 99.1154C46.1359 99.3483 46.5 99.8945 46.5 100.5V102.484L60.5571 108.107Z"
						fill="#FABC10"
					/>
				</G>
				<G opacity="0.2">
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M98.9956 38.0302C104.565 34.8148 111.426 34.8148 116.996 38.0302L164.091 65.2208C169.66 68.4362 173.091 74.3785 173.091 80.8093V135.191C173.091 141.621 169.66 147.564 164.091 150.779L116.996 177.97C111.426 181.185 104.565 181.185 98.9956 177.97L51.9001 150.779C46.3308 147.564 42.9001 141.621 42.9001 135.191L42.9001 80.8093C42.9001 74.3785 46.3308 68.4362 51.9001 65.2208L98.9956 38.0302Z"
						fill="#A4053A"
						fillOpacity="0.2"
						// style={{ mixBlendMode: "multiply" }}
					/>
				</G>
			</G>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M159 73.5L174 67.5V64.5L188.405 58.498C189.822 57.9077 191.28 59.2474 190.811 60.7089L173.724 114.022C173.427 114.949 172.698 115.674 171.77 115.967L159 120V73.5Z"
				fill="url(#paint3_linear_503_13464)"
				stroke="url(#paint4_linear_503_13464)"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Mask
				id="mask3_503_13464"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="157"
				y="60"
				width="33"
				height="60"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M159 77.5622C159 75.1088 160.494 72.9025 162.772 71.9913L172.597 68.0614C173.444 67.7223 174 66.9014 174 65.9884C174 65.0871 174.542 64.2742 175.374 63.9275L180.016 61.9933C184.738 60.0257 189.599 64.4914 188.037 69.3631L174.197 112.544C173.603 114.398 172.147 115.848 170.29 116.435L166.807 117.535C162.94 118.756 159 115.869 159 111.813V77.5622Z"
					fill="white"
					stroke="white"
					strokeWidth="3"
				/>
			</Mask>
			<G mask="url(#mask3_503_13464)">
				<G
					style={{ mixBlendMode: "multiply" }}
					opacity="0.6"
					filter="url(#filter5_i_503_13464)"
				>
					<Path
						d="M158.443 90.1073C157.674 90.415 157.3 91.2879 157.607 92.0571C157.915 92.8263 158.788 93.2004 159.557 92.8927L174.557 86.8927C175.127 86.6649 175.5 86.1134 175.5 85.5V83.5L192.577 76.3846C193.342 76.066 193.703 75.1878 193.385 74.4231C193.066 73.6584 192.188 73.2968 191.423 73.6154L173.423 81.1154C172.864 81.3483 172.5 81.8945 172.5 82.5V84.4845L158.443 90.1073Z"
						fill="#FABC10"
					/>
				</G>
				<G
					style={{ mixBlendMode: "multiply" }}
					opacity="0.6"
					filter="url(#filter6_i_503_13464)"
				>
					<Path
						d="M155.443 108.107C154.674 108.415 154.3 109.288 154.607 110.057C154.915 110.826 155.788 111.2 156.557 110.893L171.557 104.893C172.127 104.665 172.5 104.113 172.5 103.5V101.5L189.577 94.3846C190.342 94.066 190.703 93.1878 190.385 92.4231C190.066 91.6584 189.188 91.2968 188.423 91.6154L170.423 99.1154C169.864 99.3483 169.5 99.8945 169.5 100.5V102.484L155.443 108.107Z"
						fill="#FABC10"
					/>
				</G>
				<G opacity="0.2">
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M117.004 38.0302C111.435 34.8148 104.574 34.8148 99.0045 38.0302L51.9089 65.2208C46.3397 68.4362 42.9089 74.3785 42.9089 80.8093V135.191C42.9089 141.621 46.3397 147.564 51.9089 150.779L99.0045 177.97C104.574 181.185 111.435 181.185 117.004 177.97L164.1 150.779C169.669 147.564 173.1 141.621 173.1 135.191L173.1 80.8093C173.1 74.3785 169.669 68.4362 164.1 65.2208L117.004 38.0302Z"
						fill="#A4053A"
						fillOpacity="0.2"
						// style={{ mixBlendMode: "multiply" }}
					/>
				</G>
			</G>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M54 126L43.4219 131.289C42.5326 131.734 41.9213 132.59 41.7899 133.576L39.4807 150.895C39.2838 152.372 40.8642 153.435 42.158 152.695L60 142.5L54 126Z"
				fill="url(#paint5_linear_503_13464)"
				stroke="url(#paint6_linear_503_13464)"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Mask
				id="mask4_503_13464"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="39"
				y="126"
				width="22"
				height="25"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M56.3007 132.327C55.0751 128.957 51.1862 127.407 47.9786 129.011L44.8439 130.578C43.0651 131.467 41.8426 133.18 41.5798 135.152L40.6023 142.482C39.9459 147.406 45.214 150.949 49.5266 148.485L55.6103 145.008C58.1466 143.559 59.2705 140.494 58.2722 137.749L56.3007 132.327Z"
					fill="white"
					stroke="white"
					strokeWidth="3"
				/>
			</Mask>
			<G mask="url(#mask4_503_13464)">
				<G opacity="0.1">
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M98.3398 38.0302C103.909 34.8148 110.771 34.8148 116.34 38.0302L163.435 65.2208C169.005 68.4362 172.435 74.3785 172.435 80.8093V135.191C172.435 141.621 169.005 147.564 163.435 150.779L116.34 177.97C110.771 181.185 103.909 181.185 98.3398 177.97L51.2443 150.779C45.6751 147.564 42.2443 141.621 42.2443 135.191L42.2443 80.8093C42.2443 74.3785 45.675 68.4362 51.2443 65.2208L98.3398 38.0302Z"
						fill="#F37E02"
						// style={{ mixBlendMode: "multiply" }}
					/>
				</G>
			</G>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M162 126L172.578 131.289C173.467 131.734 174.079 132.59 174.21 133.576L176.519 150.895C176.716 152.372 175.136 153.435 173.842 152.695L156 142.5L162 126Z"
				fill="url(#paint7_linear_503_13464)"
				stroke="url(#paint8_linear_503_13464)"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Mask
				id="mask5_503_13464"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="154"
				y="124"
				width="25"
				height="31"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M162 126L172.578 131.289C173.467 131.734 174.079 132.59 174.21 133.576L176.519 150.895C176.716 152.372 175.136 153.435 173.842 152.695L156 142.5L162 126Z"
					fill="white"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Mask>
			<G mask="url(#mask5_503_13464)">
				<G opacity="0.1">
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M117.66 38.0302C112.091 34.8148 105.229 34.8148 99.6602 38.0302L52.5646 65.2208C46.9954 68.4362 43.5646 74.3785 43.5646 80.8093V135.191C43.5646 141.621 46.9954 147.564 52.5646 150.779L99.6602 177.97C105.229 181.185 112.091 181.185 117.66 177.97L164.756 150.779C170.325 147.564 173.756 141.621 173.756 135.191L173.756 80.8093C173.756 74.3785 170.325 68.4362 164.756 65.2208L117.66 38.0302Z"
						fill="#F37E02"
						// style={{ mixBlendMode: "multiply" }}
					/>
				</G>
			</G>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M90.0612 71.0248C90.0612 75.6271 87.4289 79.8241 83.2856 81.8278L77.4077 84.6704C69.4391 88.524 60.1833 82.7188 60.1833 73.8673V59.3392C60.1833 57.1957 61.3269 55.2149 63.1833 54.1431L85.5612 41.2232C87.5612 40.0685 90.0612 41.5119 90.0612 43.8213V71.0248Z"
				fill="url(#paint9_linear_503_13464)"
			/>
			<Path
				opacity="0.4"
				d="M63.6199 55.6195L86.3437 42.5024"
				stroke="#FDEDAC"
				strokeWidth="3"
				strokeLinecap="round"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M125.939 71.0248C125.939 75.6271 128.571 79.8241 132.715 81.8278L138.593 84.6704C146.561 88.524 155.817 82.7188 155.817 73.8673V59.3392C155.817 57.1957 154.673 55.2149 152.817 54.1431L130.439 41.2232C128.439 40.0685 125.939 41.5119 125.939 43.8213V71.0248Z"
				fill="url(#paint10_linear_503_13464)"
			/>
			<Path
				opacity="0.4"
				d="M152.38 55.6195L129.656 42.5024"
				stroke="#FDEDAC"
				strokeWidth="3"
				strokeLinecap="round"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M102 42.4641C105.713 40.3205 110.287 40.3205 114 42.4641L161.756 70.0359C165.469 72.1795 167.756 76.141 167.756 80.4282V135.572C167.756 139.859 165.469 143.821 161.756 145.964L114 173.536C110.287 175.679 105.713 175.679 102 173.536L54.2442 145.964C50.5314 143.821 48.2442 139.859 48.2442 135.572V80.4282C48.2442 76.141 50.5314 72.1795 54.2442 70.0359L102 42.4641Z"
				fill="url(#paint11_linear_503_13464)"
				stroke="#FFF04D"
				strokeOpacity="0.4"
				strokeWidth="3"
			/>
			<Mask
				id="mask6_503_13464"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="48"
				y="39"
				width="120"
				height="138"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M105 40.7321C106.856 39.6603 109.144 39.6603 111 40.7321L164.756 71.7679C166.612 72.8397 167.756 74.8205 167.756 76.9641V139.036C167.756 141.179 166.612 143.16 164.756 144.232L111 175.268C109.144 176.34 106.856 176.34 105 175.268L51.2442 144.232C49.3878 143.16 48.2442 141.179 48.2442 139.036V76.9641C48.2442 74.8205 49.3878 72.8397 51.2442 71.7679L105 40.7321Z"
					fill="white"
				/>
			</Mask>
			<G mask="url(#mask6_503_13464)">
				<G
					style={{ mixBlendMode: "multiply" }}
					opacity="0.8"
					filter="url(#filter7_i_503_13464)"
				>
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M155.013 75.5654L112.55 51.0204C109.734 49.3931 106.266 49.3931 103.45 51.0204L60.987 75.5654C58.1717 77.1928 56.4374 80.2002 56.4374 83.4549V101.162L52.9949 106.332C52.3243 107.339 52.3243 108.65 52.9949 109.657L56.4374 114.827V132.545C56.4374 135.8 58.1717 138.807 60.987 140.434L103.45 164.979C106.266 166.607 109.734 166.607 112.55 164.979L155.013 140.434C157.828 138.807 159.563 135.8 159.563 132.545V114.827L163.005 109.657C163.676 108.65 163.676 107.339 163.005 106.332L159.563 101.162V83.4549C159.563 80.2002 157.828 77.1928 155.013 75.5654ZM59.4705 114.827V132.545C59.4705 134.715 60.6267 136.72 62.5036 137.805L104.967 162.35C106.844 163.434 109.156 163.434 111.033 162.35L153.496 137.805C155.373 136.72 156.529 134.715 156.529 132.545V114.827L153.087 109.657C152.416 108.65 152.416 107.339 153.087 106.332L156.529 101.162V83.4549C156.529 81.2851 155.373 79.2801 153.496 78.1952L111.033 53.6502C109.156 52.5653 106.844 52.5653 104.967 53.6502L62.5036 78.1952C60.6267 79.2801 59.4705 81.2851 59.4705 83.4549V101.162L62.9129 106.332C63.5835 107.339 63.5835 108.65 62.9129 109.657L59.4705 114.827Z"
						fill="#FABC10"
					/>
				</G>
				<Path
					d="M113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9943 71.3349C51.7456 73.2105 49.7443 76.6768 49.7443 80.4281L49.7443 135.572C49.7443 139.323 51.7456 142.789 54.9943 144.665L102.75 172.237C105.999 174.112 110.001 174.112 113.25 172.237L161.006 144.665C164.254 142.789 166.256 139.323 166.256 135.572V80.4281C166.256 76.6768 164.254 73.2105 161.006 71.3349L113.25 43.7631Z"
					stroke="#FAB90A"
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
					d="M166.256 135.572V80.4281C166.256 76.6768 164.254 73.2105 161.006 71.3349L113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9943 71.3349C51.7456 73.2105 49.7443 76.6768 49.7443 80.4281L49.7443 135.572"
					stroke="#FAC81C"
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<Path
					opacity="0.6"
					d="M166.256 80.4281C166.256 76.6768 164.254 73.2105 161.006 71.3349L113.25 43.7631C110.001 41.8874 105.999 41.8874 102.75 43.7631L54.9943 71.3349C51.7456 73.2105 49.7443 76.6768 49.7443 80.4281"
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
					d="M102.75 43.7629C102.75 43.7629 94.3252 48.627 90.8111 50.6559"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
				/>
			</G>
			<G filter="url(#filter8_d_503_13464)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M105 61.7321C106.856 60.6603 109.144 60.6603 111 61.7321L146.569 82.268C148.426 83.3397 149.569 85.3205 149.569 87.4641V128.536C149.569 130.679 148.426 132.66 146.569 133.732L111 154.268C109.144 155.34 106.856 155.34 105 154.268L69.4308 133.732C67.5744 132.66 66.4308 130.679 66.4308 128.536V87.4641C66.4308 85.3205 67.5744 83.3397 69.4308 82.268L105 61.7321Z"
					fill="url(#paint12_linear_503_13464)"
				/>
				<Path
					d="M111.75 60.433C109.429 59.0933 106.571 59.0933 104.25 60.433L68.6808 80.9689C66.3603 82.3087 64.9308 84.7846 64.9308 87.4641V128.536C64.9308 131.215 66.3603 133.691 68.6808 135.031L104.25 155.567C106.571 156.907 109.429 156.907 111.75 155.567L147.319 135.031C149.64 133.691 151.069 131.215 151.069 128.536V87.4641C151.069 84.7846 149.64 82.3087 147.319 80.9689L111.75 60.433Z"
					stroke="#F5900D"
					strokeOpacity="0.1"
					strokeWidth="3"
					// style={{ mixBlendMode: "multiply" }}
				/>
			</G>
			<Mask
				id="mask7_503_13464"
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
			<G mask="url(#mask7_503_13464)">
				<G style={{ mixBlendMode: "multiply" }} opacity="0.3">
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M108 108L60 120V96L108 108ZM108 108L120 60H96L108 108ZM108 108L156 96V120L108 108ZM108 108L133.456 65.5736L150.426 82.5442L108 108ZM108 108L133.456 150.426L150.426 133.456L108 108ZM108 108L96 156H120L108 108ZM108 108L82.5442 150.426L65.5736 133.456L108 108Z"
						fill="#FFD640"
					/>
					<Path
						d="M82.5442 65.5736L65.5736 82.5442L108 108L82.5442 65.5736Z"
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
					d="M105.75 63.0311C101.567 65.4463 98.6026 67.1577 96.8577 68.1651"
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
			</G>
			<G filter="url(#filter9_d_503_13464)">
				<Path
					d="M89.3333 91.672L108 80.5001L126.667 91.672V124.328L108 135.5L89.3333 124.328V91.672Z"
					fill="white"
				/>
				<Path
					d="M87.7927 89.0978C86.8874 89.6396 86.3333 90.617 86.3333 91.672V124.328C86.3333 125.383 86.8874 126.361 87.7927 126.902L106.459 138.074C107.408 138.642 108.592 138.642 109.541 138.074L128.207 126.902C129.113 126.361 129.667 125.383 129.667 124.328V91.672C129.667 90.617 129.113 89.6396 128.207 89.0978L109.541 77.9259C108.592 77.3582 107.408 77.3582 106.459 77.9259L87.7927 89.0978Z"
					stroke="white"
					strokeWidth="6"
					strokeLinejoin="round"
				/>
			</G>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M89.3333 91.672L108 80.5001V92.5314L99.5151 97.6876L89.3333 91.672Z"
				fill="url(#paint13_linear_503_13464)"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M89.3333 91.6721V124.328L99.5151 118.313V97.6877L89.3333 91.6721Z"
				fill="url(#paint14_linear_503_13464)"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M108 135.5L89.3333 124.328L99.5151 118.312L108 123.469V135.5Z"
				fill="url(#paint15_linear_503_13464)"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M108 135.5L126.667 124.328L116.485 118.312L108 123.469V135.5Z"
				fill="url(#paint16_linear_503_13464)"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M126.667 91.6721V124.328L116.485 118.313V97.6877L126.667 91.6721Z"
				fill="url(#paint17_linear_503_13464)"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M126.667 91.672L108 80.5001V92.5314L116.485 97.6876L126.667 91.672Z"
				fill="url(#paint18_linear_503_13464)"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M99.5153 118.312L108 123.469L116.485 118.312V97.6875L108 92.5312L99.5153 97.6875V118.312Z"
				fill="url(#paint19_linear_503_13464)"
			/>
			<G filter="url(#filter10_d_503_13464)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M140.733 89.3398L139.175 88.7253C138.222 88.3495 137.754 87.2724 138.13 86.3195C138.318 85.8415 138.697 85.4632 139.175 85.2747L140.733 84.6602C142.529 83.9516 143.952 82.5294 144.66 80.7327L145.275 79.1747C145.65 78.2218 146.728 77.754 147.68 78.1298C148.158 78.3183 148.537 78.6967 148.725 79.1747L149.34 80.7327C150.048 82.5294 151.471 83.9516 153.267 84.6602L154.825 85.2747C155.778 85.6505 156.246 86.7276 155.87 87.6805C155.682 88.1585 155.303 88.5368 154.825 88.7253L153.267 89.3398C151.471 90.0484 150.048 91.4706 149.34 93.2673L148.725 94.8253C148.35 95.7782 147.272 96.246 146.32 95.8702C145.842 95.6817 145.463 95.3033 145.275 94.8253L144.66 93.2673C143.952 91.4706 142.529 90.0484 140.733 89.3398Z"
					fill="white"
				/>
			</G>
			<G filter="url(#filter11_d_503_13464)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M73.8218 139.56L72.7831 139.15C72.1479 138.9 71.836 138.182 72.0866 137.546C72.2122 137.228 72.4645 136.975 72.7831 136.85L73.8218 136.44C75.0196 135.968 75.9677 135.02 76.4401 133.822L76.8498 132.783C77.1003 132.148 77.8184 131.836 78.4536 132.087C78.7723 132.212 79.0245 132.464 79.1502 132.783L79.5599 133.822C80.0323 135.02 80.9804 135.968 82.1782 136.44L83.2169 136.85C83.8521 137.1 84.164 137.818 83.9134 138.454C83.7878 138.772 83.5355 139.025 83.2169 139.15L82.1782 139.56C80.9804 140.032 80.0323 140.98 79.5599 142.178L79.1502 143.217C78.8997 143.852 78.1816 144.164 77.5464 143.913C77.2277 143.788 76.9755 143.536 76.8498 143.217L76.4401 142.178C75.9677 140.98 75.0196 140.032 73.8218 139.56Z"
					fill="white"
				/>
			</G>
			<G filter="url(#filter12_d_503_13464)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M62.2773 93.4498L60.9789 92.9378C60.1849 92.6246 59.795 91.727 60.1082 90.9329C60.2653 90.5346 60.5806 90.2193 60.9789 90.0622L62.2773 89.5502C63.7745 88.9597 64.9597 87.7745 65.5502 86.2773L66.0622 84.9789C66.3754 84.1849 67.273 83.795 68.0671 84.1082C68.4654 84.2653 68.7807 84.5806 68.9378 84.9789L69.4498 86.2773C70.0403 87.7745 71.2255 88.9597 72.7227 89.5502L74.0211 90.0622C74.8151 90.3754 75.205 91.273 74.8918 92.0671C74.7347 92.4654 74.4194 92.7807 74.0211 92.9378L72.7227 93.4498C71.2255 94.0403 70.0403 95.2255 69.4498 96.7227L68.9378 98.0211C68.6246 98.8151 67.727 99.205 66.9329 98.8918C66.5346 98.7347 66.2193 98.4194 66.0622 98.0211L65.5502 96.7227C64.9597 95.2255 63.7745 94.0403 62.2773 93.4498Z"
					fill="white"
				/>
			</G>
			<G filter="url(#filter13_d_503_13464)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M139.366 134.67L138.587 134.363C138.111 134.175 137.877 133.636 138.065 133.16C138.159 132.921 138.348 132.732 138.587 132.637L139.366 132.33C140.265 131.976 140.976 131.265 141.33 130.366L141.637 129.587C141.825 129.111 142.364 128.877 142.84 129.065C143.079 129.159 143.268 129.348 143.363 129.587L143.67 130.366C144.024 131.265 144.735 131.976 145.634 132.33L146.413 132.637C146.889 132.825 147.123 133.364 146.935 133.84C146.841 134.079 146.652 134.268 146.413 134.363L145.634 134.67C144.735 135.024 144.024 135.735 143.67 136.634L143.363 137.413C143.175 137.889 142.636 138.123 142.16 137.935C141.921 137.841 141.732 137.652 141.637 137.413L141.33 136.634C140.976 135.735 140.265 135.024 139.366 134.67Z"
					fill="white"
				/>
			</G>
			<Defs>
				<Filter
					id="filter0_d_503_13464"
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
						values="0 0 0 0 0.921569 0 0 0 0 0.215686 0 0 0 0 0.305882 0 0 0 0.2 0"
					/>
					<FeBlend
						mode="darken"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_503_13464"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13464"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter1_d_503_13464"
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
						values="0 0 0 0 0.921569 0 0 0 0 0.215686 0 0 0 0 0.305882 0 0 0 0.2 0"
					/>
					<FeBlend
						mode="darken"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_503_13464"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13464"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter2_d_503_13464"
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
						values="0 0 0 0 0.921569 0 0 0 0 0.215686 0 0 0 0 0.305882 0 0 0 0.2 0"
					/>
					<FeBlend
						mode="darken"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_503_13464"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13464"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter3_i_503_13464"
					x="22.4996"
					y="73.4996"
					width="36.0008"
					height="22.5007"
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
						result="effect1_innerShadow_503_13464"
					/>
				</Filter>
				<Filter
					id="filter4_i_503_13464"
					x="25.4996"
					y="91.4996"
					width="36.0008"
					height="22.5007"
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
						result="effect1_innerShadow_503_13464"
					/>
				</Filter>
				<Filter
					id="filter5_i_503_13464"
					x="157.5"
					y="73.4996"
					width="36.0008"
					height="22.5007"
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
						result="effect1_innerShadow_503_13464"
					/>
				</Filter>
				<Filter
					id="filter6_i_503_13464"
					x="154.5"
					y="91.4996"
					width="36.0008"
					height="22.5007"
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
						result="effect1_innerShadow_503_13464"
					/>
				</Filter>
				<Filter
					id="filter7_i_503_13464"
					x="52.4919"
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
						result="effect1_innerShadow_503_13464"
					/>
				</Filter>
				<Filter
					id="filter8_d_503_13464"
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
						result="effect1_dropShadow_503_13464"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13464"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter9_d_503_13464"
					x="77.3333"
					y="71.5001"
					width="61.3333"
					height="79"
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
						result="effect1_dropShadow_503_13464"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13464"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter10_d_503_13464"
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
						result="effect1_dropShadow_503_13464"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13464"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter11_d_503_13464"
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
						result="effect1_dropShadow_503_13464"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13464"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter12_d_503_13464"
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
						result="effect1_dropShadow_503_13464"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13464"
						result="shape"
					/>
				</Filter>
				<Filter
					id="filter13_d_503_13464"
					x="132"
					y="123"
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
						result="effect1_dropShadow_503_13464"
					/>
					<FeBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_503_13464"
						result="shape"
					/>
				</Filter>
				<LinearGradient
					id="paint0_linear_503_13464"
					x1="24"
					y1="24"
					x2="24"
					y2="192"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FF7F7D" />
					<Stop offset="1" stopColor="#EC2E4A" />
				</LinearGradient>
				<LinearGradient
					id="paint1_linear_503_13464"
					x1="24"
					y1="57"
					x2="24"
					y2="120"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#F7C71A" />
					<Stop offset="1" stopColor="#FBAA00" />
				</LinearGradient>
				<LinearGradient
					id="paint2_linear_503_13464"
					x1="24"
					y1="57"
					x2="24"
					y2="120"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FFDF6B" />
					<Stop offset="1" stopColor="#F8A60A" />
				</LinearGradient>
				<LinearGradient
					id="paint3_linear_503_13464"
					x1="192"
					y1="57"
					x2="192"
					y2="120"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#F7C71A" />
					<Stop offset="1" stopColor="#FBAA00" />
				</LinearGradient>
				<LinearGradient
					id="paint4_linear_503_13464"
					x1="192"
					y1="57"
					x2="192"
					y2="120"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FFDF6B" />
					<Stop offset="1" stopColor="#F8A60A" />
				</LinearGradient>
				<LinearGradient
					id="paint5_linear_503_13464"
					x1="39"
					y1="126"
					x2="39"
					y2="154.5"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#F7C71A" />
					<Stop offset="1" stopColor="#FBAA00" />
				</LinearGradient>
				<LinearGradient
					id="paint6_linear_503_13464"
					x1="39"
					y1="126"
					x2="39"
					y2="154.5"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FFDF6B" />
					<Stop offset="1" stopColor="#F8A60A" />
				</LinearGradient>
				<LinearGradient
					id="paint7_linear_503_13464"
					x1="177"
					y1="126"
					x2="177"
					y2="154.5"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#F7C71A" />
					<Stop offset="1" stopColor="#FBAA00" />
				</LinearGradient>
				<LinearGradient
					id="paint8_linear_503_13464"
					x1="177"
					y1="126"
					x2="177"
					y2="154.5"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FFDF6B" />
					<Stop offset="1" stopColor="#F8A60A" />
				</LinearGradient>
				<LinearGradient
					id="paint9_linear_503_13464"
					x1="60.1833"
					y1="40.8208"
					x2="60.1833"
					y2="86.8161"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FBCC24" />
					<Stop offset="1" stopColor="#F9B800" />
				</LinearGradient>
				<LinearGradient
					id="paint10_linear_503_13464"
					x1="155.817"
					y1="40.8208"
					x2="155.817"
					y2="86.8161"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FBCC24" />
					<Stop offset="1" stopColor="#F9B800" />
				</LinearGradient>
				<LinearGradient
					id="paint11_linear_503_13464"
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
					id="paint12_linear_503_13464"
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
					id="paint13_linear_503_13464"
					x1="109.41"
					y1="92.3588"
					x2="104.328"
					y2="82.8273"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FFD3D3" />
					<Stop offset="1" stopColor="#FF7E8A" />
				</LinearGradient>
				<LinearGradient
					id="paint14_linear_503_13464"
					x1="99.5151"
					y1="124.328"
					x2="99.5151"
					y2="91.6721"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FF8B89" />
					<Stop offset="1" stopColor="#F34C5D" />
				</LinearGradient>
				<LinearGradient
					id="paint15_linear_503_13464"
					x1="103.481"
					y1="131.864"
					x2="107.58"
					y2="122.732"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FF7F7D" />
					<Stop offset="1" stopColor="#F21248" />
				</LinearGradient>
				<LinearGradient
					id="paint16_linear_503_13464"
					x1="126.667"
					y1="135.5"
					x2="126.667"
					y2="118.312"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FF8B89" />
					<Stop offset="1" stopColor="#F34C5D" />
				</LinearGradient>
				<LinearGradient
					id="paint17_linear_503_13464"
					x1="126.667"
					y1="124.328"
					x2="126.667"
					y2="91.6721"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FF8B89" />
					<Stop offset="1" stopColor="#F34C5D" />
				</LinearGradient>
				<LinearGradient
					id="paint18_linear_503_13464"
					x1="116.766"
					y1="97.4642"
					x2="121.369"
					y2="88.5509"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FF7F7D" />
					<Stop offset="1" stopColor="#F21248" />
				</LinearGradient>
				<LinearGradient
					id="paint19_linear_503_13464"
					x1="116.485"
					y1="123.469"
					x2="116.485"
					y2="92.5312"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FF7F7D" />
					<Stop offset="1" stopColor="#F21248" />
				</LinearGradient>
			</Defs>
		</Svg>
	) : (
		<Svg width="216" height="216" viewBox="0 0 216 216" fill="none" {...rest}>
			<Mask
				id="mask0_503_14655"
				style={{ maskType: "luminance" }}
				maskUnits="userSpaceOnUse"
				x="24"
				y="24"
				width="168"
				height="169"
			>
				<Circle cx="108" cy="108" r="84" fill="white" />
			</Mask>
			<G mask="url(#mask0_503_14655)">
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
				id="mask1_503_14655"
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
			<G mask="url(#mask1_503_14655)">
				<Rect x="96" y="114" width="24" height="96" fill="#A1C7FF" />
			</G>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M127.439 71.0245V43.8211C127.439 43.5577 127.508 43.2991 127.64 43.0711C128.054 42.3536 128.972 42.1078 129.689 42.522L152.067 55.4419C153.459 56.2457 154.317 57.7313 154.317 59.339V76.4058C154.317 77.7489 154.013 79.0747 153.428 80.2839C151.286 84.7128 145.96 86.5668 141.531 84.425L133.368 80.4772C129.742 78.7239 127.439 75.0516 127.439 71.0245ZM56.9999 73.5L41.9999 67.5V64.5L27.5951 58.498C26.1784 57.9077 24.7203 59.2474 25.1887 60.7089L42.2763 114.022C42.5734 114.949 43.3016 115.674 44.2297 115.967L56.9999 120V73.5ZM43.4219 131.289L53.9999 126L59.9999 142.5L42.1579 152.695C40.8641 153.435 39.2837 152.372 39.4806 150.895L41.7898 133.576C41.9212 132.59 42.5325 131.734 43.4219 131.289ZM172.578 131.289L162 126L156 142.5L173.842 152.695C175.136 153.435 176.716 152.372 176.519 150.895L174.21 133.576C174.079 132.59 173.467 131.734 172.578 131.289ZM174 67.5L159 73.5V120L171.77 115.967C172.698 115.674 173.427 114.949 173.724 114.022L190.811 60.7089C191.28 59.2474 189.821 57.9077 188.405 58.498L174 64.5V67.5ZM88.5609 43.8211V71.0245C88.5609 75.0516 86.2577 78.7239 82.6323 80.4772L74.4689 84.425C70.04 86.5668 64.7134 84.7128 62.5716 80.2839C61.9868 79.0747 61.683 77.7489 61.683 76.4058V59.339C61.683 57.7313 62.5407 56.2457 63.933 55.4419L86.3109 42.522C87.0284 42.1078 87.9457 42.3536 88.36 43.0711C88.4916 43.2991 88.5609 43.5577 88.5609 43.8211Z"
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
			<Mask
				id="mask2_503_14655"
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
			<G mask="url(#mask2_503_14655)">
				<Path
					d="M89.3335 91.672L108 80.5001L126.667 91.672V124.328L108 135.5L89.3335 124.328V91.672Z"
					fill="#A1C7FF"
					stroke="white"
					strokeWidth="6"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</G>
		</Svg>
	);
