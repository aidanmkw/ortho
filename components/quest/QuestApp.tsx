"use client";

import { useEffect, useMemo, useState } from "react";
import {
  loadProgress,
  saveProgress,
  emptyProgress,
  createHero,
  rankForLevel,
  clearProgress,
} from "@/lib/quest/save";
import { CHAPTERS, getChapter } from "@/lib/quest/chapters";
import { getItem } from "@/lib/quest/items";
import { getPatron } from "@/lib/quest/patrons";
import { sfx, getMuted, setMuted } from "@/lib/quest/sfx";
import type { QuestProgress, HeroState } from "@/lib/quest/types";
import TitleScreen from "./TitleScreen";
import CharacterCreate from "./CharacterCreate";
import DialogScene from "./DialogScene";
import BattleScene from "./BattleScene";
import { PixelFrame, PixelButton, ScanlineOverlay } from "./PixelUI";
import PixelSprite from "./PixelSprite";
import { ALL_SPRITES, spriteAnthony } from "@/lib/quest/sprites";

type Scene =
  | "title"
  | "create"
  | "chapter-card"
  | "intro"
  | "battle"
  | "outro"
  | "reward"
  | "finale"
  | "credits";

export default function QuestApp() {
  const [progress, setProgress] = useState<QuestProgress>(emptyProgress());
  const [scene, setScene] = useState<Scene>("title");
  const [muted, setMutedState] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setMutedState(getMuted());
    setHydrated(true);
  }, []);

  function persist(p: QuestProgress) {
    setProgress(p);
    saveProgress(p);
  }

  function startNew() {
    setScene("create");
  }

  function continueGame() {
    if (!progress.hero) {
      setScene("create");
      return;
    }
    setScene("chapter-card");
  }

  function onCreate(name: string, patronId: string, hairColor: string) {
    const hero = createHero(name, patronId);
    // Apply patron passive bonuses
    const patron = getPatron(patronId);
    if (patron?.passive.maxHpBonus) {
      hero.maxHp += patron.passive.maxHpBonus;
      hero.hp = hero.maxHp;
    }
    if (patron?.passive.maxFaithBonus) {
      hero.maxFaith += patron.passive.maxFaithBonus;
      hero.faith = hero.maxFaith;
    }
    const fresh: QuestProgress = {
      ...emptyProgress(),
      hero,
      chapterIndex: 0,
      chaptersBeaten: [],
      startedAt: Date.now(),
      hairColor,
    };
    persist(fresh);
    setScene("chapter-card");
  }

  const chapter = useMemo(
    () => getChapter(progress.chapterIndex),
    [progress.chapterIndex]
  );

  function startChapter() {
    sfx.ding();
    setScene("intro");
  }

  function onIntroComplete() {
    setScene("battle");
  }

  function onBattleResult(
    result: "victory" | "defeat",
    finalHero: HeroState
  ) {
    if (!chapter) return;
    if (result === "victory") {
      // Apply reward
      const newHero = { ...finalHero };
      newHero.level += chapter.reward.xp;
      newHero.xp += chapter.reward.xp;
      newHero.rank = rankForLevel(newHero.level);
      if (chapter.reward.item) {
        const item = getItem(chapter.reward.item);
        if (item && !newHero.items.includes(item.id)) {
          newHero.items.push(item.id);
          if (item.maxHpBonus) newHero.maxHp += item.maxHpBonus;
          if (item.maxFaithBonus) newHero.maxFaith += item.maxFaithBonus;
        }
      }
      if (chapter.reward.healHp) {
        newHero.hp = newHero.maxHp;
        newHero.faith = newHero.maxFaith;
      }
      const updated: QuestProgress = {
        ...progress,
        hero: newHero,
        chaptersBeaten: [...progress.chaptersBeaten, chapter.id],
        totalBattlesWon: progress.totalBattlesWon + 1,
      };
      persist(updated);
      sfx.levelUp();
      setScene("outro");
    } else {
      // Reset HP, retry battle
      const newHero = { ...finalHero, hp: finalHero.maxHp };
      persist({
        ...progress,
        hero: newHero,
        totalBattlesLost: progress.totalBattlesLost + 1,
      });
      setScene("intro");
    }
  }

  function onOutroComplete() {
    setScene("reward");
  }

  function onRewardClose() {
    if (!chapter) return;
    const nextIdx = progress.chapterIndex + 1;
    if (nextIdx >= CHAPTERS.length) {
      setScene("finale");
    } else {
      persist({ ...progress, chapterIndex: nextIdx });
      setScene("chapter-card");
    }
  }

  function backToTitle() {
    setScene("title");
  }

  function toggleMute() {
    const m = !muted;
    setMutedState(m);
    setMuted(m);
  }

  function resetGame() {
    if (
      confirm(
        "Reset your quest progress? Your study mode XP will not be affected."
      )
    ) {
      clearProgress();
      setProgress(emptyProgress());
      setScene("title");
    }
  }

  if (!hydrated) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="font-pixel text-gold text-[10px] animate-pulse">
          LOADING...
        </div>
      </div>
    );
  }

  return (
    <div className="font-pixel fixed inset-0 z-[100] bg-black overflow-y-auto">
      <ScanlineOverlay />

      {/* Mute toggle */}
      {scene !== "title" && (
        <button
          onClick={toggleMute}
          className="fixed top-2 right-2 z-[60] font-pixel text-[10px] bg-black/70 border-2 border-gold/40 text-gold px-2 py-1"
          aria-label="Toggle sound"
        >
          {muted ? "🔇" : "🔊"}
        </button>
      )}
      {scene !== "title" && scene !== "create" && (
        <button
          onClick={resetGame}
          className="fixed top-2 left-2 z-[60] font-pixel text-[10px] bg-black/70 border-2 border-crimson/40 text-crimson px-2 py-1"
          aria-label="Reset quest"
          title="Reset Quest"
        >
          ⟲
        </button>
      )}

      {scene === "title" && (
        <TitleScreen
          hasSave={progress.hero !== null}
          onNew={startNew}
          onContinue={continueGame}
        />
      )}

      {scene === "create" && (
        <CharacterCreate onCreate={onCreate} onBack={backToTitle} />
      )}

      {scene === "chapter-card" && chapter && progress.hero && (
        <ChapterCard
          chapter={chapter}
          hero={progress.hero}
          onContinue={startChapter}
        />
      )}

      {scene === "intro" && chapter && progress.hero && (
        <DialogScene
          lines={chapter.intro}
          background={chapter.background}
          playerName={progress.hero.name}
          hairColor={progress.hairColor}
          onComplete={onIntroComplete}
        />
      )}

      {scene === "battle" && chapter && progress.hero && (
        <BattleScene
          boss={chapter.boss}
          bossSpriteId={chapter.boss.sprite}
          background={chapter.background}
          hero={progress.hero}
          hairColor={progress.hairColor}
          onResult={onBattleResult}
        />
      )}

      {scene === "outro" && chapter && progress.hero && (
        <DialogScene
          lines={chapter.outro}
          background={chapter.background}
          playerName={progress.hero.name}
          hairColor={progress.hairColor}
          onComplete={onOutroComplete}
        />
      )}

      {scene === "reward" && chapter && progress.hero && (
        <RewardScreen
          chapter={chapter}
          hero={progress.hero}
          onClose={onRewardClose}
        />
      )}

      {scene === "finale" && progress.hero && (
        <FinaleScreen hero={progress.hero} onClose={backToTitle} />
      )}
    </div>
  );
}

