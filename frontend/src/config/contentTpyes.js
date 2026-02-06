import videoSymbol from "../assets/videoSymbol.svg";
import note from "../assets/noteSymbol.svg";
import exam from "../assets/examSymbol.svg";
import game from "../assets/GameSymbol.svg";

import play from "../assets/play.svg";
import juzve from "../assets/juzve.svg";
import baazi from "../assets/baazi.svg";
import emtehan from "../assets/emtehan.svg";

export const CONTENT_TYPES = {
  video: { 
    title: "ویدیوهای تدریس کتاب:",
    sectionIcon: videoSymbol,
    sectionIconSize: 50,  
    itemIcon: play,
    itemIconSize: 24,      
  },

  sample: { 
    title: "ویدیو حل نمونه سوالات فصل به فصل:", 
    sectionIcon: note,
    sectionIconSize: 50,
    itemIcon: juzve,
    itemIconSize: 22,
  },

  exam: { 
    title: "آزمون ها:",
    sectionIcon: exam,
    sectionIconSize: 50,
    itemIcon: emtehan,
    itemIconSize: 22,
  },

  game: { 
    title: "بازی‌ها:", 
    sectionIcon: game,
    sectionIconSize: 50,
    itemIcon: baazi,
    itemIconSize: 26,
  },
};
