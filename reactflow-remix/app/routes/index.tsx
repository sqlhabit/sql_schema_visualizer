import Flow from '~/components/Flow';

// this is important! You need to import the styles from the lib to make it work
import reactFlowStyles from 'reactflow/dist/style.css';
import styles from '~/styles/flow.css';

export default function Index() {
  return (
    <div className="app">
      <header className="app-header">React Flow - Remix Example</header>
      <Flow />
    </div>
  );
}

export function links() {
  return [
    { rel: 'stylesheet', href: reactFlowStyles },
    { rel: 'stylesheet', href: styles },
  ];
}
