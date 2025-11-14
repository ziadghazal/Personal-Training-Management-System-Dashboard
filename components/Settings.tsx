import React from 'react';
import { SunIcon, MoonIcon } from './icons';

interface SettingsProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  t: (key: string) => string;
}

const Settings: React.FC<SettingsProps> = ({ theme, setTheme, t }) => {
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-6">{t('settings_title')}</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-2">{t('appearance')}</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">{t('choose_theme')}</p>
        
        <div>
          <h3 className="text-lg font-medium mb-4">{t('theme')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Light Theme Option */}
            <div 
              onClick={() => setTheme('light')} 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${theme === 'light' ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200 dark:border-gray-700'}`}
            >
              <div className="flex items-center">
                <SunIcon className="w-6 h-6 me-3 text-yellow-500" />
                <span className="font-semibold text-lg">{t('light')}</span>
              </div>
            </div>
            
            {/* Dark Theme Option */}
            <div 
              onClick={() => setTheme('dark')} 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${theme === 'dark' ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200 dark:border-gray-700'}`}
            >
              <div className="flex items-center">
                <MoonIcon className="w-6 h-6 me-3 text-purple-400" />
                <span className="font-semibold text-lg">{t('dark')}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;