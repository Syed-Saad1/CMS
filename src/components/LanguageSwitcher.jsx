import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CardTitle } from "./ui/card";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const items = [
    {
      icon: <img src="/united-states-of-america.png" alt="USOF" />,
      value: "en",
      label: t("common.english"),
    },
    {
      icon: <img src="/flag.png" alt="GEF" />,
      value: "de",
      label: t("common.german"),
    },
    {
      icon: <img src="/saudi-arabia.png" alt="SAF" />,
      value: "ar",
      label: t("common.arabic"),
    },
  ];
  return (
    <Select
      value={i18n.resolvedLanguage || i18n.language}
      onValueChange={(language) => i18n.changeLanguage(language)}
    >
      <SelectTrigger className="w-24 md:w-20">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-5 shrink-0 items-center justify-center">
            {
              items.find(
                (item) =>
                  item.value === (i18n.resolvedLanguage || i18n.language),
              )?.icon
            }
          </span>

          <SelectValue placeholder={t("common.language")} />
        </div>
      </SelectTrigger>
      <SelectContent className="w-32! min-w-22 md:w-20 md:min-w-16">
        <SelectGroup className="w-34! min-w-22 md:w-30">
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <div className="size-5"> {item?.icon}</div>
              <CardTitle>{item.label}</CardTitle>{" "}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
