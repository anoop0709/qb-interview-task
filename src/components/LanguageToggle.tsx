import "./LanguageToggle.css";

export type UILanguage = "en" | "cy";

interface LanguageToggleProps {
	selected: UILanguage;
	onChange: (lang: UILanguage) => void;
}

export const LanguageToggle = ({ selected, onChange }: LanguageToggleProps) => {
	return (
		<div className="language-toggle" role="radiogroup" aria-label="Language">
			<button
				className={`lang-option ${selected === "en" ? "active" : ""}`}
				onClick={() => onChange("en")}
				role="radio"
				aria-checked={selected === "en"}
			>
				English
			</button>
			<button
				className={`lang-option ${selected === "cy" ? "active" : ""}`}
				onClick={() => onChange("cy")}
				role="radio"
				aria-checked={selected === "cy"}
			>
				Cymraeg
			</button>
		</div>
	);
};
