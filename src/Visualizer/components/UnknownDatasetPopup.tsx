import { markdown } from "../helpers";
import { CloseIcon } from "../components";
import { PopupProps } from "../types";
import databaseNames from "../../config/databases.json";
import { Link } from "react-router-dom";

export function UnknownDatasetPopup(props: PopupProps) {
  return (
    <div
      className="info-popup">
      <div className="info-popup__inner">
        <CloseIcon
          className="info-popup__close-icon"
          onClick={() => { props.onClose() }} />

        <h1 className="info-popup__headline" dangerouslySetInnerHTML={{__html: markdown("Unknown dataset :warning:") }} />

        <div className="info-popup__body">
          <h2>Available datasets</h2>

          <ul>
            {databaseNames.map(databaseName => {
              return (
                <li key={databaseName}>
                  <Link to={`/databases/${databaseName}`}>{databaseName}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
