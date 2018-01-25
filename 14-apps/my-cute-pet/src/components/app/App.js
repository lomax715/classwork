import Template from '../Template';
import html from './app.html';
import './app.css';
import Header from './Header';
import Pets from '../pets/Pets.js';
// import Home from '../home/Home.js';

const template = new Template(html);

const map = new Map();
map.set('#pets', Pets);

export default class App {

  constructor() {
    this.hashChange = () => this.setPage();
    window.addEventListener('hashchange', this.hashChange);
  }

  setPage() {
    const routes = window.location.hash.split('/');
    const page = routes[0];
    if(page === this.page) return;

    if(this.pageComponent) this.pageComponent.unrender();
    this.page = page;
    const Component = map.get(this.page) || Pets;
    this.pageComponent = new Component();
    this.main.appendChild(this.pageComponent.render());
  }

  render() {
    const dom = template.clone();

    dom.querySelector('header').appendChild(new Header().render());
    this.main = dom.querySelector('main');
    this.setPage();

    return dom;
  }

  unrender() {
    window.removeEventListener('hashchange', this.hashChange);
  }
}
