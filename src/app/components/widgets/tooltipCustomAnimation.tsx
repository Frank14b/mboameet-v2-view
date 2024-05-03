import { Tooltip } from "@material-tailwind/react";
import { content, interactive, placement } from "@material-tailwind/react/types/components/popover";

export default function TooltipCustomAnimation({
  children,
  content,
  placement,
  interactive
}: {
  children: React.ReactNode;
  content: content;
  placement?: placement;
  interactive?: interactive;
}) {
  return (
    <Tooltip
      content={content}
      placement={placement}
      interactive={interactive}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      {children}
    </Tooltip>
  );
}
