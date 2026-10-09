import { useState } from "react";

/**
 * groups: [{ title: string, rows: [{ flag, name, sub, fee, match }] }]
 * Only one section is open at a time (classic accordion behaviour).
 */
export default function Accordion({ groups }) {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(index) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <>
      {groups.map((group, index) => (
        <div className={`accordion-item ${openIndex === index ? "open" : ""}`} key={group.title}>
          <button className="accordion-trigger" onClick={() => toggle(index)}>
            {group.title} <span className="chevron">⌄</span>
          </button>
          <div className="accordion-panel">
            {group.rows.map((row) => (
              <div className="doctor-row" key={row.name}>
                <span className="flag">{row.flag}</span>
                <span className="doc-name">{row.name}</span>
                {row.tags.map((tag) => (
                  <span className="doc-spec" key={tag}>
                    {tag}
                  </span>
                ))}
                <span className="doc-fee">{row.fee}</span>
                <span className="doc-match">{row.match}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
