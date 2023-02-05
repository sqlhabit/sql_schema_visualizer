import { markdown } from "../helpers";
import { CloseIcon } from "../components";
import { PopupProps } from "../types";
import databases from "../../config/databases";

export function DatabaseMenuPopup(props: PopupProps) {
  return (
    <div
      className="info-popup">
      <div className="info-popup__inner">
        <CloseIcon
          className="info-popup__close-icon"
          onClick={() => { props.onClose() }} />

        <h1 className="info-popup__headline" dangerouslySetInnerHTML={{__html: markdown("Choose database :point_down:") }} />

        <div className="info-popup__body">
          <ul>
            {Object.keys(databases).map(databaseName => {
              return (
                <li key={databaseName}>
                  <a href={`/databases/${databaseName}`}>{databases[databaseName].name}</a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
