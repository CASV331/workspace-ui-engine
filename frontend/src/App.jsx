import Sidebar from './components/layout/sidebar/Sidebar.jsx';
import Preview from './components/preview/Desktop.jsx';
import { ConfigProvider } from './contexts/ConfigContext.jsx';
import { PlayerProvider } from './contexts/PlayerContext.jsx';
import './index.css';

function App() {
  return (
    <ConfigProvider>
      <PlayerProvider>
      <div className='flex flex-col items-center justify-end gap-6 lg:gap-4 p-4 bg-gray-900 h-screen text-white lg:flex-row lg:items-start'>
        <Sidebar />
        <Preview />
      </div>
      </PlayerProvider>
    </ConfigProvider>
  )
}

export default App
