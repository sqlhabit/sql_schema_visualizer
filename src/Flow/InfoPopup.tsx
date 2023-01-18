import markdown from "./markdown";

function InfoPopup() {
  return (
    <div
      className="info-popup">
      <div className="info-popup__inner">
        <h2
          className="info-popup__headline"
          dangerouslySetInnerHTML={{__html: markdown("SQL Schema Graph :heart:") }} />

        <div className="info-popup__body">
          <h3 dangerouslySetInnerHTML={{__html: markdown("Hot keys :fire:") }} />

          <p>
            <strong>CMD + P</strong> – print all table positions to console and copy to clipboard. Paste these positions to the <i>TablePositions.ts</i> file.
          </p>

          <p>
            <strong>CMD + hover</strong> – hold the CMD key and hover over table or column names to see descriptions.
          </p>

          <p>
            <strong>CMD + click on edge</strong> – highlight these edges.
          </p>

          <p>
            <strong>Hover over a table node</strong> – highlight all incoming and outgoing edges.
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoPopup;
