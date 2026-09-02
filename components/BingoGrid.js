import { cn } from "@/lib/utils";

export default function BingoGrid({
  title,
  items,
  size,
  theme,
  selectedCellId,
  onSelectCell,
  compact = false,
  interactive = true,
  preview = false,
  cardMode = "text"
}) {
  const CellTag = interactive ? "button" : "div";
  const titleSize = preview ? "text-lg md:text-xl" : "text-2xl md:text-3xl";
  const headerPadding = preview ? "px-3 py-3 md:px-4 md:py-4" : "px-4 py-5";
  const gridGap = preview ? "gap-1.5 md:gap-2" : "gap-2 md:gap-3";
  const textClass = preview
    ? "line-clamp-3 text-[11px] leading-[1.2] md:text-xs"
    : compact
      ? "line-clamp-4 text-[11px] md:text-xs"
      : "line-clamp-4 text-sm md:text-[15px]";
  const cellMinHeight = preview ? "min-h-[86px] md:min-h-[96px]" : "min-h-[112px] md:min-h-[132px]";
  const imageHeight = preview ? "h-11 md:h-14" : "h-16 md:h-20";

  return (
    <div
      className="w-full rounded-[28px] border border-black/5 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] md:p-4"
      style={{
        backgroundColor: theme.boardBg,
        backgroundImage: theme.boardGradient || undefined
      }}
    >
      <div
        className={cn(
          "mb-3 flex items-center justify-center rounded-[22px] text-center md:mb-4",
          headerPadding,
          preview ? "min-h-16" : "min-h-20"
        )}
        style={{ backgroundColor: theme.headerBg, color: "#ffffff" }}
      >
        <div>
          <p className={cn("font-semibold uppercase opacity-80", preview ? "text-[10px] tracking-[0.24em]" : "text-xs tracking-[0.3em]")}>
            Custom bingo card
          </p>
          <h2 className={cn("mt-2 text-balance font-semibold tracking-tight", titleSize)}>{title}</h2>
        </div>
      </div>

      <div
        className={cn("grid", gridGap)}
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`
        }}
      >
        {items.map((item, index) => (
          <CellTag
            key={item.id}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => onSelectCell?.(item.id) : undefined}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-[18px] border border-black/5 text-left transition duration-200",
              cellMinHeight,
              interactive && "hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selectedCellId === item.id && interactive && "ring-2 ring-ring"
            )}
            style={{
              background: item.imageUrl && cardMode !== "text"
                ? `linear-gradient(180deg, rgba(15,23,42,0.12), rgba(15,23,42,0.64)), url(${item.imageUrl}) center/cover`
                : theme.cellGradient || "#ffffff"
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-1.5"
              style={{ backgroundColor: theme.cellAccent }}
              aria-hidden="true"
            />

            {item.badge ? (
              <span className={cn(
                "absolute right-2.5 top-2.5 z-10 rounded-full bg-black/5 font-semibold uppercase tracking-[0.2em] text-muted-foreground",
                preview ? "px-2 py-0.5 text-[9px]" : "px-2.5 py-1 text-[10px]"
              )}>
                {item.badge}
              </span>
            ) : null}

            <div className={cn("flex flex-1 flex-col", preview ? "p-2.5 pt-3" : "p-3 pt-4 md:p-4 md:pt-5")}>
              {item.imageUrl && cardMode === "image-plus-text" && !preview ? (
                <div className="mb-2 h-1" />
              ) : null}
              <p
                className={cn(
                  "mt-auto text-balance font-medium leading-snug",
                  textClass,
                  cardMode === "image" && "sr-only"
                )}
                style={{ color: item.imageUrl && cardMode !== "text" ? "#ffffff" : theme.textColor }}
              >
                {item.text}
              </p>
            </div>

            <span className={cn(
              "pointer-events-none absolute bottom-2 right-3 font-semibold text-muted-foreground/80",
              preview ? "text-[9px]" : "text-[11px]"
            )}>
              {index + 1}
            </span>
          </CellTag>
        ))}
      </div>
    </div>
  );
}
