import React, { createContext, useState, useEffect, useContext} from 'react';

interface Props {
    children: React.ReactElement;
}

type ActualThemes = 'light' | 'dark';
type AvailableThemes = ActualThemes & 'light' | 'dark' | 'system';


interface ThemeContextProps {
  theme: AvailableThemes;
  actualTheme: ActualThemes;
  themes: AvailableThemes[];
  setTheme: (theme: AvailableThemes) => void;
}


export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'system',
  actualTheme: 'light',
  themes: ['light', 'dark', 'system'],
  setTheme: () => {}
});

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  
  useEffect(() => {
    document.body.classList.value = "";
    document.body.classList.add(`theme-${context.actualTheme}`);
  }, [context.actualTheme]);

  return context;
}

const getLocalTheme = (themes: AvailableThemes[]): AvailableThemes => {
  const savedTheme = localStorage.getItem('theme') as AvailableThemes;
  if (themes.includes(savedTheme)) {
    return savedTheme;
  }
  return 'system';
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const themes: AvailableThemes[] = ['light', 'dark', 'system'];
  const [theme, setTheme] = useState<AvailableThemes>(getLocalTheme(themes));
  const [currentSystemTheme, setCurrentSystemTheme] = useState<ActualThemes>('light');

  useEffect(() => {
    setCurrentSystemTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setCurrentSystemTheme(e.matches ? 'dark' : 'light');
    };
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);
  
  const actualTheme = theme === 'system' ? currentSystemTheme : theme;
  const setLocalTheme = (localTheme: AvailableThemes) => {
    localStorage.setItem('theme', localTheme);
    setTheme(localTheme);
  };
  console.log('Theme provider: ', actualTheme );

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, themes, setTheme: setLocalTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export default ThemeProvider;














// import React, { createContext, useState, useEffect, useContext} from 'react';

// interface Props {
//     children: React.ReactElement;
//   }


// interface ThemeContextProps {
//   theme: 'light' | 'dark' | 'system';
//   actualTheme: 'light' | 'dark';
//   setTheme: (theme: 'light' | 'dark' | 'system') => void;
// }


// export const ThemeContext = createContext<ThemeContextProps>({
//   theme: 'system',
//   actualTheme: 'light',
//   setTheme: () => {}
// });

// export const useThemeContext = () => {
//   const context = useContext(ThemeContext);

//   useEffect(() => {
//     document.body.classList.value = "";
//     document.body.classList.add(`theme-${context.actualTheme}`);
//   }, [context.actualTheme]);

  
      
//   return context;
// }

// const getLocalTheme = (): 'light' | 'dark' | 'system'  => {
//   const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system';
//   console.log('saved: ', savedTheme)
//     if (['light', 'dark', 'system'].includes(savedTheme)) {
//       return savedTheme
//     }
//     return 'system'
// }


// // provider
// export const ThemeProvider: React.FC<Props> = ({ children }) => {
//   const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(getLocalTheme());
//   const [currentSystemTheme, setCurrentSystemTheme] = useState<'light' | 'dark'>('light');
//   console.log('currentSystemTheme: ', currentSystemTheme)
//   const actualTheme = theme === 'system' ? currentSystemTheme : theme;

//   const [actualTheme, setActualTheme] = useState<'light' | 'dark'>(getLocalTheme());
  
//   const setLocalTheme = (localTheme: 'light' | 'dark' | 'system') => {
//     localStorage.setItem('theme', localTheme);
//     setTheme(localTheme)
//   }

//   useEffect(() => {
//     console.log('systeeeem');

//     setCurrentSystemTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

//     const handleSystemThemeChange = (e: MediaQueryListEvent) => {
//       setCurrentSystemTheme(e.matches ? 'dark' : 'light');
//     };
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     mediaQuery.addEventListener('change', handleSystemThemeChange);
//     return () => {
//       mediaQuery.removeEventListener('change', handleSystemThemeChange);
//     };
//   }, []);

//   return (
//     <ThemeContext.Provider value={{ theme, actualTheme, setTheme: setLocalTheme}}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };


// export default ThemeProvider;