import Layout from './Layout';
import Trello from './Trello';

const layout = new Layout();
const trello = new Trello(layout);

trello.init();
