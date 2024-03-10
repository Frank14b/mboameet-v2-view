import { EmojiSelected } from "@/app/types";
import { Button } from "@material-tailwind/react";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

export default function EmojiPickerButton({
  children,
  selected,
}: {
  children: React.ReactNode;
  selected: (data: EmojiSelected) => void;
}) {

  const [openPicker, setOpenPicker] = useState<boolean>(false)

  const selectedEmoji = (e: any) => {
    const emoji = e.emoji;
    const emojiUrl = e.imageUrl;

    selected({
      emoji,
      emojiUrl
    })
  };

  return (
    <div className="">
      <Button type="button" size="sm" className="bg-pink-400 text-gray-300" placeholder={""} onClick={() => setOpenPicker(!openPicker)}>Emoji 😂</Button>
      <div className="fixed">
        {openPicker && <EmojiPicker style={{ width: "100%" }} onEmojiClick={selectedEmoji} />}
      </div>
    </div>
  );
}