function ChapterCard({
  chapter,
  hero,
  onContinue,
}: {
  chapter: ReturnType<typeof getChapter> & {};
  hero: HeroState;
  onContinue: () => void;
}) {
  return (
    <div
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4"
      style={{
        background:
          "radial-gradient(ellipse at center, #1a1408 0%, #0c0a08 100%)",
      }}
    >
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="font-pixel text-gold/60 text-[10px] uppercase tracking-[0.4em]">
            Chapter {chapter.number}
          </div>
          <div className="font-pixel text-parchment/50 text-[9px] uppercase tracking-widest mt-1">
            {chapter.era}
          </div>
        </div>

        <PixelFrame className="p-5 mb-4">
          <h2 className="font-pixel text-gold text-[14px] sm:text-[16px] text-center mb-2 leading-tight">
            {chapter.title}
          </h2>
          <div className="font-pixel text-parchment/70 text-[10px] italic text-center">
            {chapter.location}
          </div>
          {chapter.ally && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <PixelSprite
                sprite={ALL_SPRITES[chapter.ally] ?? spriteAnthony}
                scale={5}
                idle
              />
              <div className="font-pixel text-[9px] text-gold/80">
                ALLY: <span className="text-parchment">{chapter.ally.replace("st-", "St. ").replace(/-/g, " ")}</span>
              </div>
            </div>
          )}
        </PixelFrame>

        <PixelFrame variant="default" className="p-3 mb-4">
          <div className="font-pixel text-[9px] uppercase tracking-widest text-gold/70 mb-2">
            Status
          </div>
          <div className="font-pixel text-parchment text-[10px] space-y-1">
            <div>
              {hero.name} — <span className="text-gold">{hero.rank}</span>{" "}
              <span className="text-parchment/60">(Lv. {hero.level})</span>
            </div>
            <div className="text-parchment/70">
              HP {hero.hp}/{hero.maxHp} · Faith {hero.faith}/{hero.maxFaith}
            </div>
            {hero.items.length > 0 && (
              <div className="text-parchment/70">
                Items: {hero.items.map((id) => getItem(id)?.name).join(" · ")}
              </div>
            )}
          </div>
        </PixelFrame>

        <PixelButton variant="primary" onClick={onContinue} className="w-full">
          Begin Chapter ▶
        </PixelButton>
      </div>
    </div>
  );
}

