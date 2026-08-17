import AppShell from "../../components/layout/AppShell";
import LogoRiaziNovin from "../../assets/logoRiazinovin.webp";

export default function ComingSoon() {
  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center text-center px-4 py-10 min-h-[70vh]">
        <img
          src={LogoRiaziNovin}
          alt="logo"
          className="w-[160px] h-auto mb-8"
        />

        <h1 className="text-[26px] font-bold text-[#080609] mb-4">
          به‌زودی...
        </h1>

        <p className="text-[15px] text-[#545454]">
          این بخش در حال آماده‌سازی است. لطفاً بعداً دوباره بررسی کنید.
        </p>
      </div>
    </AppShell>
  );
}
