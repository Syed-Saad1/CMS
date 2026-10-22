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
  const { i18n, t } = useTranslation();
  const items = [
    { value: "en", label: t("common.english") },
    { value: "de", label: t("common.german") },
    { value: "ar", label: t("common.arabic") },
  ];
  return (
    <Select
      value={i18n.resolvedLanguage || i18n.language}
      onValueChange={(language) => i18n.changeLanguage(language)}
    >
      <SelectTrigger className="w-16 md:w-20">
        <SelectValue placeholder={t("common.language")} />
      </SelectTrigger>
      <SelectContent className="w-18! min-w-22 md:w-20 md:min-w-16">
        <SelectGroup className="w-18! min-w-22 md:w-30">
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