function RewardScreen({
  chapter,
  hero,
  onClose,
}: {
  chapter: ReturnType<typeof getChapter> & {};
  hero: HeroState;
  onClose: () => void;
}) {
  const item = chapter.reward.item ? getItem(chapter.reward.item) : null;
  return (
    <div
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4"
      style={{
        background:
          "radial-gradient(ellipse at center, #28201a 0%, #100c08 100%)",
      }}
    >
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-gold text-5xl mb-2">✦</div>
          <h2 className="font-pixel text-gold text-[16px] tracking-widest">
            CHAPTER COMPLETE
          </h2>
        </div>

        <PixelFrame variant="good" className="p-4 mb-4">
          <div className="font-pixel text-[10px] uppercase tracking-widest text-gold/70 mb-2">
            Rewards
          </div>
          <div className="font-pixel text-parchment text-[11px] space-y-2">
            <div>
              <span className="text-gold">+{chapter.reward.xp} XP</span>{" "}
              <span className="text-parchment/60">→ Level {hero.level} · {hero.rank}</span>
            </div>
            {chapter.reward.healHp && (
              <div className="text-gold/80">Full HP & Faith restored.</div>
            )}
            {item && (
              <div className="mt-3 p-2 border-l-2 border-gold">
                <div className="text-gold">★ {item.name}</div>
                <div className="text-parchment/80 text-[10px] italic mt-1">
                  {item.flavor}
                </div>
                <div className="text-parchment/60 text-[9px] mt-1">
                  Effect: {item.effect}
                </div>
              </div>
            )}
          </div>
        </PixelFrame>

        <PixelButton onClick={onClose} variant="primary" className="w-full">
          Onward ▶
        </PixelButton>
      </div>
    </div>
  );
}

function FinaleScreen({
  hero,
  onClose,
}: {
  hero: HeroState;
  onClose: () => void;
}) {
  return (
    <div
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4"
      style={{
        background:
          "radial-gradient(ellipse at center, #c9a227 0%, #5a4810 30%, #1a1408 70%, #0c0a08 100%)",
      }}
    >
      <div className="max-w-md w-full text-center">
        <div className="text-gold text-7xl mb-4">☦</div>
        <h2 className="font-pixel text-gold text-[18px] sm:text-[24px] tracking-widest mb-2">
          APOLOGIST
        </h2>
        <p className="font-pixel text-parchment/80 text-[11px] mb-6 leading-relaxed">
          {hero.name}, you have walked from Antioch to the present day. You have answered the centurions and the Reformers, the iconoclasts and the Soviet captains, your own doubts and the doubts of others.
        </p>

        <PixelFrame variant="good" className="p-4 mb-6 text-left">
          <div className="font-pixel text-gold text-[10px] uppercase tracking-widest mb-2">
            Final Standing
          </div>
          <div className="font-pixel text-parchment text-[10px] space-y-1">
            <div>Name: <span className="text-gold">{hero.name}</span></div>
            <div>Rank: <span className="text-gold">{hero.rank}</span> · Level {hero.level}</div>
            <div>HP: {hero.maxHp} · Faith: {hero.maxFaith}</div>
            <div>Patron: {getPatron(hero.patronId)?.name}</div>
            <div className="mt-2 text-parchment/70 text-[9px]">Items earned: {hero.items.length}</div>
          </div>
        </PixelFrame>

        <p className="font-pixel text-parchment/80 text-[10px] italic mb-6 leading-relaxed">
          “Δόξα τῷ Θεῷ πάντων ἕνεκεν.”
          <br />
          Glory to God for all things.
        </p>

        <PixelButton onClick={onClose} variant="primary" className="w-full">
          Return to Title
        </PixelButton>
      </div>
    </div>
  );
}
