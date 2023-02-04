import { markdown } from "../helpers";
import { CloseIcon } from "../components";
import { PopupProps } from "../types";

export function InfoPopup(props: PopupProps) {
  return (
    <div
      className="info-popup">
      <div className="info-popup__inner">
        <CloseIcon
          className="info-popup__close-icon"
          onClick={() => { props.onClose() }} />

        <h1
          className="info-popup__headline">
          SQL Schema Visualizer
        </h1>

        <div className="info-popup__body">
          <p dangerouslySetInnerHTML={{__html: markdown("Hey :wave: The SQL Schema Visualiser is an open source project, it is built with [React Flow](https://reactflow.dev/). I bet in 20 minutes you can visualize your own schema! :boom: Check out [the README file on Github](https://github.com/sqlhabit/sql_schema_visualisation#readme) for instructions how to do it.") }} />

          <p dangerouslySetInnerHTML={{__html: markdown("The schema you're looking at belongs to a fictional startup called Bindle and featured in [the SQL Habit course](https://www.sqlhabit.com).") }} />

          <h2>Shortcuts</h2>

          <p>
            <strong>CMD + hover</strong> over a table node or a column name to see the description.
          </p>

          <p>
            <strong>CMD + click on an edge</strong> to select and highlight it.
          </p>

          <p>
            <strong>CTRL + P</strong> shortcut prints all table node positions to the console and copies them to the clipboard. You can then paste these positions to the <a target="_blank" rel="noreferrer" href="https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/config/tablePositions.json"><i>TablePositions.json</i></a> file.
          </p>

          <p className="mb-32">
            <strong>Hover over a table node</strong> to highlight all incoming and outgoing edges.
          </p>

          <p dangerouslySetInnerHTML={{__html: markdown("Made with :heart: by [Anatoli Makarevich](https://twitter.com/makaroni4).") }} />
        </div>
      </div>
    </div>
  );
};
