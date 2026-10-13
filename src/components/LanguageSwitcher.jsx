import { ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const items = [
    { label: "English", value: "en" },
    { label: "العربية", value: "ar" },
    { label: "Deutsch", value: "de" },
  ];

  return (
    <Select items={items}>
      <SelectTrigger className="w-45">
        <SelectValue
          onChange={handleLanguageChange}
          value={i18n.language}
          placeholder="Select Languge"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items?.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
  // <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 transition-colors hover:bg-accent">
  //   <Globe className="h-5 w-5 shrink-0 text-primary" />

  //   <select
  //     onChange={handleLanguageChange}
  //     value={i18n.language}
  //     aria-label="Select application language"
  //     className="w-full cursor-pointer appearance-none bg-transparent text-sm font-medium text-foreground outline-none"
  //   >
  //     <option value="en">English</option>
  //     <option value="ur">اردو</option>
  //     <option value="ar">العربية</option>
  //     <option value="hi">हिन्दी</option>
  //   </select>

  //   <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground pointer-events-none" />
  // </div>
}
