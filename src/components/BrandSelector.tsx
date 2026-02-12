import { Brand } from "../types/question";
import "./BrandSelector.css";

interface BrandSelectorProps {
	selectedBrand: Brand;
	onBrandChange: (brand: Brand) => void;
}

export const BrandSelector = ({ selectedBrand, onBrandChange }: BrandSelectorProps) => {
	return (
		<div className="brand-selector">
			<button
				className={`brand-button ${selectedBrand === "wjec" ? "active" : ""}`}
				onClick={() => onBrandChange("wjec")}
			>
				<span className="brand-logo">WJEC</span>
				<span className="brand-desc">Welsh/English</span>
			</button>
			<button
				className={`brand-button ${selectedBrand === "eduqas" ? "active" : ""}`}
				onClick={() => onBrandChange("eduqas")}
			>
				<span className="brand-logo">Eduqas</span>
				<span className="brand-desc">English only</span>
			</button>
		</div>
	);
};
