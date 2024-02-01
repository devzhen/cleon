import { useState } from "react";
import { v4 as uuid } from "uuid";

import { stickers as stickersArray } from "@/app//data";
import { DEFAULT_COORDS } from "@/app/constants";

const useSticker = () => {
  const [stickers, setStickers] = useState(stickersArray);

  /**
   * Add sticker
   */
  const addSticker = () => {
    const sticker = {
      id: uuid(),
      top: DEFAULT_COORDS.top,
      left: DEFAULT_COORDS.left,
      createdAt: new Date().toISOString(),
      text: "",
    };

    setStickers((prev) => [...prev, sticker]);
  };

  return {
    stickers,
    addSticker,
  }
}

export default useSticker