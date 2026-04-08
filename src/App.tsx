import { WallCalendar } from './components/WallCalendar';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  return (
    <div className="app-main">
      <ThemeToggle />
      <WallCalendar />
    </div>
  );
}

export default App;
