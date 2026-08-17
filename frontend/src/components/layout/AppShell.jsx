import HeaderDash from "../section/HeaderDash";
import BottomMenu from "../common/BottomMenu";
import Sidebar from "../common/Sidebar";

/**
 * پوسته‌ی مشترک همه‌ی صفحات داخلی.
 *
 * موبایل/تبلت (زیر md): همون چیدمان کارتی که بود — هدر بالا، محتوا،
 * منوی پایین.
 *
 * دسکتاپ (md به بالا): دیگه شبیه‌سازی موبایل نیست. یه سایدبار ثابت
 * کنار صفحه میاد (به‌جای منوی پایین)، و محتوا به‌جای اینکه تو یه
 * ستون ۴۱۲px باریک گیر بیفته، تا عرض معقولی (۱۱۰۰px) پهن می‌شه.
 */
export default function AppShell({
  children,
  showHeader = true,
  showBottomMenu = true,
}) {
  return (
    <div className="min-h-dvh bg-[#FEF9FE] font-[byekan]">
      <div className="md:flex md:min-h-dvh" dir="rtl">
        {showBottomMenu && (
          <div className="hidden md:block md:w-[240px] md:flex-shrink-0">
            <div className="md:fixed md:h-dvh md:w-[240px] bg-[#FEF9FE]">
              <Sidebar />
            </div>
          </div>
        )}

        <div className="md:flex-1 md:min-w-0">
          {showHeader && (
            <div className="md:hidden h-[70px] sticky top-0 z-10 bg-[#FEF9FE]">
              <HeaderDash />
            </div>
          )}

          <div
            className="mx-auto w-full max-w-[412px] md:max-w-[1100px] md:px-10 md:py-8"
            style={{
              paddingBottom: showBottomMenu ? "90px" : "0",
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {showBottomMenu && (
        <div
          className="md:hidden fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[412px] bg-[#FEF9FE] h-[90px] z-30"
          style={{ borderTop: "0.5px solid #0000001a" }}
        >
          <BottomMenu />
        </div>
      )}
    </div>
  );
}
