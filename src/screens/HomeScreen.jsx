import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function HomeScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const token = Cookies.get("accesstoken");

  useEffect(() => {
    if (!token) {
      navigate("/auth/login", { replace: true });
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-blue-900">
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-6xl font-bold text-white">{t("common.home")}</h1>
        <p className="text-xl text-white font-semibold mt-4">
          {t("common.homeNotice")}
        </p>
      </div>
    </div>
  );
}

export default HomeScreen;
