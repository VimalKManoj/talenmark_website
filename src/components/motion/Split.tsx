import { Fragment } from "react";

/**
 * Splits text into masked characters for rising-letter entrances.
 * The outer element keeps the real text for screen readers.
 */
export function Chars({
  text,
  className,
  charClassName = "char",
}: {
  text: string;
  className?: string;
  charClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text} role="text">
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="mask whitespace-nowrap" aria-hidden="true">
            {Array.from(word).map((ch, ci) => (
              <span key={ci} className={`${charClassName} inline-block will-change-transform`}>
                {ch}
              </span>
            ))}
          </span>
          {wi < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}

/** Splits text into masked words (used for line-ish reveals of short headings). */
export function Words({
  text,
  className,
  wordClassName = "word",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text} role="text">
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="mask" aria-hidden="true">
            <span className={`${wordClassName} inline-block will-change-transform`}>{word}</span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}
