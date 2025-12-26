import { CONTENT_TYPES } from "../../config/contentTpyes";
export default function HorizontalSection({ type, items = [] }) {
  const content = CONTENT_TYPES[type];
  if (!content) {
    // avoid runtime errors when an invalid/undefined type is passed
    // silently render nothing and warn in dev
    if (process && process.env && process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("HorizontalSection: unknown content type:", type);
    }
    return null;
  }
  return (
    <div
      style={{
        width: "103%",
        height: "220px",
        background: "#E5A6E6",
        borderRadius: "16px",
        boxShadow: "0px 8px 4px 0px #E5A6E640",
        opacity: 1,
        transform: "rotate(0deg)",
        margin: "20px auto",
        padding: "5px",
        overflow: "hidden",
        direction: "rtl",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/* عنوان + آیکون */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "5px",
        }}
      >
        <img 
          src={content.sectionIcon} 
          alt="icon" 
          style={{ width: content.sectionIconSize, height: content.sectionIconSize, }}
        />

        <h3
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            color: "#080609",
            direction: "rtl",
          }}
        >
          {content.title}
        </h3>
      </div>

      {/* اسکرول افقی */}
      <div style={{ borderRadius: "12px", overflow: "hidden", width: "100%" }}>
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "16px",
            paddingBottom: "65px", 
            paddingLeft: "12px", 
            paddingRight: "12px",
            scrollBehavior: "smooth",
            width: "100%",
            boxSizing: "border-box",
            minWidth: 0,
            WebkitOverflowScrolling: "touch",
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
              width: "202px",
              height: "140px",
              borderRadius: "8px",
              background: "#FFFFFF",
              flex: "0 0 auto",
              boxSizing: "border-box",
              padding: "12px",
              position: "relative",
              cursor: "pointer",
            }}
          >
          {/* کاور */}
          <div
           style={{
             width: "186px",
             height: "97px",
             borderRadius: "8px",
             background: item.thumbnail ? "transparent" : "#D9D9D9",
             overflow: "hidden",
             position: "absolute",
             top: "10px",
             left: "7px",
           }}
          >
         {/* تصویر کاور */}
          {item.thumbnail && (
             <img
              src={item.thumbnail}
              alt={item.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}

        {/* آیکون وسط کاور */}
        {content.itemIcon && (
            <img
          src={content.itemIcon}
          alt="content-icon"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: content.itemIconSize,
            height: content.itemIconSize,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      )}
    </div>

    {/* عنوان آیتم */}
    <p
      style={{ 
        position: "absolute", 
        bottom: "8px", 
        right: "50%", 
        transform: "translateX(50%)", 
        width: "186px", 
        textAlign: "center",  
        fontSize: "12px",
        fontWeight: "500",
        margin: 0, 
        whiteSpace: "nowrap", 
        overflow: "hidden", 
        textOverflow: "ellipsis",
       }}
    >
          {item.title}
          </p>
      </div>
    ))}


        </div>
      </div>
    </div>
  );
}
